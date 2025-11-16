"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, TrendingUp, DollarSign, Clock, Heart, ArrowRight } from 'lucide-react';

// Mock results - em produção viria da IA
const mockResults = [
  {
    species: 'cat' as const,
    breed: 'Gato Doméstico de Pelo Curto',
    compatibility: 92,
    essentialCare: ['Caixa de areia limpa diariamente', 'Alimentação balanceada 2x/dia', 'Enriquecimento ambiental', 'Escovação semanal'],
    behaviorProfile: 'Independente, carinhoso nos próprios termos, ótimo para rotinas ocupadas. Adapta-se bem a apartamentos e não exige passeios.',
    monthlyCost: 'R$ 200 - R$ 400',
    maintenanceLevel: 'low' as const,
    trainingTips: ['Use clicker training', 'Reforce comportamentos positivos', 'Respeite o espaço do gato', 'Crie rotinas previsíveis']
  },
  {
    species: 'dog' as const,
    breed: 'Poodle Toy ou Shih Tzu',
    compatibility: 85,
    essentialCare: ['Passeios diários de 30min', 'Tosa a cada 2 meses', 'Alimentação 2-3x/dia', 'Socialização regular'],
    behaviorProfile: 'Companheiro, adaptável, ótimo para apartamentos. Requer atenção moderada e adora estar perto da família.',
    monthlyCost: 'R$ 300 - R$ 600',
    maintenanceLevel: 'medium' as const,
    trainingTips: ['Comece com comandos básicos', 'Socialize desde cedo', 'Use reforço positivo', 'Estabeleça rotina de passeios']
  },
  {
    species: 'bird' as const,
    breed: 'Calopsita',
    compatibility: 78,
    essentialCare: ['Gaiola espaçosa', 'Alimentação variada', 'Tempo fora da gaiola diariamente', 'Brinquedos rotativos'],
    behaviorProfile: 'Sociável, inteligente, pode aprender truques. Requer interação diária mas é independente quando necessário.',
    monthlyCost: 'R$ 150 - R$ 300',
    maintenanceLevel: 'medium' as const,
    trainingTips: ['Target training básico', 'Ensine a subir no dedo', 'Reforce com petiscos', 'Crie rotina de interação']
  }
];

export default function QuizResultsPage() {
  const router = useRouter();

  const getMaintenanceColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getMaintenanceLabel = (level: string) => {
    switch (level) {
      case 'low': return 'Baixa Manutenção';
      case 'medium': return 'Manutenção Moderada';
      case 'high': return 'Alta Manutenção';
      default: return 'Manutenção';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Seus Pets Ideais
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Baseado no seu perfil, aqui estão as melhores recomendações
          </p>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {mockResults.map((result, index) => (
            <Card key={index} className="p-6 md:p-8 space-y-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              {/* Header com ranking */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="text-lg px-3 py-1">
                      #{index + 1}
                    </Badge>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                      {result.breed}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {result.behaviorProfile}
                  </p>
                </div>

                {/* Compatibility Score */}
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {result.compatibility}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Compatibilidade
                  </div>
                </div>
              </div>

              {/* Compatibility Bar */}
              <div className="space-y-2">
                <Progress value={result.compatibility} className="h-3" />
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Heart className="w-4 h-4" />
                  <span>Excelente combinação com seu perfil</span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      Custo Mensal
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {result.monthlyCost}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      Nível de Manutenção
                    </div>
                    <Badge className={getMaintenanceColor(result.maintenanceLevel)}>
                      {getMaintenanceLabel(result.maintenanceLevel)}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">
                      Facilidade de Treino
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {result.species === 'cat' ? 'Moderada' : result.species === 'dog' ? 'Alta' : 'Moderada'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Essential Care */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  🏥 Cuidados Essenciais
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {result.essentialCare.map((care, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                      <span className="text-gray-700 dark:text-gray-300">{care}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Tips */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  🎯 Dicas Iniciais de Treino
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {result.trainingTips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2" />
                      <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {index === 0 && (
                <Button
                  onClick={() => router.push('/onboarding/register-pet')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 gap-2"
                  size="lg"
                >
                  Cadastrar Pet Baseado Neste Resultado
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => router.push('/onboarding/quiz')}
            size="lg"
          >
            Refazer Quiz
          </Button>
          <Button
            onClick={() => router.push('/onboarding/register-pet')}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Cadastrar Outro Pet
          </Button>
        </div>
      </div>
    </div>
  );
}
