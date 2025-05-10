import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Geist for sans-serif font
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

// Geist with monospace style for mono font
const geistMono = Geist({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  style: "normal",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Jacob Darvin",
  description: "👋 Jacob Darvin is a Full Stack Engineer",
  metadataBase: new URL("https://jacobdarvin.com"),
  openGraph: {
    type: "website",
    url: "https://jacobdarvin.com",
    title: "Jacob Darvin",
    description: "👋 Jacob Darvin is a Full Stack Engineer",
    siteName: "Jacob Darvin",
    images: [
      {
        url: "/me.jpeg",
        width: 886,
        height: 886,
        alt: "Jacob's Face",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
