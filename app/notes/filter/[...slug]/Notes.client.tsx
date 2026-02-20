'use client'

import css from './NotesPage.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import { useRouter } from 'next/navigation';


type NotesClientProps = {
  category: string;
};

const NotesClient = ({ category }: NotesClientProps) => {
  const router= useRouter()
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage, category],
    queryFn: () => fetchNotes(category, debouncedQuery, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const changeQuery = (query: string) => {
    setQuery(query);
    setCurrentPage(1);
  };

  return (
    <main>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={query} onChange={changeQuery} />

          {totalPages > 0 && (
            <Pagination
              pageCount={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button onClick={()=>router.push('/notes/action/create')} className={css.button}>Create note +</button>
        </header>
        {notes.length > 0 && <NoteList notes={notes} />}

      </div>
    </main>
  );
};

export default NotesClient;