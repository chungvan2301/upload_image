# Upload Image App

This is a [Next.js](https://nextjs.org) project that allows users to **upload photos** and **add comments**. It uses:

- **Frontend:** Next.js, TypeScript, [Ant Design](https://ant.design/)
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Neon)

## Features

- Upload a photo
- Add a comment to a photo
- Display all uploaded photos and their comments

> Note: Images don't need to be persistent for this demo. Uploaded images are stored temporarily on the server or Cloudinary.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/chungvan2301/upload_image.git
cd upload_image
```

2. Install dependencies:

```bash
npm install
```


3. Create a .env file in the root directory with your database and Cloudinary credentials:

```bash
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

4. Generate Prisma Client:

```bash
npx prisma generate
```

5. Run the development server:

```bash
npm run dev
```

6. Open http://localhost:3000 to see the app.

7. Project Structure

. app/ – Next.js App Router pages and API routes

. lib/ – Utility libraries (e.g., Prisma client, Cloudinary config)

. public/uploads/ – Temporary storage for uploaded images

. prisma/ – Prisma schema

8. Deployment

You can deploy the app on Render or Vercel
. Make sure the environment variables are set properly.

9. Usage

. Select a file using the Upload button

. Click Upload

. Add comments for each uploaded photo

. View all photos and their comments below the upload form

10. Links

. Source Code: GitHub Repository

. Executable / Demo: Live App on Render
