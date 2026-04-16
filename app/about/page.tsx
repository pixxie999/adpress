import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AdPress 소개 | 광고 수익 최적화 전문 정보 사이트",
  description:
    "AdPress는 블로거, 유튜버, 온라인 부업 희망자를 위한 광고 수익 최적화 전문 정보 사이트입니다.",
  alternates: { canonical: "https://adpress.kr/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        AdPress 소개
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-600 mb-4">
          우리는 누구인가요?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>AdPress(애드프레스)</strong>는 구글 애드센스, 네이버
          애드포스트 등 온라인 광고를 통해 수익을 창출하려는 블로거, 유튜버,
          온라인 부업 희망자를 위한 광고 수익 최적화 전문 정보 사이트입니다.
        </p>
        <p className="text-gray-700 leading-relaxed">
          "광고 수익을 프레스하다"는 슬로건처럼, 흩어져 있는 광고 수익화
          정보를 한 곳에 모아 압축적으로 전달합니다. 직접 경험한 데이터와
          실전 노하우를 바탕으로 현실적이고 실행 가능한 전략을 공유합니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-600 mb-4">
          핵심 목표
        </h2>
        <ul className="space-y-3">
          {[
            "애드센스·애드포스트 승인부터 수익 최적화까지 단계별 가이드 제공",
            "실제 수익 데이터를 투명하게 공개하는 월간 수익 리포트 발행",
            "AI 기반 콘텐츠 자동화로 최신 정보를 빠르게 업데이트",
            "SEO 최적화 전략으로 검색 상위 노출 달성",
            "제휴마케팅·뉴스레터 등 다각적 수익화 구조 구축",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <span className="mt-1 flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-600 mb-4">
          다루는 주제
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "📋 가이드", desc: "애드센스·애드포스트 승인, 광고 최적화 심층 가이드" },
            { title: "💡 실전 팁", desc: "즉시 적용 가능한 수익 향상 팁과 체크리스트" },
            { title: "📊 수익 리포트", desc: "실제 수익 데이터 투명 공개 및 분석" },
            { title: "🔍 도구 리뷰", desc: "SEO 도구, 호스팅, 마케팅 플랫폼 비교 리뷰" },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-600 mb-4">
          콘텐츠 원칙
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>✅ 직접 경험한 데이터와 사례만 공유합니다</li>
          <li>✅ 과장된 수익 약속 없이 현실적인 목표를 제시합니다</li>
          <li>✅ 제휴 링크는 항상 명시적으로 표시합니다</li>
          <li>✅ 정보는 정기적으로 업데이트하여 최신 상태를 유지합니다</li>
        </ul>
      </section>

      <section className="p-6 bg-primary-50 border border-primary-200 rounded-xl">
        <h2 className="text-xl font-semibold text-primary-700 mb-2">
          문의하기
        </h2>
        <p className="text-gray-700">
          콘텐츠 제안, 광고 문의, 협업 제안은 아래로 연락해 주세요.
        </p>
        <p className="mt-2 font-medium text-primary-600">
          contact@adpress.kr
        </p>
      </section>
    </div>
  );
}
