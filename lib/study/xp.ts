export function calculateXP(rating: string) {
  switch (rating) {
    case 'again':
      return 2;

    case 'hard':
      return 5;

    case 'good':
      return 10;

    case 'easy':
      return 15;

    default:
      return 0;
  }
}
