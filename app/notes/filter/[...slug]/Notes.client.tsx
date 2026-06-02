// app/notes/filter/[...slug]/Notes.client.tsx

'use client';

import NotesView from '@/components/NotesView/NotesView';

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  return <NotesView tag={tag} />;
}
