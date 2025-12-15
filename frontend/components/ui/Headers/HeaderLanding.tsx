'use client'
import { ListNav } from "@/utils/ListNav";
import { usePathname } from "next/navigation";
import Logo from "../../icons/Logo";
import Link from "next/link";
export default function HeaderLanding(){
    const pathname = usePathname();
    return(
        <header className="w-full h-22 flex items-center justify-between bg-background--dark border-blue-400 border-b-2">
            <div className="w-1/4 h-full flex items-center justify-evenly px-5">
                <Logo />
                <h1 className="text-2xl tracking-widest font-bold italic text-white">Bookmark Manager</h1>
            </div>
            <div className="w-3/4 h-full flex items-center justify-center">
                <nav className="w-3/4 h-full">
                    <ul className="list-none flex items-center justify-evenly w-full h-full">
                        {ListNav.map((item, index) => (
                            <li key={index} className="text-lg tracking-wide text-text-primary 
                            hover:text-blue-400 hover:scale-105 transition-all duration-300 cursor-pointer">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="w-3/10 h-full flex items-center justify-evenly gap-3 px-2.5">
                    <Link href='/register' className="w-1/2 h-3/4 flex items-center justify-center
                    bg-surface--dark border-2 rounded-2xl text-blue-400 hover:bg-black hover:border-black
                    hover:scale-95 transition-transform duration-300">
                        Registrarse
                    </Link>
                    <Link href='/login' className="w-1/2 h-3/4 flex items-center justify-center
                    hover:bg-black hover:text-blue-400 hover:scale-95 transition-transform duration-300
                    rounded-2xl text-text-secondary">
                        Iniciar sesión
                    </Link>
                </div>
            </div>
        </header>
    )
}