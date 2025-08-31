"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import styles from "./Notes.module.css";
import Link from "next/link";

interface NotesClientProps {
    tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const handleSearch = useDebouncedCallback((search: string) => {
        setDebouncedSearch(search);
    }, 300);

    const handleSearchChange = (search: string) => {
        setSearch(search);
        setPage(1);
        handleSearch(search);
    };

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["notes", page, debouncedSearch, tag],
        queryFn: () =>
            fetchNotes({
                page,
                perPage: 12,
                search: debouncedSearch,
                tag,
            }),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={styles.app}>
            <header className={styles.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange} />
                {data && data.total_pages > 1 && (
                    <Pagination
                        currentPage={page}
                        totalPages={data.total_pages}
                        onPageChange={setPage}
                    />
                )}
                <Link href="/notes/action/create" className={styles.button}>
                    Create +
                </Link>
            </header>
            {isLoading && !data && <Loader />}
            {isError && <ErrorMessage />}
            {isSuccess && data?.data?.length > 0 ? (
                <NoteList notes={data.data} />
            ) : (
                !isLoading && <p>No notes found</p>
            )}
        </div>
    );
}
