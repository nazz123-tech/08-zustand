import { create } from 'zustand';
import { CreateNotePayload } from './api';

type NoteDraftStore = {
  draft: CreateNotePayload;
  setDraft: (note: CreateNotePayload) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNotePayload = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));