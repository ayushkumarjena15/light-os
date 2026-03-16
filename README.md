<div align="center">
  <h1>✨ LightOS Portfolio </h1>
  <p><strong>A Modern, Animated, & Interactive Developer Portfolio</strong></p>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-white?style=for-the-badge&logo=framer&logoColor=black" alt="Framer Motion" />
</p>

---

## 📖 Overview

Welcome to the **LightOS App**, a beautifully crafted, highly interactive personal developer portfolio. This project was built to showcase projects, skills, and professional background with a premium UI/UX feel, deeply inspired by sleek operating system aesthetics, dark mode themes, and smooth fluid transitions.

Every section has been meticulously designed with advanced animations to provide an engaging, fast, and unforgettable experience for every visitor.

---

## 🎨 UI / UX & Animation Highlights

This project stands out for its immersive visual aesthetics:

- **Immersive Interactive Background:** Uses `StarsCanvas` to create a beautiful moving starry background that tracks user interaction and window context.
- **Dynamic Cursor Effect:** A custom `CursorGlow` component provides a fluid, gradient-based glow that follows the user's mouse pointer, giving a tactile and modern feel to navigation.
- **Buttery Smooth Scrolling:** Powered by `@studio-freight/lenis` alongside `GSAP` to manage scroll-driven events with absolute precision without jank.
- **Staggered Text Animations:** Elegant text reveals and scroll-triggered behaviors across `Hero`, `Showcase`, `About`, and `Contact` sections using `Framer Motion` and `GSAP`.
- **Modern Glassmorphism & Vivid Contrasts:** Utilizes complex layered gradients, vivid mix-blend-screen effects, and high contrast typography (implemented with Tailwind CSS) for a sleek "LightOS" theme.

---

## 🛠️ Tech Stack & Tools

### **Core**
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

### **Styling & Icons**
- **CSS Framework:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

### **Animations & Effects**
- **Framer Motion:** Declarative motion and interactive gesture animations.
- **GSAP:** Industry-standard performant scroll and timeline-driven animations.
- **Lenis:** Smooth scrolling engine.

---

## 📂 Project Structure

Here is a high-level overview of the application components:

```text
├── src/
│   ├── app/                # Next.js App Router (pages and layout)
│   │   ├── globals.css     # Global styles including tailwind directives
│   │   ├── layout.tsx      # Root layout of the application
│   │   └── page.tsx        # Main portfolio landing page
│   ├── components/         # Reusable React UI Components
│   │   ├── About.tsx       # About Me section
│   │   ├── Contact.tsx     # Contact form & animated reach-out section
│   │   ├── CursorGlow.tsx  # Interactive mouse glow effect
│   │   ├── Features.tsx    # Skills & Toolset highlights 
│   │   ├── Footer.tsx      # Site Footer with stylized gradients
│   │   ├── Hero.tsx        # Landing/Hero animated intro section
│   │   ├── Latest.tsx      # Feed or latest updates timeline
│   │   ├── Navbar.tsx      # Top sticky navigation bar
│   │   ├── Showcase.tsx    # Project showcases / Portfolio items
│   │   ├── SmoothScroll.tsx# Lenis smooth-scrolling context provider
│   │   └── StarsCanvas.tsx # 3D/Interactive background canvas
├── public/                 # Static assets (images, icons)
├── package.json            # Project dependencies and bash scripts
└── next.config.ts          # Next.js configuration settings
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or later is recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd lightos-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

> **Note:** There are no environment variables or API keys required to run this beautifully styled frontend portfolio.

---

## 🤝 Let's Connect & Collaborate!

I am always extremely happy to collaborate on new and exciting projects, discuss innovative tech, or connect with awesome people in the developer community! 

Feel free to browse through my work, try out the live web app, or reach out directly. I'd love to hear from you!

- 🔗 **Portfolio:** [Insert Portfolio Link Here]
- 💼 **LinkedIn:** [Insert LinkedIn Profile Here]
- 🐦 **Twitter / X:** [Insert Twitter Link Here]
- 🐙 **GitHub:** [Insert GitHub Profile Here]

> **_"Building beautiful, animated, and highly performant web experiences."_** 💡

---
<p align="center">Made with ❤️ using Next.js, React & Framer Motion</p>
