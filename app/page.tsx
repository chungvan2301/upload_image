"use client";

import { useEffect, useState } from "react";
import { Upload, Button, Input, Card, List, message as antdMessage } from "antd";
import type { UploadFile } from "antd/es/upload/interface";

interface Comment {
	id: number;
	message: string;
}

interface Photo {
	id: number;
	imageUrl: string;
	comments: Comment[];
}

export default function Home() {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [commentMap, setCommentMap] = useState<{ [key: number]: string }>({});

	const fetchPhotos = async () => {
		const res = await fetch("/api/photos");
		const data = await res.json();
		setPhotos(data.photos);
	};

	useEffect(() => {
		fetchPhotos();
	}, []);

	const handleUpload = async () => {
		if (fileList.length === 0) return;
		const form = new FormData();
		form.append("file", fileList[0] as unknown as File);
		const res = await fetch("/api/upload", { method: "POST", body: form });
		const data = await res.json();
		if (data.photo) {
			antdMessage.success("Uploaded!");
			setFileList([]);
			fetchPhotos();
		}
	};

	const handleAddComment = async (photoId: number, message: string) => {
		if (!message) return;
		const res = await fetch("/api/comment", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ photoId, message }),
		});
		const data = await res.json();
		if (data.comment) {
			setCommentMap((prev) => ({ ...prev, [photoId]: "" }));
			fetchPhotos();
		}
	};

	return (
		<div style={{ maxWidth: 800, margin: "50px auto" }}>
			<Card title="Upload Photo">
				<Upload
					beforeUpload={(file) => {
						setFileList([file]);
						return false;
					}}
					fileList={fileList}
					onRemove={() => setFileList([])}
				>
					<Button>Select File</Button>
				</Upload>
				<Button
					type="primary"
					style={{ marginTop: 16 }}
					onClick={handleUpload}
					disabled={fileList.length === 0}
				>
					Upload
				</Button>
			</Card>

			<List
				style={{ marginTop: 32 }}
				itemLayout="vertical"
				dataSource={photos}
				renderItem={(photo) => (
					<Card key={photo.id} style={{ marginBottom: 16 }}>
						<img src={photo.imageUrl} alt="" style={{ maxWidth: "100%" }} />
						<List
							dataSource={photo.comments}
							renderItem={(c) => <List.Item>{c.message}</List.Item>}
						/>
						<Input.Search
							placeholder="Add comment"
							enterButton="Add"
							value={commentMap[photo.id] || ""}
							onChange={(e) =>
								setCommentMap((prev) => ({ ...prev, [photo.id]: e.target.value }))
							}
							onSearch={(value) => handleAddComment(photo.id, value)}
						/>
					</Card>
				)}
			/>
		</div>
	);
}
