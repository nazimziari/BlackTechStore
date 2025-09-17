import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer"; 
import QuickViewModal from "@/components/store/QuickViewModal";
import ModalProvider from "@/components/providers/ModalProvider";
import Script from "next/script";
import CartSidebar from '@/components/store/CartSidebar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlackTech",
  description: "Refurbished Tech, Trusted Quality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <CartSidebar />
        <ModalProvider />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}