export const defaultLang = 'es' as const;
export const langs = ['en', 'es'] as const;
export type Lang = (typeof langs)[number];

export type RichSeg = { t: string; strong?: boolean; em?: boolean };

export const sections = [
  { id: 'projects', href: '#projects' },
  { id: 'experience', href: '#experience' },
  { id: 'skills', href: '#skills' },
  { id: 'contact', href: '#contact' },
] as const;

export const ui = {
  en: {
    title: 'Oscar Rodríguez · Full-Stack & AI Developer',
    availability: 'Open to new projects',
    role: 'Full-Stack & AI Developer',
    nav: {
      sections: 'Sections',
      projects: 'Projects',
      experience: 'Experience',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      desc: "I hold a bachelor's degree in Computer Systems Engineering and I'm pursuing a master's in Artificial Intelligence. Based in Trujillo, Peru, I work with clients as a freelance and remote developer building software that solves practical problems.",
      languages: [
        { name: 'Spanish', level: 'native' },
        { name: 'English', level: 'professional' },
        { name: 'Portuguese', level: 'intermediate' },
      ],
      viewWork: 'View work',
      resume: 'Résumé ↓',
      recognitions: 'Recognitions',
      portraitAlt: 'Portrait of Oscar Rodríguez',
    },
    awards: [
      { rank: '2nd', name: 'Sunass Datathon 2026', detail: 'Python · Polars data pipeline' },
      { rank: '3rd', name: 'Eureka UPN 2025', detail: 'SaaS platform for sustainable tourism' },
      { rank: '2nd', name: 'Innovation Day UPN 2024', detail: 'Real-time distributed video processing' },
    ],
    projects: {
      title: 'Projects',
      visit: 'Visit project',
      descs: {
        accessmap:
          "Geospatial analytics platform that estimates travel times to health, education, and other essential services using Peru's National Geographic Information Platform. Supports governments and NGOs in identifying accessibility gaps and prioritizing infrastructure investment.",
        finsight:
          "Financial analytics platform that automates the extraction, cleaning, and analysis of data from companies regulated by Peru's Superintendency of Securities Market, turning regulatory reports into interactive dashboards for faster decisions.",
        urbansight:
          'Computer vision platform for real-time traffic monitoring, vehicle detection, and re-identification across distributed camera networks, built to improve scalability for vision workloads.',
      },
    },
    experience: {
      title: 'Experience',
      work: 'Work',
      education: 'Education',
      remote: 'Remote',
      workTitle: 'Full-Stack Developer',
      workBullets: [
        [
          { t: 'Designed and built AI agents based on the Model Context Protocol (MCP), LLM APIs, tool calling, and workflow orchestration, automating ' },
          { t: '30+', strong: true },
          { t: ' business processes.' },
        ],
        [
          { t: 'Built and shipped ' },
          { t: '20+', strong: true },
          { t: ' AI-powered full-stack applications, integrating LLM APIs, external AI services, and modern web technologies.' },
        ],
        [
          { t: 'Built scalable backend services and integrated ' },
          { t: '15+', strong: true },
          { t: ' external APIs, contributing to over ' },
          { t: '1,100 hours', strong: true },
          { t: ' saved monthly and a ' },
          { t: '60%', strong: true },
          { t: ' reduction in team operational effort.' },
        ],
      ],
      edu: [
        {
          title: 'Artificial Intelligence',
          period: 'Present',
          bullets: [
            [{ t: 'Specialization in deep learning, NLP, and computer vision.' }],
            [{ t: 'Research focus on LLM alignment and multi-agent systems.' }],
            [{ t: 'Applied coursework in neural architectures and AI systems design.' }],
          ],
        },
        {
          title: "Bachelor's Degree in Computer Systems Engineering",
          period: 'Mar 2021 – Jul 2025',
          bullets: [
            [{ t: 'Foundations in software engineering, distributed systems, and applied computing.' }],
            [{ t: 'Focus on machine learning and software architecture.' }],
          ],
        },
      ],
    },
    skills: {
      title: 'Stack & Tools',
      lead: [
        { t: 'A toolkit spanning ' },
        { t: 'languages', em: true },
        { t: ', ' },
        { t: 'frameworks', em: true },
        { t: ', ' },
        { t: 'LLMs', em: true },
        { t: ', ' },
        { t: 'data', em: true },
        { t: ', and ' },
        { t: 'infrastructure', em: true },
        { t: ', used across freelance and product work.' },
      ],
      categories: {
        languages: 'Languages',
        llm: 'LLM & Agents',
        ai: 'AI & ML',
        databases: 'Databases',
        tools: 'Tools & DevOps',
      },
    },
    contact: {
      title: 'Contact',
      heading: 'Get in touch',
      tagline: "Open to new projects and interesting problems. If you have something in mind, let's talk.",
      sendHeading: 'Send a message',
      form: {
        name: 'Name',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
      },
      formMsgs: {
        checkFields: '✕ Check the fields',
        sending: 'Sending…',
        sent: '✔ Sent',
      },
    },
    footer: {
      top: 'Top',
    },
  },
  es: {
    title: 'Oscar Rodríguez · Desarrollador Full-Stack & IA',
    availability: 'Abierto a nuevos proyectos',
    role: 'Desarrollador Full-Stack & IA',
    nav: {
      sections: 'Secciones',
      projects: 'Proyectos',
      experience: 'Experiencia',
      skills: 'Habilidades',
      contact: 'Contacto',
    },
    hero: {
      desc: 'Soy bachiller en Ingeniería de Sistemas Computacionales y estudio una maestría en Inteligencia Artificial. Radicado en Trujillo, Perú, trabajo con clientes como freelancer y desarrollador remoto construyendo software que resuelve problemas prácticos.',
      languages: [
        { name: 'Español', level: 'nativo' },
        { name: 'Inglés', level: 'profesional' },
        { name: 'Portugués', level: 'intermedio' },
      ],
      viewWork: 'Ver proyectos',
      resume: 'CV ↓',
      recognitions: 'Reconocimientos',
      portraitAlt: 'Retrato de Oscar Rodríguez',
    },
    awards: [
      { rank: '2nd', name: 'Datathon Sunass 2026', detail: 'Pipeline de datos con Python · Polars' },
      { rank: '3rd', name: 'Eureka UPN 2025', detail: 'Plataforma SaaS para turismo sostenible' },
      { rank: '2nd', name: 'Innovation Day UPN 2024', detail: 'Procesamiento de video distribuido en tiempo real' },
    ],
    projects: {
      title: 'Proyectos',
      visit: 'Ver proyecto',
      descs: {
        accessmap:
          'Plataforma de analítica geoespacial que estima tiempos de traslado a servicios de salud, educación y otros servicios esenciales, usando la Plataforma Nacional de Información Geográfica del Perú. Apoya a gobiernos y ONGs a identificar brechas de accesibilidad y priorizar inversión en infraestructura.',
        finsight:
          'Plataforma de analítica financiera que automatiza la extracción, limpieza y análisis de datos de empresas reguladas por la Superintendencia del Mercado de Valores de Perú, transformando reportes regulatorios en dashboards interactivos.',
        urbansight:
          'Plataforma de visión por computadora para monitoreo de tráfico en tiempo real, detección y re-identificación de vehículos sobre redes de cámaras distribuidas, diseñada para mejorar la escalabilidad en cargas de visión.',
      },
    },
    experience: {
      title: 'Experiencia',
      work: 'Trabajo',
      education: 'Educación',
      remote: 'Remoto',
      workTitle: 'Desarrollador Full-Stack',
      workBullets: [
        [
          { t: 'Diseñé y desarrollé agentes de IA basados en el Model Context Protocol (MCP), APIs de LLMs, tool calling y orquestación de flujos, automatizando más de ' },
          { t: '30', strong: true },
          { t: ' procesos empresariales.' },
        ],
        [
          { t: 'Construí e implementé más de ' },
          { t: '20', strong: true },
          { t: ' aplicaciones full-stack potenciadas por IA, integrando APIs de LLMs, servicios externos de IA y tecnologías web modernas.' },
        ],
        [
          { t: 'Construí servicios backend escalables e integré más de ' },
          { t: '15', strong: true },
          { t: ' APIs externas, contribuyendo a un ahorro superior a ' },
          { t: '1,100 horas', strong: true },
          { t: ' mensuales y una reducción del ' },
          { t: '60%', strong: true },
          { t: ' en el esfuerzo operativo del equipo.' },
        ],
      ],
      edu: [
        {
          title: 'Inteligencia Artificial',
          period: 'Presente',
          bullets: [
            [{ t: 'Especialización en deep learning, NLP y visión por computadora.' }],
            [{ t: 'Enfoque de investigación en alineamiento de LLMs y sistemas multiagente.' }],
            [{ t: 'Cursos aplicados en arquitecturas neuronales y diseño de sistemas de IA.' }],
          ],
        },
        {
          title: 'Bachiller en Ingeniería de Sistemas Computacionales',
          period: 'Mar 2021 – Jul 2025',
          bullets: [
            [{ t: 'Bases en ingeniería de software, sistemas distribuidos y computación aplicada.' }],
            [{ t: 'Enfoque en machine learning y arquitectura de software.' }],
          ],
        },
      ],
    },
    skills: {
      title: 'Stack y Herramientas',
      lead: [
        { t: 'Un conjunto de herramientas que abarca ' },
        { t: 'lenguajes', em: true },
        { t: ', ' },
        { t: 'frameworks', em: true },
        { t: ', ' },
        { t: 'LLMs', em: true },
        { t: ', ' },
        { t: 'datos', em: true },
        { t: ' e ' },
        { t: 'infraestructura', em: true },
        { t: ', usado en trabajo freelance y de producto.' },
      ],
      categories: {
        languages: 'Lenguajes',
        llm: 'LLMs y Agentes',
        ai: 'IA y ML',
        databases: 'Bases de Datos',
        tools: 'Herramientas y DevOps',
      },
    },
    contact: {
      title: 'Contacto',
      heading: 'Contáctame',
      tagline: 'Abierto a nuevos proyectos y problemas interesantes. Si tienes algo en mente, hablemos.',
      sendHeading: 'Enviar un mensaje',
      form: {
        name: 'Nombre',
        subject: 'Asunto',
        message: 'Mensaje',
        submit: 'Enviar Mensaje',
      },
      formMsgs: {
        checkFields: '✕ Revisa los campos',
        sending: 'Enviando…',
        sent: '✔ Enviado',
      },
    },
    footer: {
      top: 'Inicio',
    },
  },
} as const;

export type Ui = (typeof ui)[Lang];

export function useTranslations(lang: Lang) {
  return ui[lang];
}