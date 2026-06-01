// components/NotesView/NotesView.tsx

'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';

import Loading from '@/app/loading';
import Error from '@/app/notes/error';

import { fetchNotes } from '@/lib/api';

import css from '@/app/notes/Notes.module.css';

type Props = {
  tag: string;
};

const PER_PAGE = 12;

export default function NotesView({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiTag = tag === 'all' ? undefined : tag;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, search, apiTag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
        tag: apiTag,
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
