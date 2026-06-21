export function calculateStreak(lastStudied: string | null, currentStreak: number) {
  if (!lastStudied) {
    return 1;
  }

  const today = new Date();

  const last = new Date(lastStudied);

  const difference = Math.floor((today.getTime() - last.getTime()) / 86400000);

  if (difference === 1) {
    return currentStreak + 1;
  }

  if (difference === 0) {
    return currentStreak;
  }

  return 1;
}
