import css from './page.module.css'
import { Metadata } from 'next'


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Page not found`,
    description: 'Page you were looking for is not exist',
    openGraph: {
      title: `Page not found`,
    description: 'Page you were looking for is not exist',
      url: `https://notehub.com/notes/${id}`,
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

export default function NotFound(){
    return (
     <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>)
}