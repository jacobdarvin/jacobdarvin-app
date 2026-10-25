import type { Metadata, Viewport } from "next";
import { inter, youngSerif } from "./fonts";
import "./globals.css";

const description = "Jacob Darvin is a Full Stack Engineer at Harmoney.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jacobdarvin.com"),
  title: {
    default: "Jacob Darvin",
    template: "%s · Jacob Darvin",
  },
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Jacob Darvin",
    title: "Jacob Darvin",
    description,
    images: [
      { url: "/moi_1.jpeg", width: 1152, height: 1152, alt: "Jacob Darvin" },
    ],
  },
  twitter: {
    card: "summary",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${youngSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
