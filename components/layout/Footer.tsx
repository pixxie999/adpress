import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-12 py-12">
      <div className="max-w-[1280px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
             <TrendingUp className="w-5 h-5 text-primary-600" />
            <span className="text-lg font-bold text-gray-900">AdPress</span>
          </Link>
          <p className="text-gray-500 text-sm">
            광고 수익을 프레스하다. 애드센스, 애드포스트 등 디지털 노마드를 위한 광고 수익 최적화 전략.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">가이드</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li><Link href="/guides" className="hover:text-primary-600">모든 가이드</Link></li>
            <li><Link href="/guides/adsense-approval-2024" className="hover:text-primary-600">애드센스 승인</Link></li>
            <li><Link href="/guides/adpost-complete-guide" className="hover:text-primary-600">애드포스트 정복</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">사이트</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li><Link href="/tips" className="hover:text-primary-600">실전 팁</Link></li>
            <li><Link href="/income-reports" className="hover:text-primary-600">수익 리포트</Link></li>
            <li><Link href="/tools/income-calculator" className="hover:text-primary-600">수익 계산기</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">법적 고지</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-600">
            <li><Link href="/privacy" className="hover:text-primary-600">개인정보처리방침</Link></li>
            <li><Link href="/terms" className="hover:text-primary-600">이용약관</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1280px] mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} AdPress. All rights reserved.
      </div>
    </footer>
  );
}
