import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Geist for sans-serif font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jacob Darvin",
  description: "👋 Jacob Darvin is a Full Stack Engineer @ Harmoney",
  metadataBase: new URL("https://jacobdarvin.com"),
  openGraph: {
    type: "website",
    url: "https://jacobdarvin.com",
    title: "Jacob Darvin",
    description: "👋 Jacob Darvin is a Full Stack Engineer @ Harmoney",
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
      <body className={`${inter.className} antialiased bg-neutral-50`}>
        {children}
      </body>
    </html>
  );
}
