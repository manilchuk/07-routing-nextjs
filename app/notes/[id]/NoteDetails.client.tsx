// app/notes/[id]/NoteDetails.client.tsx

'use client';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';

import { fetchNoteById } from '../../../lib/api';

import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
  const params = useParams();
  const router = useRouter();

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
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.main}>
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
          </div>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
};

export default NoteDetailsClient;
