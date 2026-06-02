// app/notes/filter/[...slug]/page.tsx

import NotesClient from './Notes.client';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function FilterNotesPage({ params }: Props) {
  const { slug } = await params;

  const currentTag = slug?.[0] ?? 'all';

  return <NotesClient tag={currentTag} />;
}
