# Authentication System

This portfolio website now includes a complete authentication system with login/signup functionality and content editing capabilities.

## Features

### 🔐 Authentication
- **Sign Up**: Create new user accounts
- **Sign In**: Login with existing credentials
- **User Management**: View user profile and logout
- **Role-based Access**: Admin users can edit content

### ✏️ Content Editing
- **Edit Mode**: Toggle for admin users to enable content editing
- **Inline Editing**: Click on editable text to modify content
- **Real-time Updates**: Changes are saved immediately
- **Visual Indicators**: Edit buttons appear on hover when in edit mode

## Demo Accounts

For testing purposes, the following accounts are available:

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: Admin (can edit content)

### Regular User Account
- **Email**: user@example.com
- **Password**: user123
- **Role**: User (view only)

## How to Use

### 1. Sign Up / Sign In
1. Click the "Sign Up" or "Sign In" button in the header
2. Fill in the required information
3. Click the respective button to authenticate

### 2. Edit Content (Admin Only)
1. Sign in with an admin account
2. Click the "Edit Mode" button in the header
3. Hover over editable text to see the edit icon
4. Click the edit icon to modify the content
5. Save or cancel your changes

### 3. Sign Out
1. Click on your username in the header
2. Select "Sign Out" from the dropdown menu

## Technical Implementation

### Components
- `AuthContext`: Manages authentication state and user data
- `AuthModal`: Login/signup modal component
- `EditableText`: Reusable component for inline text editing
- `Header`: Updated with authentication controls

### API Routes
- `/api/auth/login`: Handles user login
- `/api/auth/signup`: Handles user registration

### Security Notes
- This is a demo implementation using in-memory storage
- In production, implement proper password hashing
- Use JWT tokens for authentication
- Store user data in a secure database
- Implement proper validation and sanitization

## Customization

### Adding More Editable Content
1. Import `EditableText` component
2. Add state for the content
3. Wrap the text with `EditableText` component
4. Provide `value`, `onChange`, and styling props

### Adding New User Roles
1. Update the `User` interface in `AuthContext.tsx`
2. Add role-based logic in components
3. Update API routes to handle new roles

## Future Enhancements

- [ ] Database integration
- [ ] Password hashing
- [ ] JWT token authentication
- [ ] Email verification
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Content versioning
- [ ] Auto-save functionality
