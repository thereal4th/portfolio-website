import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Alfredo Venturina | Software Engineer & Architect",
  description: "Ethereal, dreamy, and dynamic soft warm spring portfolio of Alfredo Venturina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetBrainsMono.variable} antialiased transition-colors duration-1000`}>
        {children}
      </body>
    </html>
  );
}
