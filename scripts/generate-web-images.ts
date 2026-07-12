import { mkdir, readdir, stat } from 'node:fs/promises'
import { basename, dirname, extname, join, relative } from 'node:path'
import sharp from 'sharp'

interface ImageSource {
  sourcePath: string
  relativePath: string
}

interface Variant {
  suffix: string
  width: number
  quality: number
}

const ROOT_DIR = join(import.meta.dirname, '..')
const DEFAULT_INPUT_DIR = join(ROOT_DIR, 'src', 'assets')
const DEFAULT_OUTPUT_DIR = join(ROOT_DIR, 'src', 'assets-web')
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i
const VARIANTS: Variant[] = [
  { suffix: 'preview', width: 1200, quality: 78 },
  { suffix: 'full', width: 2400, quality: 84 },
]

function argValue(name: string): string | undefined {
  const prefix = `--${name}=`
  return process.argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)
}

function hasArg(name: string): boolean {
  return process.argv.includes(`--${name}`)
}

function outputPathFor(image: ImageSource, variant: Variant, outputDir: string): string {
  const sourceExt = extname(image.relativePath)
  const sourceBase = basename(image.relativePath, sourceExt)
  const sourceDir = dirname(image.relativePath)
  const outputName = `${sourceBase}-${variant.suffix}.webp`

  return join(outputDir, sourceDir === '.' ? '' : sourceDir, outputName)
}

async function getImages(dir: string, baseDir = dir): Promise<ImageSource[]> {
  const result: ImageSource[] = []
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const fullPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      result.push(...(await getImages(fullPath, baseDir)))
      continue
    }

    if (!IMAGE_EXT.test(entry.name)) continue

    result.push({
      sourcePath: fullPath,
      relativePath: relative(baseDir, fullPath),
    })
  }

  return result
}

async function isFresh(sourcePath: string, outputPath: string): Promise<boolean> {
  try {
    const [sourceStats, outputStats] = await Promise.all([stat(sourcePath), stat(outputPath)])

    return outputStats.mtimeMs >= sourceStats.mtimeMs
  } catch {
    return false
  }
}

async function generateVariant(
  image: ImageSource,
  variant: Variant,
  outputDir: string,
  force: boolean,
): Promise<'generated' | 'skipped'> {
  const outputPath = outputPathFor(image, variant, outputDir)

  if (!force && (await isFresh(image.sourcePath, outputPath))) {
    return 'skipped'
  }

  await mkdir(dirname(outputPath), { recursive: true })
  await sharp(image.sourcePath)
    .rotate()
    .resize({
      width: variant.width,
      withoutEnlargement: true,
    })
    .webp({
      quality: variant.quality,
      effort: 5,
    })
    .toFile(outputPath)

  return 'generated'
}

async function main(): Promise<void> {
  const inputDir = argValue('input') ?? DEFAULT_INPUT_DIR
  const outputDir = argValue('output') ?? DEFAULT_OUTPUT_DIR
  const force = hasArg('force')
  const images = await getImages(inputDir)
  let generated = 0
  let skipped = 0

  for (const image of images) {
    for (const variant of VARIANTS) {
      const result = await generateVariant(image, variant, outputDir, force)

      if (result === 'generated') {
        generated += 1
      } else {
        skipped += 1
      }
    }
  }

  console.log(`Processed ${images.length} images`)
  console.log(`Generated ${generated} files`)
  console.log(`Skipped ${skipped} fresh files`)
  console.log(`Output: ${outputDir}`)
}

await main()
