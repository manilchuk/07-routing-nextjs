'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/types/note';

type Props = {
  note: Note;
};

export default function NotePreview({ note }: Props) {
  const router = useRouter();

  return (
    <>
      <button onClick={() => router.back()}>Back</button>

      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </>
  );
}
