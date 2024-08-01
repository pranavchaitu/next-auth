"use client"

import { signIn, signOut } from "next-auth/react"

export const Appbar = () => {
    return <div className="bg-black text-white flex justify-between items-center">
    <div className="p-4">
        NextAuth Demo
    </div>
    <div>
        <div>
            <button onClick={() => signIn()} className="p-2 bg-emerald-500 text-black rounded-lg m-2">Signin</button>
            <button onClick={() => signOut()} className="p-2 bg-emerald-500 text-black rounded-lg m-2">Logout</button>
        </div>
        </div>
    </div>
}