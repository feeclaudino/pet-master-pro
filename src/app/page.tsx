"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';

export default function Home() {
  const router = useRouter();
  const { pets } = useStore();

  useEffect(() => {
    // Se já tem pets cadastrados, vai direto pro dashboard
    if (pets.length > 0) {
      router.push('/dashboard');
    } else {
      // Senão, vai pro onboarding
      router.push('/onboarding');
    }
  }, [pets, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
}
