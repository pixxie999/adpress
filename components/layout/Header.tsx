import Link from "next/link";
import { BookOpen, TrendingUp, HelpCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-700">
            AdPress
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center flex-1 ml-10">
          <Link href="/guides" className="text-gray-600 hover:text-primary-600 font-medium flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> 가이드
          </Link>
          <Link href="/tips" className="text-gray-600 hover:text-primary-600 font-medium flex items-center gap-1">
            <HelpCircle className="w-4 h-4" /> 실전 팁
          </Link>
          <Link href="/income-reports" className="text-gray-600 hover:text-primary-600 font-medium">
            수익 리포트
          </Link>
          <div className="h-4 w-px bg-gray-300 mx-2" />
          <Link href="/reviews" className="text-gray-600 hover:text-primary-600 font-medium">
            플랫폼 리뷰
          </Link>
        </nav>
      </div>
    </header>
  );
}
