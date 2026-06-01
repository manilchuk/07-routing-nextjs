// app/@modal/NotePreviewModal.tsx

'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

type Props = {
  children: React.ReactNode;
};

export default function NotePreviewModal({ children }: Props) {
  const router = useRouter();

  return <Modal onClose={() => router.back()}>{children}</Modal>;
}
