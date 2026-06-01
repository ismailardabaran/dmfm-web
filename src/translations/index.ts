export type Language = 'en' | 'tr' | 'pl' | 'pt' | 'ro';

export interface Partner {
  id: string;
  name: string;
  country: string;
  type: string;
  city: string;
  website: string;
  logoColor: string;
}

export interface Activity {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  outputs: string[];
}

export interface Translation {
  nav: {
    home: string;
    about: string;
    partners: string;
    activities: string;
    gallery: string;
  };
  hero: {
    tagline: string;
    titleAccent: string;
    titleMain: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  project: {
    objectivesTitle: string;
    objectivesText: string;
    resultsTitle: string;
    resultsText: string;
    expectedResultsList: string[];
  };
  targetGroups: {
    title: string;
    subtitle: string;
    primaryTitle: string;
    primaryDesc: string;
    primaryItems: string[];
    secondaryTitle: string;
    secondaryDesc: string;
    secondaryItems: string[];
  };
  partnersSection: {
    title: string;
    subtitle: string;
    visitWebsite: string;
    roles: {
      coordinator: string;
      partner: string;
    };
  };
  activitiesSection: {
    title: string;
    subtitle: string;
    educationalTitle: string;
    localTitle: string;
    timelineTitle: string;
  };
  gallerySection: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      poland: string;
      turkiye: string;
      romania: string;
    };
  };
  footer: {
    euDisclaimer: string;
    copyright: string;
  };
}

export const partnersData: Record<Language, Partner[]> = {
  en: [
    { id: '1', name: 'Agrupamento de Escolas Miguel Torga', country: 'Portugal', city: 'Bragança', type: 'School / Educational Centre (Secondary Level)', website: 'https://aemigueltorga.pt/', logoColor: 'bg-emerald-600' },
    { id: '2', name: 'Şehit Kaya Aldoğan Anadolu Lisesi', country: 'Türkiye', city: 'Aydın', type: 'School / Educational Centre (Secondary Level)', website: 'https://skayaaldogan.meb.k12.tr/', logoColor: 'bg-red-600' },
    { id: '3', name: 'Szkoła Podstawowa nr 9 im. Generała Józefa Wybickiego', country: 'Poland', city: 'Wejherowo', type: 'School / Educational Centre (Primary Level)', website: 'http://www.sp9.wejherowo.pl/', logoColor: 'bg-rose-500' },
    { id: '4', name: 'Kuşadası Eğitimin Renkleri Derneği', country: 'Türkiye', city: 'Aydın', type: 'Non-governmental Organisation / Association', website: 'https://egitiminrenkleri.org.tr/', logoColor: 'bg-blue-600' },
    { id: '5', name: 'Colegiul Național Petru Rareș', country: 'Romania', city: 'Piatra Neamț', type: 'School / Educational Centre (Secondary Level)', website: 'http://www.cnpetrurares.ro/', logoColor: 'bg-yellow-500' }
  ],
  tr: [
    { id: '1', name: 'Agrupamento de Escolas Miguel Torga', country: 'Portekiz', city: 'Bragança', type: 'Okul / Eğitim Merkezi (Ortaöğretim)', website: 'https://aemigueltorga.pt/', logoColor: 'bg-emerald-600' },
    { id: '2', name: 'Şehit Kaya Aldoğan Anadolu Lisesi', country: 'Türkiye', city: 'Aydın', type: 'Okul / Eğitim Merkezi (Ortaöğretim)', website: 'https://skayaaldogan.meb.k12.tr/', logoColor: 'bg-red-600' },
    { id: '3', name: 'Szkoła Podstawowa nr 9 im. Generała Józefa Wybickiego', country: 'Polonya', city: 'Wejherowo', type: 'Okul / Eğitim Merkezi (İlköğretim)', website: 'http://www.sp9.wejherowo.pl/', logoColor: 'bg-rose-500' },
    { id: '4', name: 'Kuşadası Eğitimin Renkleri Derneği', country: 'Türkiye', city: 'Aydın', type: 'Sivil Toplum Kuruluşu / Dernek', website: 'https://egitiminrenkleri.org.tr/', logoColor: 'bg-blue-600' },
    { id: '5', name: 'Colegiul Național Petru Rareș', country: 'Romanya', city: 'Piatra Neamț', type: 'Okul / Eğitim Merkezi (Ortaöğretim)', website: 'http://www.cnpetrurares.ro/', logoColor: 'bg-yellow-500' }
  ],
  pl: [
    { id: '1', name: 'Agrupamento de Escolas Miguel Torga', country: 'Portugalia', city: 'Bragança', type: 'Szkoła / Centrum Edukacyjne (Szkoła Średnia)', website: 'https://aemigueltorga.pt/', logoColor: 'bg-emerald-600' },
    { id: '2', name: 'Şehit Kaya Aldoğan Anadolu Lisesi', country: 'Turcja', city: 'Aydın', type: 'Szkoła / Centrum Edukacyjne (Szkoła Średnia)', website: 'https://skayaaldogan.meb.k12.tr/', logoColor: 'bg-red-600' },
    { id: '3', name: 'Szkoła Podstawowa nr 9 im. Generała Józefa Wybickiego', country: 'Polska', city: 'Wejherowo', type: 'Szkoła / Centrum Edukacyjne (Szkoła Podstawowa)', website: 'http://www.sp9.wejherowo.pl/', logoColor: 'bg-rose-500' },
    { id: '4', name: 'Kuşadası Eğitimin Renkleri Derneği', country: 'Turcja', city: 'Aydın', type: 'Organizacja Pozarządowa / Stowarzyszenie', website: 'https://egitiminrenkleri.org.tr/', logoColor: 'bg-blue-600' },
    { id: '5', name: 'Colegiul Național Petru Rareș', country: 'Rumunia', city: 'Piatra Neamț', type: 'Szkoła / Centrum Edukacyjne (Szkoła Średnia)', website: 'http://www.cnpetrurares.ro/', logoColor: 'bg-yellow-500' }
  ],
  pt: [
    { id: '1', name: 'Agrupamento de Escolas Miguel Torga', country: 'Portugal', city: 'Bragança', type: 'Escola / Centro Educativo (Ensino Secundário)', website: 'https://aemigueltorga.pt/', logoColor: 'bg-emerald-600' },
    { id: '2', name: 'Şehit Kaya Aldoğan Anadolu Lisesi', country: 'Turquia', city: 'Aydın', type: 'Escola / Centro Educativo (Ensino Secundário)', website: 'https://skayaaldogan.meb.k12.tr/', logoColor: 'bg-red-600' },
    { id: '3', name: 'Szkoła Podstawowa nr 9 im. Generała Józefa Wybickiego', country: 'Polónia', city: 'Wejherowo', type: 'Escola / Centro Educativo (Ensino Básico)', website: 'http://www.sp9.wejherowo.pl/', logoColor: 'bg-rose-500' },
    { id: '4', name: 'Kuşadası Eğitimin Renkleri Derneği', country: 'Turquia', city: 'Aydın', type: 'Organização Não Governamental / Associação', website: 'https://egitiminrenkleri.org.tr/', logoColor: 'bg-blue-600' },
    { id: '5', name: 'Colegiul Național Petru Rareș', country: 'Roménia', city: 'Piatra Neamț', type: 'Escola / Centro Educativo (Ensino Secundário)', website: 'http://www.cnpetrurares.ro/', logoColor: 'bg-yellow-500' }
  ],
  ro: [
    { id: '1', name: 'Agrupamento de Escolas Miguel Torga', country: 'Portugalia', city: 'Bragança', type: 'Școală / Centru Educațional (Liceu)', website: 'https://aemigueltorga.pt/', logoColor: 'bg-emerald-600' },
    { id: '2', name: 'Şehit Kaya Aldoğan Anadolu Lisesi', country: 'Turcia', city: 'Aydın', type: 'Școală / Centru Educațional (Liceu)', website: 'https://skayaaldogan.meb.k12.tr/', logoColor: 'bg-red-600' },
    { id: '3', name: 'Szkoła Podstawowa nr 9 im. Generała Józefa Wybickiego', country: 'Polonia', city: 'Wejherowo', type: 'Școală / Centru Educațional (Școală Gimnazială)', website: 'http://www.sp9.wejherowo.pl/', logoColor: 'bg-rose-500' },
    { id: '4', name: 'Kuşadası Eğitimin Renkleri Derneği', country: 'Turcia', city: 'Aydın', type: 'Organizație Neguvernamentală / Asociație', website: 'https://egitiminrenkleri.org.tr/', logoColor: 'bg-blue-600' },
    { id: '5', name: 'Colegiul Național Petru Rareș', country: 'România', city: 'Piatra Neamț', type: 'Școală / Centru Educațional (Liceu)', website: 'http://www.cnpetrurares.ro/', logoColor: 'bg-yellow-500' }
  ]
};

