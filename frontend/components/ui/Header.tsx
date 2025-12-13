'use client'
import { ListNav } from "@/utils/ListNav"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Header() {
    const pathname = usePathname();
    return (
        <header className="w-full h-12 px-3 flex items-center justify-between border-b-2 
        border-white">
            <div className="w-1/5 h-full flex items-center">
                <h1>BookMark Manager</h1>
            </div>
            <div className="w-4/5 h-full">
                <nav className="w-full h-full flex">
                    <ul className="w-full h-full flex justify-evenly items-center">
                        {ListNav.map((item) => (
                            <Link href={item.path} key={item.name} className="inline-block mx-2">
                            {item.name}
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}