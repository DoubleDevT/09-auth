import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";
import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface NotesPageProps {
    params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
    const { slug } = await params;
    const tag = slug?.[0] === "All" ? undefined : slug?.[0];
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", tag],
        queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}

interface NotesPageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
    params,
}: NotesPageProps): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug?.[0] === "All" ? undefined : slug?.[0];
    const filterName = tag || "All notes";

    return {
        title: `${filterName} | NoteHub`,
        description: `Browse ${filterName.toLowerCase()} in your NoteHub application.`,
        openGraph: {
            title: `${filterName} | NoteHub`,
            description: `Browse ${filterName.toLowerCase()} in your NoteHub application.`,
            url: `https://your-notehub-app.vercel.app/notes/filter/${tag || "all"}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: `NoteHub - ${filterName}`,
                },
            ],
        },
    };
}
