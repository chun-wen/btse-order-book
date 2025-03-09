import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Btse Order Book',
  description: 'Btse Order Book',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
