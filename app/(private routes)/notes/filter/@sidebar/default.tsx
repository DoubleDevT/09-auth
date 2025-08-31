import Link from "next/link";
import css from "./SidebarNotes.module.css";

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

export default function SidebarNotes() {
    return (
        <aside className={css.sidebar}>
            <h3 className={css.title}>Filter by Tag</h3>
            <ul className={css.menuList}>
                {categories.map((tag) => (
                    <li key={tag} className={css.menuItem}>
                        <Link
                            href={`/notes/filter/${tag === "All" ? "All" : tag}`}
                            className={css.menuLink}
                            scroll={false}
                            replace
                        >
                            {tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
