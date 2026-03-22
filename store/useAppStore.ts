import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  recentTools: string[];
  bookmarks: string[];
  addRecentTool: (toolId: string) => void;
  toggleBookmark: (toolId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      recentTools: [],
      bookmarks: [],
      addRecentTool: (toolId) => 
        set((state) => ({
          recentTools: [toolId, ...state.recentTools.filter(id => id !== toolId)].slice(0, 10)
        })),
      toggleBookmark: (toolId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(toolId)
            ? state.bookmarks.filter(id => id !== toolId)
            : [...state.bookmarks, toolId]
        })),
    }),
    {
      name: 'cktoolkit-storage',
    }
  )
);
