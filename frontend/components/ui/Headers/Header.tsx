'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header(){
    const pathname = usePathname();
    return(
        <header className="w-full h-22 border-b-2 border-white flex 
        items-center justify-between bg-background--dark">
            <div className="w-1/2 h-full p-4 flex items-center justify-start gap-3">
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <h1 className="text-2xl font-bold text-text-primary tracking-wider italic">
                    Bookmark Manager
                </h1>
            </div>
            <div className="w-1/2 h-full p-4 flex items-center justify-end gap-5">
                <Link href='/help' className="rounded-2xl w-1/6 h-4/5 flex 
                items-center justify-center hover:scale-95 hover:bg-black hover:text-blue-400
                transition-transform duration-300 text-text-secondary text-lg">
                    Ayuda
                </Link>
                <Link href='/register' className="border-2 rounded-2xl w-1/6 h-4/5 flex 
                items-center justify-center bg-surface--dark hover:border-black hover:bg-black 
                hover:scale-95 transition-transform duration-300 text-blue-400 text-lg">
                    Registrarse
                </Link>
            </div>
        </header>
    )
}