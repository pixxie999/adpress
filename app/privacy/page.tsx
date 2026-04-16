import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | AdPress",
  description: "AdPress의 개인정보 수집·이용·보관 방침을 안내합니다.",
  alternates: { canonical: "https://adpress.kr/privacy" },
};

const LAST_UPDATED = "2024-04-14";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        개인정보처리방침
      </h1>
      <p className="text-sm text-gray-500 mb-10">최종 업데이트: {LAST_UPDATED}</p>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. 개인정보 수집 항목
          </h2>
          <p className="text-gray-700 leading-relaxed">
            AdPress(adpress.kr)는 뉴스레터 구독 시 이메일 주소를 수집합니다.
            그 외 별도의 개인정보(이름, 연락처 등)는 수집하지 않습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. 개인정보 수집·이용 목적
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>뉴스레터 발송 (광고 수익 최적화 정보, 수익 리포트)</li>
            <li>서비스 이용 관련 안내</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. 개인정보 보유·이용 기간
          </h2>
          <p className="text-gray-700 leading-relaxed">
            구독 해지 요청 시까지 보유합니다. 구독 해지는 뉴스레터 하단의
            "구독 취소" 링크를 이용하거나 contact@adpress.kr로 요청하실 수
            있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. 제3자 제공
          </h2>
          <p className="text-gray-700 leading-relaxed">
            수집된 개인정보는 법령에 따른 경우를 제외하고 제3자에게 제공하지
            않습니다. 뉴스레터 발송을 위해 Mailchimp를 이용하며, Mailchimp의
            개인정보처리방침이 적용됩니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. 쿠키 및 분석 도구
          </h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            본 사이트는 Google Analytics 4를 이용하여 익명의 방문 통계를
            수집합니다. 이는 콘텐츠 품질 개선을 위한 목적으로만 사용됩니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            또한 Google AdSense를 통해 맞춤 광고가 표시될 수 있으며, 이 과정에서
            Google이 쿠키를 사용할 수 있습니다. 광고 개인화는 Google 광고 설정에서
            조정하실 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. 제휴 링크 안내
          </h2>
          <p className="text-gray-700 leading-relaxed">
            본 사이트의 일부 링크는 제휴 링크입니다. 해당 링크를 통해 구매 시
            사이트 운영자에게 수수료가 지급될 수 있습니다. 제휴 링크는 항상
            명시적으로 표시됩니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. 정보주체의 권리
          </h2>
          <p className="text-gray-700 leading-relaxed">
            수집된 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요청하실 수
            있습니다. 요청은 contact@adpress.kr로 보내주세요.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. 방침 변경 안내
          </h2>
          <p className="text-gray-700 leading-relaxed">
            개인정보처리방침이 변경될 경우 본 페이지를 통해 공지합니다.
            중요한 변경 사항은 뉴스레터를 통해서도 안내드립니다.
          </p>
        </section>
      </div>

      <div className="mt-10 p-5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
        문의: <a href="mailto:contact@adpress.kr" className="text-primary-600 hover:underline">contact@adpress.kr</a>
      </div>
    </div>
  );
}
