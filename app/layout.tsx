import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '북북 — 책을 시작하는 가장 짧은 방법',
  description: '한 권의 책을 약 100개의 문장으로 만나고, 가장 궁금한 순간 원작을 시작하세요.',
  openGraph: {
    title: '북북 — 책을 시작하는 가장 짧은 방법',
    description: '요약으로 끝내지 않고, 원작을 시작하게 만드는 100문장 독서 경험.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '북북 — 책을 시작하는 가장 짧은 방법',
    description: '요약으로 끝내지 않고, 원작을 시작하게 만드는 100문장 독서 경험.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
