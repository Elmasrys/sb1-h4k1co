import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompanySettings {
  name: string;
  logo: string | null;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const defaultSettings: CompanySettings = {
  name: 'mavrika',
  logo: null,
  colors: {
    primary: '#72f68e',
    secondary: '#f4f4f4',
    accent: '#040707'
  }
};

interface SettingsState {
  settings: CompanySettings;
  updateSettings: (settings: Partial<CompanySettings>) => void;
  updateColors: (colors: CompanySettings['colors']) => void;
  resetToDefault: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) => {
        set((state) => {
          const updatedSettings = {
            ...state.settings,
            ...newSettings
          };
          // Update CSS variables when settings change
          const root = document.documentElement;
          root.style.setProperty('--color-primary', updatedSettings.colors.primary);
          root.style.setProperty('--color-secondary', updatedSettings.colors.secondary);
          root.style.setProperty('--color-accent', updatedSettings.colors.accent);
          return { settings: updatedSettings };
        });
      },
      updateColors: (newColors) => {
        set((state) => {
          const updatedSettings = {
            ...state.settings,
            colors: newColors
          };
          // Update CSS variables when colors change
          const root = document.documentElement;
          root.style.setProperty('--color-primary', newColors.primary);
          root.style.setProperty('--color-secondary', newColors.secondary);
          root.style.setProperty('--color-accent', newColors.accent);
          return { settings: updatedSettings };
        });
      },
      resetToDefault: () => {
        set(() => {
          // Reset CSS variables to defaults
          const root = document.documentElement;
          root.style.setProperty('--color-primary', defaultSettings.colors.primary);
          root.style.setProperty('--color-secondary', defaultSettings.colors.secondary);
          root.style.setProperty('--color-accent', defaultSettings.colors.accent);
          return { settings: defaultSettings };
        });
      }
    }),
    {
      name: 'company-settings',
      version: 1,
      onRehydrateStorage: () => {
        // Update CSS variables when store is rehydrated
        return (state) => {
          if (state) {
            const root = document.documentElement;
            root.style.setProperty('--color-primary', state.settings.colors.primary);
            root.style.setProperty('--color-secondary', state.settings.colors.secondary);
            root.style.setProperty('--color-accent', state.settings.colors.accent);
          }
        };
      }
    }
  )
);