import { fetchNotes } from '@/lib/api';
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = slug[0]
  return {
    title: `Category: ${category}`,
    description: `Here is all notes realated to ${category}`,
    openGraph: {
      title: `Note: ${category}`,
      description: `Here is all notes realated to ${category}`,
      url: `https://notehub.com/notes/`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: category,
        },
      ],
      type: 'article',
    },
  }
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0]
 const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', category],
    queryFn: () => fetchNotes(category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
