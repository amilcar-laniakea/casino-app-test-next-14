'use client';

import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import Button from '@ui/button';
import { redirect } from 'next/navigation';

const Home = (): JSX.Element => {
  const { data: session } = useSession();

  const handleClick = () => {
    signIn();
  };

  if (session && session.user) {
    redirect('/dashboard');
  }

  return (
    <div className="grid h-screen place-items-center text-center">
      <div>
        <h1 className="text-tertiary text-xl">Prueba Técnica PRO-Marketing</h1>

        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />

        <Button type="primary" width={80} text="Iniciar Session" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Home;
