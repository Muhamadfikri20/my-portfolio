# Rheyno Apria Pratama - Portfolio Website

A modern, responsive portfolio website showcasing the professional experience, projects, and knowledge base of Rheyno Apria Pratama, a Software Engineer with 5+ years of experience in backend development and infrastructure.

## 🚀 Features

### 📱 Responsive Design
- Fixed sidebar navigation with beautiful profile section
- Mobile-responsive layout following modern UI/UX principles
- Smooth transitions and hover effects
- Clean, professional design system

### 🏗️ Architecture
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable React components

### 📄 Three Main Sections

#### 1. Resume Section
- **Professional Experience**: Detailed work history with achievements
- **Technical Skills**: Visual skill bars for backend, infrastructure, and database technologies
- **Education**: Academic background and certifications
- **Interactive Elements**: Hover effects and smooth animations

#### 2. Showcase Section
- **Project Portfolio**: 6+ backend and infrastructure projects
- **Filter System**: Category-based project filtering
- **Project Details**: Technologies used, key highlights, and links
- **Statistics Dashboard**: Project metrics and achievements
- **Status Indicators**: Production, Open Source, and Prototype project status

#### 3. Knowledge Base Section
- **Technical Articles**: In-depth backend and infrastructure articles
- **Search & Filter**: Advanced content discovery
- **Featured Content**: Highlighted articles and tutorials
- **Quick Tutorials**: Step-by-step guides
- **Newsletter Signup**: Stay updated with new content
- **Popular Tags**: Easy topic navigation

## 🛠️ Technical Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library

### Design System
- **Colors**: Custom neutral and primary color palette
- **Typography**: System fonts with multiple scales
- **Components**: Card-based layout with consistent spacing
- **Animations**: Subtle transitions and hover effects

### Key Technologies Showcased
- **Backend**: Python, Java, Node.js, Go
- **Infrastructure**: AWS, Docker, Kubernetes, Terraform
- **Databases**: PostgreSQL, MongoDB, Redis, Elasticsearch
- **DevOps**: CI/CD, GitOps, Monitoring, Observability

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rheynoapria/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Main page component
├── components/                   # React components
│   ├── Header.tsx               # Header with social links
│   ├── PortfolioLayout.tsx      # Main layout with sidebar
│   ├── Sidebar.tsx              # Navigation sidebar
│   └── sections/                # Section components
│       ├── ResumeSection.tsx    # Professional resume
│       ├── ShowcaseSection.tsx  # Project portfolio
│       └── KnowledgeBaseSection.tsx # Articles & tutorials
├── Design.json                  # Design system specifications
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## 🎨 Design System

The portfolio follows a comprehensive design system defined in `Design.json`:

### Color Palette
- **Neutral**: 50-900 shades for text and backgrounds
- **Primary**: Blue tones for interactive elements
- **Semantic**: Success, warning, error, and info colors

### Typography
- **Font Family**: System fonts for optimal performance
- **Scale**: xs (12px) to 3xl (30px)
- **Weights**: Regular, Medium, Semibold, Bold

### Components
- **Cards**: Consistent padding and shadows
- **Skill Badges**: Technology tags
- **Navigation**: Sidebar with active states
- **Stats Cards**: Metric displays with icons

## 🔧 Customization

### Personal Information
Update personal details in the following components:
- `components/Sidebar.tsx` - Profile information
- `components/Header.tsx` - Social links and contact
- `components/sections/ResumeSection.tsx` - Work experience and skills

### Content Management
- **Projects**: Modify the `projects` array in `ShowcaseSection.tsx`
- **Articles**: Update the `articles` array in `KnowledgeBaseSection.tsx`
- **Skills**: Adjust skill levels and technologies in `ResumeSection.tsx`

### Styling
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Components**: Update `app/globals.css` for component styles
- **Layout**: Adjust spacing and sizing in component files

## 📊 Performance Features

- **Static Site Generation**: Optimized build output
- **Image Optimization**: Next.js Image component ready
- **Font Optimization**: System font stack for fast loading
- **CSS Optimization**: Tailwind purging for minimal bundle size
- **Component Lazy Loading**: Efficient resource usage

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub repository
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Static site hosting
- **AWS Amplify**: Full-stack deployment
- **Docker**: Containerized deployment

## 📈 SEO & Accessibility

- **Meta Tags**: Comprehensive SEO metadata
- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Full accessibility support
- **Color Contrast**: WCAG AA compliant
- **Screen Reader**: Optimized for assistive technologies

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Contact

**Rheyno Apria Pratama**
- Email: rheyno.apria@example.com
- GitHub: [github.com/rheynoapria](https://github.com/rheynoapria)
- LinkedIn: [linkedin.com/in/rheynoapria](https://linkedin.com/in/rheynoapria)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS** 