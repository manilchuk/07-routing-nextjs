// app/notes/filter/[...slug]/Notes.client.tsx

'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import Loading from '@/app/loading';
import Error from './error';

import { fetchNotes } from '@/lib/api';

import css from '@/app/notes/Notes.module.css';

const PER_PAGE = 12;

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const normalizedTag = tag === 'all' ? undefined : tag;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, search, normalizedTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag: normalizedTag,
      }),
    placeholderData: keepPreviousData,
  });

  const changeSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
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

      {isLoading && <Loading />}

      {isError && error && (
        <Error error={error as Error} reset={() => window.location.reload()} />
      )}

      {data && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
