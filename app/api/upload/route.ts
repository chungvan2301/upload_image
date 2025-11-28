import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "../../../lib/prisma";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`;

    const photo = await prisma.photo.create({ data: { imageUrl } });

    return NextResponse.json({ photo });
}
