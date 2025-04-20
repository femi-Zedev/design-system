import "./globals.css";
import "./mantine-styles.css";
import { Inter } from "next/font/google";
import RootLayoutProvider from "@/providers/RootLayoutProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Design System Starter",
  description:
    "Design system documentation with colors, typography, spacing, and components",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutProvider>
          {children}
        </RootLayoutProvider>
      </body>
    </html>
  );
}
