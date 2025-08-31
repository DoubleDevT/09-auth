"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { NoteTag } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NoteForm() {
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useNoteStore();
    const queryClient = useQueryClient();

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
        setDraft({ [name]: name === "tag" ? (value as NoteTag) : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(draft);
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
                    value={draft.tag}
                    onChange={handleChange}
                    className={css.select}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
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
