const project = {
  name: 'GureGipuzkoa',
  folder: 'guregipuzkoa',
  languages: ['eu', 'es', 'fr', 'en'],
  themes: ['dark', 'light'],
  title: {
    es: 'Explora 159 013 fotografías históricas de Guipúzcoa',
    eu: 'Arakatu Gipuzkoako 159.013 argazki historiko',
    en: 'Explore 159,013 historic photographs of Gipuzkoa',
    fr: 'Explorez 159 013 photographies historiques de Guipuscoa',
  },
  image: (id) =>
    `https://guregipuzkoa.s3.eu-south-2.amazonaws.com/optimized/${id}.avif`,
  metadata: (id) =>
    `https://guregipuzkoa.s3.eu-south-2.amazonaws.com/metadata/${id}.json`,
  index: (folder, id) =>
    `https://guregipuzkoa.s3.eu-south-2.amazonaws.com/indices/${folder}/${id}.json`,
  galleries: [
    {
      id: 'baserriak',
      images: ['10567', '11911', '2191', '12191', '14191', '28191', '27111'],
    },
    {
      id: 'erretratuak',
      images: ['10567', '11911', '2191', '12191', '14191', '28191', '27111'],
    },
    {
      id: 'lana',
      images: ['10567', '11911', '2191', '12191', '14191', '28191', '27111'],
    },
    {
      id: 'natura',
      images: ['10567', '11911', '2191', '12191', '14191', '28191', '27111'],
    },
    {
      id: 'kirolak',
      images: ['119112', '132316', '132723', '1018403', '1015024', '1011420'],
    },
    {
      id: 'bazterrak',
      images: ['119112', '132316', '132723', '1018403', '1015024', '1021414'],
    },
  ],
  collections: [
    {
      id: 'beasaingo_udala',
      title: {
        es: 'Ayuntamiento de Beasain',
        eu: 'Beasaingo Udala',
        en: 'City Council of Beasain',
        fr: 'Mairie de Beasain',
      },
    },
    {
      id: 'oñatiko_udala',
      title: {
        es: 'Archivo Municipal de Oñate',
        eu: 'Oñatiko Udal Artxiboa',
        en: 'City Council of Oñati',
        fr: "Mairie d'Oñati",
      },
    },
    {
      id: 'hondarribiko_udala',
      title: {
        es: 'Ayuntamiento de Hondarribia',
        eu: 'Hondarribiko Udala',
        en: 'City Council of Hondarribia',
        fr: "Mairie d'Hondarribia",
      },
    },
    {
      id: 'pasaiako_udala',
      title: {
        es: 'Ayuntamiento de Pasaia',
        eu: 'Pasaiako Udala',
        en: 'City Council of Pasaia',
        fr: 'Mairie de Pasaia',
      },
    },
    {
      id: 'urnietako_udala',
      title: {
        es: 'Ayuntamiento de Urnieta',
        eu: 'Urnietako Udala',
        en: 'City Council of Urnieta',
        fr: "Mairie d'Urnieta",
      },
    },
    {
      id: 'zaldibiako_udala',
      title: {
        es: 'Ayuntamiento de Zaldibia',
        eu: 'Zaldibiako Udala',
        en: 'City Council of Zaldibia',
        fr: 'Mairie de Zaldibia',
      },
    },
    {
      id: 'zestoako_udala',
      title: {
        es: 'Ayuntamiento de Zestoa',
        eu: 'Zestoako Udala',
        en: 'City Council of Zestoa',
        fr: 'Mairie de Zestoa',
      },
    },
    {
      id: 'gure_zarautz',
      title: {
        es: 'Nuestro Zarautz',
        eu: 'Gure Zarautz',
        en: 'Our Zarautz',
        fr: 'Notre Zarautz',
      },
    },
    {
      id: 'indalecio_ojanguren',
      title: {
        es: 'Colección Indalecio Ojanguren',
        eu: 'Indalecio Ojanguren Bilduma',
        en: 'Indalecio Ojanguren Collection',
        fr: 'Collection Indalecio Ojanguren',
      },
    },
    {
      id: 'jesus_elosegui',
      title: {
        es: 'Colección Jesús Elósegui',
        eu: 'Jesús Elósegui Bilduma',
        en: 'Jesús Elósegui Collection',
        fr: 'Collection Jesús Elósegui',
      },
    },
    {
      id: 'juan_san_martin',
      title: {
        es: 'Colección Juan San Martín',
        eu: 'Juan San Martín Bilduma',
        en: 'Juan San Martín Collection',
        fr: 'Collection Juan San Martín',
      },
    },
    {
      id: 'niessen',
      title: {
        es: 'Colección Niessen',
        eu: 'Niessen Bilduma',
        en: 'Niessen Collection',
        fr: 'Collection Niessen',
      },
    },
    {
      id: 'sigfrido_koch',
      title: {
        es: 'Colección Sigfrido Koch',
        eu: 'Sigfrido Koch Bilduma',
        en: 'Sigfrido Koch Collection',
        fr: 'Collection Sigfrido Koch',
      },
    },
    {
      id: 'andres_arlanzon',
      title: {
        es: 'Fondo Andrés Arlanzón',
        eu: 'Andrés Arlanzón Bilduma',
        en: 'Andrés Arlanzón Collection',
        fr: 'Collection Andrés Arlanzón',
      },
    },
    {
      id: 'arantza_cuesta_ezeiza',
      title: {
        es: 'Fondo Arantza Cuesta Ezeiza',
        eu: 'Arantza Cuesta Bilduma',
        en: 'Arantza Cuesta Collection',
        fr: 'Collection Arantza Cuesta',
      },
    },
    {
      id: 'antzuolako_udala',
      title: {
        es: 'Fondo del Ayuntamiento de Antzuola',
        eu: 'Antzuolako Udalaren bilduma',
        en: 'City Council of Antzuola Collection',
        fr: "Collection Mairie d'Antzuola",
      },
    },
    {
      id: 'javier_etxaniz',
      title: {
        es: 'Fondo Javier Etxaniz',
        eu: 'Javier Etxaniz Bilduma',
        en: 'Javier Etxaniz Collection',
        fr: 'Collection Javier Etxaniz',
      },
    },
    {
      id: 'jone_larrañaga',
      title: {
        es: 'Fondo Jone Larrañaga',
        eu: 'Jone Larrañaga Bilduma',
        en: 'Jone Larrañaga Collection',
        fr: 'Collection Jone Larrañaga',
      },
    },
    {
      id: 'luis_mari_elosegi_aldasoro',
      title: {
        es: 'Fondo Luis Mari Elosegi Aldasoro',
        eu: 'Luis Mari Elosegi Aldasoro Bilduma',
        en: 'Luis Mari Elosegi Aldasoro Collection',
        fr: 'Collection Luis Mari Elosegi Aldasoro',
      },
    },
    {
      id: 'polikarpo_elosegi',
      title: {
        es: 'Fondo Polikarpo Elosegi',
        eu: 'Polikarpo Elosegi Bilduma',
        en: 'Polikarpo Elosegi Collection',
        fr: 'Collection Polikarpo Elosegi',
      },
    },
    {
      id: 'koldo_mitxelena',
      title: {
        es: 'Biblioteca Koldo Mitxelena Kulturunea',
        eu: 'Koldo Mitxelena Kulturuneko Liburutegia',
        en: 'Koldo Mitxelena Cultural Library',
        fr: 'Bibliothèque culturelle Koldo Mitxelena',
      },
    },
    {
      id: 'kultura',
      title: {
        es: 'Archivo de la Dirección General de Patrimonio Cultural',
        eu: 'Kultura Ondarearen Zuzendaritza Nagusiaren argazki artxibategia',
        en: 'Archive of the Directorate-General of Cultural Heritage',
        fr: 'Archive de la Direction Générale du Patrimoine Culturel',
      },
    },
    // {
    //   id: 'car', // "Kutxa_Fototeka". GG: 14988
    //   title: {
    //     es: 'Fondo Car',
    //     eu: 'Car Funtsa',
    //     en: 'Car Stock',
    //     fr: 'Collection Car',
    //   },
    // },
    // {
    //   id: 'marin', // Es el mismo enlace que el Fondo Car
    //   title: {
    //     es: 'Fondo Marín',
    //     eu: 'Marín Funtsa',
    //     en: 'Marín Fund',
    //     fr: 'Collection Marín',
    //   },
    // },
    {
      id: 'kutxa_fototeka',
      title: {
        es: 'Fototeca de Kutxa',
        eu: 'Kutxa Fototeka',
        en: 'Kutxa Photo Library',
        fr: 'Photothèque de Kutxa',
      },
    },
  ],
  locations: [
    {
      title: 'Abaltzisketa',
      id: 'abaltzisketa',
    },
    {
      title: 'Aduna',
      id: 'aduna',
    },
    {
      title: 'Aizarnazabal',
      id: 'aizarnazabal',
    },
    {
      title: 'Albiztur',
      id: 'albiztur',
    },
    {
      title: 'Alegia',
      id: 'alegia',
    },
    {
      title: 'Alkiza',
      id: 'alkiza',
    },
    {
      title: 'Altzo',
      id: 'altzo',
    },
    {
      title: 'Amezketa',
      id: 'amezketa',
    },
    {
      title: 'Andoain',
      id: 'andoain',
    },
    {
      title: 'Anoeta',
      id: 'anoeta',
    },
    {
      title: 'Antzuola',
      id: 'antzuola',
    },
    {
      title: 'Arama',
      id: 'arama',
    },
    {
      title: 'Aretxabaleta',
      id: 'aretxabaleta',
    },
    {
      title: 'Asteasu',
      id: 'asteasu',
    },
    {
      title: 'Ataun',
      id: 'ataun',
    },
    {
      title: 'Aia',
      id: 'aia',
    },
    {
      title: 'Azkoitia',
      id: 'azkoitia',
    },
    {
      title: 'Azpeitia',
      id: 'azpeitia',
    },
    {
      title: 'Beasain',
      id: 'beasain',
    },
    {
      title: 'Beizama',
      id: 'beizama',
    },
    {
      title: 'Belauntza',
      id: 'belauntza',
    },
    {
      title: 'Berastegi',
      id: 'berastegi',
    },
    {
      title: 'Berrobi',
      id: 'berrobi',
    },
    {
      title: 'Bidania-Goiatz',
      id: 'bidania_goiatz',
    },
    {
      title: 'Zegama',
      id: 'zegama',
    },
    {
      title: 'Zerain',
      id: 'zerain',
    },
    {
      title: 'Zestoa',
      id: 'zestoa',
    },
    {
      title: 'Zizurkil',
      id: 'zizurkil',
    },
    {
      title: 'Deba',
      id: 'deba',
    },
    {
      title: 'Eibar',
      id: 'eibar',
    },
    {
      title: 'Elduain',
      id: 'elduain',
    },
    {
      title: 'Elgoibar',
      id: 'elgoibar',
    },
    {
      title: 'Elgeta',
      id: 'elgeta',
    },
    {
      title: 'Eskoriatza',
      id: 'eskoriatza',
    },
    {
      title: 'Ezkio-Itsaso',
      id: 'ezkio_itsaso',
    },
    {
      title: 'Hondarribia',
      id: 'hondarribia',
    },
    {
      title: 'Gaintza',
      id: 'gaintza',
    },
    {
      title: 'Gabiria',
      id: 'gabiria',
    },
    {
      title: 'Getaria',
      id: 'getaria',
    },
    {
      title: 'Hernani',
      id: 'hernani',
    },
    {
      title: 'Hernialde',
      id: 'hernialde',
    },
    {
      title: 'Ibarra',
      id: 'ibarra',
    },
    {
      title: 'Idiazabal',
      id: 'idiazabal',
    },
    {
      title: 'Ikaztegieta',
      id: 'ikaztegieta',
    },
    {
      title: 'Irun',
      id: 'irun',
    },
    {
      title: 'Irura',
      id: 'irura',
    },
    {
      title: 'Itsasondo',
      id: 'itsasondo',
    },
    {
      title: 'Larraul',
      id: 'larraul',
    },
    {
      title: 'Lazkao',
      id: 'lazkao',
    },
    {
      title: 'Leaburu',
      id: 'leaburu',
    },
    {
      title: 'Legazpi',
      id: 'legazpi',
    },
    {
      title: 'Legorreta',
      id: 'legorreta',
    },
    {
      title: 'Lezo',
      id: 'lezo',
    },
    {
      title: 'Lizartza',
      id: 'lizartza',
    },
    {
      title: 'Arrasate/Mondragón',
      id: 'arrasate_mondragon',
    },
    {
      title: 'Mutriku',
      id: 'mutriku',
    },
    {
      title: 'Mutiloa',
      id: 'mutiloa',
    },
    {
      title: 'Olaberria',
      id: 'olaberria',
    },
    {
      title: 'Oñati',
      id: 'oñati',
    },
    {
      title: 'Orexa',
      id: 'orexa',
    },
    {
      title: 'Orio',
      id: 'orio',
    },
    {
      title: 'Ormaiztegi',
      id: 'ormaiztegi',
    },
    {
      title: 'Oiartzun',
      id: 'oiartzun',
    },
    {
      title: 'Pasaia',
      id: 'pasaia',
    },
    {
      title: 'Soraluze-Placencia de las Armas',
      id: 'soraluze_placencia_de_las_armas',
    },
    {
      title: 'Errezil',
      id: 'errezil',
    },
    {
      title: 'Errenteria',
      id: 'errenteria',
    },
    {
      title: 'Leintz-Gatzaga',
      id: 'leintz_gatzaga',
    },
    {
      title: 'Donostia/San Sebastián',
      id: 'donostia_san_sebastian',
    },
    {
      title: 'Segura',
      id: 'segura',
    },
    {
      title: 'Tolosa',
      id: 'tolosa',
    },
    {
      title: 'Urnieta',
      id: 'urnieta',
    },
    {
      title: 'Usurbil',
      id: 'usurbil',
    },
    {
      title: 'Bergara',
      id: 'bergara',
    },
    {
      title: 'Villabona',
      id: 'villabona',
    },
    {
      title: 'Ordizia',
      id: 'ordizia',
    },
    {
      title: 'Urretxu',
      id: 'urretxu',
    },
    {
      title: 'Zaldibia',
      id: 'zaldibia',
    },
    {
      title: 'Zarautz',
      id: 'zarautz',
    },
    {
      title: 'Zumarraga',
      id: 'zumarraga',
    },
    {
      title: 'Zumaia',
      id: 'zumaia',
    },
    {
      title: 'Mendaro',
      id: 'mendaro',
    },
    {
      title: 'Lasarte-Oria',
      id: 'lasarte_oria',
    },
    {
      title: 'Astigarraga',
      id: 'astigarraga',
    },
    {
      title: 'Baliarrain',
      id: 'baliarrain',
    },
    {
      title: 'Orendain',
      id: 'orendain',
    },
    {
      title: 'Altzaga',
      id: 'altzaga',
    },
    {
      title: 'Gaztelu',
      id: 'gaztelu',
    },
    {
      title: 'Partzuergo Txikia',
      id: 'partzuergo_txikia',
    },
    {
      title: 'Enirio-Aralar',
      id: 'enirio_aralar',
    },
    {
      title: 'Partzuergo Nagusia',
      id: 'partzuergo_nagusia',
    },
  ],
  routes: [
    {
      pattern: /^\/$/,
      exec: (app) => {
        const main = document.querySelector('main')
        main.innerHTML = `<rs-gallery></rs-gallery>`
      },
    },
    {
      pattern: /^\/mapa/,
      exec: async (app) => {
        const { Map } = await import('../components/rs-map.js')

        customElements.get('rs-map') || customElements.define('rs-map', Map)

        const response = await fetch('map.html')
        const contents = await response.text()

        const main = document.querySelector('main')
        main.innerHTML = `<rs-map>${contents}</rs-map>`
      },
    },
    {
      pattern: /^\/mapa\/(?<location>[\wñ]+)(\/?(\?q=(?<query>.+))?)?$/,
      exec: (app, groups) => {
        const slug = document.location.pathname.replace(/^\/mapa\//, '')

        const location = app.project.locations.find(
          (location) => location.slug === slug
        )

        if (!location) {
          return false
        }

        const main = document.querySelector('main')
        main.innerHTML = `<rs-grid index="${location.index}"></rs-grid>`
      },
    },
    {
      pattern: /^\/bildumak$/,
      exec: async (app) => {
        const response = await fetch('collections.html')
        const contents = await response.text()

        const main = document.querySelector('main')
        main.innerHTML = `<rs-collections>${contents}</rs-collections>`
      },
    },
    {
      pattern: /^\/bildumak\/(?<collection>[\wñ]+)(\/?(\?q=(?<query>.+))?)?$/,
      exec: (app, groups) => {
        const slug = document.location.pathname.replace(/^\/bildumak\//, '')

        const collection = app.project.collections.find(
          (collection) => collection.slug === slug
        )

        if (!collection) {
          return false
        }

        const main = document.querySelector('main')
        main.innerHTML = `<rs-grid index="${collection.index}"></rs-grid>`
      },
    },
    {
      pattern: /^\/bildumak\/(?<collection>[\wñ]+)\/?(?<image>\d+)$/,
      exec: (app, groups) => {
        console.log(app, groups)
      },
    },
  ],
}

export { project }
