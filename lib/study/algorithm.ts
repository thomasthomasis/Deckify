export type Rating = 'again' | 'hard' | 'good' | 'easy';

export function calculateNextReview(rating: Rating, review: any) {

  if(!review) {
    return {
      interval: 1,
      ease_factor: 2.5,
      next_review: new Date()
    };
  }

  let { interval, repetitions, ease_factor } = review;

  if (rating === 'again') {
    repetitions = 0;

    interval = 1;

    ease_factor = Math.max(1.3, ease_factor - 0.2);
  }

  if (rating === 'hard') {
    interval = Math.max(1, Math.round(interval * 1.2));

    ease_factor -= 0.15;
  }

  if (rating === 'good') {
    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
  }

  if (rating === 'easy') {
    repetitions += 1;

    interval = Math.round(interval * ease_factor * 1.3);

    ease_factor += 0.15;
  }

  return {
    interval,

    repetitions,

    ease_factor,

    next_review: new Date(Date.now() + interval * 86400000),

    last_reviewed: new Date(Date.now()),
  };
}
