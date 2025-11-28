import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
    const { photoId, message } = await req.json();

    const comment = await prisma.comment.create({
        data: { photoId, message }
    });

    return NextResponse.json({ comment });
}
