import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/** Monis sets its own site in Inter; the configurator matches it. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monis Workspace Designer",
  description:
    "Compose a rentable workspace — desk, chair, monitors, accessories — and see what it costs for the period you need it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
