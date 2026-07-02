import { readdirSync, writeFileSync, existsSync, unlinkSync, readFileSync } from 'node:fs'
import { join, relative, extname, dirname } from 'node:path'
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = join(__dirname, '..')
const ASSETS_DIR = join(ROOT, 'src', 'assets')
const PORTFOLIO_FILE = join(ROOT, 'src', 'data', 'portfolio.ts')
const OLD_DIMS_FILE = join(ROOT, 'src', 'data', 'imageDimensions.ts')
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])

function walkImages(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkImages(fullPath))
    else if (entry.isFile() && IMAGE_EXTS.has(extname(entry.name).toLowerCase())) files.push(fullPath)
  }
  return files
}

async function main() {
  if (existsSync(OLD_DIMS_FILE)) {
    unlinkSync(OLD_DIMS_FILE)
    console.log(`Removed ${relative(ROOT, OLD_DIMS_FILE)}`)
  }

  // ── 1. Read all images and get dimensions ──
  const imagePaths = walkImages(ASSETS_DIR)
  const dimsMap: Record<string, { width: number; height: number }> = {}
  const freelance3dFiles: string[] = []
  const wallpaperFiles: Record<string, string[]> = {}

  for (const fullPath of imagePaths) {
    const relPath = relative(ASSETS_DIR, fullPath)
    const metadata = await sharp(fullPath).metadata()
    if (metadata.width && metadata.height) {
      dimsMap[relPath] = { width: metadata.width, height: metadata.height }
    }

    const parts = relPath.split('/')
    if (relPath.startsWith('freelance3d/')) {
      freelance3dFiles.push(relPath)
    } else if (parts.length >= 3 && parts[0] === 'wallpaper') {
      const folder = parts[1]
      if (!wallpaperFiles[folder]) wallpaperFiles[folder] = []
      wallpaperFiles[folder].push(relPath)
    }
  }

  freelance3dFiles.sort()
  for (const key of Object.keys(wallpaperFiles)) {
    wallpaperFiles[key].sort()
  }

  console.log(`Found ${Object.keys(dimsMap).length} images with dimensions`)

  // ── 2. Resolve expression → dimensions ──
  function resolve(expr: string): { width: number; height: number } | null {
    const freelance = expr.match(/freelance3dImages\[(\d+)\]/)
    if (freelance) {
      const file = freelance3dFiles[Number(freelance[1])]
      return file ? dimsMap[file] ?? null : null
    }
    const folder = expr.match(/folderImages\['([^']+)'\]\?\.\[(\d+)\]/)
    if (folder) {
      const files = wallpaperFiles[folder[1]]
      const file = files ? files[Number(folder[2])] : null
      return file ? dimsMap[file] ?? null : null
    }
    return null
  }

  // ── 3. Read and modify portfolio.ts ──
  let content = readFileSync(PORTFOLIO_FILE, 'utf-8')

  // Remove any previously injected imageDimensions block (idempotent)
  content = content.replace(
    /\n\nexport const imageDimensions: Record<string, \{ width: number; height: number \}> = \{\n[\s\S]*?\n\}/,
    '',
  )

  // Remove previously added width/height lines (idempotent)
  content = content.replace(/^(\s+)width: \d+,\n\1height: \d+,\n/gm, '')
  content = content.replace(/\n\s+width\?: number\n\s+height\?: number/, '')

  // Add width/height to Project interface
  content = content.replace(
    /(interface Project \{[^}]*?image: string\n)/,
    '$1  width?: number\n  height?: number\n',
  )

  // Match each image: EXPR, line and add width/height after it
  content = content.replace(
    /^(\s+)(image:\s*)([^,\n]+)(,\s*)$/gm,
    (_match: string, indent: string, label: string, expr: string, comma: string) => {
      const dims = resolve(expr.trim())
      if (dims) {
        console.log(`  ${expr.trim().slice(0, 50)} → ${dims.width}x${dims.height}`)
        return `${indent}${label}${expr}${comma}\n${indent}width: ${dims.width},\n${indent}height: ${dims.height},`
      }
      return _match
    },
  )

  // ── 4. Append imageDimensions record at the end ──
  const dimsLines = Object.entries(dimsMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, d]) => `  "/src/assets/${path}": { width: ${d.width}, height: ${d.height} }`)
    .join(',\n')

  const dimsBlock = `

export const imageDimensions: Record<string, { width: number; height: number }> = {
${dimsLines},
}
`

  // Append to the end of file (trim trailing whitespace first)
  content = content.replace(/\s*$/, '') + dimsBlock + '\n'

  writeFileSync(PORTFOLIO_FILE, content, 'utf-8')
  console.log(`\n✅ Updated ${relative(ROOT, PORTFOLIO_FILE)}`)
}

main()