export const activitiesData: Record<Language, Activity[]> = {
  en: [
    {
      id: 'act-1',
      title: 'Basic Level Composition Training',
      location: 'Poland (Wejherowo)',
      type: 'Educational Activity',
      description: 'Focused on welcoming participants and establishing the baseline for musical creativity. Students and teachers worked together on basic musical components.',
      outputs: ['Melody completion exercises', 'Body percussion routines', 'Basic-level digital composition training']
    },
    {
      id: 'act-2',
      title: 'Digital Recording & Product Creation',
      location: 'Türkiye (Aydın)',
      type: 'Educational Activity',
      description: 'Hands-on technical training for music teachers and educators, focusing on implementing digital music applications inside school curricula.',
      outputs: ['Training on using sound cards and sound editing software', 'Joint digital music product creation by music teachers', 'Integration of digital music applications into lesson plans']
    },
    {
      id: 'act-3',
      title: 'Cultural Interaction & Psychosocial Support',
      location: 'Romania (Piatra Neamț)',
      type: 'Educational Activity',
      description: 'Focused on social integration and using music as a therapeutic tool for psychosocial support to help migrant students integrate into host schools.',
      outputs: ['Cultural Interaction Workshop', 'Psychosocial support presentations and methods for migrants']
    },
    {
      id: 'act-local',
      title: 'Project Local Initiatives & Materials',
      location: 'All Partner Countries',
      type: 'Local Activities',
      description: 'A comprehensive suite of local activities designed to set up physical infrastructure and produce guides that ensure project sustainability.',
      outputs: [
        'Establishment of digital music recording studios in schools',
        'Preparation of the Digital Literacy E-guide & Social Integration E-guide',
        'Designing digital music-based lesson plans',
        'Hosting the collaborative Online Concert and the Final Competition',
        'Hosting the Final Conference & Creating a collaborative digital community'
      ]
    }
  ],
  tr: [
    {
      id: 'act-1',
      title: 'Temel Düzey Kompozisyon Eğitimi',
      location: 'Polonya (Wejherowo)',
      type: 'Eğitim Aktivitesi',
      description: 'Katılımcıları karşılamaya ve müzikal yaratıcılığın temelini oluşturmaya odaklanıldı. Öğrenciler ve öğretmenler temel müzikal bileşenler üzerinde birlikte çalıştılar.',
      outputs: ['Melodi tamamlama egzersizleri', 'Beden perküsyonu rutinleri', 'Temel düzeyde dijital kompozisyon eğitimi']
    },
    {
      id: 'act-2',
      title: 'Dijital Kayıt ve Ortak Ürün Hazırlama',
      location: 'Türkiye (Aydın)',
      type: 'Eğitim Aktivitesi',
      description: 'Müzik öğretmenleri ve eğitmenler için dijital müzik uygulamalarını okul müfredatına entegre etmeye odaklanan uygulamalı teknik eğitim.',
      outputs: ['Ses kartları ve ses düzenleme yazılımlarının kullanımı üzerine eğitim', 'Müzik öğretmenleri tarafından ortak dijital müzik ürünü oluşturulması', 'Dijital müzik uygulamalarının ders içeriklerine entegrasyonu']
    },
    {
      id: 'act-3',
      title: 'Kültürel Etkileşim & Psikososyal Destek',
      location: 'Romanya (Piatra Neamț)',
      type: 'Eğitim Aktivitesi',
      description: 'Sosyal uyuma ve göçmen öğrencilerin ev sahibi okullara entegrasyonuna yardımcı olmak için müziğin terapötik bir araç olarak kullanılmasına odaklanıldı.',
      outputs: ['Kültürel Etkileşim Çalıştayı', 'Göçmenler için psikososyal destek sunumu ve yöntemleri']
    },
    {
      id: 'act-local',
      title: 'Proje Yerel Faaliyetleri & Çıktılar',
      location: 'Tüm Ortak Ülkeler',
      type: 'Yerel Faaliyetler',
      description: 'Fiziksel altyapıyı kurmak ve proje sürdürülebilirliğini sağlamak için hazırlanan kılavuzları üreten kapsamlı yerel faaliyetler zinciri.',
      outputs: [
        'Okullarda dijital müzik kayıt stüdyolarının kurulması',
        'Dijital Okuryazarlık E-kılavuzu ve Sosyal Uyum E-kılavuzunun hazırlanması',
        'Dijital müzik tabanlı ders planlarının tasarlanması',
        'Çevrimiçi Konser ve Final Yarışmasının düzenlenmesi',
        'Final Konferansı & İletişim için işbirlikçi dijital topluluk kurulması'
      ]
    }
  ],
  pl: [
    {
      id: 'act-1',
      title: 'Edukacja Kompozytorska na Poziomie Podstawowym',
      location: 'Polska (Wejherowo)',
      type: 'Aktywność Edukacyjna',
      description: 'Skupiono się na powitaniu uczestników i ustaleniu podstaw kreatywności muzycznej. Uczniowie i nauczyciele pracowali wspólnie nad podstawowymi komponentami muzycznymi.',
      outputs: ['Ćwiczenia uzupełniania melodii', 'Rytmy perkusji ciała', 'Podstawowe szkolenie z zakresu kompozycji cyfrowej']
    },
    {
      id: 'act-2',
      title: 'Nagrania Cyfrowe i Tworzenie Wspólnego Produktu',
      location: 'Turcja (Aydın)',
      type: 'Aktywność Edukacyjna',
      description: 'Praktyczne szkolenie techniczne dla nauczycieli muzyki i edukatorów, koncentrujące się na wdrażaniu cyfrowych aplikacji muzycznych w programach szkolnych.',
      outputs: ['Szkolenie z obsługi kart dźwiękowych i oprogramowania do edycji dźwięku', 'Wspólne tworzenie cyfrowych utworów muzycznych przez nauczycieli muzyki', 'Integracja cyfrowych aplikacji muzycznych z planami lekcji']
    },
    {
      id: 'act-3',
      title: 'Interakcja Kulturowa i Wsparcie Psychospołeczne',
      location: 'Rumunia (Piatra Neamț)',
      type: 'Aktywność Edukacyjna',
      description: 'Skupiono się na integracji społecznej i wykorzystaniu muzyki jako narzędzia terapeutycznego w celu wsparcia psychospołecznego uczniów-migrantów.',
      outputs: ['Warsztaty Interakcji Kulturowej', 'Prezentacje i metody wsparcia psychospołecznego dla migrantów']
    },
    {
      id: 'act-local',
      title: 'Lokalne Inicjatywy i Materiały Projektowe',
      location: 'Wszystkie Kraje Partnerskie',
      type: 'Lokalne Działania',
      description: 'Kompleksowy zestaw lokalnych działań mających na celu utworzenie infrastruktury fizycznej i przygotowanie e-przewodników zapewniających trwałość projektu.',
      outputs: [
        'Utworzenie cyfrowych studiów nagrań muzycznych w szkołach',
        'Przygotowanie E-przewodnika po Kompetencjach Cyfrowych oraz E-przewodnika po Integracji Społecznej',
        'Projektowanie planów lekcji opartych na muzyce cyfrowej',
        'Organizacja Koncertu Online i Konkursu Finałowego',
        'Organizacja Konferencji Finałowej i budowa cyfrowej społeczności współpracy'
      ]
    }
  ],
  pt: [
    {
      id: 'act-1',
      title: 'Formação Básica de Composição',
      location: 'Polónia (Wejherowo)',
      type: 'Atividade Educativa',
      description: 'Focado em acolher os participantes e estabelecer as bases da criatividade musical. Alunos e professores trabalharam juntos em componentes musicais básicas.',
      outputs: ['Exercícios de conclusão de melodia', 'Rotinas de percussão corporal', 'Formação básica de composição digital']
    },
    {
      id: 'act-2',
      title: 'Gravação Digital e Criação Conjunta de Produtos',
      location: 'Turquia (Aydın)',
      type: 'Atividade Educativa',
      description: 'Formação técnica prática para professores de música, focando na implementação de aplicações de música digital no currículo escolar.',
      outputs: ['Formação sobre utilização de placas de som e software de edição de áudio', 'Criação conjunta de produtos de música digital por professores de música', 'Integração de aplicações de música digital nos planos de aula']
    },
    {
      id: 'act-3',
      title: 'Interação Cultural e Apoio Psicossocial',
      location: 'Roménia (Piatra Neamț)',
      type: 'Atividade Educativa',
      description: 'Focado na integração social e no uso da música como ferramenta terapêutica para apoio psicossocial aos alunos migrantes na integração escolar.',
      outputs: ['Workshop de Interação Cultural', 'Apresentações e metodologias de apoio psicossocial para migrantes']
    },
    {
      id: 'act-local',
      title: 'Iniciativas Locais e Materiais do Projeto',
      location: 'Todos os Países Parceiros',
      type: 'Atividades Locais',
      description: 'Um conjunto abrangente de atividades locais para estabelecer infraestruturas físicas e produzir e-guias que garantem a sustentabilidade do projeto.',
      outputs: [
        'Criação de estúdios de gravação de música digital nas escolas',
        'Preparação do E-guia de Literacia Digital e E-guia de Integração Social',
        'Desenho de planos de aula baseados em música digital',
        'Realização de Concerto Online e Competição Final',
        'Realização da Conferência Final e criação de uma comunidade digital colaborativa'
      ]
    }
  ],
  ro: [
    {
      id: 'act-1',
      title: 'Formare în Compoziție de Nivel Basic',
      location: 'Polonia (Wejherowo)',
      type: 'Activitate Educațională',
      description: 'Concentrat pe primirea participanților și stabilirea bazelor creativității muzicale. Elevii și profesorii au lucrat împreună la elemente muzicale de bază.',
      outputs: ['Exerciții de completare a melodiei', 'Rutine de percuție corporală', 'Instruire în compoziție digitală la nivel de bază']
    },
    {
      id: 'act-2',
      title: 'Înregistrare Digitală și Creare de Produse Comune',
      location: 'Turcia (Aydın)',
      type: 'Activitate Educațională',
      description: 'Formare tehnică practică pentru profesorii de muzică, concentrată pe implementarea aplicațiilor de muzică digitală în curriculumul școlar.',
      outputs: ['Formare privind utilizarea plăcilor de sunet și a software-ului de editare audio', 'Crearea în comun de produse de muzică digitală de către profesorii de muzică', 'Integrarea aplicațiilor de muzică digitală în planurile de lecție']
    },
    {
      id: 'act-3',
      title: 'Interacțiune Culturală și Sprijin Psihosocial',
      location: 'România (Piatra Neamț)',
      type: 'Activitate Educațională',
      description: 'Concentrat pe integrarea socială și utilizarea muzicii ca instrument terapeutic pentru sprijinul psihosocial al elevilor migranți în școlile gazdă.',
      outputs: ['Atelier de Interacțiune Culturală', 'Prezentări și metode de sprijin psihosocial pentru migranți']
    },
    {
      id: 'act-local',
      title: 'Inițiative Locale și Materiale ale Proiectului',
      location: 'Toate Țările Partenere',
      type: 'Activități Locale',
      description: 'O suită cuprinzătoare de activități locale menite să stabilească infrastructura fizică și să producă ghiduri care asigură sustenabilitatea proiectului.',
      outputs: [
        'Înființarea de studiouri de înregistrare a muzicii digitale în școli',
        'Pregătirea E-ghidului de Competențe Digitale și E-ghidului de Integrare Socială',
        'Proiectarea planurilor de lecție bazate pe muzică digitală',
        'Organizarea Concertului Online și a Competiției Finale',
        'Găzduirea Conferinței Finale și crearea unei comunități digitale colaborative'
      ]
    }
  ]
};

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Project',
      partners: 'Partners',
      activities: 'Activities & Mobilities',
      gallery: 'Gallery'
    },
    hero: {
      tagline: 'Erasmus+ Project',
      titleAccent: 'Digital Music',
      titleMain: 'for Migrants',
      description: 'Integrating migrant students through the universal language of music and digital sound technologies.',
      ctaPrimary: 'Explore Activities',
      ctaSecondary: 'Meet Partners'
    },
    project: {
      objectivesTitle: 'Objectives',
      objectivesText: 'The project aims to contribute to the socio-cultural integration process of migrant students (referred to as "Migrant" or "GÖ" in some contexts) through a student-centered methodology, while fostering an institutional culture in which students from diverse cultural backgrounds learn and interact in harmony. It also seeks to encourage students\' creativity and enhance their digital competencies.',
      resultsTitle: 'Expected Project Results',
      resultsText: 'The program seeks to establish physical and pedagogical frameworks that outlast the project lifecycle, building bridges between communities through modern technology and music creation.',
      expectedResultsList: [
        'Main output: Digital Music-Based Orientation System.',
        'Establishing digital music recording studios in partner schools.',
        'Fostering social integration through composing and recording original music by local and migrant students.',
        'Integrating digital music-based lesson plans into school curricula.',
        'Creating a sustainable international network among schools, NGOs, and education authorities.'
      ]
    },
    targetGroups: {
      title: 'Target Groups',
      subtitle: 'Who benefits from the Digital Music for Migrants project?',
      primaryTitle: 'Primary Target Groups',
      primaryDesc: 'Direct participants who interact with the core pedagogical methodologies and tools.',
      primaryItems: [
        'Migrant students facing language barriers and social integration challenges.',
        'Local students expanding their global awareness and engaging in intercultural dialogue.',
        'Teachers integrating digital music tools and inclusive learning into curricula.',
        'School administrators implementing inclusive policies and new music courses.'
      ],
      secondaryTitle: 'Secondary Target Groups',
      secondaryDesc: 'Indirect beneficiaries who shape and are shaped by the integration frameworks.',
      secondaryItems: [
        'Families of migrant students participating in their children\'s educational journey.',
        'Local and international educational authorities assessing school integration models.',
        'Policy makers seeking strategies to adopt digital music-based educational modules.',
        'Academics and researchers studying educational technologies and migrant integration.',
        'Members of local communities impacted by social integration challenges.'
      ]
    },
    partnersSection: {
      title: 'Project Partners',
      subtitle: 'A collaborative network of schools and associations across 4 European countries.',
      visitWebsite: 'Visit official website',
      roles: {
        coordinator: 'Project Coordinator',
        partner: 'Partner Institution'
      }
    },
    activitiesSection: {
      title: 'Trainings & Activities',
      subtitle: 'Documenting our international mobilities, training modules, and local creations.',
      educationalTitle: 'International Mobilities',
      localTitle: 'Local Operations',
      timelineTitle: 'Mobility Timeline'
    },
    gallerySection: {
      title: 'Media Gallery',
      subtitle: 'Capturing moments from our recording studios, workshops, and music-making activities.',
      categories: {
        all: 'All Photos',
        poland: 'Poland Mobility',
        turkiye: 'Türkiye Mobility',
        romania: 'Romania Mobility'
      }
    },
    footer: {
      euDisclaimer: 'Co-funded by the Erasmus+ Programme of the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor the granting authority can be held responsible for them.',
      copyright: '© 2026 Digital Music For Migrants. All Rights Reserved.'
    }
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Proje Hakkında',
      partners: 'Ortaklar',
      activities: 'Faaliyetler & Hareketlilikler',
      gallery: 'Galeri'
    },
    hero: {
      tagline: 'Erasmus+ Projesi',
      titleAccent: 'Dijital Müzik',
      titleMain: 'Göçmenler İçin',
      description: 'Göçmen öğrencilerin, müziğin evrensel dili ve dijital ses teknolojileri aracılığıyla sosyo-kültürel entegrasyonunu sağlamak.',
      ctaPrimary: 'Faaliyetleri Keşfet',
      ctaSecondary: 'Ortakları Tanı'
    },
    project: {
      objectivesTitle: 'Hedefler',
      objectivesText: 'Gömen öğrencilerin (Gö kısaltması kullanılacak) sosyokültürel uyum sürecine öğrenci merkezli metodolojiyle katkı sağlamak, farklı kültürlere sahip öğrencilerin, uyum içerisinde eğitim aldıkları kurum kültürü geliştirmek, öğrencilerin yaratıcılığını teşvik etmek, dijital becerilerini geliştirmek hedeflenmektedir. Öğretmenlerin dijital becerilerinin gelişmesi, eğitime yenilikçi, yaratıcı yaklaşımla katkı sağlaması hedeflenmektedir.',
      resultsTitle: 'Beklenen Proje Sonuçları',
      resultsText: 'Program, modern teknoloji ve müzik üretimi yoluyla topluluklar arasında köprüler kurarak, proje döngüsünün ötesinde fiziksel ve pedagojik çerçeveler oluşturmayı hedeflemektedir.',
      expectedResultsList: [
        'Ana çıktı: Dijital Müzik Tabanlı Oryantasyon Sistemi.',
        'Katılımcı okullarda dijital ses kayıt stüdyolarının kurulması.',
        'Yerel ve göçmen öğrencilerin kültürel etkileşim ve kendi özgün müziklerini yazıp kaydetmeleri yoluyla sosyal uyum.',
        'Dijital müzik tabanlı ders planlarının müfredata entegre edilmesi.',
        'Okullar, STK\'lar ve eğitim otoriteleri arasında sürdürülebilir bir uluslararası ağ oluşturulması.'
      ]
    },
    targetGroups: {
      title: 'Hedef Gruplar',
      subtitle: 'Dijital Müzik Göçmenler İçin projesinden kimler yararlanıyor?',
      primaryTitle: 'Birincil Hedef Gruplar',
      primaryDesc: 'Temel pedagojik metodolojiler ve araçlarla doğrudan etkileşime giren katılımcılar.',
      primaryItems: [
        'Ev sahibi ülkenin eğitim sistemine yeni katılan, dil bariyeri ve sosyal uyum sorunu yaşayan Göçmen öğrenciler.',
        'Kültürel çeşitliliği öğrenerek küresel farkındalığını artıran yerel öğrenciler.',
        'Dijital müzik araçlarını müfredatta etkin bir şekilde kullanmayı öğrenen ve kapsayıcı eğitim yaklaşımlarını benimseyen öğretmenler.',
        'Projede geliştirilen ders içeriklerini uygulayan ve entegrasyonu destekleyen okul yöneticileri ve okullar.'
      ],
      secondaryTitle: 'İkincil Hedef Gruplar',
      secondaryDesc: 'Entegrasyon modellerini şekillendiren ve bu modellerden dolaylı olarak etkilenen yararlanıcılar.',
      secondaryItems: [
        'Çocuklarının eğitim sürecine aktif katılım gösteren Göçmen aileleri.',
        'Proje çıktılarının eğitim sistemine entegrasyonunu değerlendiren yerel ve uluslararası eğitim otoriteleri.',
        'Dijital müzik tabanlı eğitim modellerini politika haline getirmeyi hedefleyen karar alıcılar.',
        'Eğitimde müziğin ve dijital araçların etkisini inceleyen akademisyenler ve araştırmacılar.',
        'Göçmen öğrencilerin sosyal uyum sorunlarının etkilerine maruz kalan yerel halk.'
      ]
    },
    partnersSection: {
      title: 'Proje Ortakları',
      subtitle: '4 Avrupa ülkesinden okullar ve derneklerden oluşan işbirlikçi ağ.',
      visitWebsite: 'Resmi web sitesini ziyaret et',
      roles: {
        coordinator: 'Proje Koordinatörü',
        partner: 'Ortak Kurum'
      }
    },
    activitiesSection: {
      title: 'Eğitimler & Faaliyetler',
      subtitle: 'Uluslararası hareketliliklerimizin, eğitim modüllerimizin ve yerel üretimlerimizin dökümantasyonu.',
      educationalTitle: 'Uluslararası Hareketlilikler',
      localTitle: 'Yerel Çalışmalar',
      timelineTitle: 'Hareketlilik Zaman Çizelgesi'
    },
    gallerySection: {
      title: 'Medya Galerisi',
      subtitle: 'Kayıt stüdyolarımızdan, çalıştaylarımızdan ve müzik yapım süreçlerimizden anlar.',
      categories: {
        all: 'Tüm Fotoğraflar',
        poland: 'Polonya Hareketliliği',
        turkiye: 'Türkiye Hareketliliği',
        romania: 'Romanya Hareketliliği'
      }
    },
    footer: {
      euDisclaimer: 'Avrupa Birliği Erasmus+ Programı tarafından ortaklaşa finanse edilmektedir. Ancak ifade edilen görüşler ve fikirler yalnızca yazar(lar)a aittir ve Avrupa Birliği\'nin veya Avrupa Eğitim ve Kültür Yürütme Ajansı\'nın (EACEA) görüşlerini yansıtmayabilir. Bunlardan ne Avrupa Birliği ne de hibeyi veren makam sorumlu tutulamaz.',
      copyright: '© 2026 Digital Music For Migrants. Tüm Hakları Saklıdır.'
    }
  },
  pl: {
    nav: {
      home: 'Strona Główna',
      about: 'O projekcie',
      partners: 'Partnerzy',
      activities: 'Działania i Mobilności',
      gallery: 'Galeria'
    },
    hero: {
      tagline: 'Projekt Erasmus+',
      titleAccent: 'Muzyka Cyfrowa',
      titleMain: 'dla Migrantów',
      description: 'Integracja uczniów-migrantów za pomocą uniwersalnego języka muzyki i cyfrowych technologii dźwiękowych.',
      ctaPrimary: 'Poznaj Działania',
      ctaSecondary: 'Poznaj Partnerów'
    },
    project: {
      objectivesTitle: 'Cele projektu',
      objectivesText: 'Projekt ma na celu wspieranie procesu integracji społeczno-kulturowej uczniów-migrantów poprzez metodologię skoncentrowaną na uczniu, przy jednoczesnym rozwijaniu kultury instytucjonalnej, w której uczniowie z różnych środowisk uczą się i współpracują w harmonii. Dąży również do stymulowania kreatywności uczniów i rozwijania ich kompetencji cyfrowych.',
      resultsTitle: 'Oczekiwane rezultaty',
      resultsText: 'Program dąży do ustanowienia trwałych struktur fizycznych i pedagogicznych, wykraczających poza czas trwania projektu, budując mosty między społecznościami przy użyciu nowoczesnych technologii i muzyki.',
      expectedResultsList: [
        'Główny rezultat: System Orientacji Oparty na Muzyce Cyfrowej.',
        'Utworzenie cyfrowych studiów nagrań muzycznych w szkołach partnerskich.',
        'Wspieranie integracji poprzez komponowanie i nagrywanie autorskiej muzyki przez uczniów lokalnych i migrantów.',
        'Integracja planów lekcji opartych na muzyce cyfrowej z programem szkolnym.',
        'Budowa trwałej międzynarodowej sieci współpracy szkół, organizacji pozarządowych i władz oświatowych.'
      ]
    },
    targetGroups: {
      title: 'Grupy Docelowe',
      subtitle: 'Kto zyskuje dzięki projektowi Digital Music for Migrants?',
      primaryTitle: 'Pierwszorzędowe Grupy Docelowe',
      primaryDesc: 'Bezpośredni uczestnicy wchodzący w interakcję z podstawowymi metodami i narzędziami pedagogicznymi.',
      primaryItems: [
        'Uczniowie-migranci napotykający bariery językowe i wyzwania związane z integracją społeczną.',
        'Lokalni uczniowie poszerzający świadomość globalną i angażujący się w dialog międzykulturowy.',
        'Nauczyciele wdrażający cyfrowe narzędzia muzyczne i włączające nauczanie do programów lekcji.',
        'Administratorzy szkół wdrażający politykę włączającą i nowe kursy muzyczne.'
      ],
      secondaryTitle: 'Drugorzędowe Grupy Docelowe',
      secondaryDesc: 'Pośredni beneficjenci, którzy współkształtują ramy integracyjne.',
      secondaryItems: [
        'Rodziny uczniów-migrantów uczestniczące w ścieżce edukacyjnej swoich dzieci.',
        'Lokalne i międzynarodowe władze oświatowe oceniające modele integracji szkolnej.',
        'Decydenci poszukujący strategii wdrażania modułów edukacyjnych opartych na muzyce cyfrowej.',
        'Akademicy i badacze zajmujący się technologiami edukacyjnymi oraz integracją migrantów.',
        'Członkowie społeczności lokalnych odczuwający wyzwania integracji społecznej.'
      ]
    },
    partnersSection: {
      title: 'Partnerzy Projektu',
      subtitle: 'Sieć współpracy szkół i stowarzyszeń z 4 krajów europejskich.',
      visitWebsite: 'Odwiedź oficjalną stronę',
      roles: {
        coordinator: 'Koordynator Projektu',
        partner: 'Instytucja Partnerska'
      }
    },
    activitiesSection: {
      title: 'Szkolenia i Działania',
      subtitle: 'Dokumentacja naszych międzynarodowych mobilności, modułów szkoleniowych i lokalnych inicjatyw.',
      educationalTitle: 'Mobilności Międzynarodowe',
      localTitle: 'Działania Lokalne',
      timelineTitle: 'Harmonogram Mobilności'
    },
    gallerySection: {
      title: 'Galeria Mediów',
      subtitle: 'Zdjęcia z naszych studiów nagraniowych, warsztatów i sesji tworzenia muzyki.',
      categories: {
        all: 'Wszystkie zdjęcia',
        poland: 'Mobilność w Polsce',
        turkiye: 'Mobilność w Turcji',
        romania: 'Mobilność w Rumunii'
      }
    },
    footer: {
      euDisclaimer: 'Współfinansowane przez program Erasmus+ Unii Europejskiej. Wyrażone opinie i poglądy są jednak wyłącznie opiniami autora (autorów) i niekoniecznie odzwierciedlają poglądy Unii Europejskiej lub Europejskiej Agencji Wykonawczej ds. Edukacji i Kultury (EACEA). Ani Unia Europejska, ani organ przyznający dofinansowanie nie ponoszą za nie odpowiedzialności.',
      copyright: '© 2026 Digital Music For Migrants. Wszelkie prawa zastrzeżone.'
    }
  },
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre o projeto',
      partners: 'Parceiros',
      activities: 'Atividades e Mobilidades',
      gallery: 'Galeria'
    },
    hero: {
      tagline: 'Projeto Erasmus+',
      titleAccent: 'Música Digital',
      titleMain: 'para Migrantes',
      description: 'Integração de alunos migrantes através da linguagem universal da música e de tecnologias digitais de som.',
      ctaPrimary: 'Ver Atividades',
      ctaSecondary: 'Ver Parceiros'
    },
    project: {
      objectivesTitle: 'Objetivos',
      objectivesText: 'O projeto visa contribuir para o processo de integração sociocultural de alunos migrantes através de uma metodologia centrada no aluno, ao mesmo tempo que promove uma cultura institucional onde alunos de origens culturais diversas aprendem e interagem em harmonia.',
      resultsTitle: 'Resultados Esperados',
      resultsText: 'O programa procura estabelecer estruturas físicas e pedagógicas duradouras que sobrevivam ao ciclo de vida do projeto, criando pontes através da tecnologia moderna.',
      expectedResultsList: [
        'Principal resultado: Sistema de Orientação Baseado em Música Digital.',
        'Criação de estúdios de gravação de música digital nas escolas parceiras.',
        'Promoção da integração social através da composição e gravação de música original por alunos locais e migrantes.',
        'Integração de planos de aula baseados em música digital nos currículos escolares.',
        'Construção de uma rede sustentável internacional entre escolas, ONGs e autoridades de educação.'
      ]
    },
    targetGroups: {
      title: 'Grupos-Alvo',
      subtitle: 'Quem beneficia com o projeto Digital Music for Migrants?',
      primaryTitle: 'Grupos-Alvo Primários',
      primaryDesc: 'Participantes diretos que interagem com as metodologias e ferramentas pedagógicas.',
      primaryItems: [
        'Alunos migrantes que enfrentam barreiras linguísticas e desafios de integração social.',
        'Alunos locais que aumentam a sua consciência global e participam no diálogo intercultural.',
        'Professores que integram ferramentas de música digital e aprendizagem inclusiva nos currículos.',
        'Diretores escolares que aplicam políticas inclusivas e introduzem novos cursos de música.'
      ],
      secondaryTitle: 'Grupos-Alvo Secundários',
      secondaryDesc: 'Beneficiários indiretos que influenciam as estruturas de integração.',
      secondaryItems: [
        'Famílias de alunos migrantes que participam no percurso educativo dos seus filhos.',
        'Autoridades educativas locais e internacionais que avaliam os modelos de integração escolar.',
        'Decisores políticos que procuram estratégias para adotar modelos educativos baseados em música digital.',
        'Académicos e investigadores que estudam tecnologias educativas e integração de migrantes.',
        'Membros das comunidades locais que sofrem o impacto dos desafios de integração.'
      ]
    },
    partnersSection: {
      title: 'Parceiros do Projeto',
      subtitle: 'Uma rede colaborativa de escolas e associações de 4 países europeus.',
      visitWebsite: 'Visitar site oficial',
      roles: {
        coordinator: 'Coordenador do Projeto',
        partner: 'Instituição Parceira'
      }
    },
    activitiesSection: {
      title: 'Formação & Atividades',
      subtitle: 'Documentação das nossas mobilidades internacionais, módulos de formação e iniciativas locais.',
      educationalTitle: 'Mobilidades Internacionais',
      localTitle: 'Atividades Locais',
      timelineTitle: 'Linha Temporal de Mobilidade'
    },
    gallerySection: {
      title: 'Galeria de Mídia',
      subtitle: 'Momentos captados nos nossos estúdios de gravação, workshops e processos de criação musical.',
      categories: {
        all: 'Todas as Fotos',
        poland: 'Mobilidade na Polónia',
        turkiye: 'Mobilidade na Turquia',
        romania: 'Mobilidade na Roménia'
      }
    },
    footer: {
      euDisclaimer: 'Co-financiado pelo programa Erasmus+ da União Europeia. No entanto, os pontos de vista e opiniões expressos são apenas os do(s) autor(es) e não refletem necessariamente os da União Europeia ou da Agência de Execução Europeia da Educação e da Cultura (EACEA). Nem a União Europeia nem a autoridade que concede o financiamento podem ser consideradas responsáveis por eles.',
      copyright: '© 2026 Digital Music For Migrants. Todos os direitos reservados.'
    }
  },
  ro: {
    nav: {
      home: 'Acasă',
      about: 'Despre proiect',
      partners: 'Parteneri',
      activities: 'Activități și Mobilități',
      gallery: 'Galerie'
    },
    hero: {
      tagline: 'Proiect Erasmus+',
      titleAccent: 'Muzică Digitală',
      titleMain: 'pentru Migranți',
      description: 'Integrarea elevilor migranți prin limbajul universal al muzicii și tehnologiile digitale de sunet.',
      ctaPrimary: 'Explorați Activitățile',
      ctaSecondary: 'Faceți cunoștință cu partenerii'
    },
    project: {
      objectivesTitle: 'Obiective',
      objectivesText: 'Proiectul își propune să contribuie la procesul de integrare socio-culturală a elevilor migranți printr-o metodologie centrată pe elev, promovând în același timp o cultură instituțională în care elevii din medii culturale diverse învață și interacționează în armonie.',
      resultsTitle: 'Rezultate Așteptate',
      resultsText: 'Programul caută să stabilească cadre fizice și pedagogice durabile care să depășească ciclul de viață al proiectului, construind punți prin tehnologia modernă.',
      expectedResultsList: [
        'Rezultat principal: Sistem de Orientare Bazat pe Muzică Digitală.',
        'Înființarea de studiouri de înregistrare a muzicii digitale în școlile partenere.',
        'Promovarea integrării sociale prin compunerea și înregistrarea de muzică originală de către elevii locali și migranți.',
        'Integrarea planurilor de lecție bazate pe muzică digitală în curriculumul școlar.',
        'Crearea unei rețele internaționale durabile între școli, ONG-uri și autorități educaționale.'
      ]
    },
    targetGroups: {
      title: 'Grupuri Țintă',
      subtitle: 'Cine beneficiază de proiectul Digital Music for Migrants?',
      primaryTitle: 'Grupuri Țintă Principale',
      primaryDesc: 'Participanți direcți care interacționează cu metodologiile și instrumentele pedagogice de bază.',
      primaryItems: [
        'Elevii migranți care se confruntă cu bariere lingvistice și provocări de integrare socială.',
        'Elevii locali care își extind conștiința globală și se angajează în dialogul intercultural.',
        'Profesorii care integrează instrumentele muzicale digitale și învățarea incluzivă în curriculum.',
        'Administratorii școlari care implementează politici incluzive și noi cursuri de muzică.'
      ],
      secondaryTitle: 'Grupuri Țintă Secundare',
      secondaryDesc: 'Beneficiari indirecți care influențează sau sunt influențați de cadrele de integrare.',
      secondaryItems: [
        'Familiile elevilor migranți care participă activ la parcursul educațional al copiilor lor.',
        'Autoritățile educaționale locale și internaționale care evaluează modelele de integrare școlară.',
        'Decidenții politici care caută strategii de adoptare a modulelor educaționale bazate pe muzică digitală.',
        'Academicieni și cercetători care studiază tehnologiile educaționale și integrarea migranților.',
        'Membrii comunităților locale afectați de provocările integrării sociale.'
      ]
    },
    partnersSection: {
      title: 'Partenerii Proiectului',
      subtitle: 'O rețea colaborativă de școli și asociații din 4 țări europene.',
      visitWebsite: 'Vizitați site-ul oficial',
      roles: {
        coordinator: 'Coordonator Proiect',
        partner: 'Instituție Parteneră'
      }
    },
    activitiesSection: {
      title: 'Instruire și Activități',
      subtitle: 'Documentarea mobilităților noastre internaționale, a modulelor de instruire și a activităților locale.',
      educationalTitle: 'Mobilități Internaționale',
      localTitle: 'Activități Locale',
      timelineTitle: 'Calendarul Mobilităților'
    },
    gallerySection: {
      title: 'Galerie Media',
      subtitle: 'Momente surprinse în studiourile noastre de înregistrare, ateliere și activități de creație muzicală.',
      categories: {
        all: 'Toate Pozele',
        poland: 'Mobilitate în Polonia',
        turkiye: 'Mobilitate în Turcia',
        romania: 'Mobilitate în România'
      }
    },
    footer: {
      euDisclaimer: 'Co-finanțat de programul Erasmus+ al Uniunii Europene. Opiniile și părerile exprimate aparțin totuși exclusiv autorilor și nu reflectă neapărat punctele de vedere ale Uniunii Europene sau ale Agenției Executive Europene pentru Educație și Cultură (EACEA). Nici Uniunea Europeană și nici autoritatea finanțatoare nu pot fi considerate responsabile pentru acestea.',
      copyright: '© 2026 Digital Music For Migrants. Toate drepturile rezervate.'
    }
  }
};
