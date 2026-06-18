/**
 * Theme management composable.
 *
 * Supports three preferences — 'system', 'light', 'dark' — persisted to
 * localStorage. The preference is resolved to a concrete theme and written to
 * the `data-theme` attribute on <html>, which the CSS keys off. When the
 * preference is 'system', changes to the OS colour scheme are tracked live.
 */
import { onMounted, onUnmounted, ref } from 'vue';

export type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'interactive-file-tree:theme';

const prefersDark = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const resolveTheme = (preference: ThemePreference): ResolvedTheme => {
  if (preference === 'system') {
    return prefersDark() ? 'dark' : 'light';
  }
  return preference;
};

const applyTheme = (preference: ThemePreference): void => {
  document.documentElement.setAttribute('data-theme', resolveTheme(preference));
};

const readStoredPreference = (): ThemePreference => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
};

export function useTheme() {
  const preference = ref<ThemePreference>(readStoredPreference());

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // Re-apply when the OS scheme changes, but only while following the system.
  const handleSystemChange = () => {
    if (preference.value === 'system') {
      applyTheme('system');
    }
  };

  const setPreference = (next: ThemePreference): void => {
    preference.value = next;
    localStorage.setItem(THEME_STORAGE_KEY, next);
    applyTheme(next);
  };

  // Cycle through the three preferences for a single-button toggle.
  const cycleTheme = (): void => {
    const order: ThemePreference[] = ['system', 'light', 'dark'];
    const nextIndex = (order.indexOf(preference.value) + 1) % order.length;
    setPreference(order[nextIndex]);
  };

  onMounted(() => {
    applyTheme(preference.value);
    mediaQuery.addEventListener('change', handleSystemChange);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleSystemChange);
  });

  return { preference, setPreference, cycleTheme };
}
