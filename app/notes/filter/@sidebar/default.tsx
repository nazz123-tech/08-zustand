import css from './SidebarNotes.module.css'
import Link from 'next/link'
export default function SidebarNotes(){
    const categories = ['Todo','Personal','Work','Meeting','Shopping']
    return (
  <ul className={css.menuList}>
    <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
    {categories.map((category)=>(
        <li className={css.menuItem} key={category}>
          <Link className={css.menuLink} href={`/notes/filter/${category}`}>{category}</Link>
        </li>))}
    </ul>
    )
}