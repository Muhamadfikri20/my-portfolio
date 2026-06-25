import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import AuthModal from '@/components/widgets/AuthModal.vue'

// Mock the Supabase-backed auth service so no network is hit.
vi.mock('@/services/authService', () => ({
  authService: {
    signIn: vi.fn().mockResolvedValue({ data: { user: { id: '1', email: 'user@test.com' } }, error: null }),
    signUp: vi.fn().mockResolvedValue({ data: { user: { id: '1', email: 'user@test.com', identities: [{}], }, session: {} }, error: null }),
    signInWithGoogle: vi.fn().mockResolvedValue({ data: {}, error: null }),
    getSession: vi.fn().mockResolvedValue(null),
    signOut: vi.fn().mockResolvedValue({}),
    onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe() {} } } })),
  },
  mapSupabaseUser: (u) => (u ? { id: u.id, email: u.email, name: 'Test', role: 'user' } : null),
}))

// Render teleported content inline so it is queryable in jsdom.
const mountModal = (props = {}) =>
  mount(AuthModal, {
    props: { isOpen: true, initialMode: 'login', ...props },
    global: { stubs: { teleport: true } },
  })

describe('AuthModal', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('does not render the form when closed', () => {
    const wrapper = mountModal({ isOpen: false })
    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('renders email + password inputs and the submit button when open (login mode)', () => {
    const wrapper = mountModal({ initialMode: 'login' })
    // Regression: the form and its inputs must actually be visible/queryable,
    // not hidden behind another layer.
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(false) // no name field in login
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('shows the name input in signup mode', () => {
    const wrapper = mountModal({ initialMode: 'signup' })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('can toggle from login to signup', async () => {
    const wrapper = mountModal({ initialMode: 'login' })
    expect(wrapper.find('input[type="text"]').exists()).toBe(false)
    const toggle = wrapper.findAll('button').find((b) => b.text().includes('Need an account'))
    expect(toggle).toBeTruthy()
    await toggle.trigger('click')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('the "Continue with Google" button triggers Google OAuth', async () => {
    const { authService } = await import('@/services/authService')
    const wrapper = mountModal({ initialMode: 'login' })
    const googleBtn = wrapper.findAll('button').find((b) => b.text().includes('Continue with Google'))
    expect(googleBtn).toBeTruthy()
    await googleBtn.trigger('click')
    expect(authService.signInWithGoogle).toHaveBeenCalled()
  })

  it('submitting login forwards the typed credentials to the auth service', async () => {
    const { authService } = await import('@/services/authService')
    const wrapper = mountModal({ initialMode: 'login' })
    await wrapper.find('input[type="email"]').setValue('user@test.com')
    await wrapper.find('input[type="password"]').setValue('secret123')
    await wrapper.find('form').trigger('submit.prevent')
    expect(authService.signIn).toHaveBeenCalledWith('user@test.com', 'secret123')
  })
})
