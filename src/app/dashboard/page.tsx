"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PawPrint, 
  Plus, 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Heart,
  Users,
  Camera,
  Lightbulb,
  Settings,
  LogOut
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { pets, selectedPetId, selectPet, getSelectedPet } = useStore();
  const selectedPet = getSelectedPet();

  useEffect(() => {
    // Se não tem pets, redireciona para onboarding
    if (pets.length === 0) {
      router.push('/onboarding');
    }
    // Se tem pets mas nenhum selecionado, seleciona o primeiro
    if (pets.length > 0 && !selectedPetId) {
      selectPet(pets[0].id);
    }
  }, [pets, selectedPetId, router, selectPet]);

  if (!selectedPet) {
    return null;
  }

  const getSpeciesEmoji = (species: string) => {
    const emojis: Record<string, string> = {
      dog: '🐶',
      cat: '🐱',
      bird: '🐦',
      rodent: '🐹',
      rabbit: '🐰',
      exotic: '🦎'
    };
    return emojis[species] || '🐾';
  };

  const completionPercentage = 25; // Mock - calcular baseado em lições completadas

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Pet Master Pro
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Pet Selector */}
        <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Meus Pets
            </h2>
            <Button
              onClick={() => router.push('/onboarding/register-pet')}
              size="sm"
              className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Plus className="w-4 h-4" />
              Adicionar Pet
            </Button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {pets.map((pet) => (
              <Card
                key={pet.id}
                className={`min-w-[200px] p-4 cursor-pointer transition-all ${
                  pet.id === selectedPetId
                    ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => selectPet(pet.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-4xl">
                    {getSpeciesEmoji(pet.species)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      {pet.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {pet.breed || pet.species}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Welcome Card */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-bold">
                Olá! Pronto para treinar {selectedPet.name}?
              </h2>
              <p className="text-purple-100">
                Continue de onde parou e evolua ainda mais
              </p>
            </div>
            <div className="text-6xl">
              {getSpeciesEmoji(selectedPet.species)}
            </div>
          </div>
        </Card>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  Progresso Geral
                </span>
              </div>
              <Badge>{completionPercentage}%</Badge>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedPet.completedLessons?.length || 0} lições completadas
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Módulo Atual
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Fundamentos
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nível Iniciante
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Sequência
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              7 dias
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Continue assim! 🔥
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Acesso Rápido
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card 
              className="p-6 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => router.push('/training')}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Treinos
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Continue suas lições
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => router.push('/health')}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Saúde
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vacinas e cuidados
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => router.push('/community')}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Comunidade
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conecte-se com tutores
                </p>
              </div>
            </Card>

            <Card 
              className="p-6 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => router.push('/media')}
            >
              <div className="space-y-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  Fotos & Vídeos
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Edite com IA
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Weekly Tip */}
        <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-yellow-900" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                💡 Dica da Semana
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {selectedPet.species === 'dog' && "Cães aprendem melhor com sessões curtas de 5-10 minutos. Pratique comandos básicos várias vezes ao dia!"}
                {selectedPet.species === 'cat' && "Gatos respondem melhor ao clicker training. Use petiscos pequenos e sessões de 3-5 minutos!"}
                {selectedPet.species === 'bird' && "Aves adoram rotina! Treine sempre no mesmo horário para melhores resultados."}
                {!['dog', 'cat', 'bird'].includes(selectedPet.species) && "Paciência e consistência são fundamentais. Respeite o tempo do seu pet!"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
