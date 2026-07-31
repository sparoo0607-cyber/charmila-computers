import { create } from 'zustand';

export type ComponentType = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'SSD' | 'HDD' | 'PSU' | 'Cabinet' | 'Cooler' | 'Fans' | string;

export interface PCComponent {
  id: string;
  name: string;
  type: ComponentType;
  price: number;
  image?: string;
  specs: Record<string, string>;
}

interface PCBuilderState {
  selectedComponents: Partial<Record<ComponentType, PCComponent>>;
  totalPrice: number;
  selectComponent: (type: ComponentType, component: PCComponent) => void;
  removeComponent: (type: ComponentType) => void;
  clearBuild: () => void;
}

export const usePCBuilderStore = create<PCBuilderState>((set) => ({
  selectedComponents: {},
  totalPrice: 0,
  selectComponent: (type, component) => 
    set((state) => {
      const newComponents = { ...state.selectedComponents, [type]: component };
      const newTotal = Object.values(newComponents).reduce((acc, curr) => acc + (curr?.price || 0), 0);
      return { selectedComponents: newComponents, totalPrice: newTotal };
    }),
  removeComponent: (type) => 
    set((state) => {
      const newComponents = { ...state.selectedComponents };
      delete newComponents[type];
      const newTotal = Object.values(newComponents).reduce((acc, curr) => acc + (curr?.price || 0), 0);
      return { selectedComponents: newComponents, totalPrice: newTotal };
    }),
  clearBuild: () => set({ selectedComponents: {}, totalPrice: 0 }),
}));
