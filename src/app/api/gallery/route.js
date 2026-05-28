import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { imageSize } from 'image-size';

export const dynamic = 'force-dynamic';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

export async function GET() {
  try {
    let yearEntries;
    try {
      yearEntries = await readdir(GALLERY_DIR, { withFileTypes: true });
    } catch (err) {
      if (err.code === 'ENOENT') return Response.json([]);
      throw err;
    }

    const images = [];
    for (const yearEntry of yearEntries) {
      if (!yearEntry.isDirectory()) continue;
      const year = yearEntry.name;
      const yearPath = path.join(GALLERY_DIR, year);
      const files = await readdir(yearPath);

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!IMAGE_EXTENSIONS.has(ext)) continue;

        const filePath = path.join(yearPath, file);
        let width;
        let height;
        try {
          const buf = await readFile(filePath);
          ({ width, height } = imageSize(buf));
        } catch (err) {
          console.warn(`Could not read dimensions for ${filePath}:`, err.message);
        }

        images.push({
          id: `${year}/${file}`,
          url: `/gallery/${encodeURIComponent(year)}/${encodeURIComponent(file)}`,
          year,
          width,
          height,
          caption: '',
          source: 'committed',
        });
      }
    }

    return Response.json(images);
  } catch (error) {
    console.error("Error fetching gallery images: ", error);
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}