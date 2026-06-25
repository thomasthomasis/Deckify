function getLocalDateStr(date: Date, timezone: string): string {
  return date.toLocaleDateString('en-CA', { timeZone: timezone });
}

export function calculateStreak(lastStudied: string | null, currentStreak: number, timezone = 'UTC') {
  if (!lastStudied) return 1;

  const todayStr = getLocalDateStr(new Date(), timezone);
  const lastStr = getLocalDateStr(new Date(lastStudied), timezone);

  const today = new Date(todayStr);
  const last = new Date(lastStr);
  const difference = Math.round((today.getTime() - last.getTime()) / 86400000);

  if (difference === 1) return currentStreak + 1;
  if (difference === 0) return currentStreak;
  return 1;
}
