// 🐾 Pet Master Pro - Types

export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rodent' | 'rabbit' | 'exotic';

export type EnergyLevel = 'low' | 'medium' | 'high';
export type TrainingLevel = 'beginner' | 'essential' | 'intermediate' | 'advanced' | 'specialized';

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  age?: number;
  birthDate?: string;
  gender?: 'male' | 'female';
  photoUrl?: string;
  
  // Perfil comportamental
  energyLevel?: EnergyLevel;
  sociability?: number; // 1-5
  fears?: string[];
  currentBehaviors?: string[];
  currentRoutine?: string;
  healthNotes?: string;
  
  // Progresso
  currentModule?: TrainingLevel;
  completedLessons?: string[];
  weeklyGoals?: string[];
  
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  plan: 'free' | 'premium' | 'pro';
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface QuizAnswer {
  routine: string;
  space: string;
  experience: string;
  budget: string;
  personality: string;
  timeAvailable: string;
  hasOtherAnimals: boolean;
  hasChildren: boolean;
}

export interface QuizResult {
  recommendations: {
    species: PetSpecies;
    breed?: string;
    compatibility: number; // 0-100
    essentialCare: string[];
    behaviorProfile: string;
    monthlyCost: string;
    maintenanceLevel: 'low' | 'medium' | 'high';
    trainingTips: string[];
  }[];
}

export interface TrainingLesson {
  id: string;
  species: PetSpecies;
  module: TrainingLevel;
  title: string;
  description: string;
  steps: string[];
  commonMistakes: string[];
  importance: string;
  recommendedTime: string;
  order: number;
}

export interface VaccinationRecord {
  id: string;
  petId: string;
  vaccineName: string;
  date: string;
  nextDue?: string;
  veterinarian?: string;
  notes?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  petSpecies?: PetSpecies;
  content: string;
  mediaUrls?: string[];
  reactions: {
    likes: number;
    loves: number;
    helpful: number;
  };
  commentsCount: number;
  createdAt: string;
}
