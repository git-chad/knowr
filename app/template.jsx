"use client"

import { animatePageIn } from "@/utils/animations"
import { useEffect } from "react"

export default function Template({ children }) {
    useEffect(() => {
        animatePageIn()
    }, [])

    return (
        <div>
            <div id="banner-1" className="min-h-screen bg-zinc-950 z-10 fixed top-0 left-0 w-1/3"></div>
            <div id="banner-2" className="min-h-screen bg-zinc-950 z-10 fixed top-0 left-1/3 w-1/3"></div>
            <div id="banner-3" className="min-h-screen bg-zinc-950 z-10 fixed top-0 left-2/3 w-1/3"></div>
            {children}
        </div>
    )
}