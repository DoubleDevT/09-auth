import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteTag } from "@/types/note";

// export interface NewNoteData {
//     title: string;
//     content: string;
//     tag: NoteTag;
// }

interface NoteDraftStore {
    // draft: NewNoteData;
    // setDraft: (updater: (prev: NewNoteData) => NewNoteData) => void;
    // clearDraft: () => void;
    draft: Draft;
    setDraft: (note: Partial<Draft>) => void;
    clearDraft: () => void;
}

const initialDraft = {
    title: "",
    content: "",
    tag: "Todo",
};

type Draft = typeof initialDraft;

// export const useNoteDraftStore = create<NoteDraftStore>((set) => ({
//     draft: initialDraft,
//     setDraft: (updater) =>
//         set((state) => ({
//             draft: updater(state.draft),
//         })),
//     clearDraft: () => set({ draft: initialDraft }),
// }));

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) =>
                set((state) => ({ draft: { ...state.draft, ...note } })),
            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: "note-draft",
        }
    )
);
