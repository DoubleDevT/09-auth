import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "NoteHub - Your Personal Notes Manager",
    description:
        "NoteHub is a simple and efficient application for managing personal notes.",
    openGraph: {
        title: "NoteHub - Your Personal Notes Manager",
        description:
            "NoteHub is a simple and efficient application for managing personal notes.",
        url: "https://your-notehub-app.vercel.app",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub Application",
            },
        ],
    },
};
export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en" className={roboto.variable}>
            <body>
                <TanStackProvider>
                    <Header />
                    <main>
                        {children}
                        {modal}
                    </main>
                    <Footer />
                </TanStackProvider>
            </body>
        </html>
    );
}
