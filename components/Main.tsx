"use client"

import { useSession } from "next-auth/react"

export const Main = () => {
    const session = useSession()
    return <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-50 rounded p-4">
            {JSON.stringify(session.data?.user)}
        </div>
  </div>
}