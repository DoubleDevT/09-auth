"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import css from "./NoteDetails.client.module.css";
import { useRouter } from "next/navigation";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const handleCllickBack = () => {
        router.back();
    };
    const {
        data: note,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) {
        return (
            <div className={css.loadingContainer}>
                <p>Loading, please wait...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={css.errorContainer}>
                <p>Failed to load note details</p>
            </div>
        );
    }

    if (!note) {
        return (
            <div className={css.errorContainer}>
                <p>Note not found</p>
            </div>
        );
    }

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <button onClick={handleCllickBack}>back</button>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <div className={css.footer}>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.date}>Created: {note.createdAt}</p>
                </div>
            </div>
        </div>
    );
}
