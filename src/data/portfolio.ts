export interface Category {
  id: string
  name: string
  summary: string
  icon: string
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
  description?: string
  summary?: string
  image: ProjectMedia
  categoryId: string
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
  telegram: string
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
  email: 'maryfi1ippowa@ya.ru',
  telegram: 'https://t.me/lenDefendel',
  categories: [
    {
      id: 'wallpaper',
      name: 'Сюжеты для фресок',
      summary:
        'Иллюстрации и паттерны для фресок, фотообоев и интерьерной печати, сделанные в компании Pinegin',
      icon: 'wall_art',
    },
    {
      id: 'signs',
      name: 'Макеты вывесок',
      summary: 'Наружная навигация, режимы работы и QR-таблички, сделанные в компании 3D Metka',
      icon: 'signpost',
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
    },
  ],
  projects: [
    {
      id: 'signs-operating-mode',
      title: 'Режим работы',
      description: 'Макеты и готовые таблички с режимом работы.',
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
      description: 'Макеты и фотографии реализованных вывесок.',
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
      title: 'Вишнёвый сад',
      description:
        'Коллекция 3D работ для мебельного магазина "Вишнёвый сад". Коллекция представлена на сайте производителя: https://вишневыйсадъ.рф/products/kreslo-albero-s, а также на 3ddd стоке для дизайнеров: https://3ddd.ru/3dmodels/show/albero_solido_loveseat_sofa_om',
      image: images._Freelance3dUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'freelance3d',
      tags: ['3D', 'Art', 'Blender'],
      images: images._Freelance3dUrls,
    },
    {
      id: 'wall-birds',
      title: 'Тест',
      description:
        'Тестовое задание с которого началась моё взаимодействие с компанией по производству обоев. Сюжет на три метра в натуральную величину отрисован почти полностью вручную за 3 дня',
      image: images._BirdsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Birds'],
      images: images._BirdsUrls,
    },
    {
      id: 'wall-chinoiserie',
      title: 'Chinoiserie',
      description: 'В стиле шинуази.',
      summary:
        'Изображение имеет натуралистичную акварельную фактуру. В основе концепции — баланс между декоративностью и минимализмом: выразительные линии ветвей поддерживают архитектуру пространства, а небольшие цветовые акценты добавляют композиции ритм и живость.',
      image: images._ChinoiserieUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Chinoiserie', 'Classic'],
      images: images._ChinoiserieUrls,
    },
    {
      id: 'wall-forest',
      title: 'Forest',
      description: 'По мотивам классики.',
      summary:
        'Коллекция панорамных обоев, вдохновлённая классической пейзажной живописью. Спокойный природный сюжет с деревьями, холмами и извилистым ручьём создаёт ощущение глубины и визуально расширяет пространство. Приглушённая палитра построена на сложных серо-зелёных, песочных и дымчатых оттенках.',
      image: images._ForestUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Forest'],
      images: images._ForestUrls,
    },
    {
      id: 'wall-llamaUnicorns',
      title: 'Llamas and Unicorns',
      image: images._LlamaUnicornsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Animals', 'Fantasy'],
      images: images._LlamaUnicornsUrls,
    },
    {
      id: 'wall-robo',
      title: 'Star stories',
      image: images._RoboUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Tech', 'Robots'],
      images: images._RoboUrls,
    },
    {
      id: 'wall-tropicalBirds',
      title: 'Tropical herbarium',
      summary:
        'Коллекция обоев, вдохновлённая старинными ботаническими иллюстрациями и атмосферой экзотического сада. Изображение имеет паттерн и детальную проработку.',
      image: images._TropicalBirdsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'wallpaper',
      tags: ['Wallpaper', 'Nature', 'Tropical'],
      images: images._TropicalBirdsUrls,
    },
    {
      id: 'wall-tropics',
      title: 'Botanical Eden',
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
      tags: ['VFX', 'Real Time', 'Effects'],
      images: vfxVideos,
    },
    {
      id: 'student-3dmax',
      title: '3D Max',
      description: 'Студенческие 3D-работы, сцены и интерьерные объекты.',
      image: images._OtherProjectsStudentWork3dMaxUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      tags: ['3D Max', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWork3dMaxUrls,
    },
    {
      id: 'student-blender',
      title: 'Blender',
      description: 'Студенческая работа с этапами 3D-моделирования в Blender.',
      image: images._OtherProjectsStudentWorkBlenderUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      tags: ['Blender', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWorkBlenderUrls,
    },
    {
      id: 'student-graphics',
      title: 'Графика',
      image: images._OtherProjectsStudentWorkGraphicsUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      tags: ['Graphics', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWorkGraphicsUrls,
    },
    {
      id: 'student-painting',
      title: 'Живопись',
      image: images._OtherProjectsStudentWorkPaintingUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      tags: ['Painting', 'КХУ', 'Student Work'],
      images: images._OtherProjectsStudentWorkPaintingUrls,
    },
    {
      id: 'arts-concepts',
      title: 'Арты и концепты',
      description: 'Иллюстрации и концепты, выполненные в Photoshop и Procreate.',
      image: images._OtherProjectsArtUrls[0] ?? { src: '', width: 0, height: 0 },
      categoryId: 'other-projects',
      tags: ['Art', 'Concept', 'Photoshop', 'Procreate'],
      images: images._OtherProjectsArtUrls,
    },
  ],
  skills: [
    { name: 'Photoshop', category: 'Design' },
    { name: 'Procreate', category: 'Design' },
    { name: 'Illustrator', category: 'Design' },
    { name: 'Figma', category: 'Design' },
    { name: 'Corel Draw', category: 'Design' },
    { name: 'Blender', category: 'Design' },
    { name: '3D Max', category: 'Design' },
    { name: 'Zbrush', category: 'Design' },
    { name: 'Vue', category: 'Frontend/Вёрстка' },
    { name: 'JavaScript', category: 'Frontend/Вёрстка' },
    { name: 'TypeScript', category: 'Frontend/Вёрстка' },
    { name: 'HTML', category: 'Frontend/Вёрстка' },
    { name: 'CSS', category: 'Frontend/Вёрстка' },
  ],
}
