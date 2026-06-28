import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const logoPath = join(publicDir, "fav_white.png");

async function generateIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const logoSize = Math.round(size * 0.55);
    const offset = Math.round((size - logoSize) / 2);

    const logo = await sharp(logoPath)
      .resize(logoSize, logoSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const icon = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 20, g: 122, b: 107, alpha: 1 },
      },
    })
      .composite([{ input: logo, top: offset, left: offset }])
      .png()
      .toBuffer();

    const filename = `pwa-icon-${size}.png`;
    writeFileSync(join(publicDir, filename), icon);
    console.log(`Generated ${filename}`);
  }
}

generateIcons().catch(console.error);
