// app/@modal/(.)notes/[id]/page.tsx

import { fetchNoteById } from '@/lib/api';

import NotePreview from '@/components/NotePreview/NotePreview';
import NotePreviewModal from '@/app/@modal/NotePreviewModal';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return (
    <NotePreviewModal>
      <NotePreview note={note} />
    </NotePreviewModal>
  );
}
