import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { NEXT_AUTH } from "../lib/auth"

export const GET = async () => {
    const session = await getServerSession(NEXT_AUTH)
    return NextResponse.json({
        user : session!.user
    })
}