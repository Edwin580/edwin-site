type Theme = 'light' | 'dark';

const root = document.documentElement;
const systemDark = () => matchMedia('(prefers-color-scheme: dark)').matches;

export const currentTheme = (): Theme =>
  (root.dataset.theme as Theme | undefined) ?? (systemDark() ? 'dark' : 'light');

export function toggleTheme(): void {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  };
  // Cross-fade via the View Transitions API where supported.
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('startViewTransition' in document && !reduce) document.startViewTransition(apply);
  else apply();
}
