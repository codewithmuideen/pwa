import sharp from "sharp";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Citizens Bank snowflake/asterisk logo as SVG paths (white on green)
const createIconSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.18)}" fill="#147A6B"/>
  <g transform="translate(${size / 2}, ${size / 2})">
    ${(() => {
      const r = size * 0.28;
      const lines = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        lines.push(
          `<line x1="0" y1="0" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}" stroke="white" stroke-width="${Math.round(size * 0.055)}" stroke-linecap="round"/>`
        );
        // Cross bars on each spoke
        const cx = Math.cos(angle) * r * 0.62;
        const cy = Math.sin(angle) * r * 0.62;
        const perpAngle1 = angle + Math.PI / 3;
        const perpAngle2 = angle - Math.PI / 3;
        const barLen = r * 0.28;
        lines.push(
          `<line x1="${(cx - Math.cos(perpAngle1) * barLen).toFixed(2)}" y1="${(cy - Math.sin(perpAngle1) * barLen).toFixed(2)}" x2="${cx.toFixed(2)}" y2="${cy.toFixed(2)}" stroke="white" stroke-width="${Math.round(size * 0.04)}" stroke-linecap="round"/>`,
          `<line x1="${(cx - Math.cos(perpAngle2) * barLen).toFixed(2)}" y1="${(cy - Math.sin(perpAngle2) * barLen).toFixed(2)}" x2="${cx.toFixed(2)}" y2="${cy.toFixed(2)}" stroke="white" stroke-width="${Math.round(size * 0.04)}" stroke-linecap="round"/>`
        );
      }
      return lines.join("\n    ");
    })()}
  </g>
</svg>`;

async function generateIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const svg = createIconSvg(size);
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    const filename = `pwa-icon-${size}.png`;
    writeFileSync(join(publicDir, filename), pngBuffer);
    console.log(`Generated ${filename}`);
  }

  // Also generate a splash icon (no rounded corners, just logo centered)
  const splashSvg = createIconSvg(512);
  const splashBuffer = await sharp(Buffer.from(splashSvg)).png().toBuffer();
  writeFileSync(join(publicDir, "pwa-icon-splash.png"), splashBuffer);
  console.log("Generated pwa-icon-splash.png");
}

generateIcons().catch(console.error);
