export interface Subcategory {
  id: string
  name: string
  summary: string
}

export interface Category {
  id: string
  name: string
  summary: string
  icon: string
  subcategories?: Subcategory[]
}

export interface ProjectImage {
  src: string
  width: number
  height: number
  fullSrc?: string
  fullWidth?: number
  fullHeight?: number
  type?: 'image'
}

export interface ProjectVideo {
  src: string
  width: number
  height: number
  type: 'video'
}

export type ProjectMedia = ProjectImage | ProjectVideo

export interface Project {
  id: string
  title: string
  description: string
  image: ProjectMedia
  categoryId: string
  subcategoryId?: string
  tags: string[]
  link?: string
  images?: ProjectMedia[]
}

export interface Skill {
  name: string
  category: string
}

export interface PortfolioData {
  name: string
  title: string
  about: string
  email: string
  github: string
  linkedin: string
  categories: Category[]
  projects: Project[]
  skills: Skill[]
}

import * as images from './generatedImages'

const vfxVideos: ProjectVideo[] = [
  {
    src: new URL('../assets/otherProjects/vfx/movie-012.mp4', import.meta.url).href,
    width: 1920,
    height: 1080,
    type: 'video',
  },
  {
    src: new URL('../assets/otherProjects/vfx/movie_001.mp4', import.meta.url).href,
    width: 960,
    height: 720,
    type: 'video',
  },
  {
    src: new URL('../assets/otherProjects/vfx/source.mp4', import.meta.url).href,
    width: 1920,
    height: 1080,
    type: 'video',
  },
]

