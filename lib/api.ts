import type { Note } from "../types/note";
import axios from "axios";

export interface FetchNotesResponse{
    notes: Note[],
    totalPages:number
}
interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage: number;
  tag?: string;
}
const NEXT_PUBLIC_NOTE_TOKEN=process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

const tags = ['all', 'Todo', 'Personal', 'Work', 'Meeting', 'Shopping'];

export const fetchNotes = async (
  tag: string,
  query?: string,
  page?: number,
): Promise<FetchNotesResponse> => {
  const baseUrl = 'https://notehub-public.goit.study/api/notes';

  if (!tags.includes(tag)) {
    throw new Error(`Invalid tag: ${tag}`);
  }

  const params: FetchNotesParams = {
    perPage: 12,
  };

  if (query) {
    params.search = query;
  }

  if (page) {
    params.page = page;
  }

  if (tag !== 'all') {
    params.tag = tag;
  }

  const response = await axios.get<FetchNotesResponse>(baseUrl, {
    headers: {
      Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
      accept: 'application/json',
    },
    params,
  });

  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
};
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}
export const createNote = async (newNote:CreateNotePayload):Promise<Note>=>{
    const {data} = await axios.post<Note>("https://notehub-public.goit.study/api/notes", 
        newNote,
         {headers:{
            Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
         }
        }
    )
    return data
}

export const deleteNote = async (id:string):Promise<Note> =>{
    const {data} = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, 
        {headers:{
            Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
         }
        }
    )
    return data
}



export const fetchNoteById = async (id: string): Promise<Note> => {
const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
    {headers:{
            Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
         }
        }
);
  return res.data;
};

export const fetchNotesByTag = async (
  tag?: string,
  page: number = 1,
  perPage: number = 20
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: { tag, page, perPage},
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
      },
    }
  );

  return response.data;
};