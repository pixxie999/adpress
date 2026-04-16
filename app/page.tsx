import Link from 'next/link';
import { ArrowRight, BookOpen, TrendingUp, HelpCircle } from 'lucide-react';
import NewsletterForm from '@/components/interactive/NewsletterForm';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="text-center pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          당신의 블로그, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
            광고 수익을 프레스하다
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          애드센스, 애드포스트 등 디지털 노마드를 위한 광고 수익 최적화 전략과 
          실전 노하우를 제공합니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/guides" 
            className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition w-full sm:w-auto"
          >
            핵심 가이드 보기
          </Link>
          <Link 
            href="/tips" 
            className="px-8 py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
          >
            수익화 팁 읽기
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4 text-primary-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">실전 가이드</h3>
          <p className="text-gray-600 mb-4 h-12 line-clamp-2">애드센스 승인부터 세금 신고까지, 단계별 완벽 가이드라인</p>
          <Link href="/guides" className="text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
            보러가기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4 text-accent-600">
            <TrendingUp className="w-6 h-6 text-accent-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">수익 리포트</h3>
          <p className="text-gray-600 mb-4 h-12 line-clamp-2">투명하게 공개되는 매월 자동화 콘텐츠 수익 리얼 리포트</p>
          <Link href="/income-reports" className="text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
            보러가기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center mb-4 text-secondary-600">
            <HelpCircle className="w-6 h-6 text-secondary-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">빠른 수익 팁</h3>
          <p className="text-gray-600 mb-4 h-12 line-clamp-2">조회수, RPM, CPC를 직관적으로 올리는 실전 팁 요약</p>
          <Link href="/tips" className="text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
            보러가기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterForm />
    </div>
  );
}
