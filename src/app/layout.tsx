import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/app/components/providers/SessionProvider';
import './globals.css';

const poppings = Poppins({ subsets: ['latin'], weight: ['400', '500', '700', '900'] });

export const metadata: Metadata = {
  title: 'PROMARKETING SPA',
  description: 'TEST',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${poppings.className} px-3 py-3`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
