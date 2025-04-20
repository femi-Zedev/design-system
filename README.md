# Design System Starter

A comprehensive design system starter kit built with Next.js, Tailwind CSS, and Mantine UI. This project provides a foundation for creating and documenting your design system with reusable components, color palettes, typography guidelines, and spacing principles.

## Features

- **Color System**: Comprehensive color palette with semantic colors and usage guidelines
- **Typography**: Font families, text styles, and typographic guidelines
- **Spacing**: Consistent spacing scale and layout principles
- **Components**: Reusable UI components with documentation and examples

## Tech Stack

- [Next.js](https://nextjs.org/) with App Router
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Mantine UI](https://mantine.dev/) for components
- [TypeScript](https://www.typescriptlang.org/) for type safety

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/design-system.git
cd design-system
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
design-system/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── design-system/  # Design system documentation
│   │   │   ├── colors/     # Color system documentation
│   │   │   ├── typography/ # Typography documentation
│   │   │   ├── spacing/    # Spacing documentation
│   │   │   ├── components/ # Components documentation
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions and helpers
│   ├── styles/         # Global styles and Tailwind config
```

## Customization

### Colors

Edit the color palette in `src/app/design-system/colors/page.tsx` to match your brand colors.

### Typography

Modify the typography settings in `src/app/design-system/typography/page.tsx` to use your preferred fonts and text styles.

### Spacing

Adjust the spacing scale in `src/app/design-system/spacing/page.tsx` to match your design requirements.

### Components

Add or modify components in the `src/components` directory and document them in the design system.

## Deployment

This project can be deployed on any platform that supports Next.js applications, such as Vercel, Netlify, or your own server.

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
