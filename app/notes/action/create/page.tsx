
import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Creating Note`,
    description: 'Now you need to create a note',
    openGraph: {
      title: `Creating Note`,
    description: 'Now you need to create a note',
      url: `https://notehub.com/notes/action/create`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: 'article',
    },
  }
}

export default function CreateNote(){
    return (
        <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   <NoteForm/>
  </div>
</main>
    )
}