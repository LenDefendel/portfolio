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
  workplaceId: string
  tags: string[]
  link?: string
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
      id: 'agency-a',
      name: 'Дизайн-студия «А»',
      role: 'Senior UI/UX Designer',
      period: '2024 — наст. время',
      icon: 'A',
    },
    {
      id: 'freelance',
      name: 'Фриланс',
      role: 'Product Designer',
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
      id: 'proj-1',
      title: 'Маркетплейс товаров',
      description:
        'Дизайн интернет-магазина с каталогом, корзиной и личным кабинетом. Проведено исследование пользователей, создана информационная архитектура и адаптивный прототип.',
      image: '/placeholder-1.jpg',
      workplaceId: 'agency-a',
      tags: ['UI/UX', 'Исследование', 'Figma'],
    },
    {
      id: 'proj-2',
      title: 'Мобильное приложение банка',
      description:
        'Редизайн мобильного банкинга: улучшение навигации, добавление тёмной темы, переработка экрана переводов. Рост конверсии на 25%.',
      image: '/placeholder-2.jpg',
      workplaceId: 'agency-a',
      tags: ['Mobile', 'Fintech', 'Research'],
    },
    {
      id: 'proj-3',
      title: 'CRM для логистики',
      description:
        'Разработка интерфейса системы управления перевозками: дашборды, отчёты, управление заказами в реальном времени.',
      image: '/placeholder-3.jpg',
      workplaceId: 'agency-a',
      tags: ['Dashboard', 'B2B', 'Data Viz'],
    },
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
