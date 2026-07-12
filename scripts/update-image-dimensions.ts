import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

interface ImageEntry {
  path: string
  width: number
  height: number
  fullPath: string
  fullWidth: number
  fullHeight: number
}

const ASSETS_DIR = join(import.meta.dirname, '..', 'src', 'assets')
const OUTPUT = join(import.meta.dirname, '..', 'src', 'data', 'generatedImages.ts')
const PREVIEW_EXT = /-preview\.webp$/i

async function getImages(dir: string, prefix = ''): Promise<ImageEntry[]> {
  const result: ImageEntry[] = []

  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const full = join(dir, entry.name)

    if (entry.isDirectory()) {
      result.push(...(await getImages(full, `${prefix}${entry.name}/`)))
    } else if (PREVIEW_EXT.test(entry.name)) {
      const fullName = entry.name.replace(PREVIEW_EXT, '-full.webp')
      const fullPath = join(dir, fullName)
      const [meta, fullMeta] = await Promise.all([
        sharp(full).metadata(),
        sharp(fullPath).metadata(),
      ])
      result.push({
        path: `${prefix}${entry.name}`,
        width: meta.width ?? 0,
        height: meta.height ?? 0,
        fullPath: `${prefix}${fullName}`,
        fullWidth: fullMeta.width ?? 0,
        fullHeight: fullMeta.height ?? 0,
      })
    }
  }

  return result
}

function esc(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function pascalCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function hash(value: string): string {
  let result = 0

  for (const char of value) {
    result = (result * 31 + char.charCodeAt(0)) >>> 0
  }

  return result.toString(36)
}

function imageId(group: string, path: string): string {
  return `_img_${group}_${path.replace(/[^a-zA-Z0-9]/g, '_')}_${hash(path)}`
}

function importLine(id: string, path: string): string {
  return `import ${id} from '${esc(path)}?url'`
}

function imageLine(id: string, entry: ImageEntry, group: string): string {
  const fullId = imageId(`${group}_full`, entry.fullPath)

  return `  image(${id}, ${entry.width}, ${entry.height}, ${fullId}, ${entry.fullWidth}, ${entry.fullHeight}),`
}

function imageArray(name: string, entries: ImageEntry[], group: string): string {
  const lines = entries.map((entry) => imageLine(imageId(group, entry.path), entry, group))

  return `export const _${name}Urls: ProjectImage[] = [\n${lines.join('\n')}\n]\n`
}

function pascalPath(value: string): string {
  return value.split('/').map(pascalCase).join('')
}

async function main(): Promise<void> {
  const freelanceImages = await getImages(join(ASSETS_DIR, 'freelance3d'))
  const wallpaperImages = await getImages(join(ASSETS_DIR, 'wallpaper'))
  const otherProjectsImages = await getImages(join(ASSETS_DIR, 'otherProjects'))
  const signsImages = await getImages(join(ASSETS_DIR, 'signs'))
  const cardImages = await getImages(join(ASSETS_DIR, 'card'))
  const subdirs = [...new Set(wallpaperImages.map((entry) => entry.path.split('/')[0]))].sort()
  const signGroups = [...new Set(signsImages.map((entry) => entry.path.split('/')[0]))].sort()
  const cardGroups = [...new Set(cardImages.map((entry) => entry.path.split('/')[0]))].sort()
  const otherProjectGroups = [
    'art',
    'studentWork/3dMax',
    'studentWork/blender',
    'studentWork/graphics',
    'studentWork/painting',
  ]

  const imports = [
    ...freelanceImages.map((entry) =>
      importLine(imageId('freelance3d', entry.path), `@/assets/freelance3d/${entry.path}`),
    ),
    ...wallpaperImages.map((entry) =>
      importLine(imageId('wallpaper', entry.path), `@/assets/wallpaper/${entry.path}`),
    ),
    ...otherProjectsImages.map((entry) =>
      importLine(imageId('otherProjects', entry.path), `@/assets/otherProjects/${entry.path}`),
    ),
    ...signsImages.map((entry) =>
      importLine(imageId('signs', entry.path), `@/assets/signs/${entry.path}`),
    ),
    ...cardImages.map((entry) =>
      importLine(imageId('card', entry.path), `@/assets/card/${entry.path}`),
    ),
    ...freelanceImages.map((entry) =>
      importLine(
        imageId('freelance3d_full', entry.fullPath),
        `@/assets/freelance3d/${entry.fullPath}`,
      ),
    ),
    ...wallpaperImages.map((entry) =>
      importLine(imageId('wallpaper_full', entry.fullPath), `@/assets/wallpaper/${entry.fullPath}`),
    ),
    ...otherProjectsImages.map((entry) =>
      importLine(
        imageId('otherProjects_full', entry.fullPath),
        `@/assets/otherProjects/${entry.fullPath}`,
      ),
    ),
    ...signsImages.map((entry) =>
      importLine(imageId('signs_full', entry.fullPath), `@/assets/signs/${entry.fullPath}`),
    ),
    ...cardImages.map((entry) =>
      importLine(imageId('card_full', entry.fullPath), `@/assets/card/${entry.fullPath}`),
    ),
  ]

  const arrays = [
    imageArray('Freelance3d', freelanceImages, 'freelance3d'),
    ...subdirs.map((subdir) =>
      imageArray(
        pascalCase(subdir),
        wallpaperImages.filter((entry) => entry.path.startsWith(`${subdir}/`)),
        'wallpaper',
      ),
    ),
    ...otherProjectGroups.map((groupPath) =>
      imageArray(
        `OtherProjects${pascalPath(groupPath)}`,
        otherProjectsImages.filter((entry) => entry.path.startsWith(`${groupPath}/`)),
        'otherProjects',
      ),
    ),
    ...signGroups.map((groupPath) =>
      imageArray(
        `Signs${pascalPath(groupPath)}`,
        signsImages.filter((entry) => entry.path.startsWith(`${groupPath}/`)),
        'signs',
      ),
    ),
    ...cardGroups.map((groupPath) =>
      imageArray(
        `Card${pascalPath(groupPath)}`,
        cardImages.filter((entry) => entry.path.startsWith(`${groupPath}/`)),
        'card',
      ),
    ),
  ]

  const code = `// Auto-generated by scripts/update-image-dimensions.ts

import type { ProjectImage } from './portfolio'
${imports.join('\n')}

function image(
  src: string,
  width: number,
  height: number,
  fullSrc: string,
  fullWidth: number,
  fullHeight: number,
): ProjectImage {
  return { src, width, height, fullSrc, fullWidth, fullHeight }
}

${arrays.join('\n')}
`

  writeFileSync(OUTPUT, code, 'utf-8')
  console.log(`Generated ${OUTPUT}`)
}

await main()
