"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PawPrint, Sparkles, Plus } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center space-y-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-2xl">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <PawPrint className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pet Master Pro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            O treino que evolui com o seu pet, toda semana
          </p>
        </div>

        {/* Subtítulo */}
        <div className="py-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            ✨ Bem-vindo! Como deseja começar?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Escolha a melhor opção para você
          </p>
        </div>

        {/* Opções */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Opção 1: Quiz */}
          <Card 
            className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-purple-500 group"
            onClick={() => router.push('/onboarding/quiz')}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Fazer o Quiz do Pet Ideal
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Descubra qual pet combina perfeitamente com seu estilo de vida, rotina e personalidade
              </p>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                Começar Quiz
              </Button>
            </div>
          </Card>

          {/* Opção 2: Cadastrar Pet */}
          <Card 
            className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-pink-500 group"
            onClick={() => router.push('/onboarding/register-pet')}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Cadastrar Meu Pet Agora
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Já tem um pet? Cadastre-o agora e comece a treinar imediatamente
              </p>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
                Cadastrar Pet
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="pt-6 text-sm text-gray-500 dark:text-gray-400">
          Para cães, gatos, aves, roedores, coelhos e pequenos mamíferos
        </div>
      </Card>
    </div>
  );
}
