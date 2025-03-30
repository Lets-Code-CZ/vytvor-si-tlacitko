import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: "400",
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vytvoř si tlačítko!",
    template: "Let's Code | %s",
  },
  description: "Ano, opravdu jsme strávili svůj drahocený čas děláním stránky na vytvoření svého vlastního tlačítka. Co takhle si jedno vytvořit sám?",
  keywords: [
    "tlačítko",
    "generace",
    "stylování",
    "CSS",
    "HTML",
    "React",
    "React button",
    "Tailwind CSS",
  ],
  openGraph: {
    title: "Vytvoř si tlačítko!",
    description: "Ano, opravdu jsme strávili svůj drahocený čas děláním stránky na vytvoření svého vlastního tlačítka. Co takhle si jedno vytvořit sám?",
    url: "https://tlacitko.lets-code.cz",
    siteName: "Let's Code",
    images: [
      {
        url: "https://tlacitko.lets-code.cz/images/Banner.png",
        width: 1000,
        height: 600,
        alt: "Let's Code | Vytvoř si tlačítko!",
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@LetsCodeCZ",
    title: "Let's Code | Vytvoř si tlačítko!",
    description: "Ano, opravdu jsme strávili svůj drahocený čas děláním stránky na vytvoření svého vlastního tlačítka. Co takhle si jedno vytvořit sám?",
    images: ["https://tlacitko.lets-code.cz/images/Banner.png"],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#9ae600" },
    { media: "(prefers-color-scheme: dark)", color: "#9ae600" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="apple-mobile-web-app-title" content="Vytvoř si tlačítko" />
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
