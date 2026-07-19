import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elias Solutions GmbH – IT Consulting & Software Development",
  description:
    "Elias Solutions GmbH delivers expert IT consulting and custom software development solutions to help businesses thrive in a digital world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
