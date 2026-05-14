import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary configuration is missing.");
    return Response.json({ error: "Missing Cloudinary configuration." }, { status: 500 });
  }

  try {

    const { resources } = await cloudinary.search
      .expression('folder:gallery/*')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .execute();

    const formattedImages = resources.map(res => {

      // split folder name to get the year part
      const folderParts = res.asset_folder.split('/');
      const year = folderParts[folderParts.length - 1];

      return {
        id: res.asset_id,
        url: res.secure_url,
        year: year
      };
    });

    return Response.json(formattedImages);
  } catch (error) {
    console.log("Error fetching galery images: ", error)
    return Response.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}