import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompareProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: { name: string; slug: string };
  brand: { name: string };
  attributes: string; // JSON string
}

interface CompareState {
  items: CompareProduct[];
  addItem: (product: CompareProduct) => void;
  removeItem: (id: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => 
        set((state) => {
          // Prevent duplicates
          if (state.items.some(item => item.id === product.id)) {
            return state;
          }
          // Enforce Apple to Apples category comparison
          if (state.items.length > 0 && state.items[0].category.slug !== product.category.slug) {
            alert(`Category Mismatch! You can only compare products in the same category (${state.items[0].category.name}).`);
            return state;
          }
          return { items: [...state.items, product] };
        }),
      removeItem: (id) => 
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),
      clearCompare: () => set({ items: [] }),
    }),
    {
      name: 'compare-storage',
    }
  )
);
