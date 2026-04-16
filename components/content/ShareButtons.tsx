'use client';

import { useEffect, useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareKakao = () => {
    const encoded = encodeURIComponent(url);
    window.open(`https://share.kakao.com/link/compose?url=${encoded}&title=${encodeURIComponent(title)}`);
  };

  const shareTwitter = () => {
    const encoded = encodeURIComponent(`${title} ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${encoded}`);
  };

  return (
    <div className="mt-10 border-t border-gray-200 pt-6">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <Share2 className="w-4 h-4" /> 공유하기
        </span>
        <button
          onClick={shareKakao}
          className="px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-medium rounded-lg hover:bg-yellow-500 transition"
        >
          카카오톡
        </button>
        <button
          onClick={shareTwitter}
          className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 transition"
        >
          X(트위터)
        </button>
        <button
          onClick={copyLink}
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition flex items-center gap-1"
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          {copied ? '복사됨' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
