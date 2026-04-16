import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://adpress.kr"),
  title: "AdPress - 광고 수익을 프레스하다",
  description: "애드센스, 애드포스트 등 광고 수익 최적화 전략과 노하우",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1 flex flex-col w-full max-w-[1280px] mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
      </body>
    </html>
  );
}
