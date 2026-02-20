"use client";
import css from './NoteDetails.module.css';
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { notFound } from "next/navigation";
type Props = {
  noteId: string;
};

const NoteDetailsClient = ({ noteId }: Props) => {
  const { data: note,isError,isLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });
  if (!note){
    notFound()
  }

    if (isLoading) {
    return <p>Loading, please wait...</p>
  }
  if (isError) {
    return <p>Something went wrong.</p>
  }
  return (
    
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.tag}>{note?.tag}</p>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;