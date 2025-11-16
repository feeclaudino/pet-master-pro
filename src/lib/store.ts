// 🐾 Pet Master Pro - Global State Store
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Pet, User } from './types';

interface AppState {
  user: User | null;
  pets: Pet[];
  selectedPetId: string | null;
  onboardingStep: number;
  
  // Actions
  setUser: (user: User | null) => void;
  setPets: (pets: Pet[]) => void;
  addPet: (pet: Pet) => void;
  updatePet: (petId: string, updates: Partial<Pet>) => void;
  selectPet: (petId: string | null) => void;
  setOnboardingStep: (step: number) => void;
  
  // Computed
  getSelectedPet: () => Pet | null;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      pets: [],
      selectedPetId: null,
      onboardingStep: 0,

      setUser: (user) => set({ user }),
      
      setPets: (pets) => set({ pets }),
      
      addPet: (pet) => set((state) => ({ 
        pets: [...state.pets, pet],
        selectedPetId: pet.id 
      })),
      
      updatePet: (petId, updates) => set((state) => ({
        pets: state.pets.map(p => p.id === petId ? { ...p, ...updates } : p)
      })),
      
      selectPet: (petId) => set({ selectedPetId: petId }),
      
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      
      getSelectedPet: () => {
        const state = get();
        return state.pets.find(p => p.id === state.selectedPetId) || null;
      }
    }),
    {
      name: 'pet-master-storage',
    }
  )
);
