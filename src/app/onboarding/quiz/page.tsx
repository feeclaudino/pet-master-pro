"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import type { QuizAnswer } from '@/lib/types';

const quizQuestions = [
  {
    id: 'routine',
    question: '📅 Como é sua rotina diária?',
    options: [
      { value: 'very-busy', label: 'Muito ocupada - poucas horas em casa' },
      { value: 'busy', label: 'Ocupada - trabalho fora, mas tenho tempo' },
      { value: 'flexible', label: 'Flexível - trabalho em casa ou horários variados' },
      { value: 'available', label: 'Muito disponível - aposentado ou tempo integral em casa' }
    ]
  },
  {
    id: 'space',
    question: '🏠 Qual o tamanho do seu espaço?',
    options: [
      { value: 'small', label: 'Apartamento pequeno (até 50m²)' },
      { value: 'medium', label: 'Apartamento médio ou casa pequena (50-100m²)' },
      { value: 'large', label: 'Casa grande com quintal (100m²+)' },
      { value: 'very-large', label: 'Casa grande com área externa ampla' }
    ]
  },
  {
    id: 'experience',
    question: '🎓 Qual sua experiência com pets?',
    options: [
      { value: 'none', label: 'Nenhuma - será meu primeiro pet' },
      { value: 'basic', label: 'Básica - já tive pets na infância' },
      { value: 'intermediate', label: 'Intermediária - já cuidei de pets adultos' },
      { value: 'advanced', label: 'Avançada - tenho ou tive múltiplos pets' }
    ]
  },
  {
    id: 'budget',
    question: '💰 Qual seu orçamento mensal para o pet?',
    options: [
      { value: 'low', label: 'Até R$ 200/mês' },
      { value: 'medium', label: 'R$ 200 - R$ 500/mês' },
      { value: 'high', label: 'R$ 500 - R$ 1000/mês' },
      { value: 'very-high', label: 'Acima de R$ 1000/mês' }
    ]
  },
  {
    id: 'personality',
    question: '😊 Que tipo de companhia você busca?',
    options: [
      { value: 'calm', label: 'Calma e tranquila - para relaxar' },
      { value: 'playful', label: 'Brincalhona e divertida - para interagir' },
      { value: 'active', label: 'Ativa e esportiva - para exercícios' },
      { value: 'independent', label: 'Independente - que não exija atenção constante' }
    ]
  },
  {
    id: 'timeAvailable',
    question: '⏰ Quanto tempo pode dedicar por dia?',
    options: [
      { value: 'minimal', label: 'Menos de 1 hora' },
      { value: 'moderate', label: '1-2 horas' },
      { value: 'good', label: '2-4 horas' },
      { value: 'extensive', label: 'Mais de 4 horas' }
    ]
  },
  {
    id: 'hasOtherAnimals',
    question: '🐾 Você já tem outros animais em casa?',
    options: [
      { value: 'yes', label: 'Sim, tenho outros pets' },
      { value: 'no', label: 'Não, será o primeiro' }
    ]
  },
  {
    id: 'hasChildren',
    question: '👶 Você tem crianças em casa?',
    options: [
      { value: 'yes', label: 'Sim, tenho crianças' },
      { value: 'no', label: 'Não tenho crianças' }
    ]
  }
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const currentQ = quizQuestions[currentQuestion];

  const handleAnswer = (value: string) => {
    const key = currentQ.id as keyof QuizAnswer;
    setAnswers(prev => ({
      ...prev,
      [key]: key === 'hasOtherAnimals' || key === 'hasChildren' ? value === 'yes' : value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Finalizar quiz e ir para resultados
      router.push('/onboarding/quiz/results');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      router.push('/onboarding');
    }
  };

  const currentAnswer = answers[currentQ.id as keyof QuizAnswer];
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Quiz do Pet Ideal
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Pergunta {currentQuestion + 1} de {quizQuestions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2" />

        {/* Question Card */}
        <Card className="p-8 space-y-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {currentQ.question}
          </h2>

          <RadioGroup
            value={currentAnswer?.toString()}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQ.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-purple-500 transition-colors cursor-pointer"
                onClick={() => handleAnswer(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer text-base"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {currentQuestion < quizQuestions.length - 1 ? 'Próxima' : 'Ver Resultados'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
