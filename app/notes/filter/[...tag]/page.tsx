// app/notes/filter/[...tag]/page.tsx

import NotesView from '@/components/NotesView/NotesView';

type Props = {
  params: Promise<{
    tag: string[];
  }>;
};

export default async function FilterNotesPage({ params }: Props) {
  const { tag } = await params;

  const currentTag = tag?.[0] ?? 'all';

  return <NotesView tag={currentTag} />;
}
