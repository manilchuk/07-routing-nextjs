// components/NotePreview/NotePreview.tsx

'use client';

import { useRouter } from 'next/navigation';

import css from './NotePreview.module.css';
import { Note } from '@/types/note';

type Props = {
  note: Note;
};

export default function NotePreview({ note }: Props) {
  const router = useRouter();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button
          type="button"
          className={css.backBtn}
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <div className={css.header}>
          <h2>{note.title}</h2>

          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
