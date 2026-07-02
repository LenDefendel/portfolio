export interface Workplace {
  id: string
  name: string
  role: string
  period: string
  icon: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  width?: number
  height?: number
  workplaceId: string
  tags: string[]
  link?: string
  images?: string[]
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

import { folderImages, freelance3dImages } from './wallpaperAssets'

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
    {
      id: 'agency-b',
      name: 'Агентство «Б»',
      role: 'Junior Designer',
      period: '2021 — 2022',
      icon: 'B',
    },
  ],
  projects: [
    {
      id: 'proj-4',
      title: 'Сайт портфолио фотографа',
      description:
        'Дизайн лендинга с галереей, фильтрацией по категориям и формой бронирования съёмок.',
      image: '/placeholder-4.jpg',
      workplaceId: 'freelance',
      tags: ['Web Design', 'Portfolio', 'Responsive'],
    },
    {
      id: 'proj-5',
      title: 'Приложение доставки еды',
      description:
        'UX/UI дизайн приложения для заказа еды: персонализированные рекомендации, трекинг курьера, отзывы.',
      image: '/placeholder-5.jpg',
      workplaceId: 'freelance',
      tags: ['Mobile', 'FoodTech', 'UX'],
    },
    {
      id: 'proj-6',
      title: 'Сайт IT-конференции',
      description:
        'Разработка дизайна сайта мероприятия: программа, регистрация, карта площадки, интеграция с тикет-системой.',
      image: '/placeholder-6.jpg',
      workplaceId: 'freelance',
      tags: ['Event', 'Web Design', 'Branding'],
    },
    {
      id: 'proj-7',
      title: 'Дашборд аналитики',
      description:
        'Интерактивная панель мониторинга ключевых метрик продукта с визуализацией данных и экспортом отчётов.',
      image: '/placeholder-7.jpg',
      workplaceId: 'agency-b',
      tags: ['Dashboard', 'Analytics', 'Data Viz'],
    },
    {
      id: 'proj-8',
      title: 'Лендинг стартапа',
      description:
        'Дизайн посадочной страницы для презентации продукта: анимации, блок с кейсами, форма сбора email.',
      image: '/placeholder-8.jpg',
      workplaceId: 'agency-b',
      tags: ['Landing', 'Marketing', 'Animation'],
    },
    {
      id: 'proj-freelance3d',
      title: '3D Art',
      description:
        'Коллекция 3D работ для мебельного магазина "Вишнёвый сад". Коллекция представлена на сайте производителя: https://вишневыйсадъ.рф/products/kreslo-albero-s, а также на 3ddd стоке для дизайнеров: https://3ddd.ru/3dmodels/show/albero_solido_loveseat_sofa_om',
      image: freelance3dImages[0] ?? '',
      width: 1280,
      height: 1280,
      workplaceId: 'freelance3d',
      tags: ['3D', 'Art', 'Blender'],
      images: freelance3dImages,
    },
    {
      id: 'wall-birds',
      title: 'Птицы',
      description: 'Коллекция обоев с птицами.',
      image: folderImages['birds']?.[0] ?? '',
      width: 1920,
      height: 1280,
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Birds'],
      images: folderImages['birds'] ?? [],
    },
    {
      id: 'wall-chinoiserie',
      title: 'Шинуази',
      description: 'Коллекция обоев в стиле шинуази.',
      image: folderImages['chinoiserie']?.[0] ?? '',
      width: 3190,
      height: 3150,
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Chinoiserie', 'Classic'],
      images: folderImages['chinoiserie'] ?? [],
    },
    {
      id: 'wall-forest',
      title: 'Лес',
      description: 'Коллекция обоев с лесными мотивами.',
      image: folderImages['forest']?.[0] ?? '',
      width: 5906,
      height: 4005,
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Forest'],
      images: folderImages['forest'] ?? [],
    },
    {
      id: 'wall-llamaUnicorns',
      title: 'Ламы и Единороги',
      description: 'Коллекция обоев с ламами и единорогами.',
      image: folderImages['llamaUnicorns']?.[0] ?? '',
      width: 3011,
      height: 2700,
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Animals', 'Fantasy'],
      images: folderImages['llamaUnicorns'] ?? [],
    },
    {
      id: 'wall-robo',
      title: 'Роботы',
      description: 'Коллекция обоев с роботами.',
      image: folderImages['robo']?.[0] ?? '',
      width: 1448,
      height: 1086,
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Tech', 'Robots'],
      images: folderImages['robo'] ?? [],
    },
    {
      id: 'wall-tropicalBirds',
      title: 'Тропические птицы',
      description: 'Коллекция обоев с тропическими птицами.',
      image: folderImages['tropicalBirds']?.[0] ?? '',
      width: 531,
      height: 740,
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Tropical'],
      images: folderImages['tropicalBirds'] ?? [],
    },
    {
      id: 'wall-tropics',
      title: 'Тропики',
      description: 'Коллекция обоев с тропическими мотивами.',
      image: folderImages['tropics']?.[0] ?? '',
      width: 1448,
      height: 1086,
      workplaceId: 'wallpaper',
      tags: ['Wallpaper', 'Tropical', 'Nature'],
      images: folderImages['tropics'] ?? [],
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

export const imageDimensions: Record<string, { width: number; height: number }> = {
  "/src/assets/freelance3d/00.jpg": { width: 1280, height: 1280 },
  "/src/assets/freelance3d/01.jpg": { width: 1200, height: 1200 },
  "/src/assets/freelance3d/02.jpg": { width: 1200, height: 1200 },
  "/src/assets/freelance3d/03.jpg": { width: 1200, height: 1200 },
  "/src/assets/freelance3d/04.jpg": { width: 1200, height: 1200 },
  "/src/assets/freelance3d/05.jpg": { width: 1505, height: 1804 },
  "/src/assets/freelance3d/06.jpg": { width: 1536, height: 1443 },
  "/src/assets/freelance3d/07.jpg": { width: 1478, height: 1189 },
  "/src/assets/freelance3d/08.jpg": { width: 1338, height: 962 },
  "/src/assets/freelance3d/09.jpg": { width: 978, height: 955 },
  "/src/assets/freelance3d/10.jpg": { width: 1324, height: 948 },
  "/src/assets/freelance3d/11.jpg": { width: 833, height: 593 },
  "/src/assets/freelance3d/12.jpg": { width: 1280, height: 1280 },
  "/src/assets/freelance3d/13.jpg": { width: 1280, height: 1280 },
  "/src/assets/freelance3d/14.jpg": { width: 1280, height: 1280 },
  "/src/assets/freelance3d/15.jpg": { width: 1280, height: 1280 },
  "/src/assets/freelance3d/16.jpg": { width: 1200, height: 1200 },
  "/src/assets/freelance3d/17.jpg": { width: 1200, height: 1200 },
  "/src/assets/wallpaper/birds/birds.jpg": { width: 1920, height: 1280 },
  "/src/assets/wallpaper/chinoiserie/chinoiserie1.jpg": { width: 3190, height: 3150 },
  "/src/assets/wallpaper/chinoiserie/chinoiserie2.jpg": { width: 4000, height: 2666 },
  "/src/assets/wallpaper/chinoiserie/chinoiserie3.jpg": { width: 2835, height: 2232 },
  "/src/assets/wallpaper/chinoiserie/chinoiserie4.jpg": { width: 1280, height: 782 },
  "/src/assets/wallpaper/forest/forest1.jpg": { width: 5906, height: 4005 },
  "/src/assets/wallpaper/forest/forest2.jpg": { width: 700, height: 420 },
  "/src/assets/wallpaper/forest/forest3.jpg": { width: 5906, height: 2215 },
  "/src/assets/wallpaper/forest/forest4.jpg": { width: 3300, height: 2732 },
  "/src/assets/wallpaper/llamaUnicorns/llamaUnicorns1.jpg": { width: 3011, height: 2700 },
  "/src/assets/wallpaper/llamaUnicorns/llamaUnicorns2.jpg": { width: 3000, height: 2000 },
  "/src/assets/wallpaper/llamaUnicorns/llamaUnicorns3.jpg": { width: 2835, height: 2430 },
  "/src/assets/wallpaper/robo/robo1.png": { width: 1448, height: 1086 },
  "/src/assets/wallpaper/robo/robo2.jpg": { width: 2734, height: 5906 },
  "/src/assets/wallpaper/tropicalBirds/tropicalBirds1.jpg": { width: 531, height: 740 },
  "/src/assets/wallpaper/tropicalBirds/tropicalBirds2.png": { width: 1198, height: 1313 },
  "/src/assets/wallpaper/tropicalBirds/tropicalBirds3.jpg": { width: 962, height: 902 },
  "/src/assets/wallpaper/tropicalBirds/tropicalBirds4.jpg": { width: 836, height: 901 },
  "/src/assets/wallpaper/tropicalBirds/tropicalBirds5.jpg": { width: 952, height: 903 },
  "/src/assets/wallpaper/tropics/tropics1.png": { width: 1448, height: 1086 },
  "/src/assets/wallpaper/tropics/tropics2.jpg": { width: 5906, height: 2307 },
}

