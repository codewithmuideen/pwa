import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Citizens Bank | Helping you bank better, every day",
  description:
    "Personal and business banking, wealth management, home lending, and credit cards. Open an account, bank on the go, and manage your money with Citizens.",
  manifest: "/manifest.json",
  applicationName: "Citizens Bank",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Citizens",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#147A6B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F6F7F8] text-[#1A1A1A]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
