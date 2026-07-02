export interface Workplace {
  id: string
  name: string
  role: string
  period: string
  icon: string
}

export interface ProjectImage {
  src: string
  width: number
  height: number
}

export interface Project {
  id: string
  title: string
  description: string
  image: ProjectImage
  workplaceId: string
  tags: string[]
  link?: string
  images?: ProjectImage[]
}

export interface Skill {
  name: string
  category: string
}

export interface PortfolioData {
  name: string
  title: string
  about: string
  stats: { value: string; label: string }[]
  email: string
  github: string
  linkedin: string
  workplaces: Workplace[]
  projects: Project[]
  skills: Skill[]
}

import * as images from './generatedImages'
export const portfolio: PortfolioData = {
  name: 'Your Name',
  title: 'Designer',
  about:
    "I'm a UI/UX designer with experience creating digital products. I enjoy turning complex problems into simple, beautiful solutions. Passionate about clean design, usability, and user experience.",
  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '30+', label: 'Projects' },
    { value: '15+', label: 'Clients' },
  ],
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  workplaces: [
    {
      id: 'wallpaper',
      name: 'Pinegin Фрески и фотообои',
      role: 'Product Designer',
      period: '2023 — наст. время',
      icon: 'W',
    },
    {
      id: 'freelance3d',
      name: 'Фриланс 3D',
      role: '3D Artist',
      period: '2022 — 2024',
      icon: 'F',
    },
  ],
  projects: [
    {
      id: 'proj-freelance3d',
      title: '3D Art',
      description:
        'Коллекция 3D работ для мебельного магазина "Вишнёвый сад". Коллекция представлена на сайте производителя: https://вишневыйсадъ.рф/products/kreslo-albero-s, а также на 3ddd стоке для дизайнеров: https://3ddd.ru/3dmodels/show/albero_solido_loveseat_sofa_om',
      image: images._Freelance3dUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'freelance3d',
      tags: ['3D', 'Art', 'Blender'],
      images: images._Freelance3dUrls,
    },
    {
      id: 'wall-birds',
      title: 'Птицы',
      description: 'Коллекция обоев с птицами.',
      image: images._BirdsUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Birds'],
      images: images._BirdsUrls,
    },
    {
      id: 'wall-chinoiserie',
      title: 'Шинуази',
      description: 'Коллекция обоев в стиле шинуази.',
      image: images._ChinoiserieUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Chinoiserie', 'Classic'],
      images: images._ChinoiserieUrls,
    },
    {
      id: 'wall-forest',
      title: 'Лес',
      description: 'Коллекция обоев с лесными мотивами.',
      image: images._ForestUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Forest'],
      images: images._ForestUrls,
    },
    {
      id: 'wall-llamaUnicorns',
      title: 'Ламы и Единороги',
      description: 'Коллекция обоев с ламами и единорогами.',
      image: images._LlamaUnicornsUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Animals', 'Fantasy'],
      images: images._LlamaUnicornsUrls,
    },
    {
      id: 'wall-robo',
      title: 'Роботы',
      description: 'Коллекция обоев с роботами.',
      image: images._RoboUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Tech', 'Robots'],
      images: images._RoboUrls,
    },
    {
      id: 'wall-tropicalBirds',
      title: 'Тропические птицы',
      description: 'Коллекция обоев с тропическими птицами.',
      image: images._TropicalBirdsUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Tropical'],
      images: images._TropicalBirdsUrls,
    },
    {
      id: 'wall-tropics',
      title: 'Тропики',
      description: 'Коллекция обоев с тропическими мотивами.',
      image: images._TropicsUrls[0] ?? { src: '', width: 0, height: 0 },
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Tropical', 'Nature'],
      images: images._TropicsUrls,
    },
  ],
  skills: [
    { name: 'Figma', category: 'Design' },
    { name: 'Sketch', category: 'Design' },
    { name: 'Adobe XD', category: 'Design' },
    { name: 'Photoshop', category: 'Design' },
    { name: 'Illustrator', category: 'Design' },
    { name: 'After Effects', category: 'Motion' },
    { name: 'User Research', category: 'UX' },
    { name: 'Prototyping', category: 'UX' },
    { name: 'Wireframing', category: 'UX' },
    { name: 'UI Kit', category: 'Design Systems' },
    { name: 'Design Tokens', category: 'Design Systems' },
    { name: 'HTML/CSS', category: 'Frontend' },
  ],
}

export const workplaceNames: Record<string, string> = {}
for (const w of portfolio.workplaces) {
  workplaceNames[w.id] = w.name
}
