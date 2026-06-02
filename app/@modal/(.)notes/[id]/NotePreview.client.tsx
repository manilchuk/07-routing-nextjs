// app/@modal/(.)notes/[id]/NotePreview.client.tsx

'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';

import css from './NotePreview.module.css';

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

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
