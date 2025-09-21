"use client";

import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";
import css from "./NoteForm.module.css";
import { NoteTag } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    const queryClient = useQueryClient();

    const TAGS: readonly NoteTag[] = [
        "Todo",
        "Work",
        "Personal",
        "Meeting",
        "Shopping",
        "Ideas",
        "Travel",
        "Finance",
        "Health",
        "Important",
    ] as const;

    const isNoteTag = (val: unknown): val is NoteTag =>
        typeof val === "string" && (TAGS as readonly string[]).includes(val);

    const selectedTag: NoteTag = isNoteTag(draft.tag) ? draft.tag : TAGS[0];

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.back();
        },
        onError: (error) => {
            console.error("Failed to create note:", error);
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setDraft(
            name === "tag" && isNoteTag(value)
                ? { ...draft, tag: value }
                : { ...draft, [name]: value }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            title: (draft.title ?? "").trim(),
            content: (draft.content ?? "").trim(),
            tag: selectedTag,
        });
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title" className={css.label}>
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={draft.title}
                    onChange={handleChange}
                    className={css.input}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content" className={css.label}>
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={draft.content}
                    onChange={handleChange}
                    className={css.textarea}
                    required
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag" className={css.label}>
                    Tag
                </label>
                <select
                    id="tag"
                    name="tag"
                    value={selectedTag}
                    onChange={handleChange}
                    className={css.select}
                    required
                >
                    {TAGS.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            <div className={css.buttons}>
                <button
                    type="button"
                    onClick={handleCancel}
                    className={css.cancelButton}
                    disabled={mutation.isPending}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Creating..." : "Create Note"}
                </button>
            </div>
        </form>
    );
}
