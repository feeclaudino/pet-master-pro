"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, Upload } from 'lucide-react';
import { useStore } from '@/lib/store';
import type { Pet, PetSpecies, EnergyLevel } from '@/lib/types';

const steps = [
  { id: 1, title: 'Dados Básicos', emoji: '📝' },
  { id: 2, title: 'Perfil Comportamental', emoji: '🧠' },
  { id: 3, title: 'Finalização', emoji: '✅' }
];

export default function RegisterPetPage() {
  const router = useRouter();
  const { addPet } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Pet>>({
    name: '',
    species: undefined,
    breed: '',
    age: undefined,
    gender: undefined,
    energyLevel: undefined,
    sociability: 3,
    fears: [],
    currentBehaviors: [],
    currentRoutine: '',
    healthNotes: ''
  });

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finalizar cadastro
      const newPet: Pet = {
        id: crypto.randomUUID(),
        userId: 'temp-user-id', // Será substituído após auth
        name: formData.name!,
        species: formData.species!,
        breed: formData.breed,
        age: formData.age,
        gender: formData.gender,
        energyLevel: formData.energyLevel,
        sociability: formData.sociability,
        fears: formData.fears,
        currentBehaviors: formData.currentBehaviors,
        currentRoutine: formData.currentRoutine,
        healthNotes: formData.healthNotes,
        currentModule: 'beginner',
        completedLessons: [],
        weeklyGoals: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      addPet(newPet);
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      router.push('/onboarding');
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.name && formData.species;
    }
    if (currentStep === 2) {
      return formData.energyLevel;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Cadastrar Novo Pet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Etapa {currentStep} de {steps.length}: {steps[currentStep - 1].emoji} {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-2" />

        {/* Steps Indicator */}
        <div className="flex justify-center gap-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step.id === currentStep
                  ? 'bg-purple-500 text-white'
                  : step.id < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {step.id < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{step.emoji}</span>
              )}
              <span className="hidden sm:inline">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="p-6 md:p-8 space-y-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          {/* Step 1: Dados Básicos */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Pet *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Rex, Mia, Piu..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Espécie *</Label>
                <Select
                  value={formData.species}
                  onValueChange={(value: PetSpecies) => setFormData({ ...formData, species: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">🐶 Cão</SelectItem>
                    <SelectItem value="cat">🐱 Gato</SelectItem>
                    <SelectItem value="bird">🐦 Ave</SelectItem>
                    <SelectItem value="rodent">🐹 Roedor</SelectItem>
                    <SelectItem value="rabbit">🐰 Coelho</SelectItem>
                    <SelectItem value="exotic">🦎 Exótico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Raça (opcional)</Label>
                <Input
                  id="breed"
                  placeholder="Ex: Labrador, Persa, Calopsita..."
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade (anos)</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    placeholder="Ex: 2"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || undefined })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Sexo</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: 'male' | 'female') => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Macho</SelectItem>
                      <SelectItem value="female">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Foto do Pet (opcional)</Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Clique para fazer upload ou arraste uma foto
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Perfil Comportamental */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="energy">Nível de Energia *</Label>
                <Select
                  value={formData.energyLevel}
                  onValueChange={(value: EnergyLevel) => setFormData({ ...formData, energyLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de energia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">🐌 Baixa - Calmo e tranquilo</SelectItem>
                    <SelectItem value="medium">🚶 Média - Equilibrado</SelectItem>
                    <SelectItem value="high">⚡ Alta - Muito ativo e enérgico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sociability">
                  Sociabilidade (1-5): {formData.sociability}
                </Label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.sociability}
                  onChange={(e) => setFormData({ ...formData, sociability: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Tímido</span>
                  <span>Muito sociável</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fears">Medos ou Fobias</Label>
                <Textarea
                  id="fears"
                  placeholder="Ex: Barulhos altos, outros animais, pessoas estranhas..."
                  value={formData.fears?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, fears: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="behaviors">Comportamentos Atuais</Label>
                <Textarea
                  id="behaviors"
                  placeholder="Ex: Late muito, arranha móveis, morde quando brinca..."
                  value={formData.currentBehaviors?.join(', ')}
                  onChange={(e) => setFormData({ ...formData, currentBehaviors: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="routine">Rotina Atual</Label>
                <Textarea
                  id="routine"
                  placeholder="Descreva a rotina diária do seu pet..."
                  value={formData.currentRoutine}
                  onChange={(e) => setFormData({ ...formData, currentRoutine: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="health">Observações de Saúde</Label>
                <Textarea
                  id="health"
                  placeholder="Alergias, condições especiais, medicamentos..."
                  value={formData.healthNotes}
                  onChange={(e) => setFormData({ ...formData, healthNotes: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 3: Finalização */}
          {currentStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Tudo Pronto!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Vamos criar o perfil de <span className="font-bold text-purple-600">{formData.name}</span>
                </p>
              </div>

              <Card className="p-6 space-y-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                  O que será criado automaticamente:
                </h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Perfil completo do pet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Carteira de vacinação digital</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Plano de treino personalizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Agenda de cuidados</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Dashboard de evolução</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
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
            disabled={!canProceed()}
            className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {currentStep < steps.length ? 'Próxima Etapa' : 'Finalizar Cadastro'}
            {currentStep < steps.length ? (
              <ArrowRight className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