export const portfolio: PortfolioData = {
  name: 'Maria Filippova',
  title: 'Designer',
  about:
    'Привет! я дизайнер с опытом 4+ лет в различных сферах. В моих кейсах есть коммерческий опыт: создания иллюстраций, полномасштабных интерьерных сюжетов, ретуши, макетов для наружной рекламы, 3D моделей и визуализаций. Также есть навык работы с ИИ в дизайне и кодинге. Есть опыт менторства.\nЯ открыта для новых проектов и технологий, быстро включаюсь в работу, разбираюсь в новом проекте, задаю уточняющие вопросы и довожу задачи до результата.',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  categories: [
    {
      id: 'signs',
      name: 'Макеты вывесок',
      summary: 'Наружная навигация, режимы работы и QR-таблички для печати и монтажа.',
      icon: 'signpost',
    },
    {
      id: 'wallpaper',
      name: 'Сюжеты для фресок',
      summary: 'Иллюстрации и паттерны для фресок, фотообоев и интерьерной печати.',
      icon: 'wall_art',
    },
    {
      id: 'marketplace-cards',
      name: 'Карточки для маркетплейсов',
      summary: 'Дизайн карточек товаров, инфографика и визуалы для онлайн-витрин.',
      icon: 'storefront',
    },
    {
      id: 'freelance3d',
      name: '3D модели',
      summary: 'Предметная 3D-графика, модели мебели и визуализации для каталогов.',
      icon: 'deployed_code',
    },
    {
      id: 'other-projects',
      name: 'Другие проекты',
      summary: 'Разные визуальные задачи, эксперименты и работы вне основных направлений.',
      icon: 'category',
      subcategories: [
        {
          id: 'effects',
          name: 'Real Time VFX',
          summary: 'Real Time VFX и визуальные эффекты для интерактивных сцен.',
        },
        {
          id: 'student-khu',
          name: 'Студенческие работы',
          summary: 'Работы периода обучения в КХУ.',
        },
        {
          id: 'misc',
          name: 'Разное',
          summary: 'Небольшие визуальные задачи и эксперименты вне основных серий.',
        },
        {
          id: 'arts-concepts',
          name: 'Арты, концепты',
          summary: 'Иллюстрации и концепты, выполненные в Photoshop и Procreate.',
        },
      ],
    },
  ],
  projects: [
    {
      id: 'signs-operating-mode',
      title: 'Режим работы',
      description: 'Макеты и готовые таблички с режимом работы для входных групп.',
      image: images._SignsOperatingModeUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'signs',
      tags: ['Signs', 'Print', 'Outdoor'],
      images: images._SignsOperatingModeUrls,
    },
    {
      id: 'signs-qr',
      title: 'QR-таблички',
      description: 'Дизайн табличек с QR-кодами для точек контакта с клиентами.',
      image: images._SignsQrUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'signs',
      tags: ['QR', 'Signs', 'Print'],
      images: images._SignsQrUrls,
    },
    {
      id: 'signs-outdoor',
      title: 'Вывески',
      description: 'Макеты, визуализации и фотографии реализованных вывесок.',
      image: images._SignsSignsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'signs',
      tags: ['Signs', 'Outdoor', 'Branding'],
      images: images._SignsSignsUrls,
    },
    {
      id: 'cards-bowl',
      title: 'Bowl',
      description: 'Карточки товара для маркетплейсов с инфографикой и акцентом на преимущества.',
      image: images._CardBowlUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'marketplace-cards',
      tags: ['Marketplace', 'Cards', 'Infographics'],
      images: images._CardBowlUrls,
    },
    {
      id: 'cards-glasses',
      title: 'Glasses',
      description:
        'Карточки товара для маркетплейсов со стаканами и визуальной подачей характеристик.',
      image: images._CardGlassesUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'marketplace-cards',
      tags: ['Marketplace', 'Cards', 'Product Design'],
      images: images._CardGlassesUrls,
    },
    {
      id: 'proj-freelance3d',
      title: '3D Art',
      description:
        'Коллекция 3D работ для мебельного магазина "Вишнёвый сад". Коллекция представлена на сайте производителя: https://вишневыйсадъ.рф/products/kreslo-albero-s, а также на 3ddd стоке для дизайнеров: https://3ddd.ru/3dmodels/show/albero_solido_loveseat_sofa_om',
      image: images._Freelance3dUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'freelance3d',
      tags: ['3D', 'Art', 'Blender'],
      images: images._Freelance3dUrls,
    },
    {
      id: 'wall-birds',
      title: 'Birds',
      description: 'Коллекция обоев с птицами.',
      image: images._BirdsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Birds'],
      images: images._BirdsUrls,
    },
    {
      id: 'wall-chinoiserie',
      title: 'Chinoiserie',
      description: 'Коллекция обоев в стиле шинуази.',
      image: images._ChinoiserieUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Chinoiserie', 'Classic'],
      images: images._ChinoiserieUrls,
    },
    {
      id: 'wall-forest',
      title: 'Forest',
      description: 'Коллекция обоев с лесными мотивами.',
      image: images._ForestUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Forest'],
      images: images._ForestUrls,
    },
    {
      id: 'wall-llamaUnicorns',
      title: 'Llamas and Unicorns',
      description: 'Коллекция обоев с ламами и единорогами.',
      image: images._LlamaUnicornsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Animals', 'Fantasy'],
      images: images._LlamaUnicornsUrls,
    },
    {
      id: 'wall-robo',
      title: 'Robots',
      description: 'Коллекция обоев с роботами.',
      image: images._RoboUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Tech', 'Robots'],
      images: images._RoboUrls,
    },
    {
      id: 'wall-tropicalBirds',
      title: 'Tropical Birds',
      description: 'Коллекция обоев с тропическими птицами.',
      image: images._TropicalBirdsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Tropical'],
      images: images._TropicalBirdsUrls,
    },
    {
      id: 'wall-tropics',
      title: 'Tropics',
      description: 'Коллекция обоев с тропическими мотивами.',
      image: images._TropicsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Tropical', 'Nature'],
      images: images._TropicsUrls,
    },
    {
      id: 'other-vfx',
      title: 'Real Time VFX',
      description: 'Видео с эффектами в реальном времени и визуальными экспериментами.',
      image: vfxVideos[0] ?? { src: '', width: 0, height: 0, type: 'video' },
      categoryId: 'other-projects',
      subcategoryId: 'effects',
      tags: ['VFX', 'Real Time', 'Effects'],
      images: vfxVideos,
    },
    {
      id: 'student-3dmax',
      title: '3D Max',
      description: 'Студенческие 3D-работы, сцены и интерьерные объекты.',
      image: images._OtherProjectsStudentWork3dMaxUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      subcategoryId: 'student-khu',
      tags: ['3D Max', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWork3dMaxUrls,
    },
    {
      id: 'student-blender',
      title: 'Blender',
      description: 'Студенческая работа с этапами 3D-моделирования в Blender.',
      image: images._OtherProjectsStudentWorkBlenderUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      subcategoryId: 'student-khu',
      tags: ['Blender', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWorkBlenderUrls,
    },
    {
      id: 'student-graphics',
      title: 'Графика',
      description: 'Учебные графические работы и композиции периода обучения.',
      image: images._OtherProjectsStudentWorkGraphicsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      subcategoryId: 'student-khu',
      tags: ['Graphics', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWorkGraphicsUrls,
    },
    {
      id: 'student-painting',
      title: 'Живопись',
      description: 'Учебные живописные работы периода обучения.',
      image: images._OtherProjectsStudentWorkPaintingUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      subcategoryId: 'student-khu',
      tags: ['Painting', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWorkPaintingUrls,
    },
    {
      id: 'arts-concepts',
      title: 'Арты и концепты',
      description: 'Иллюстрации и концепты, выполненные в Photoshop и Procreate.',
      image: images._OtherProjectsArtUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      subcategoryId: 'arts-concepts',
      tags: ['Art', 'Concept', 'Photoshop', 'Procreate'],
      images: images._OtherProjectsArtUrls,
    },
  ],
  skills: [
    { name: 'Photoshop', category: 'Design' },
    { name: 'Procreate', category: 'Design' },
    { name: 'Illustrator', category: 'Design' },
    { name: 'Figma', category: 'Design' },
    { name: 'User Research', category: 'UX' },
    { name: 'Prototyping', category: 'UX' },
    { name: 'Wireframing', category: 'UX' },
    { name: 'UI Kit', category: 'Design Systems' },
    { name: 'Design Tokens', category: 'Design Systems' },
    { name: 'HTML/CSS', category: 'Frontend' },
  ],
}
