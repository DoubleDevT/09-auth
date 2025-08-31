"use client";

import Link from "next/link";
import { useState } from "react";
import css from "./TagsMenu.module.css";

const categories = [
    "All",
    "Todo",
    "Work",
    "Personal",
    "Shopping",
    "Meeting",
    "Ideas",
    "Travel",
    "Finance",
    "Health",
    "Important",
];

export function TagsMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={css.menuContainer}>
            <button
                className={css.menuButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                Notes ▾
            </button>
            {isOpen && (
                <ul className={css.menuList}>
                    {categories.map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                onClick={() => setIsOpen(!isOpen)}
                                href={`/notes/filter/${tag === "All" ? "All" : tag}`}
                                className={css.menuLink}
                            >
                                {tag}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
