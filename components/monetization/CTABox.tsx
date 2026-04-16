import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  href: string;
  buttonText: string;
  variant?: 'download' | 'link';
}

export default function CTABox({
  title,
  description,
  href,
  buttonText,
  variant = 'link',
}: Props) {
  return (
    <div className="my-10 bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition"
        {...(variant === 'download' ? { download: true } : {})}
      >
        {variant === 'download' ? (
          <Download className="w-4 h-4" />
        ) : (
          <ArrowRight className="w-4 h-4" />
        )}
        {buttonText}
      </Link>
    </div>
  );
}
