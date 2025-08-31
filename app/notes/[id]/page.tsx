import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

interface NoteDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({
    params,
}: NoteDetailsPageProps) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}

export async function generateMetadata({
    params,
}: NoteDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return {
        title: `${note.title} | NoteHub`,
        description: note.content.substring(0, 160) + "...",
        openGraph: {
            title: `${note.title} | NoteHub`,
            description: note.content.substring(0, 160) + "...",
            url: `https://otehub-app.vercel.app/notes/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: `NoteHub - ${note.title}`,
                },
            ],
        },
    };
}
