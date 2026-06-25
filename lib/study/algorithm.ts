export type Rating = 'again' | 'hard' | 'good' | 'easy';

interface CardReview {
  interval?: number | null;
  repetitions?: number | null;
  ease_factor?: number | null;
}

export function calculateNextReview(rating: Rating, review: CardReview | null | undefined) {
  // Guard against NaN/null — comparison with NaN is always false, so ?? fallback triggers
  let interval = (review?.interval ?? 0) > 0 ? review!.interval! : 1;
  let repetitions = (review?.repetitions ?? -1) >= 0 ? review!.repetitions! : 0;
  let ease_factor = (review?.ease_factor ?? 0) >= 1.3 ? review!.ease_factor! : 2.5;

  if (rating === 'again') {
    repetitions = 0;
    interval = 1;
    ease_factor = Math.max(1.3, ease_factor - 0.2);
  } else if (rating === 'hard') {
    interval = Math.max(1, Math.round(interval * 1.2));
    ease_factor = Math.max(1.3, ease_factor - 0.15);
  } else if (rating === 'good') {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
  } else if (rating === 'easy') {
    repetitions += 1;
    interval = Math.round(interval * ease_factor * 1.3);
    ease_factor = Math.min(4.0, ease_factor + 0.15);
  }

  return {
    interval,
    repetitions,
    ease_factor,
    next_review: new Date(Date.now() + interval * 86400000),
    last_reviewed: new Date(),
  };
}
