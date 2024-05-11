'use client';
import Image from 'next/image';
import Button from '@ui/button';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { TabItem } from '../ts/types';
import Tabs from '@ui/tabs';
import FormRequest from './components/FormRequest';
import FormDeposit from './components/FormDeposit';

const Dashboard = (): JSX.Element => {
  const { data: session } = useSession();

  const tabItems: TabItem[] = [
    {
      id: 1,
      title: 'Crear Solicitud',
      content: <FormRequest />,
    },
    {
      id: 2,
      title: 'Límite de depósito',
      content: <FormDeposit />,
    },
  ];

  if (!session || !session.user) {
    redirect('/');
  }

  const handleClick = () => {
    signOut();
  };

  return (
    <div className="grid h-screen text-center">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-primary text-xl">Hola ! {session.user.name}</h1>
          {session.user.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              style={{ borderRadius: '50%' }}
              alt="Picture of the author"
              className="mb-5"
            />
          )}
        </div>
        <Tabs items={tabItems} />
      </div>
      <div>
        <Button width={80} text="Cerrar Sesión" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Dashboard;
