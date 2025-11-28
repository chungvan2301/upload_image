import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import cloudinary from "../../../lib/cloudinary";


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        const result = await cloudinary.uploader.upload(
            `data:${file.type};base64,${buffer.toString("base64")}`,
            { folder: "photos" }
        );

        const photo = await prisma.photo.create({
            data: { imageUrl: result.secure_url },
        });

        return NextResponse.json({ photo });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
