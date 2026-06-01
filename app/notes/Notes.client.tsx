// app/notes/Notes.client.tsx

// 'use client';

// import { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useDebouncedCallback } from 'use-debounce';

// import Modal from '../../components/Modal/Modal';
// import NoteForm from '../../components/NoteForm/NoteForm';
// import NoteList from '../../components/NoteList/NoteList';
// import Pagination from '../../components/Pagination/Pagination';
// import SearchBox from '../../components/SearchBox/SearchBox';
// import Loading from '../loading';
// import Error from './error';

// import { fetchNotes } from '../../lib/api';
// import css from './Notes.module.css';

// const PER_PAGE = 12;

// export default function NotesClient() {
//   const searchParams = useSearchParams();

//   // 📌 PAGE (можна лишити state — або теж винести в URL пізніше)
//   const [page, setPage] = useState(1);

//   const [search, setSearch] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // 📌 TAG ТЕПЕР З URL (ВАЖЛИВО)
//   const rawTag = searchParams.get('tag') ?? 'all';
//   const tag = rawTag === 'all' ? undefined : rawTag;

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['notes', page, search, tag],
//     queryFn: () =>
//       fetchNotes({
//         page,
//         perPage: PER_PAGE,
//         search,
//         tag,
//       }),
//     placeholderData: keepPreviousData,
//   });

//   console.log('DATA:', data);

//   const changeSearch = useDebouncedCallback((value: string) => {
//     setSearch(value);
//     setPage(1);
//   }, 500);

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={search} onChange={changeSearch} />

//         {/* 📌 ПАГІНАЦІЯ */}
//         {data && data.totalPages > 1 && (
//           <Pagination
//             pageCount={data.totalPages}
//             currentPage={page}
//             onPageChange={setPage}
//           />
//         )}

//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {isLoading && <Loading />}

//       {isError && error && (
//         <Error error={error as Error} reset={() => window.location.reload()} />
//       )}

//       {data && <NoteList notes={data.notes} />}

//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <NoteForm onCancel={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import SearchBox from '../../components/SearchBox/SearchBox';
import Loading from '../loading';
import Error from './error';

import { fetchNotes } from '../../lib/api';
import css from './Notes.module.css';
import { NoteTag } from '@/types/note';

const PER_PAGE = 12;

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tag, setTag] = useState<'all' | NoteTag>('all');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag: tag === 'all' ? undefined : tag,
      }),
    placeholderData: keepPreviousData,
  });

  const changeSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      {/* HEADER / TOOLBAR */}
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={changeSearch} />

        <Pagination
          pageCount={data?.totalPages ?? 1}
          currentPage={page}
          onPageChange={setPage}
        />

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {/* CONTENT */}
      {isLoading && <Loading />}

      {isError && error && (
        <Error error={error as Error} reset={() => window.location.reload()} />
      )}

      {data && <NoteList notes={data.notes} />}

      {/* MODAL */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
