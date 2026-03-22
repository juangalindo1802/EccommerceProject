import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "VANTA.TECH | Ecommerce Premium",
    template: "%s | VANTA.TECH",
  },
  description: "Ecommerce ficticio moderno para portafolio personal.",
  openGraph: {
    title: "VANTA.TECH | Ecommerce Premium",
    description: "Tecnologia premium, experiencia moderna y arquitectura profesional.",
    type: "website",
    siteName: "VANTA.TECH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
