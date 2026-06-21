'use client';

interface FlashcardEditorProps {
  index: number;
  front: string;
  back: string;
  canRemove: boolean;
  onChange: (index: number, field: 'front' | 'back', value: string) => void;
  onRemove: (index: number) => void;
}

export default function FlashcardEditor({ index, front, back, canRemove, onChange, onRemove }: FlashcardEditorProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Card {index + 1}</h3>

        <button
          disabled={!canRemove}
          type="button"
          onClick={() => onRemove(index)}
          className="text-sm text-red-400 transition hover:text-red-300"
        >
          Remove
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-sm text-zinc-400">Front</label>

          <input
            value={front}
            onChange={(e) => onChange(index, 'front', e.target.value)}
            placeholder="Question or term..."
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Back</label>

          <textarea
            value={back}
            onChange={(e) => onChange(index, 'back', e.target.value)}
            placeholder="Answer or explanation..."
            rows={4}
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
