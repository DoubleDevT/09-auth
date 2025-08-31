import { create } from "zustand";
import { NoteTag } from "@/types/note";

export interface NewNoteData {
    title: string;
    content: string;
    tag: NoteTag;
}

interface NoteDraftStore {
    draft: NewNoteData;
    setDraft: (updater: (prev: NewNoteData) => NewNoteData) => void;
    clearDraft: () => void;
}

const initialDraft: NewNoteData = {
    title: "",
    content: "",
    tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>((set) => ({
    draft: initialDraft,
    setDraft: (updater) =>
        set((state) => ({
            draft: updater(state.draft),
        })),
    clearDraft: () => set({ draft: initialDraft }),
}));
