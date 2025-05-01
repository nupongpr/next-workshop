import { getSession } from '@/app/lib/session'
import React from 'react'
import ErrorMessage from '../components/ErrorMessage';
// import { redirect } from 'next/navigation';

export default async function DashboardPage() {

  const userSession = await getSession();
  const user = userSession || null;
  // if(!user) {
  //   return redirect('/login');
  // }

  return (
    <div className='mt-4'>
      <h1 className='text-3xl'>Fullname: {user?.fullname as string}</h1>
      <h1 className='text-3xl mt-4'>Email: {user?.email as string}</h1>
      <ErrorMessage />
    </div>
  )
}
