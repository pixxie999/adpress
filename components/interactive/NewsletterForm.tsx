'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-8 rounded-xl text-white shadow-lg my-12">
      <h3 className="text-2xl font-bold mb-2">
        광고 수익 최적화 뉴스레터
      </h3>
      <p className="mb-6 text-primary-100">
        매주 실전 전략과 수익 리포트를 받아보세요
      </p>
      
      {status === 'success' ? (
        <div className="bg-white text-primary-700 p-4 rounded-lg font-medium text-center shadow-inner">
          ✅ 구독 완료! 첫 이메일을 확인해주세요.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-accent-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-primary-50 disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? '구독 처리중...' : '구독하기'}
          </button>
        </form>
      )}
      
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-200">
          오류가 발생했습니다. 다시 시도해주세요.
        </p>
      )}
    </div>
  );
}
