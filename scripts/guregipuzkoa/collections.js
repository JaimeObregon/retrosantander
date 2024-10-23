// Estas estructuras de datos son utilizadas por index.js para construir los
// índices, así como para asignar a cada fotografía los índices en que aparece.

// Lista de fotógrafos. Tomo el criterio de que sean personas físicas, razón por
// la cual asigno a `null` aquellos fotógrafos que son colectivos, alias u otros
// valores que no son nombres de personas. Por otro lado, y como son casi un
// millar, solo formateo («Apellido1 Apellido2, Nombre») aquellos fotógrafos que
// tienen 20 o más fotografias.
const photographers = [
  {
    value: 'Elósegui Irazusta, Jesús',
    name: 'Elósegui Irazusta, Jesús',
  },
  {
    value: 'Ojanguren, Indalecio',
    name: 'Ojanguren, Indalecio',
  },
  {
    value: 'Arzuaga, Jesus Mª',
    name: 'Arzuaga, Jesús María',
  },
  {
    value: 'San Martin, Juan',
    name: 'San Martín, Juan',
  },
  {
    value: 'Arlanzón, Andrés',
    name: 'Arlanzón, Andrés',
  },
  {
    value: 'Cuesta Ezeiza, Arantza',
    name: 'Cuesta Ezeiza, Arantza',
  },
  {
    value: 'Fondo Foto Car. Ricardo Martín',
    name: 'Martín, Ricardo',
  },
  {
    value: 'Fondo Marín. Paco Marí',
    name: 'Marí, Paco',
  },
  {
    value: 'Xabier Eskisabel',
    name: 'Eskisabel, Xabier',
  },
  {
    value: 'Fondo Marín. Pascual Marín',
    name: 'Marín, Pascual',
  },
  {
    value: 'Juantxo Agirre',
    name: 'Agirre, Juantxo',
  },
  {
    value: 'FONDO FOTO CAR. RICARDO MARTIN',
    name: 'Martín, Ricardo',
  },
  {
    value: 'FONDO MARIN. PASCUAL MARIN',
    name: 'Marín, Pascual',
  },
  {
    value: 'Fondo Foto Car. Vicente Martín',
    name: 'Martín, Vicente',
  },
  {
    value: 'FONDO MARIN. PACO MARI',
    name: 'Marí, Paco',
  },
  {
    value: 'Koch Arruti, Sigfrido',
    name: 'Koch Arruti, Sigfrido',
  },
  {
    value: '[Paisajes Españoles]',
    name: null,
  },
  {
    value: 'Davila, Bizente',
    name: 'Dávila, Bizente',
  },
  {
    value: 'Arazi',
    name: null,
  },
  {
    value: 'Asier Olazabal',
    name: 'Olazabal, Asier',
  },
  {
    value: 'González',
    name: 'González',
  },
  {
    value: 'FONDO FOTO CAR. VICENTE MARTIN',
    name: 'Martín, Vicente',
  },
  {
    value: 'Ezezaguna',
    name: null,
  },
  {
    value: 'Ruiz, Peio',
    name: 'Ruiz, Peio',
  },
  {
    value: 'Zubimendi, Iker',
    name: 'Zubimendi, Iker',
  },
  {
    value: 'Torres, Jose Antonio',
    name: 'Torres, José Antonio',
  },
  {
    value: 'Torres, J.A.',
    name: 'Torres, José Antonio',
  },
  {
    value: 'Larrañaga, Jone',
    name: 'Larrañaga, Jone',
  },
  {
    value: 'Fondo NIESSEN - ABB. Desconocido',
    name: null,
  },
  {
    value: 'Elosegi Aldasoro, Luis Mari',
    name: 'Elosegi Aldasoro, Luis Mari',
  },
  {
    value: 'Ricardo Iriarte',
    name: 'Iriarte, Ricardo',
  },
  {
    value: 'Imanol Lasa',
    name: 'Lasa, Imanol',
  },
  {
    value: 'Antxon Etxeberria',
    name: 'Etxeberria, Antxon',
  },
  {
    value: 'Elosegi Ansola, Polikarpo',
    name: 'Elosegi Ansola, Polikarpo',
  },
  {
    value: 'Javier Garayalde',
    name: 'Garayalde, Javier',
  },
  {
    value: 'Ugalde, Mari Paz',
    name: 'Ugalde, Mari Paz',
  },
  {
    value: 'Echeverria',
    name: 'Echeverria',
  },
  {
    value: 'Fondo NIESSEN - IÑAKI ZARRANZ. Desconocido',
    name: null,
  },
  {
    value: 'Javier Jauregi',
    name: 'Jauregi, Javier',
  },
  {
    value: 'Arantza Otaduy',
    name: 'Otaduy, Arantza',
  },
  {
    value: 'Madina, Xabier',
    name: 'Madina, Xabier',
  },
  {
    value: 'Zarauzko Udal Argazki Artxiboa',
    name: null,
  },
  {
    value: 'Xabier Garmendia',
    name: 'Garmendia, Xabier',
  },
  {
    value: 'L.L.',
    name: null,
  },
  {
    value: 'lzurutuza',
    name: 'Zurutuza, Luisa',
  },
  {
    value: 'Delboy, Marcel',
    name: 'Delboy, Marcel',
  },
  {
    value: 'Carlos Huerta',
    name: 'Huerta, Carlos',
  },
  {
    value: 'Fondo NIESSEN - JAVIER CANTERA. Desconocido',
    name: null,
  },
  {
    value: 'luisa zurutuza',
    name: 'Zurutuza, Luisa',
  },
  {
    value: 'Luisa Zurutuza',
    name: 'Zurutuza, Luisa',
  },
  {
    value: 'N.D.',
    name: null,
  },
  {
    value: 'orkatz goenaga',
    name: 'Goenaga, Orkatz',
  },
  {
    value: 'Etxaniz Apaolaza, Jabier',
    name: 'Etxaniz Apaolaza, Jabier',
  },
  {
    value: 'Ekainberri',
    name: 'Ekainberri',
  },
  {
    value: 'Argizpi',
    name: null,
  },
  {
    value: 'Patxi Goikoetxea',
    name: 'Goikoetxea Alkorta, Patxi',
  },
  {
    value: 'Bittor Bolinaga',
    name: 'Bolinaga, Bittor',
  },
  {
    value: 'Madina, Margot',
    name: 'Madina, Margot',
  },
  {
    value: 'Bittor Mutiozabal',
    name: 'Mutiozabal, Bittor',
  },
  {
    value: 'Elgezabal, Ibai',
    name: 'Elgezabal, Ibai',
  },
  {
    value: 'Niño, Elena',
    name: 'Niño, Elena',
  },
  {
    value: 'Jauregi, Antton',
    name: 'Jauregi, Antton',
  },
  {
    value: 'Josetxo Zufiaurre',
    name: 'Zufiaurre, Josetxo',
  },
  {
    value: 'Peli',
    name: 'Peli',
  },
  {
    value: 'Zoilo, Karmele',
    name: 'Zoilo, Karmele',
  },
  {
    value: 'Vasco Rodriguez, Manuel',
    name: 'Vasco Rodríguez, Manuel',
  },
  {
    value: 'Ander Yurrita',
    name: 'Yurrita, Ander',
  },
  {
    value: 'Fondo Foto Car. Agustina Zugasti, Vda. De Martín',
    name: 'Zugasti, Agustina',
  },
  {
    value: 'Busto, Maddi',
    name: 'Busto, Maddi',
  },
  {
    value: 'Bixente',
    name: 'Bixente',
  },
  {
    value: 'Astigarraga, J.R.',
    name: 'Astigarraga, J. R.',
  },
  {
    value: 'Baudin',
    name: null,
  },
  {
    value: 'Martín',
    name: null,
  },
  {
    value: 'Guilló',
    name: null,
  },
  {
    value: 'Zarauzko Rugby taldea',
    name: null,
  },
  {
    value: 'Juantxo Egaña',
    name: 'Egaña, Juantxo',
  },
  {
    value: 'Josetxo Aseginolaza',
    name: 'Aseginolaza, Josetxo',
  },
  {
    value: 'Aygues',
    name: null,
  },
  {
    value: 'playant',
    name: 'Layant, Pedro',
  },
  {
    value: 'Portu, Floren',
    name: 'Portu, Floren',
  },
  {
    value: 'Juantxo Unanua',
    name: 'Unanua, Juantxo',
  },
  {
    value: 'Ezezaguna.',
    name: null,
  },
  {
    value: '[Pipo]',
    name: 'Pipo',
  },
  {
    value: 'García Bergara',
    name: 'García Bergara',
  },
  {
    value: 'Ramirez, Yaiza',
    name: 'Ramírez, Yaiza',
  },
  {
    value: 'Araceli Sampedro',
    name: 'Sampedro, Araceli',
  },
  {
    value: 'Kruz',
    name: 'Kruz',
  },
  {
    value: 'Jauregi, Garazi',
    name: 'Jauregi, Garazi',
  },
  {
    value: 'Mikel martinez',
    name: 'Martínez, Mikel',
  },
  {
    value: 'Nekane Azurmendi Etxegarai',
    name: 'Azurmendi Etxegarai, Nekane',
  },
  {
    value: 'Iriberri, Leire',
    name: 'Iriberri, Leire',
  },
  {
    value: 'Zarauzko Arte eta Historia Museoa',
    name: null,
  },
  {
    value: 'Urtetako neska mutil Ardoko kideak',
    name: null,
  },
  {
    value: 'Fernandez, Fernando',
    name: 'Fernández, Fernando',
  },
  {
    value: 'Amaia Isasti',
    name: 'Isasti, Amaia',
  },
  {
    value: 'Regillaga, Aitor',
    name: 'Regillaga, Aitor',
  },
  {
    value: 'Dabid Gimenez Aldalur',
    name: 'Gimenez Aldalur, Dabid',
  },
  {
    value: 'Angulo',
    name: null,
  },
  {
    value: 'Oier Araolaza',
    name: 'Araolaza, Oier',
  },
  {
    value: 'Eskubaloi Elkartea',
    name: null,
  },
  {
    value: 'López, Candy',
    name: 'López, Candi',
  },
  {
    value: 'Asier Sarasua Aranberri',
    name: 'Sarasua Aranberri, Asier',
  },
  {
    value: 'Alicia Polo',
    name: 'Polo, Alicia',
  },
  {
    value: 'Niño, Ana',
    name: 'Niño, Ana',
  },
  {
    value: 'Iriberri, Maider',
    name: 'Iriberri, Maider',
  },
  {
    value: 'mirene',
    name: 'Mirene',
  },
  {
    value: 'Mediavilla, Carlos',
    name: 'Mediavilla, Carlos',
  },
  {
    value: 'Orreaga Aranburu',
    name: 'Aranburu, Orreaga',
  },
  {
    value: 'Guiller',
    name: 'Guiller',
  },
  {
    value: 'Arrillaga, Julian',
    name: 'Arrillaga, Julián',
  },
  {
    value: 'Arkaitz Lazkano',
    name: 'Lazkano, Arkaitz',
  },
  {
    value: 'Agirregomezkorta, Mikel',
    name: 'Agirregomezkorta, Mikel',
  },
  {
    value: 'Legarra, Andrea',
    name: 'Legarra, Andrea',
  },
  {
    value: 'Desconocido',
    name: null,
  },
  {
    value: 'Lekuona, Karmele',
    name: 'Lekuona, Karmele',
  },
  {
    value: 'Otero',
    name: 'Otero',
  },
  {
    value: 'Sorrondegi, Leire',
    name: 'Sorrondegi, Leire',
  },
  {
    value: 'Resines',
    name: 'Resines',
  },
  {
    value: 'Markel Olano',
    name: 'Olano, Markel',
  },
  {
    value: 'Bernardo Oñativia',
    name: 'Oñativia, Bernardo',
  },
  {
    value: 'Beldarrain, Xabier',
    name: 'Beldarrain, Xabier',
  },
  {
    value: 'Perez, Jon Ander',
    name: 'Pérez, Jon Ander',
  },
  {
    value: 'JOSE ANGEL BARRASA',
    name: 'Barrasa, José Ángel',
  },
  {
    value: 'Erkizia, J.',
    name: 'Erkizia, J.',
  },
  {
    value: 'auggie',
    name: 'Auggie',
  },
  {
    value: 'Trini F. de Retana',
    name: 'F. de Retana, Trinidad',
  },
  {
    value: 'Pellejero, Izaro',
    name: 'Pellejero, Izaro',
  },
  {
    value: 'Pellejero, Enara',
    name: 'Pellejero, Enara',
  },
  {
    value: 'Eba Mujika',
    name: 'Mujika, Eba',
  },
  {
    value: 'Peñagarikano, Leire',
    name: 'Peñagarikano, Leire',
  },
  {
    value: 'Ziri Txakoli Kofradia',
    name: null,
  },
  {
    value: 'Ramos, Nerea',
    name: 'Ramos, Nerea',
  },
  {
    value: 'Olatz eta Leire',
    name: null,
  },
  {
    value: 'Lekuona, Aritz',
    name: 'Lekuona, Aritz',
  },
  {
    value: 'Etxeberria',
    name: 'Etxeberria',
  },
  {
    value: 'Casber',
    name: null,
  },
  {
    value: 'Aguirre, Miguel',
    name: 'Aguirre, Miguel',
  },
  {
    value: 'fangio',
    name: null,
  },
  {
    value: 'Urdangarin, Uxue',
    name: 'Urdangarin, Uxue',
  },
  {
    value: 'Iraola, Mikel',
    name: 'Iraola, Mikel',
  },
  {
    value: 'Txaparro',
    name: null,
  },
  {
    value: 'Sarria, R.',
    name: 'Sarria, R.',
  },
  {
    value: 'Mikel Martínez',
    name: 'Martínez, Mikel',
  },
  {
    value: 'Hermanos Verde',
    name: null,
  },
  {
    value: 'Zumalakarregi Museoa',
    name: null,
  },
  {
    value: 'Urruzola, Itsasne',
    name: 'Urruzola, Itsasne',
  },
  {
    value: 'Sánchez, Vanesa',
    name: 'Sánchez, Vanesa',
  },
  {
    value: 'Marín',
    name: null,
  },
  {
    value: 'Josean Mujika',
    name: 'Mujika, Josean',
  },
  {
    value: 'Gipuzkoako Foru Aldundia',
    name: null,
  },
  {
    value: 'Juan Ramon Garai',
    name: 'Garai, Juan Ramón',
  },
  {
    value: 'imanollasa',
    name: 'Lasa, Imanol',
  },
  {
    value: 'Muriana, Javier',
    name: 'Muriana, Javier',
  },
  {
    value: 'Iturralde, Mikel',
    name: 'Iturralde, Mikel',
  },
  {
    value: 'Fernandez, Asun',
    name: 'Fernández, Asun',
  },
  {
    value: 'b5m.gipuzkoa.eus',
    name: null,
  },
  {
    value: 'Zarauzko Surf Elkartea',
    name: null,
  },
  {
    value: 'Igor Blanco',
    name: 'Blanco, Igor',
  },
  {
    value: 'FONDO FOTO CAR. AGUSTINA ZUGASTI, VDA. DE RICARDO MARTIN',
    name: null,
  },
  {
    value: 'Ricardo Martin',
    name: 'Martín, Ricardo',
  },
  {
    value: 'Leire',
    name: 'Leire',
  },
  {
    value: 'Iñaki Caperochipi',
    name: 'Caperochipi, Iñaki',
  },
  {
    value: 'flopez',
    name: null,
  },
  {
    value: 'Peñagarikano, Larraitz',
    name: 'Peñagarikano, Larraitz',
  },
  {
    value: 'López, Iosu',
    name: 'López, Iosu',
  },
  {
    value: 'Styrczula Masniak, Annyela',
    name: 'Styrczula Masniak, Annyela',
  },
  {
    value: 'Oscar Parrondo',
    name: 'Parrondo, Óscar',
  },
  {
    value: 'Lopez, Iosu',
    name: 'López, Iosu',
  },
  {
    value: 'Itziar Iruarriz',
    name: 'Iruarriz, Itziar',
  },
  {
    value: 'Galdos, Judit',
    name: 'Galdos, Judit',
  },
  {
    value: 'Carlos Olaetxea',
    name: 'Olaetxea, Carlos',
  },
  {
    value: 'Anza, Fernando',
    name: 'Anza, Fernando',
  },
  {
    value: 'Ruiz, Maddi',
    name: 'Ruiz, Maddi',
  },
  {
    value: 'Patxi Goikoetxea Alkorta',
    name: 'Goikoetxea Alkorta, Patxi',
  },
  {
    value: 'Vicente, Iñaki',
    name: 'Vicente, Iñaki',
  },
  {
    value: 'Vazquez, Javier',
    name: 'Vázquez, Javier',
  },
  {
    value: 'Urueña',
    name: null,
  },
  {
    value: 'Lopez, Arkaitz',
    name: 'López, Arkaitz',
  },
  {
    value: 'Laskurain, Javier',
    name: 'Laskurain, Javier',
  },
  {
    value: 'Gabarain, Imanol',
    name: 'Gabarain, Imanol',
  },
  {
    value: 'Fot. Lacoste (Madrid)',
    name: null,
  },
  {
    value: 'Cano, José',
    name: 'Cano, José',
  },
  {
    value: 'Laskurain, Alexander',
    name: 'Laskurain, Alexander',
  },
  {
    value: 'Etxeberria, Leire',
    name: 'Etxeberria, Leire',
  },
  {
    value: 'Emujika',
    name: null,
  },
  {
    value: 'Cerdeira, Jon',
    name: 'Cerdeira, Jon',
  },
  {
    value: 'Romero, Isabel',
    name: 'Romero, Isabel',
  },
  {
    value: 'Mikel Martinez',
    name: 'Martínez, Mikel',
  },
  {
    value: 'Irastorza, Belen',
    name: 'Irastorza, Belén',
  },
  {
    value: 'Gorka Escalante',
    name: 'Escalante, Gorka',
  },
  {
    value: 'Fernandez, Anne',
    name: 'Fernández, Anne',
  },
  {
    value: 'Antonio Ferreras Fernández',
    name: 'Ferreras Fernández, Antonio',
  },
  {
    value: 'Zarautz Surf Elkartea',
    name: null,
  },
  {
    value: 'Valencia, Antonio',
    name: 'Valencia, Antonio',
  },
  {
    value: 'Rodriguez, Alex',
    name: 'Rodríguez, Alex',
  },
  {
    value: 'Iraola, Ana Mari',
    name: 'Iraola, Ana Mari',
  },
  {
    value: 'Indique Persona',
    name: null,
  },
  {
    value: 'Fondo NIESSEN - ABB. Javier Larrea',
    name: null,
  },
  {
    value: 'AEK',
    name: null,
  },
  {
    value: 'garazi',
    name: null,
  },
  {
    value: 'Zezilia Herrador',
    name: 'Herrador, Zezilia',
  },
  {
    value: 'Marcos García',
    name: 'García, Marcos',
  },
  {
    value: 'Igartubeiti Baserria',
    name: null,
  },
  {
    value: 'Fonseca, Mari Mar',
    name: 'Fonseca, Mari Mar',
  },
  {
    value: 'Eneko Imirizaldu',
    name: 'Imirizaldu, Eneko',
  },
  {
    value: 'Carlos Mediavilla Arandigoien',
    name: 'Mediavilla Arandigoien, Carlos',
  },
  {
    value: 'Nikolas Barandiaran',
    name: 'Barandiaran, Nikolas',
  },
  {
    value: 'Nazabal, Teodora',
    name: 'Nazabal, Teodora',
  },
  {
    value: 'Koch, Willy',
    name: 'Koch, Willy',
  },
  {
    value: 'Anonimoa',
    name: null,
  },
  {
    value: 'jm pemán',
    name: 'Pemán, Jesus Mari',
  },
  {
    value: 'Zubimendi Fernandez, Nerea',
    name: 'Zubimendi Fernández, Nerea',
  },
  {
    value: 'Roldán Montero, Unai',
    name: 'Roldán Montero, Unai',
  },
  {
    value: 'Manso, Jose Maria',
    name: 'Manso, José María',
  },
  {
    value: 'LZURUTUZA',
    name: 'Zurutuza, Luisa',
  },
  {
    value: 'Kutxaespacio',
    name: null,
  },
  {
    value: 'Jimenez, Jokin',
    name: 'Jimenez, Jokin',
  },
  {
    value: 'Gure Zarautz',
    name: null,
  },
  {
    value: 'Eluska',
    name: null,
  },
  {
    value: 'Artola, Amaia',
    name: 'Artola, Amaia',
  },
  {
    value: 'ekainberri',
    name: 'Ekainberri',
  },
  {
    value: 'Orreaga',
    name: 'Aranburu, Orreaga',
  },
  {
    value: 'López, Candi',
    name: 'López, Candi',
  },
  {
    value: 'Labrador, Sergio',
    name: 'Labrador, Sergio',
  },
  {
    value: 'L.S.',
    name: 'L.S.',
  },
  {
    value: 'Konstan',
    name: 'Konstan',
  },
  {
    value: 'Gipuzkoamendizmendi',
    name: 'Gipuzkoamendizmendi',
  },
  {
    value: 'Garcia, Enrique',
    name: 'Garcia, Enrique',
  },
  {
    value: 'Fotoetxe (Jose Mari) Telleria',
    name: 'Fotoetxe (Jose Mari) Telleria',
  },
  {
    value: 'Fernández García, Ernesto',
    name: 'Fernández García, Ernesto',
  },
  {
    value: 'Begoña Rivero',
    name: 'Begoña Rivero',
  },
  {
    value: 'Arzadun, Jose Ignacio',
    name: 'Arzadun, Jose Ignacio',
  },
  {
    value: 'Zabala, Ainhoa',
    name: 'Zabala, Ainhoa',
  },
  {
    value: 'Ramon Serras eta Celina Gorostizagoiza',
    name: 'Ramon Serras eta Celina Gorostizagoiza',
  },
  {
    value: 'Pemán',
    name: 'Pemán, Jesus Mari',
  },
  {
    value: 'Marcos Sodupe',
    name: 'Marcos Sodupe',
  },
  {
    value: 'Labayen',
    name: 'Labayen',
  },
  {
    value: 'Juanjo Martin Huerta',
    name: 'Juanjo Martin Huerta',
  },
  {
    value: 'Juan Antonio Saez',
    name: 'Sáez, Juan Antonio',
  },
  {
    value: 'José Latova Fernández',
    name: 'José Latova Fernández',
  },
  {
    value: 'Igartubeiti',
    name: 'Igartubeiti',
  },
  {
    value: 'HSU',
    name: 'HSU',
  },
  {
    value: 'Esteban Fuentes Pecotxe',
    name: 'Fuentes Pecotxe, Esteban',
  },
  {
    value: 'Bravo, Tomás',
    name: 'Bravo, Tomás',
  },
  {
    value: 'Artezaleak',
    name: null,
  },
  {
    value: 'Anitzak',
    name: null,
  },
  {
    value: 'Abar Aranburu',
    name: 'Aranburu, Abar',
  },
  {
    value: 'Zabaleta, J.',
    name: 'Zabaleta, J.',
  },
  {
    value: 'Urdangarin Devesa, Cristina',
    name: 'Urdangarin Devesa, Cristina',
  },
  {
    value: 'Petrina, Fernando',
    name: 'Petrina, Fernando',
  },
  {
    value: 'Oñate, Jon',
    name: 'Oñate, Jon',
  },
  {
    value: 'Mendiri, Txema',
    name: 'Mendiri, Txema',
  },
  {
    value: 'Larrañaga Bolinaga, Eugenio',
    name: 'Larrañaga Bolinaga, Eugenio',
  },
  {
    value: 'Kortadi, I.',
    name: 'Kortadi, I.',
  },
  {
    value: 'Javier Quiros Fernández',
    name: 'Javier Quiros Fernández',
  },
  {
    value: 'Gómez Alcubilla, Erika',
    name: 'Gómez Alcubilla, Erika',
  },
  {
    value: 'Elosegi, Jesus',
    name: 'Elósegui Irazusta, Jesús',
  },
  {
    value: 'Ataungo udala',
    name: null,
  },
  {
    value: 'Arientzako kanpai jole eskola',
    name: null,
  },
  {
    value: 'A. Santos, grabador (Eibar)',
    name: null,
  },
  {
    value: 'A. S.',
    name: null,
  },
  {
    value: 'sancocho.com',
    name: null,
  },
  {
    value: 'juanjo',
    name: null,
  },
  {
    value: 'felixbill',
    name: null,
  },
  {
    value: 'Pascual Marín',
    name: 'Marín, Pascual',
  },
  {
    value: 'Paino, Julen',
    name: 'Paino, Julen',
  },
  {
    value: 'Jose Luis Pérez Herrero',
    name: 'Pérez Herrero, José Luis',
  },
  {
    value: 'Cuevas, Estela',
    name: 'Cuevas, Estela',
  },
  {
    value: 'Barandiaran, Adei',
    name: 'Barandiaran, Adei',
  },
  {
    value: 'Arregi, Nagore',
    name: 'Arregi, Nagore',
  },
  {
    value: 'Villate Azkarate, Jon',
    name: 'Villate Azkarate, Jon',
  },
  {
    value: 'Uranga Oiarzabal, Aitziber',
    name: 'Uranga Oiarzabal, Aitziber',
  },
  {
    value: 'Santos, Alberto',
    name: 'Santos, Alberto',
  },
  {
    value: 'Santos Dominguez, Pedro Juan',
    name: 'Santos Dominguez, Pedro Juan',
  },
  {
    value: 'Rodriguez Bonilla, Ignacio',
    name: 'Rodriguez Bonilla, Ignacio',
  },
  {
    value: 'Reyes, Alvaro',
    name: 'Reyes, Alvaro',
  },
  {
    value: 'Regillaga Otaño, Erkaitz',
    name: 'Regillaga Otaño, Erkaitz',
  },
  {
    value: 'Regillaga Otaño, Aitor',
    name: 'Regillaga Otaño, Aitor',
  },
  {
    value: 'Petrina, Olatz',
    name: 'Petrina, Olatz',
  },
  {
    value: 'ND Fot.',
    name: null,
  },
  {
    value: 'Muñoz Sanchez, Martin',
    name: 'Muñoz Sánchez, Martín',
  },
  {
    value: 'Miguel, Ainara de',
    name: 'Miguel, Ainara de',
  },
  {
    value: 'Matarranz, Valentin',
    name: 'Matarranz, Valentín',
  },
  {
    value: 'Manterola, Imanol',
    name: 'Manterola, Imanol',
  },
  {
    value: 'Manso Hernandez, Leire',
    name: 'Manso Hernandez, Leire',
  },
  {
    value: 'Manso Hernandez, Jose Mari',
    name: 'Manso Hernández, José Mari',
  },
  {
    value: 'Lurdes Arostegi',
    name: 'Lurdes Arostegi',
  },
  {
    value: 'Lertxundi, Nestor',
    name: 'Lertxundi, Nestor',
  },
  {
    value: 'Korta, Iñigo',
    name: 'Korta, Iñigo',
  },
  {
    value: 'Gonzalez Pereda, Leire',
    name: 'González Pereda, Leire',
  },
  {
    value: 'Gaitero Encinas, Nerea',
    name: 'Gaitero Encinas, Nerea',
  },
  {
    value: 'Fondo NIESSEN - MIKEL LIZARRALDE. Desconocido',
    name: null,
  },
  {
    value: 'Busselo Ortega, Agustin',
    name: 'Busselo Ortega, Agustín',
  },
  {
    value: 'Berrotarán, Tiburcio',
    name: 'Berrotarán, Tiburcio',
  },
  {
    value: 'Azpillaga Izagirre, Olatz',
    name: 'Azpillaga Izagirre, Olatz',
  },
  {
    value: 'Arriaga, Iñigo',
    name: 'Arriaga, Iñigo',
  },
  {
    value: 'Arnaiz Etxeberria, Xabier',
    name: 'Arnaiz Etxeberria, Xabier',
  },
  {
    value: 'Antonio Valencia',
    name: 'Valencia, Antonio',
  },
  {
    value: 'Alonso, Olatz',
    name: 'Alonso, Olatz',
  },
  {
    value: 'Unanue, Adriana',
    name: 'Unanue, Adriana',
  },
  {
    value: 'Reveriego, Amaia',
    name: 'Reveriego, Amaia',
  },
  {
    value: 'Ramón Serras eta Celina Gorostizagoiza',
    name: null,
  },
  {
    value: 'Pontijas Conde, Luis',
    name: 'Pontijas Conde, Luis',
  },
  {
    value: 'Perez, Oliver',
    name: 'Pérez, Oliver',
  },
  {
    value: 'Orbegozo, Itxaso',
    name: 'Orbegozo, Itxaso',
  },
  {
    value: 'Niebla, Borja',
    name: 'Niebla, Borja',
  },
  {
    value: 'Miguel Sabino Diaz',
    name: 'Sabino Díaz, Miguel',
  },
  {
    value: 'Martin Ruiz, Jesus',
    name: 'Martín Ruiz, Jesús',
  },
  {
    value: 'Madina, Iñigo',
    name: 'Madina, Iñigo',
  },
  {
    value: 'Juan Carlos Martín Alfonso',
    name: 'Juan Carlos Martín Alfonso',
  },
  {
    value: 'Joaquín Sicart',
    name: 'Joaquín Sicart',
  },
  {
    value: 'Iraola Uribarrena, Mikel',
    name: 'Iraola Uribarrena, Mikel',
  },
  {
    value: 'Iraola Urdangarin, Mikel',
    name: 'Iraola Urdangarin, Mikel',
  },
  {
    value: 'Gonzalo, María',
    name: 'Gonzalo, María',
  },
  {
    value: 'Esnaola, Mikel',
    name: 'Esnaola, Mikel',
  },
  {
    value: 'Eguialde Izaguirre, Amaia',
    name: 'Eguialde Izaguirre, Amaia',
  },
  {
    value: 'Carazo Cavero, Miguel',
    name: 'Carazo Cavero, Miguel',
  },
  {
    value: 'Cano, Juanjo',
    name: 'Cano, Juanjo',
  },
  {
    value: 'Amasorrain, Juanje',
    name: 'Amasorrain, Juanje',
  },
  {
    value: 'Algorri',
    name: null,
  },
  {
    value: 'Aguayo, Pilar',
    name: 'Aguayo, Pilar',
  },
  {
    value: 'ALONSO',
    name: null,
  },
  {
    value: 'arazi',
    name: null,
  },
  {
    value: 'Ruiz, Aimar',
    name: 'Ruiz, Aimar',
  },
  {
    value: 'Pérez, Josu',
    name: 'Pérez, Josu',
  },
  {
    value: 'Paisajes Españoles',
    name: null,
  },
  {
    value: 'Manso, Jose Mari',
    name: 'Manso, Jose Mari',
  },
  {
    value: 'Luis Mari Florez Arabaolaza',
    name: 'Luis Mari Florez Arabaolaza',
  },
  {
    value: 'López Navarrete, Mariano',
    name: 'López Navarrete, Mariano',
  },
  {
    value: 'Lopez Munduate, Lucas',
    name: 'Lopez Munduate, Lucas',
  },
  {
    value: 'Leunda, Igor',
    name: 'Leunda, Igor',
  },
  {
    value: 'Julia Otxoa',
    name: 'Julia Otxoa',
  },
  {
    value: 'Iturralde, Jose Angel',
    name: 'Iturralde, Jose Angel',
  },
  {
    value: 'Iturbe, Arantxa',
    name: 'Iturbe, Arantxa',
  },
  {
    value: 'Iglesias, Seve',
    name: 'Iglesias, Seve',
  },
  {
    value: 'Gorroño, Idoia',
    name: 'Gorroño, Idoia',
  },
  {
    value: 'GipuzkoaKultura',
    name: 'GipuzkoaKultura',
  },
  {
    value: 'García, Naroa',
    name: 'García, Naroa',
  },
  {
    value: 'Ceberio, M.A.',
    name: 'Ceberio, M.A.',
  },
  {
    value: 'Calonge, Olaia',
    name: 'Calonge, Olaia',
  },
  {
    value: 'Cachafeiro, Ekain',
    name: 'Cachafeiro, Ekain',
  },
  {
    value: 'Bernardo, Gaizka',
    name: 'Bernardo, Gaizka',
  },
  {
    value: 'Ben Miloud, Omar',
    name: 'Ben Miloud, Omar',
  },
  {
    value: 'Beldarrain, J.A.',
    name: 'Beldarrain, J.A.',
  },
  {
    value: 'Arnaiz, Xabier',
    name: 'Arnaiz Etxeberria, Xabier',
  },
  {
    value: 'Arenales, Soraia',
    name: 'Arenales, Soraia',
  },
  {
    value: 'karuleta',
    name: 'karuleta',
  },
  {
    value: 'Zarauzko udaleko kultura departamendua',
    name: 'Zarauzko udaleko kultura departamendua',
  },
  {
    value: 'Villa, Mª. Jesús',
    name: 'Villa, Mª. Jesús',
  },
  {
    value: 'Valencia, Antonio (Donostia)',
    name: 'Valencia, Antonio (Donostia)',
  },
  {
    value: 'Urtetako Neska Mutil Ardoko kideak',
    name: 'Urtetako Neska Mutil Ardoko kideak',
  },
  {
    value: 'Txarli Gesteira',
    name: 'Txarli Gesteira',
  },
  {
    value: 'Sanchez Romero, Isabel',
    name: 'Sanchez Romero, Isabel',
  },
  {
    value: 'Rivero, Luis Mª.',
    name: 'Rivero, Luis Mª.',
  },
  {
    value: 'Olano, Aitor',
    name: 'Olano, Aitor',
  },
  {
    value: 'Medina, Xabier',
    name: 'Medina, Xabier',
  },
  {
    value: 'Matarranz, Valentín',
    name: 'Matarranz, Valentín',
  },
  {
    value: 'Lurdes Azpiazu',
    name: 'Lurdes Azpiazu',
  },
  {
    value: 'Louvelli, Ane',
    name: 'Louvelli, Ane',
  },
  {
    value: 'Lopez, Meritxell',
    name: 'Lopez, Meritxell',
  },
  {
    value: 'López, Juanjo',
    name: 'López, Juanjo',
  },
  {
    value: 'López Aldaz, Juanjo',
    name: 'López Aldaz, Juanjo',
  },
  {
    value: 'Laburu, Sergio',
    name: 'Laburu, Sergio',
  },
  {
    value: 'Jakintza Ikastola',
    name: 'Jakintza Ikastola',
  },
  {
    value: 'Iturrarango parketxea',
    name: 'Iturrarango parketxea',
  },
  {
    value: 'Iraola, Mielmay',
    name: 'Iraola, Mielmay',
  },
  {
    value: 'Infante, Gorka',
    name: 'Infante, Gorka',
  },
  {
    value: 'Igor Etxabe Iraztorza',
    name: 'Igor Etxabe Iraztorza',
  },
  {
    value: 'Gomez, Erika',
    name: 'Gomez, Erika',
  },
  {
    value: 'Felix Urrutia Uriarte',
    name: 'Felix Urrutia Uriarte',
  },
  {
    value: 'Cambra, Unai',
    name: 'Cambra, Unai',
  },
  {
    value: 'Cambra, Maider',
    name: 'Cambra, Maider',
  },
  {
    value: 'Busto, Lorena',
    name: 'Busto, Lorena',
  },
  {
    value: 'Azketa, Belen',
    name: 'Azketa, Belen',
  },
  {
    value: 'Arzallus, Fernando',
    name: 'Arzallus, Fernando',
  },
  {
    value: 'Arozena, Ane',
    name: 'Arozena, Ane',
  },
  {
    value: 'Antton Etxeberria Aizpurua',
    name: 'Etxeberria Aizpurua, Antton',
  },
  {
    value: 'Aguirregomezkorta, Mikel',
    name: 'Agirregomezkorta, Mikel',
  },
  {
    value: 'Ricardo Ugarte',
    name: 'Ricardo Ugarte',
  },
  {
    value: 'Ricardo Martín',
    name: 'Ricardo Martín',
  },
  {
    value: 'Maigné',
    name: 'Maigné',
  },
  {
    value: 'Lusarreta, Pablo',
    name: 'Lusarreta, Pablo',
  },
  {
    value: 'Jorge Madera',
    name: 'Jorge Madera',
  },
  {
    value: 'Jone Larrañaga',
    name: 'Larrañaga, Jone',
  },
  {
    value: 'Hernández',
    name: 'Hernández',
  },
  {
    value: 'Franan',
    name: 'Franan',
  },
  {
    value: 'Foto-Editor González Galarza (San Sebastián)',
    name: 'Foto-Editor González Galarza (San Sebastián)',
  },
  {
    value: 'EZEZAGUNA',
    name: null,
  },
  {
    value: 'Cliché Frédéric',
    name: 'Cliché Frédéric',
  },
  {
    value: 'Busto, Joxean',
    name: 'Busto, Joxean',
  },
  {
    value: 'Aitor',
    name: 'Aitor',
  },
  {
    value: 'aormaetxea',
    name: 'aormaetxea',
  },
  {
    value: 'Zarautz Kirol Elkartea ZAST saskibaloiko atala',
    name: 'Zarautz Kirol Elkartea ZAST saskibaloiko atala',
  },
  {
    value: 'Txema Zubiarrain',
    name: 'Txema Zubiarrain',
  },
  {
    value: 'Rosco, Timoteo',
    name: 'Rosco, Timoteo',
  },
  {
    value: 'Raul',
    name: 'Raul',
  },
  {
    value: 'Pierro, Luis Mª',
    name: 'Pierro, Luis Mª',
  },
  {
    value: 'Ortuoste',
    name: 'Ortuoste',
  },
  {
    value: 'Nerea Arnaiz',
    name: 'Nerea Arnaiz',
  },
  {
    value: 'Marin',
    name: 'Marin',
  },
  {
    value: 'Manu Ceberio Rodriguez',
    name: 'Manu Ceberio Rodriguez',
  },
  {
    value: 'López, Jesus Mª',
    name: 'López, Jesus Mª',
  },
  {
    value: 'Juantxo Sardon',
    name: 'Juantxo Sardon',
  },
  {
    value: 'Juan Luis Eskisabel',
    name: 'Juan Luis Eskisabel',
  },
  {
    value: 'Juan Carlos Martin',
    name: 'Juan Carlos Martin',
  },
  {
    value: 'Iñaki Loperena',
    name: 'Iñaki Loperena',
  },
  {
    value: 'Gaztañaga, T.',
    name: 'Gaztañaga, T.',
  },
  {
    value: 'Fotografía Rennes',
    name: 'Fotografía Rennes',
  },
  {
    value: 'Clio',
    name: 'Clio',
  },
  {
    value: 'Cano, Juan Jose',
    name: 'Cano, Juan Jose',
  },
  {
    value: 'Cano, José Juan',
    name: 'Cano, José Juan',
  },
  {
    value: 'Beobide, Manuel',
    name: 'Beobide, Manuel',
  },
  {
    value: 'Arantza Uriguen',
    name: 'Arantza Uriguen',
  },
  {
    value: 'Ana Saldaña',
    name: 'Ana Saldaña',
  },
  {
    value: 'julen',
    name: 'julen',
  },
  {
    value: 'Zaldua, Luis',
    name: 'Zaldua, Luis',
  },
  {
    value: 'Velasco',
    name: 'Velasco',
  },
  {
    value: 'Unai Quiros Zufiria',
    name: 'Unai Quiros Zufiria',
  },
  {
    value: 'Ruben Sanchez Gaona',
    name: 'Ruben Sanchez Gaona',
  },
  {
    value: 'Raul Piñeiro',
    name: 'Raul Piñeiro',
  },
  {
    value: 'Pixel',
    name: 'Pixel',
  },
  {
    value: 'Martin',
    name: 'Martin',
  },
  {
    value: 'Lizeaga, Joseba',
    name: 'Lizeaga, Joseba',
  },
  {
    value: 'Jose Venegas Flores',
    name: 'Jose Venegas Flores',
  },
  {
    value: 'Jose Luis Perez Herreros',
    name: 'Perez Herreros, José Luis',
  },
  {
    value: 'Hilario Vaquero Gonzalez',
    name: 'Vaquero González, Hilario',
  },
  {
    value: 'Felix Sukia',
    name: 'Sukia, Felix',
  },
  {
    value: 'Asurabarrena, Fatima',
    name: 'Asurabarrena, Fátima',
  },
  {
    value: 'aitor',
    name: null,
  },
  {
    value: 'Zarauzko Udalaren Argazki Artxiboa',
    name: null,
  },
  {
    value: 'Yaben, Marisol',
    name: 'Yaben, Marisol',
  },
  {
    value: 'Salinas, Aitziber',
    name: 'Salinas, Aitziber',
  },
  {
    value: 'Roisin, Lucien',
    name: 'Roisin, Lucien',
  },
  {
    value: 'Murkil',
    name: 'Murkil',
  },
  {
    value: 'Mila Igartua',
    name: 'Mila Igartua',
  },
  {
    value: 'Marcos Alonso',
    name: 'Marcos Alonso',
  },
  {
    value: 'Manu Behaeghe',
    name: 'Manu Behaeghe',
  },
  {
    value: 'Lasarte Urrestarazu Familia',
    name: 'Lasarte Urrestarazu Familia',
  },
  {
    value: 'L. Dorronsoro',
    name: 'L. Dorronsoro',
  },
  {
    value: 'Kegel, Eugen',
    name: 'Kegel, Eugen',
  },
  {
    value: 'Juan Mari Arruabarrena',
    name: 'Juan Mari Arruabarrena',
  },
  {
    value: 'Josu Mendicute',
    name: 'Josu Mendicute',
  },
  {
    value: 'Josu Aramberri',
    name: 'Josu Aramberri',
  },
  {
    value: 'José Ángel Barrutiabengoa',
    name: 'José Ángel Barrutiabengoa',
  },
  {
    value: 'Jon Fuentes Gibelalde',
    name: 'Jon Fuentes Gibelalde',
  },
  {
    value: 'J B. Usabiaga',
    name: 'J B. Usabiaga',
  },
  {
    value: 'Iñaki kaperotxipi',
    name: 'Caperochipi, Iñaki',
  },
  {
    value: 'Gustave',
    name: 'Gustave',
  },
  {
    value: 'Guiral, Maika',
    name: 'Guiral, Maika',
  },
  {
    value: 'Foto Eraso',
    name: 'Foto Eraso',
  },
  {
    value: 'Carlos Díez Morán',
    name: 'Carlos Díez Morán',
  },
  {
    value: 'Bernardo, Maitane',
    name: 'Bernardo, Maitane',
  },
  {
    value: 'Avila, Juan',
    name: 'Avila, Juan',
  },
  {
    value: 'Arantzazu parketxearen arduraduna',
    name: 'Arantzazu parketxearen arduraduna',
  },
  {
    value: 'Angel Elorza Beitia',
    name: 'Angel Elorza Beitia',
  },
  {
    value: 'Andrés Moledo Barrientos',
    name: 'Andrés Moledo Barrientos',
  },
  {
    value: 'Alvaro Anfora',
    name: 'Alvaro Anfora',
  },
  {
    value: 'ARREGI ARANBURUA FAMILIA',
    name: 'ARREGI ARANBURUA FAMILIA',
  },
  {
    value: 'ND Fot',
    name: 'ND Fot',
  },
  {
    value: 'Mercedes Lopez Lalinde',
    name: 'Mercedes Lopez Lalinde',
  },
  {
    value: 'Mauro Fuentes Gibelalde',
    name: 'Mauro Fuentes Gibelalde',
  },
  {
    value: 'Marin, Josecho',
    name: 'Marin, Josecho',
  },
  {
    value: 'LME',
    name: 'LME',
  },
  {
    value: 'Juanjo',
    name: 'Juanjo',
  },
  {
    value: 'Juan Carlos Pérez Rico',
    name: 'Juan Carlos Pérez Rico',
  },
  {
    value: 'Juan Carlos Huerta',
    name: 'Juan Carlos Huerta',
  },
  {
    value: 'Jose Luis Barbadillo',
    name: 'Jose Luis Barbadillo',
  },
  {
    value: 'Javier Fernandez',
    name: 'Javier Fernandez',
  },
  {
    value: 'Jáuregui',
    name: 'Jáuregui',
  },
  {
    value: 'Jaione Fernández',
    name: 'Jaione Fernández',
  },
  {
    value: 'Iñaki Zugasti',
    name: 'Iñaki Zugasti',
  },
  {
    value: 'Iñaki Imaz',
    name: 'Iñaki Imaz',
  },
  {
    value: 'Iglesias',
    name: 'Iglesias',
  },
  {
    value: 'Iban Apalategi Aseginolaza',
    name: 'Iban Apalategi Aseginolaza',
  },
  {
    value: 'Gerardo García González',
    name: 'Gerardo García González',
  },
  {
    value: 'Fotocar',
    name: 'Fotocar',
  },
  {
    value: 'Foto J. García (S.S.)',
    name: 'Foto J. García (S.S.)',
  },
  {
    value: 'Felix Urrutia',
    name: 'Felix Urrutia',
  },
  {
    value: 'Cristina Lamuedra',
    name: 'Cristina Lamuedra',
  },
  {
    value: 'Clara',
    name: 'Clara',
  },
  {
    value: 'Bérillon, Ferdinand',
    name: 'Bérillon, Ferdinand',
  },
  {
    value: 'Aygües',
    name: 'Aygües',
  },
  {
    value: 'Anabel Domínguez',
    name: 'Anabel Domínguez',
  },
  {
    value: 'Ana Rosa Castander',
    name: 'Castander Santana, Ana Rosa',
  },
  {
    value: 'Amaia Agirre Zubeldia',
    name: 'Agirre Zubeldia, Amaia',
  },
  {
    value: 'Agustin Azkona Katxo',
    name: 'Azkona Katxo, Agustin',
  },
  {
    value: 'rafa espada',
    name: 'Espada Rafa',
  },
  {
    value: 'luistxo eta marije',
    name: null,
  },
  {
    value: 'luisazurutuza',
    name: 'Zurutuza, Luisa',
  },
  {
    value: 'jlastras',
    name: null,
  },
  {
    value: 'flyschcom',
    name: null,
  },
  {
    value: 'Zarauzko udaleko kultura departamentua',
    name: null,
  },
  {
    value: 'Zarauzko Udala',
    name: null,
  },
  {
    value: 'Vazquez, Adolfo',
    name: 'Vazquez, Adolfo',
  },
  {
    value: 'Txilibutxof',
    name: null,
  },
  {
    value: 'Tomas',
    name: null,
  },
  {
    value: 'Sardon, Juantxo',
    name: 'Sardon, Juantxo',
  },
  {
    value: 'Rodrigo, Oscar',
    name: 'Rodrigo, Óscar',
  },
  {
    value: 'Rey, Unai',
    name: 'Rey, Unai',
  },
  {
    value: 'Peio',
    name: null,
  },
  {
    value: 'Patxi Franco',
    name: 'Patxi Franco',
  },
  {
    value: 'Muro, Iñaki',
    name: 'Muro, Iñaki',
  },
  {
    value: 'Morrosko',
    name: null,
  },
  {
    value: 'Mirene',
    name: null,
  },
  {
    value: 'Mercedes López',
    name: 'Mercedes López',
  },
  {
    value: 'Llavori, Juan Ramon',
    name: 'Llavori, Juan Ramón',
  },
  {
    value: 'Karmelo',
    name: null,
  },
  {
    value: 'Julen',
    name: null,
  },
  {
    value: 'Juan Mari Ibarzabal Alberdi',
    name: 'Ibarzabal Alberdi, Juan María',
  },
  {
    value: 'Juan Luis Elizaran',
    name: 'Elizaran, Juan Luis',
  },
  {
    value: 'Juan Jose Armendariz',
    name: 'Armendariz, Juan José',
  },
  {
    value: 'Juan Antonio Merino',
    name: 'Merino, Juan Antonio',
  },
  {
    value: 'Jose Luis Perez',
    name: 'Perez, José Luis',
  },
  {
    value: 'Jose Antonio Mujika Alustiza',
    name: 'Jose Antonio Mujika Alustiza',
  },
  {
    value: 'Jone',
    name: 'Jone',
  },
  {
    value: 'Jon Madrazo Uribeetxeberia',
    name: 'Jon Madrazo Uribeetxeberia',
  },
  {
    value: 'Jon Cendón Auzmendi',
    name: 'Jon Cendón Auzmendi',
  },
  {
    value: 'Javier Quiros',
    name: 'Javier Quiros',
  },
  {
    value: 'Izaeus',
    name: 'Izaeus',
  },
  {
    value: 'Iñaki Sanchez Osa',
    name: 'Iñaki Sanchez Osa',
  },
  {
    value: 'Imanol Barcenilla',
    name: 'Barcenilla, Imanol',
  },
  {
    value: 'Gregori Iribarren',
    name: 'Gregori Iribarren',
  },
  {
    value: 'Gabriel López de Benito',
    name: 'López de Benito, Gabriel',
  },
  {
    value: 'Foto GAR (Zarauz)',
    name: null,
  },
  {
    value: 'Fonoteca Kutxa',
    name: null,
  },
  {
    value: 'Enrique Egaña',
    name: 'Egaña, Enrique',
  },
  {
    value: 'Carlos Mediavilla',
    name: 'Carlos Mediavilla',
  },
  {
    value: 'Bitoriano',
    name: 'Bitoriano',
  },
  {
    value: 'Bernardo, J. Ramon',
    name: 'Bernardo, J. Ramón',
  },
  {
    value: 'Barrera, A. de la',
    name: 'Barrera, A. de la',
  },
  {
    value: 'Asier Sarasua Garmendia',
    name: 'Sarasua Garmendia, Asier',
  },
  {
    value: 'Argues',
    name: null,
  },
  {
    value: 'Angel Elorza',
    name: 'Angel Elorza',
  },
  {
    value: 'Anfran',
    name: 'Anfran',
  },
  {
    value: 'Aitor Díaz Egurbide',
    name: 'Aitor Díaz Egurbide',
  },
  {
    value: 'Agirre, Juan Jose',
    name: 'Agirre, Juan Jose',
  },
  {
    value: 'A. Santos',
    name: 'Santos, A.',
  },
  {
    value: 'test',
    name: null,
  },
  {
    value: 'susta',
    name: 'susta',
  },
  {
    value: 'pitxi',
    name: 'pitxi',
  },
  {
    value: 'mongider',
    name: 'mongider',
  },
  {
    value: 'jmazkue',
    name: 'jmazkue',
  },
  {
    value: 'idlphoto',
    name: 'idlphoto',
  },
  {
    value: 'ezezaguna',
    name: null,
  },
  {
    value: 'Xanti Soler',
    name: 'Xanti Soler',
  },
  {
    value: 'Vizcaino',
    name: 'Vizcaino',
  },
  {
    value: 'Schlegel, R.',
    name: 'Schlegel, R.',
  },
  {
    value: 'Remigio Zurutuza',
    name: 'Zurutuza, Remigio',
  },
  {
    value: 'Peio Baztarrika',
    name: 'Baztarrika, Peio',
  },
  {
    value: 'Pedro Aoiz',
    name: 'Aoiz, Pedro',
  },
  {
    value: 'Pablo Moratinos',
    name: 'Moratinos, Pablo',
  },
  {
    value: 'Oscar Esnal',
    name: 'Esnal, Oscar',
  },
  {
    value: 'Omar Ben',
    name: 'Omar Ben',
  },
  {
    value: 'Odriozola, B.',
    name: 'Odriozola, B.',
  },
  {
    value: 'Niram, S.',
    name: 'Niram, S.',
  },
  {
    value: 'Nerea Irastorza',
    name: 'Irastorza, Nerea',
  },
  {
    value: 'Mikel de Almeida',
    name: 'de Almeida, Mikel',
  },
  {
    value: 'Maskarada',
    name: 'Maskarada',
  },
  {
    value: 'Mari Carmen Antelo',
    name: 'Antelo, Mari Carmen',
  },
  {
    value: 'Lidia Valencia',
    name: 'Valencia, Lidia',
  },
  {
    value: 'Laula',
    name: 'Laula',
  },
  {
    value: 'Kultura eta Euskara Departamentua',
    name: null,
  },
  {
    value: 'Julian Gil',
    name: 'Gil, Julián',
  },
  {
    value: 'Julian Auzmendi',
    name: 'Auzmendi, Julián',
  },
  {
    value: 'Jugand',
    name: 'Jugand',
  },
  {
    value: 'Juanjo Armendariz',
    name: 'Armendáriz, Juan José',
  },
  {
    value: 'Juan Joxe Agirre Landa',
    name: 'Agirre Landa, Juan Joxe',
  },
  {
    value: 'José H. Álvarez',
    name: 'Álvarez, José H.',
  },
  {
    value: 'Jone Silva',
    name: 'Silva, Jone',
  },
  {
    value: 'Jokin Suárez Tellería',
    name: 'Tellería, Jokin Suárez',
  },
  {
    value: 'JOSE ANTONIO GUTIERREZ REINA',
    name: 'Gutiérrez Reina, José Antonio',
  },
  {
    value: 'JOAQUIN SICART',
    name: 'Sicart, Joaquín',
  },
  {
    value: 'Irune Giner',
    name: 'Giner, Irune',
  },
  {
    value: 'Iñaki Sanchez',
    name: 'Sánchez, Iñaki',
  },
  {
    value: 'Idoia Imaz Ajuria',
    name: 'Idoia Imaz Ajuria',
  },
  {
    value: 'Ibarzabal, Juan Mª',
    name: 'Ibarzabal Alberdi, Juan María',
  },
  {
    value: 'Heliodoro Etxeberria',
    name: 'Etxeberria, Heliodoro',
  },
  {
    value: 'Gurutze Langarika',
    name: 'Langarika, Gurutze',
  },
  {
    value: 'Gorka Langarika',
    name: 'Langarika, Gorka',
  },
  {
    value: 'Foto Galarza (San Sebastián)',
    name: null,
  },
  {
    value: 'Foto Aygues',
    name: null,
  },
  {
    value: 'Foto Alzuri',
    name: 'Foto Alzuri',
  },
  {
    value: 'Esteban Fuentes',
    name: 'Fuentes Pecotxe, Esteban',
  },
  {
    value: 'Enara Rodrigitz',
    name: 'Rodrigitz, Enara',
  },
  {
    value: 'Elena Aranegui',
    name: 'Aranegui, Elena',
  },
  {
    value: 'Eibarko La Salle Irratia',
    name: null,
  },
  {
    value: 'Diario Vasco',
    name: null,
  },
  {
    value: 'Delboy, Marcel (Bordeaux)',
    name: 'Delboy, Marcel',
  },
  {
    value: 'Dávila, Bizente',
    name: 'Dávila, Bizente',
  },
  {
    value: 'Dávila, B.',
    name: 'Dávila, Bizente',
  },
  {
    value: 'David Aprea',
    name: 'Aprea, David',
  },
  {
    value: 'Carlos Madrazo',
    name: 'Madrazo, Carlos',
  },
  {
    value: 'Bessan, M.',
    name: 'Bessan, M.',
  },
  {
    value: 'Beatriz Ruiz',
    name: 'Ruiz, Beatriz',
  },
  {
    value: 'Beatriz Manjón Askasibar',
    name: 'Manjón Askasibar, Beatriz',
  },
  {
    value: 'Bausac y Sobº',
    name: 'Bausac y Sobº',
  },
  {
    value: 'Arenas, L.',
    name: 'Arenas, L.',
  },
  {
    value: 'Antton Rebollar',
    name: 'Rebollar, Antton',
  },
  {
    value: 'Alberto Villar',
    name: 'Villar, Alberto',
  },
  {
    value: 'Agencia Keystone',
    name: null,
  },
  {
    value: 'Aduriz, Karmele',
    name: 'Aduriz, Karmele',
  },
  {
    value: 'pirritx',
    name: 'pirritx',
  },
  {
    value: 'ketari',
    name: 'ketari',
  },
  {
    value: 'fllyschcom',
    name: 'fllyschcom',
  },
  {
    value: 'elbereth',
    name: 'elbereth',
  },
  {
    value: 'dominguin',
    name: 'dominguin',
  },
  {
    value: 'Zarauzko udaleko kultura deparmtamentua',
    name: null,
  },
  {
    value: 'Zarauzko udaleko kultur departamentua',
    name: null,
  },
  {
    value: 'Zarauzko udalaren kultura departamentua',
    name: null,
  },
  {
    value: 'Zarauzko kultura',
    name: null,
  },
  {
    value: 'Zarauzko Udaleko Kultur Departamentua',
    name: null,
  },
  {
    value: 'Zarautz Kirol Elkartea  ZAST saskibaloiko atala',
    name: null,
  },
  {
    value: 'Zarauko udala kultura departamentua',
    name: null,
  },
  {
    value: 'Villatte, A. (Tarbes)',
    name: 'Villatte, A. (Tarbes)',
  },
  {
    value: 'Urrutia Goya, Iyuya',
    name: 'Urrutia Goya, Iyuya',
  },
  {
    value: 'Urdangarin, Cristina',
    name: 'Urdangarin, Cristina',
  },
  {
    value: 'Urdangarin, Amaia',
    name: 'Urdangarin, Amaia',
  },
  {
    value: 'Seijo',
    name: 'Seijo',
  },
  {
    value: 'Sarrale, Miguelito',
    name: 'Sarrale, Miguelito',
  },
  {
    value: 'Rosa Santos',
    name: 'Santos, Rosa',
  },
  {
    value: 'Regillaga Otaño, Ekaitz',
    name: 'Regillaga Otaño, Ekaitz',
  },
  {
    value: 'Ramuntcho',
    name: 'Ramuntcho',
  },
  {
    value: 'Ramos, Agustin',
    name: 'Ramos, Agustin',
  },
  {
    value: 'Ramos Garcia, Nerea',
    name: 'Ramos Garcia, Nerea',
  },
  {
    value: 'Pr. Pilar',
    name: 'Pr. Pilar',
  },
  {
    value: 'Pascual Marin',
    name: 'Pascual Marin',
  },
  {
    value: 'Otxoa, Iñaki',
    name: 'Otxoa, Iñaki',
  },
  {
    value: 'Ormaetxea, Fatima',
    name: 'Ormaetxea, Fatima',
  },
  {
    value: 'Nicolás Aguado Marina',
    name: 'Nicolás Aguado Marina',
  },
  {
    value: 'Nerea Altuna',
    name: 'Nerea Altuna',
  },
  {
    value: 'ND Phot.',
    name: 'ND Phot.',
  },
  {
    value: 'ND Phot',
    name: 'ND Phot',
  },
  {
    value: 'Muriana, F. Javier',
    name: 'Muriana, F. Javier',
  },
  {
    value: 'Muriana, David',
    name: 'Muriana, David',
  },
  {
    value: 'Molido, Andres',
    name: 'Molido, Andres',
  },
  {
    value: 'Miren Guembe Otamendi',
    name: 'Miren Guembe Otamendi',
  },
  {
    value: 'Mila Amozarrain',
    name: 'Mila Amozarrain',
  },
  {
    value: 'Miguel Sabino Díaz',
    name: 'Miguel Sabino Díaz',
  },
  {
    value: 'Miguel Angel Gómez',
    name: 'Miguel Angel Gómez',
  },
  {
    value: 'Mertxe López Lalinde',
    name: 'Mertxe López Lalinde',
  },
  {
    value: 'Merce Vidal',
    name: 'Merce Vidal',
  },
  {
    value: 'Maurice',
    name: 'Maurice',
  },
  {
    value: 'Maturana',
    name: 'Maturana',
  },
  {
    value: 'Martin, Marian',
    name: 'Martin, Marian',
  },
  {
    value: 'Maria Barrasa',
    name: 'Maria Barrasa',
  },
  {
    value: 'Manso, Jose Mª',
    name: 'Manso, Jose Mª',
  },
  {
    value: 'Manipel',
    name: 'Manipel',
  },
  {
    value: 'Maiztegi, Fernando',
    name: 'Maiztegi, Fernando',
  },
  {
    value: 'MONTXO',
    name: 'MONTXO',
  },
  {
    value: 'Luis Angel Arroniz Artola',
    name: 'Luis Angel Arroniz Artola',
  },
  {
    value: 'Lopez, Mariano',
    name: 'Lopez, Mariano',
  },
  {
    value: 'Larrendi',
    name: 'Larrendi',
  },
  {
    value: 'Laida Arregi',
    name: 'Laida Arregi',
  },
  {
    value: 'LUISA ZURUTUZA',
    name: 'Zurutuza, Luisa',
  },
  {
    value: 'Korte Unanue, Iñigo',
    name: 'Korte Unanue, Iñigo',
  },
  {
    value: 'Kezka Dantza Taldea Eibar',
    name: null,
  },
  {
    value: 'Karmele Zoilo',
    name: 'Zoilo, Karmele',
  },
  {
    value: 'Juan Manuel Serna Portugal',
    name: 'Juan Manuel Serna Portugal',
  },
  {
    value: 'Josu Aguado Sukia',
    name: 'Josu Aguado Sukia',
  },
  {
    value: 'Jordi Rojas',
    name: 'Rojas, Jordi',
  },
  {
    value: 'Jordi Diaz',
    name: 'Díaz, Jordi',
  },
  {
    value: 'Jon Larrañaga',
    name: 'Larrañaga, Jon',
  },
  {
    value: 'Jesus Mari Pemán',
    name: 'Pemán, Jesus Mari',
  },
  {
    value: 'Jesus Gil Hernandez',
    name: 'Gil Hernández, Jesús',
  },
  {
    value: 'Javier Bengoa',
    name: 'Bengoa, Javier',
  },
  {
    value: 'JakeAndreu',
    name: 'JakeAndreu',
  },
  {
    value: 'JOSÉ MARÍA GUIJARRO VALERA',
    name: 'JOSÉ MARÍA GUIJARRO VALERA',
  },
  {
    value: 'Izaskun Portillo Regulez',
    name: 'Izaskun Portillo Regulez',
  },
  {
    value: 'Itxaso Eguizabal',
    name: 'Eguizabal, Itxaso',
  },
  {
    value: 'Indalecio Ojanguren',
    name: 'Ojanguren, Indalecio',
  },
  {
    value: 'Indaberea, Olatz',
    name: 'Indaberea, Olatz',
  },
  {
    value: 'Iñaki Uranga',
    name: 'Uranga, Iñaki',
  },
  {
    value: 'Iñaki Kaperotxipi',
    name: 'Caperochipi, Iñaki',
  },
  {
    value: 'Iñaki Azkoaga',
    name: 'Azkoaga, Iñaki',
  },
  {
    value: 'Iker Urbizu',
    name: 'Urbizu, Iker',
  },
  {
    value: 'Iglesias, Severiano',
    name: 'Iglesias, Severiano',
  },
  {
    value: 'Iglesias Santos, Severiano',
    name: 'Iglesias Santos, Severiano',
  },
  {
    value: 'Igarza, Jon',
    name: 'Igarza, Jon',
  },
  {
    value: 'Gonzalez, Ichi',
    name: 'González, Ichi',
  },
  {
    value: 'Gonzalez, Herme',
    name: 'González, Herme',
  },
  {
    value: 'Gonzalez Parra, Luis Mª',
    name: 'González Parra, Luis María',
  },
  {
    value: 'Gonzalez Corchero, Raul',
    name: 'González Corchero, Raúl',
  },
  {
    value: 'Gomez, Alfonso',
    name: 'Gómez, Alfonso',
  },
  {
    value: 'Garcia López, Ildefonso',
    name: 'García López, Ildefonso',
  },
  {
    value: 'Gabriel López',
    name: 'López, Gabriel',
  },
  {
    value: 'Foto Kaito (Azpeitia)',
    name: null,
  },
  {
    value: 'Foto Adamant (Cestona)',
    name: null,
  },
  {
    value: 'FLALU',
    name: null,
  },
  {
    value: 'Etxeberria, Iraitz',
    name: 'Etxeberria, Iraitz',
  },
  {
    value: 'Errondosoro Echave, Mirari',
    name: 'Errondosoro Echave, Mirari',
  },
  {
    value: 'Eneko',
    name: null,
  },
  {
    value: 'Eduardo Manzanos',
    name: 'Manzanos, Eduardo',
  },
  {
    value: 'Echeverria Fernandez, Maider',
    name: 'Echeverria Fernández, Maider',
  },
  {
    value: 'ENEKO URDANGARIN EIZAGIRRE',
    name: 'Urdangarin Eizagirre, Eneko',
  },
  {
    value: 'Dyckhoff, Adolfo E.',
    name: 'Dyckhoff, Adolfo E.',
  },
  {
    value: 'Duñabeitia, C. de',
    name: 'Duñabeitia, C. de',
  },
  {
    value: 'Dominguez, Jose',
    name: 'Domínguez, José',
  },
  {
    value: 'Cuevas, Juan',
    name: 'Cuevas, Juan',
  },
  {
    value: 'Contreras, Itsaso',
    name: 'Contreras, Itsaso',
  },
  {
    value: 'CodeSyntax',
    name: null,
  },
  {
    value: 'Club (Bugos)',
    name: null,
  },
  {
    value: 'Canto',
    name: null,
  },
  {
    value: 'C. y A.',
    name: null,
  },
  {
    value: 'C. y A',
    name: null,
  },
  {
    value: 'C. Fuentecilla',
    name: 'C. Fuentecilla',
  },
  {
    value: 'Brandt, Ferd',
    name: 'Brandt, Ferd',
  },
  {
    value: 'Beristain Mugica, Maialen',
    name: 'Beristain Mugica, Maialen',
  },
  {
    value: 'Beorbide, Manuel',
    name: 'Beorbide, Manuel',
  },
  {
    value: 'Barbarin, Aixa',
    name: 'Barbarín, Aixa',
  },
  {
    value: 'BR',
    name: null,
  },
  {
    value: 'Azurmendi, Luis',
    name: 'Azurmendi, Luis',
  },
  {
    value: 'Azcue',
    name: null,
  },
  {
    value: 'Atxuri',
    name: null,
  },
  {
    value: 'Ataungo Udala',
    name: null,
  },
  {
    value: 'Asier Arregi',
    name: 'Arregi, Asier',
  },
  {
    value: 'Aritz Lazkano',
    name: 'Lazkano, Aritz',
  },
  {
    value: 'Arenales, Soraya',
    name: 'Arenales Garrido, Soraya',
  },
  {
    value: 'Arenales, Ruben',
    name: 'Arenales Garrido, Rubén',
  },
  {
    value: 'Arenales Garrido, Soraya',
    name: 'Arenales Garrido, Soraya',
  },
  {
    value: 'Arenales Garrido, Ruben',
    name: 'Arenales Garrido, Rubén',
  },
  {
    value: 'Andoni Lizarralde',
    name: 'Lizarralde, Andoni',
  },
  {
    value: 'Andoni Larrañaga',
    name: 'Larrañaga, Andoni',
  },
  {
    value: 'Ana Isabel Ugalde',
    name: 'Ugalde, Ana Isabel',
  },
  {
    value: 'Amaia Bueno',
    name: 'Bueno, Amaia',
  },
  {
    value: 'Alproja',
    name: null,
  },
  {
    value: 'Alfonso Tena',
    name: 'Tena, Alfonso',
  },
  {
    value: 'Aitzpea Agirrezabalaga',
    name: 'Agirrezabalaga, Aitzpea',
  },
  {
    value: 'Aitor Bolinaga',
    name: 'Bolinaga, Aitor',
  },
  {
    value: 'Aguirre, Javier',
    name: 'Aguirre, Javier',
  },
  {
    value: 'Agrispe, Iñigo',
    name: 'Agrispe, Iñigo',
  },
  {
    value: 'Adam Keilbach',
    name: 'Keilbach, Adam',
  },
  {
    value: 'xabier eskisabel',
    name: 'Eskisabel, Xabier',
  },
  {
    value: 'xabier Garmendia',
    name: 'Garmendia, Xabier',
  },
  {
    value: 'valentín de castro',
    name: 'de Castro, Valentín',
  },
  {
    value: 'txaparro',
    name: null,
  },
  {
    value: 'nori ushijima',
    name: 'nori ushijima',
  },
  {
    value: 'lósegui Irazusta, Jesús',
    name: 'Elósegui Irazusta, Jesús',
  },
  {
    value: 'jzubiaurre',
    name: 'jzubiaurre',
  },
  {
    value: 'juan antonio saez',
    name: 'Sáez, Juan Antonio',
  },
  {
    value: 'jm peman',
    name: 'Pemán, Jesus Mari',
  },
  {
    value: 'imanol lasa',
    name: 'Lasa, Imanol',
  },
  {
    value: 'elena',
    name: null,
  },
  {
    value: 'ekainberi',
    name: 'Ekainberri',
  },
  {
    value: 'desconocido',
    name: null,
  },
  {
    value: 'berpiztu',
    name: null,
  },
  {
    value: 'beasain',
    name: null,
  },
  {
    value: 'a susperregi',
    name: 'Susperregi, A.',
  },
  {
    value: 'Zuloaga, M.',
    name: 'Zuloaga, M.',
  },
  {
    value: 'Zarauzko Udala Argazki Artxiboa',
    name: null,
  },
  {
    value: 'Zarautzko Lizardi Institutua',
    name: null,
  },
  {
    value: 'Zarausko Udal Argazki Artxiboa',
    name: null,
  },
  {
    value: 'Xto',
    name: null,
  },
  {
    value: 'Xiker Lazkano Mendizabal',
    name: 'Lazkano Mendizabal, Xiker',
  },
  {
    value: 'Xabizer Garmendia',
    name: 'Xabizer Garmendia',
  },
  {
    value: 'Xabier Garmedia',
    name: 'Garmedia, Xabier',
  },
  {
    value: 'Xabier GArmendia',
    name: 'Garmendia, Xabier',
  },
  {
    value: 'Xabier Arruti',
    name: 'Xabier Arruti',
  },
  {
    value: 'Xabier',
    name: 'Xabier',
  },
  {
    value: 'Wilcomb, A.S.',
    name: 'Wilcomb, A.S.',
  },
  {
    value: 'Westendorp, H.',
    name: 'Westendorp, H.',
  },
  {
    value: 'Vicente Crespo Franco',
    name: 'Crespo Franco, Vicente',
  },
  {
    value: 'Verbax',
    name: 'Verbax',
  },
  {
    value: 'Valentin Marin, foto',
    name: 'Marín, Valentín',
  },
  {
    value: 'Urreña',
    name: 'Urreña',
  },
  {
    value: 'Urko Mendiguren',
    name: 'Mendiguren, Urko',
  },
  {
    value: 'Txilibutxof Taldea',
    name: null,
  },
  {
    value: 'Sergio Reseco',
    name: 'Reseco, Sergio',
  },
  {
    value: 'Schaarwächter, J.C.',
    name: 'Schaarwächter, J. C.',
  },
  {
    value: 'Santi Mendiola',
    name: 'Mendiola, Santi',
  },
  {
    value: 'Ruud, Penny y Cia',
    name: null,
  },
  {
    value: 'Ruf, C.',
    name: 'Ruf, C.',
  },
  {
    value: 'Rosa Rojo',
    name: 'Rojo, Rosa',
  },
  {
    value: 'Rojo, Fernando',
    name: 'Rojo, Fernando',
  },
  {
    value: 'Roisin, L. (Barcelona)',
    name: 'Roisin, Lucien',
  },
  {
    value: 'Roisin, L.',
    name: 'Roisin, Lucien',
  },
  {
    value: 'Roig de Lluis, L.',
    name: 'Roig de Lluis, L.',
  },
  {
    value: 'Rodrigo Pumarejo',
    name: 'Pumarejo, Rodrigo',
  },
  {
    value: 'Resines, B.',
    name: 'Resines, B.',
  },
  {
    value: 'Renaud Sanson',
    name: 'Renaud Sanson',
  },
  {
    value: 'Regulez, Julián',
    name: 'Regulez, Julián',
  },
  {
    value: 'Puy, D.',
    name: 'Puy, D.',
  },
  {
    value: 'Portela',
    name: null,
  },
  {
    value: 'Pliego, Emilio',
    name: 'Pliego, Emilio',
  },
  {
    value: 'Pliego',
    name: 'Pliego, Emilio',
  },
  {
    value: 'Pili Azkarate',
    name: 'Azkarate, Pili',
  },
  {
    value: 'Photographie La Nuit',
    name: null,
  },
  {
    value: 'Pellissier, P.',
    name: 'Pellissier, P.',
  },
  {
    value: 'Pedro Perez',
    name: 'Pérez, Pedro',
  },
  {
    value: 'Patxi Goikortxea',
    name: 'Goikoetxea Alkorta, Patxi',
  },
  {
    value: 'Patxi Goiekoetxea',
    name: 'Goiekoetxea, Patxi',
  },
  {
    value: 'Pasta, Ajessandro',
    name: 'Pasta, Ajessandro',
  },
  {
    value: 'Pablo Río Vaquero',
    name: 'Río Vaquero, Pablo',
  },
  {
    value: 'PEMAN',
    name: 'Pemán, Jesus Mari',
  },
  {
    value: 'Ouvrard',
    name: null,
  },
  {
    value: 'Oscar Mateos',
    name: 'Mateos, Oscar',
  },
  {
    value: 'Oñativia',
    name: 'Oñativia',
  },
  {
    value: 'Ojanguren',
    name: 'Ojanguren, Indalecio',
  },
  {
    value: 'Oiane Mediavilla Iraola',
    name: 'Mediavilla Iraola, Oiane',
  },
  {
    value: 'Ohiane Mediavilla',
    name: 'Mediavilla Iraola, Oiane',
  },
  {
    value: 'Ocaña, Juan M.',
    name: 'Ocaña, Juan M.',
  },
  {
    value: 'Noemí Rivera',
    name: 'Rivera, Noemí',
  },
  {
    value: 'Nieves Lasa',
    name: 'Lasa, Nieves',
  },
  {
    value: 'ND',
    name: null,
  },
  {
    value: 'N.D Phot',
    name: null,
  },
  {
    value: 'N. Juaristi (Eibar)',
    name: 'Juaristi, N.',
  },
  {
    value: 'Muro, Alberto',
    name: 'Muro, Alberto',
  },
  {
    value: 'Muro, Albero',
    name: 'Muro, Albero',
  },
  {
    value: 'Mr. Bessan',
    name: null,
  },
  {
    value: 'Mourlane Mitxelena',
    name: 'Mitxelena, Mourlane',
  },
  {
    value: 'Moreno, J.',
    name: null,
  },
  {
    value: 'Moreno y Onis',
    name: null,
  },
  {
    value: 'Moreno',
    name: null,
  },
  {
    value: 'Mikel Ferreiro',
    name: 'Ferreiro, Mikel',
  },
  {
    value: 'Mikel Antoñana',
    name: 'Antoñana, Mikel',
  },
  {
    value: 'Maury',
    name: null,
  },
  {
    value: 'Martin Montes Kojeazkoetxea',
    name: 'Montes Kojeazkoetxea, Martín',
  },
  {
    value: 'Marina Arregi',
    name: 'Arregi, Marina',
  },
  {
    value: 'Marin y Otero foto',
    name: null,
  },
  {
    value: 'Marín y Otero',
    name: null,
  },
  {
    value: 'Marin y Otero',
    name: null,
  },
  {
    value: 'Marin y Coyne',
    name: null,
  },
  {
    value: 'Maria del Mar Mendiluze Portu',
    name: 'Mendiluze Portu, María del Mar',
  },
  {
    value: 'Maitane Garmendia',
    name: 'Garmendia, Maitane',
  },
  {
    value: 'Maison Daillon',
    name: null,
  },
  {
    value: 'Maider Lizarralde',
    name: 'Lizarralde, Maider',
  },
  {
    value: 'MD',
    name: 'MD',
  },
  {
    value: 'MARIN',
    name: 'MARIN',
  },
  {
    value: 'M.D.',
    name: null,
  },
  {
    value: 'LL',
    name: null,
  },
  {
    value: 'Luisa Ramona Imaz',
    name: 'Imaz, Luisa Ramona',
  },
  {
    value: 'Luis Mari Agirre',
    name: 'Agirre, Luis Mari',
  },
  {
    value: 'Ludovisi y su señora',
    name: null,
  },
  {
    value: 'Lozano',
    name: 'Lozano',
  },
  {
    value: 'Lombard',
    name: 'Lombard',
  },
  {
    value: 'Lola M. Sobreviela',
    name: 'Sobreviela, Lola M.',
  },
  {
    value: 'Lekuona Alcala, Karmele',
    name: 'Lekuona Alcalá, Karmele',
  },
  {
    value: 'Leandro',
    name: null,
  },
  {
    value: 'Layoz',
    name: null,
  },
  {
    value: 'Lasarte Familia',
    name: null,
  },
  {
    value: 'Lafon, H. (Bayonne)',
    name: 'Lafon, H.',
  },
  {
    value: 'Laborde',
    name: null,
  },
  {
    value: 'L.B.',
    name: null,
  },
  {
    value: 'Külatte, A. (Tarbes)',
    name: 'Külatte, A.',
  },
  {
    value: 'Kortadi, I',
    name: 'Kortadi, I.',
  },
  {
    value: 'Koldo Ibañez',
    name: 'Ibáñez, Koldo',
  },
  {
    value: 'Koldo Camacho Alconada',
    name: 'Camacho Alconada, Koldo',
  },
  {
    value: 'Juanan',
    name: 'Juanan',
  },
  {
    value: 'Juan Munduate',
    name: 'Munduate, Juan',
  },
  {
    value: 'Juan Carlos Garijo Gomez',
    name: 'Garijo Gómez, Juan Carlos',
  },
  {
    value: 'Josune Camacho',
    name: 'Josune Camacho',
  },
  {
    value: 'Jose Ramon Barrasa',
    name: 'Jose Ramon Barrasa',
  },
  {
    value: 'José María Guijarro Valera',
    name: 'Guijarro Valera, José María',
  },
  {
    value: 'Jose M Azcona',
    name: 'Azcona, José M.',
  },
  {
    value: 'Jose Luis Salgado',
    name: 'Salgado, Jose Luis',
  },
  {
    value: 'José Luis Echezarreta',
    name: 'Echezarreta, José Luis',
  },
  {
    value: 'Jose Benegas',
    name: 'Benegas, José',
  },
  {
    value: 'Jon Ander Campos',
    name: 'Campos, Jon Ander',
  },
  {
    value: 'Jesús Elósegui Irazusta',
    name: 'Elósegui Irazusta, Jesús',
  },
  {
    value: 'Jaume Porschista',
    name: 'Porschista, Jaume',
  },
  {
    value: 'Jasone Garmendia',
    name: 'Garmendia, Jasone',
  },
  {
    value: 'Jally, G.',
    name: 'Jally, G.',
  },
  {
    value: 'Jakes Larre',
    name: 'Larre, Jakes',
  },
  {
    value: 'JOSE MARÍA GUIJARRO VALERA',
    name: 'Guijarro Valera, José María',
  },
  {
    value: 'J.G.',
    name: null,
  },
  {
    value: 'J.Agustin Gurrutxaga',
    name: 'Gurrutxaga, J. Agustín',
  },
  {
    value: 'J. Lacoste (Madrid)',
    name: null,
  },
  {
    value: 'J. Andrieu',
    name: null,
  },
  {
    value: 'Itsaso Egizabal',
    name: 'Itsaso Egizabal',
  },
  {
    value: 'Iñigo Arregi',
    name: 'Iñigo Arregi',
  },
  {
    value: 'Indalezio Ojanguren',
    name: 'Ojanguren, Indalecio',
  },
  {
    value: 'Iñaki Gonzalez',
    name: 'Iñaki Gonzalez',
  },
  {
    value: 'Iban Bolinaga',
    name: 'Bolinaga, Iban',
  },
  {
    value: 'I.C. Uriarte',
    name: 'I.C. Uriarte',
  },
  {
    value: 'Höffert, W.',
    name: 'Höffert, W.',
  },
  {
    value: 'Hermano Pedro',
    name: 'Hermano Pedro',
  },
  {
    value: 'Hebert, M.',
    name: 'Hebert, M.',
  },
  {
    value: 'Hauser y Menet (Madrid)',
    name: 'Hauser y Menet (Madrid)',
  },
  {
    value: 'HAUSER Y MENET MADRID',
    name: 'HAUSER Y MENET MADRID',
  },
  {
    value: 'Gustave phot.',
    name: 'Gustave phot.',
  },
  {
    value: 'Gurutze Sukia',
    name: 'Gurutze Sukia',
  },
  {
    value: 'Guereguiz, A. de',
    name: 'Guereguiz, A. de',
  },
  {
    value: 'Gorce (Paris)',
    name: 'Gorce (Paris)',
  },
  {
    value: 'Gomez, L.',
    name: 'Gomez, L.',
  },
  {
    value: 'Gautier, H.',
    name: 'Gautier, H.',
  },
  {
    value: 'Garaialde, Gari',
    name: 'Garaialde, Gari',
  },
  {
    value: 'Gallas, Carl',
    name: 'Gallas, Carl',
  },
  {
    value: 'GARAGORRI MENDIZABAL FAMILIA',
    name: 'GARAGORRI MENDIZABAL FAMILIA',
  },
  {
    value: 'G.G.',
    name: 'G.G.',
  },
  {
    value: 'G. Diaz, Aurelio',
    name: 'G. Diaz, Aurelio',
  },
  {
    value: 'Freund, Carl',
    name: 'Freund, Carl',
  },
  {
    value: 'Franzen',
    name: 'Franzen',
  },
  {
    value: 'Franck',
    name: 'Franck',
  },
  {
    value: 'Fotos J. García (San Sebastián)',
    name: 'Fotos J. García (San Sebastián)',
  },
  {
    value: 'Fotos J. García (S.S.)',
    name: 'Fotos J. García (S.S.)',
  },
  {
    value: 'Fotocar de Donostia',
    name: 'Fotocar de Donostia',
  },
  {
    value: 'Foto Uribe',
    name: 'Foto Uribe',
  },
  {
    value: 'Foto Martin',
    name: 'Foto Martin',
  },
  {
    value: 'Foto Marin',
    name: 'Foto Marin',
  },
  {
    value: 'Foto J. García',
    name: 'Foto J. García',
  },
  {
    value: 'Foto Estudio J. Marin',
    name: 'Foto Estudio J. Marin',
  },
  {
    value: 'Foto Aygués',
    name: 'Foto Aygués',
  },
  {
    value: 'Foto Argazkia',
    name: 'Foto Argazkia',
  },
  {
    value: 'Fot. J. García',
    name: 'Fot. J. García',
  },
  {
    value: 'Flasche, Emil',
    name: 'Flasche, Emil',
  },
  {
    value: 'Flamant, E.',
    name: 'Flamant, E.',
  },
  {
    value: 'Felipe Arrieta Lizarribar',
    name: 'Felipe Arrieta Lizarribar',
  },
  {
    value: 'Fagoaga',
    name: 'Fagoaga',
  },
  {
    value: 'Fabert, Andrés',
    name: 'Fabert, Andrés',
  },
  {
    value: 'FOTOTIPIA THOMAS',
    name: 'FOTOTIPIA THOMAS',
  },
  {
    value: 'Ezazaguna',
    name: 'Ezazaguna',
  },
  {
    value: 'Etxeberria, Omar',
    name: 'Etxeberria, Omar',
  },
  {
    value: 'Etxabe, K.',
    name: 'Etxabe, K.',
  },
  {
    value: 'Estaban Fuentes',
    name: 'Estaban Fuentes',
  },
  {
    value: 'Erkizia, J',
    name: 'Erkizia, J',
  },
  {
    value: 'Erkizia',
    name: 'Erkizia',
  },
  {
    value: 'Eneko Urdangarin',
    name: 'Eneko Urdangarin',
  },
  {
    value: 'Eneko Etxebeste',
    name: 'Eneko Etxebeste',
  },
  {
    value: 'Emujika.',
    name: 'Emujika.',
  },
  {
    value: 'Emilio Albizu',
    name: 'Albizu, Emilio',
  },
  {
    value: 'Elcé',
    name: 'Elcé',
  },
  {
    value: 'Echeverría, P.',
    name: 'Echeverría, P.',
  },
  {
    value: 'Ducloux, L.',
    name: 'Ducloux, L.',
  },
  {
    value: 'Diario EGIN',
    name: 'Diario EGIN',
  },
  {
    value: 'D.B.',
    name: 'D.B.',
  },
  {
    value: 'Contreras y Villaseca.',
    name: 'Contreras y Villaseca.',
  },
  {
    value: 'Conde',
    name: 'Conde',
  },
  {
    value: 'Company',
    name: 'Company',
  },
  {
    value: 'Coll, A.',
    name: 'Coll, A.',
  },
  {
    value: 'Colección particular',
    name: 'Colección particular',
  },
  {
    value: 'Cliché Vey',
    name: 'Cliché Vey',
  },
  {
    value: 'Clement, J.',
    name: 'Clement, J.',
  },
  {
    value: 'Casa Lacoste (Madrid)',
    name: null,
  },
  {
    value: 'Carto',
    name: null,
  },
  {
    value: 'Carlos Díez Moran',
    name: 'Díez Moran, Carlos',
  },
  {
    value: 'CLICHE GONZALEZ',
    name: null,
  },
  {
    value: 'CLICHE DUFRESNE',
    name: null,
  },
  {
    value: 'C.Chusseau-Flaviens',
    name: 'C.Chusseau-Flaviens',
  },
  {
    value: 'Bulteau, M.',
    name: 'Bulteau, M.',
  },
  {
    value: 'Broquier, L.',
    name: 'Broquier, L.',
  },
  {
    value: 'Boublion',
    name: 'Boublion',
  },
  {
    value: 'Boisin, L. (Barcelona)',
    name: 'Boisin, L. (Barcelona)',
  },
  {
    value: 'Berpiztu',
    name: 'Berpiztu',
  },
  {
    value: 'Bérillon. F.',
    name: 'Bérillon. F.',
  },
  {
    value: 'Bausac y sobº',
    name: 'Bausac y sobº',
  },
  {
    value: 'Basterretxea',
    name: 'Basterretxea',
  },
  {
    value: 'Badihardugu Euskara Elkartea',
    name: null,
  },
  {
    value: 'Asis García',
    name: 'Asis García',
  },
  {
    value: 'Ariz ikastolako bisitariak',
    name: null,
  },
  {
    value: 'Antxo Etxeberria',
    name: 'Antxo Etxeberria',
  },
  {
    value: 'Antonio Zavala',
    name: 'Antonio Zavala',
  },
  {
    value: 'Anton del Campo',
    name: 'Anton del Campo',
  },
  {
    value: 'Aniceto Fotógrafo',
    name: 'Aniceto Fotógrafo',
  },
  {
    value: 'Ángel Otaduy Echevarria',
    name: 'Ángel Otaduy Echevarria',
  },
  {
    value: 'Andoni Lizarralde 2',
    name: 'Lizarralde, Andoni',
  },
  {
    value: 'Ana Zabala',
    name: 'Ana Zabala',
  },
  {
    value: 'Ana Rosa Castander Santana',
    name: 'Castander Santana, Ana Rosa',
  },
  {
    value: 'Amaia Otazo',
    name: 'Amaia Otazo',
  },
  {
    value: 'Amaia Ajuria Urrujulegi',
    name: 'Amaia Ajuria Urrujulegi',
  },
  {
    value: 'Alzuri (Inma) Alzuri',
    name: 'Alzuri (Inma) Alzuri',
  },
  {
    value: 'Alviach, M.',
    name: 'Alviach, M.',
  },
  {
    value: 'Alonso',
    name: 'Alonso',
  },
  {
    value: 'Algorr',
    name: 'Algorr',
  },
  {
    value: 'Aguine',
    name: 'Aguine',
  },
  {
    value: 'ANONIMO',
    name: null,
  },
  {
    value: 'AISA',
    name: 'AISA',
  },
]

// Yo prefiero llamarlo «usuarios», para no confundir, semánticamente, «author»
// con «photographer», pero en GureGipuzkoa estaba así. Son unos 170. Asigno un
// nombre más correcto allá donde es posible.
const authors = [
  {
    value: 'GipuzkoaKultura',
    name: 'Kultura Ondarearen Zuzendaritza Nagusia',
  },
  {
    value: 'ARANZADI',
    name: 'Aranzadi Zientzia Elkartea',
  },
  {
    value: 'UrnietakoUdala',
    name: 'Urnietako Udala',
  },
  {
    value: 'Kutxa_Fototeka',
    name: 'Kutxa Fototeka',
  },
  {
    value: 'OnatikoUdala',
    name: 'Oñatiko Udala',
  },
  {
    value: 'BeasaingoUdala',
    name: 'Beasaingo Udala',
  },
  {
    value: 'HondarribikoUdala',
    name: 'Hondarribiko Udala',
  },
  {
    value: 'ArantzaCuestaEzeiza',
    name: 'Arantza Cuesta Ezeiza',
  },
  {
    value: 'gurezarautz',
    name: 'Gure Zarautz',
  },
  {
    value: 'xeskisabel',
    name: 'Xabier Eskisabel',
  },
  {
    value: 'luismari',
    name: 'Luis Mari Elosegi Aldasoro',
  },
  {
    value: 'ZaldibiakoUdala',
    name: 'Zaldibiako Udala',
  },
  {
    value: 'ZestoakoUdala',
    name: 'Zestoako Udala',
  },
  {
    value: 'pasaiakoUdala',
    name: 'Pasaiako Udala',
  },
  {
    value: 'AntzuolakoUdala',
    name: 'Antzuolako Udala',
  },
  {
    value: 'lzurutuza',
    name: 'Zurutuza, Luisa',
  },
  {
    value: 'ArrasateZientziaElkartea',
    name: 'Arrasate Zientzia Elkartea',
  },
  {
    value: 'GKnet',
    name: 'GKnet',
  },
  {
    value: 'gipuzkoamendizmendi',
    name: 'Gipuzkoa Mendiz-mendi',
  },
  {
    value: 'xabi_beasain',
    name: 'xabi_beasain',
  },
  {
    value: 'Imanollasa',
    name: 'Lasa, Imanol',
  },
  {
    value: 'ayurrita',
    name: 'Ander Yurrita',
  },
  {
    value: 'EKAINBERRI',
    name: 'Ekainberri',
  },
  {
    value: 'JabiEtxaniz',
    name: 'Jabier Etxaniz Apaolaza',
  },
  {
    value: 'maisumikel',
    name: 'maisumikel',
  },
  {
    value: 'hegialde83',
    name: 'hegialde83',
  },
  {
    value: 'Gazteak20',
    name: 'Gazteak20',
  },
  {
    value: 'udalatx',
    name: 'udalatx',
  },
  {
    value: 'Goierritarra1',
    name: 'Goierritarra1',
  },
  {
    value: 'Etorlur',
    name: 'Etorlur',
  },
  {
    value: 'auggie',
    name: 'Auggie',
  },
  {
    value: 'Orreaga',
    name: 'Orreaga Aranburu',
  },
  {
    value: 'orkatz_go',
    name: 'orkatz_go',
  },
  {
    value: 'ingurugiroetxea',
    name: 'ingurugiroetxea',
  },
  {
    value: 'argindar',
    name: 'argindar',
  },
  {
    value: 'playant',
    name: 'Layant, Pedro',
  },
  {
    value: 'Igartubeiti',
    name: 'Igartubeiti',
  },
  {
    value: 'eba',
    name: 'eba',
  },
  {
    value: 'Idoia',
    name: 'Idoia',
  },
  {
    value: 'ibarrakultura',
    name: 'ibarrakultura',
  },
  {
    value: 'mirene',
    name: 'mirene',
  },
  {
    value: 'hondarribiah1',
    name: 'hondarribiah1',
  },
  {
    value: 'texa',
    name: 'texa',
  },
  {
    value: 'asarasua',
    name: 'asarasua',
  },
  {
    value: 'markelolano',
    name: 'Markel Olano',
  },
  {
    value: 'realjab',
    name: 'realjab',
  },
  {
    value: 'ZumalakarregiMuseoa',
    name: 'Zumalakarregi Museoa',
  },
  {
    value: 'fangio',
    name: 'fangio',
  },
  {
    value: 'Mikel-Marti',
    name: 'Mikel-Marti',
  },
  {
    value: 'flopez',
    name: 'flopez',
  },
  {
    value: 'b5m',
    name: 'b5m',
  },
  {
    value: 'luma',
    name: 'luma',
  },
  {
    value: 'orio2002',
    name: 'orio2002',
  },
  {
    value: 'areantza',
    name: 'areantza',
  },
  {
    value: 'Xabi',
    name: 'Xabi',
  },
  {
    value: 'maaldi',
    name: 'maaldi',
  },
  {
    value: 'taxus',
    name: 'taxus',
  },
  {
    value: 'dantzan',
    name: 'dantzan',
  },
  {
    value: 'assar',
    name: 'assar',
  },
  {
    value: 'intxurre',
    name: 'intxurre',
  },
  {
    value: 'atabal',
    name: 'atabal',
  },
  {
    value: 'JESUS ETXABEjesusetxabe',
    name: 'Jesús Etxabe',
  },
  {
    value: 'peluso',
    name: 'peluso',
  },
  {
    value: 'Niko',
    name: 'Niko',
  },
  {
    value: 'JuanAntonioSaez',
    name: 'Sáez, Juan Antonio',
  },
  {
    value: 'Mksodupe',
    name: 'Mksodupe',
  },
  {
    value: 'JoneLarranaga',
    name: 'Larrañaga, Jone',
  },
  {
    value: 'jmazkue',
    name: 'jmazkue',
  },
  {
    value: 'urko',
    name: 'Urko',
  },
  {
    value: 'bedaio3000',
    name: 'bedaio3000',
  },
  {
    value: 'JESUS ETXABE',
    name: 'Etxabe, Jesús',
  },
  {
    value: 'ordizia',
    name: 'ordizia',
  },
  {
    value: 'manzanos',
    name: 'manzanos',
  },
  {
    value: 'kmkulturunea',
    name: 'kmkulturunea',
  },
  {
    value: 'pbaztarrika',
    name: 'pbaztarrika',
  },
  {
    value: 'lmitxele',
    name: 'lmitxele',
  },
  {
    value: 'jolaus',
    name: 'jolaus',
  },
  {
    value: 'jmadera86',
    name: 'jmadera86',
  },
  {
    value: 'jaramberri',
    name: 'jaramberri',
  },
  {
    value: 'aiarza',
    name: 'aiarza',
  },
  {
    value: 'mzeberio',
    name: 'mzeberio',
  },
  {
    value: 'Raul1986',
    name: 'Raul1986',
  },
  {
    value: 'Andoain12',
    name: 'Andoain12',
  },
  {
    value: 'sforsendil',
    name: 'sforsendil',
  },
  {
    value: 'juanjo56',
    name: 'juanjo56',
  },
  {
    value: 'DaniSanti',
    name: 'DaniSanti',
  },
  {
    value: 'Car_10_m',
    name: 'Car_10_m',
  },
  {
    value: 'joxe',
    name: 'joxe',
  },
  {
    value: 'jmendicute',
    name: 'jmendicute',
  },
  {
    value: 'gondrarezola',
    name: 'gondrarezola',
  },
  {
    value: 'AneLeturia',
    name: 'AneLeturia',
  },
  {
    value: 'juanan',
    name: 'juanan',
  },
  {
    value: 'PabloMoratinos',
    name: 'Pablo Moratinos',
  },
  {
    value: 'unai',
    name: 'unai',
  },
  {
    value: 'rafaespada',
    name: 'rafaespada',
  },
  {
    value: 'orgasmin1',
    name: 'orgasmin1',
  },
  {
    value: 'lorea78',
    name: 'lorea78',
  },
  {
    value: 'jlelizaran',
    name: 'Elizaran, Juan Luis',
  },
  {
    value: 'borthuzai',
    name: 'borthuzai',
  },
  {
    value: 'atxuri',
    name: 'atxuri',
  },
  {
    value: 'vinzer',
    name: 'vinzer',
  },
  {
    value: 'ugarte1950',
    name: 'ugarte1950',
  },
  {
    value: 'trumoia',
    name: 'trumoia',
  },
  {
    value: 'susta',
    name: 'susta',
  },
  {
    value: 'pitxibass',
    name: 'pitxibass',
  },
  {
    value: 'mongider',
    name: 'mongider',
  },
  {
    value: 'kezka',
    name: 'kezka',
  },
  {
    value: 'javierma',
    name: 'javierma',
  },
  {
    value: 'eibarkolasalleirratia',
    name: 'Eibarko La Salle Irratia',
  },
  {
    value: 'berpiztu',
    name: 'berpiztu',
  },
  {
    value: 'MaiderL',
    name: 'MaiderL',
  },
  {
    value: 'Gopi',
    name: 'Gopi',
  },
  {
    value: 'turokja',
    name: 'turokja',
  },
  {
    value: 'thangadurais',
    name: 'thangadurais',
  },
  {
    value: 'soldadito',
    name: 'soldadito',
  },
  {
    value: 'pruebausuario2',
    name: null,
  },
  {
    value: 'nikneri',
    name: 'nikneri',
  },
  {
    value: 'montxo',
    name: 'montxo',
  },
  {
    value: 'miguelcatalan',
    name: 'miguelcatalan',
  },
  {
    value: 'madson1189',
    name: 'madson1189',
  },
  {
    value: 'ketari',
    name: 'ketari',
  },
  {
    value: 'joana',
    name: 'joana',
  },
  {
    value: 'faidit',
    name: 'faidit',
  },
  {
    value: 'eurohelp',
    name: 'eurohelp',
  },
  {
    value: 'dolaizola',
    name: 'dolaizola',
  },
  {
    value: 'codesyntax',
    name: 'codesyntax',
  },
  {
    value: 'antton',
    name: 'antton',
  },
  {
    value: 'Joxemai',
    name: 'Joxemai',
  },
  {
    value: 'test2',
    name: null,
  },
  {
    value: 'sergium13',
    name: 'sergium13',
  },
  {
    value: 'radioactive_peach',
    name: 'radioactive_peach',
  },
  {
    value: 'pazkarate',
    name: 'pazkarate',
  },
  {
    value: 'oiana',
    name: 'oiana',
  },
  {
    value: 'noriushijima',
    name: 'noriushijima',
  },
  {
    value: 'lurrun',
    name: 'lurrun',
  },
  {
    value: 'lamondalironda',
    name: 'lamondalironda',
  },
  {
    value: 'kabul',
    name: 'kabul',
  },
  {
    value: 'jzufiaurre',
    name: 'jzufiaurre',
  },
  {
    value: 'jzubiaurre',
    name: 'jzubiaurre',
  },
  {
    value: 'julenarazi',
    name: 'julenarazi',
  },
  {
    value: 'josemazcona',
    name: 'josemazcona',
  },
  {
    value: 'joseluisechezarreta',
    name: 'Echezarreta, José Luis',
  },
  {
    value: 'jasonegar',
    name: 'jasonegar',
  },
  {
    value: 'jaranburu',
    name: 'jaranburu',
  },
  {
    value: 'jakes',
    name: 'jakes',
  },
  {
    value: 'inaki',
    name: 'inaki',
  },
  {
    value: 'guregipuzkoa',
    name: 'GureGipuzkoa',
  },
  {
    value: 'gipuzkoakomuseoak',
    name: 'Gipuzkoako Museoak',
  },
  {
    value: 'galeria',
    name: 'galeria',
  },
  {
    value: 'enekoinigo',
    name: 'enekoinigo',
  },
  {
    value: 'dunixi',
    name: 'dunixi',
  },
  {
    value: 'chram',
    name: 'chram',
  },
  {
    value: 'cristobal',
    name: 'cristobal',
  },
  {
    value: 'botika',
    name: 'botika',
  },
  {
    value: 'bga',
    name: 'bga',
  },
  {
    value: 'batikbat',
    name: 'batikbat',
  },
  {
    value: 'asmube',
    name: 'asmube',
  },
  {
    value: 'asis',
    name: 'asis',
  },
  {
    value: 'artelatz',
    name: 'artelatz',
  },
  {
    value: 'Verbax',
    name: 'Verbax',
  },
  {
    value: 'S1monD',
    name: 'S1monD',
  },
  {
    value: 'Rodrigo',
    name: 'Rodrigo',
  },
  {
    value: 'ORMA1975',
    name: 'ORMA1975',
  },
  {
    value: 'Miren',
    name: 'Miren',
  },
  {
    value: 'Margari',
    name: 'Margari',
  },
  {
    value: 'Jexux',
    name: 'Jexux',
  },
  {
    value: 'ENRIKE',
    name: 'ENRIKE',
  },
  {
    value: 'DanbolinzuloElkartea',
    name: 'Danbolinzulo Elkartea',
  },
  {
    value: 'Basko',
    name: 'Basko',
  },
  {
    value: 'Arianne',
    name: 'Arianne',
  },
  {
    value: 'Aranzazu Arruabarrena',
    name: 'Aránzazu Arruabarrena',
  },
]

// Municipios. Los he revisado todos, tratando de normalizar los nombres (de
// «Tel Abib» o «Biena» a «Tel Aviv» y «Viena»…). También he añadido la clave
// «parents» a cada uno.
const locations = [
  {
    value: 'DONOSTIA-SAN SEBASTIAN',
    name: 'Donostia-San Sebastián',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'URNIETA',
    name: 'Urnieta',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'OÑATI',
    name: 'Oñati',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'BEASAIN',
    name: 'Beasain',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'HONDARRIBIA',
    name: 'Hondarribia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZARAUTZ',
    name: 'Zarautz',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZESTOA',
    name: 'Zestoa',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'BERGARA',
    name: 'Bergara',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'PASAIA',
    name: 'Pasaia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'TOLOSA',
    name: 'Tolosa',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'AIA',
    name: 'Aia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'EIBAR',
    name: 'Eibar',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZALDIBIA',
    name: 'Zaldibia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'DEBA',
    name: 'Deba',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ANTZUOLA',
    name: 'Antzuola',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LASARTE-ORIA',
    name: 'Lasarte-Oria',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ARRASATE / MONDRAGON',
    name: 'Arrasate / Mondragón',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'AZPEITIA',
    name: 'Azpeitia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'AZKOITIA',
    name: 'Azkoitia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'OIARTZUN',
    name: 'Oiartzun',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ESKORIATZA',
    name: 'Eskoriatza',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'EZKIO-ITSASO',
    name: 'Ezkio-Itsaso',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ATAUN',
    name: 'Ataun',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'IRUN',
    name: 'Irun',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'SEGURA',
    name: 'Segura',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'GETARIA',
    name: 'Getaria',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'MUTRIKU',
    name: 'Mutriku',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'HERNANI',
    name: 'Hernani',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'BERASTEGI',
    name: 'Berastegi',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ELGOIBAR',
    name: 'Elgoibar',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'USURBIL',
    name: 'Usurbil',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LEGAZPI',
    name: 'Legazpi',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZUMAIA',
    name: 'Zumaia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ERRENTERIA',
    name: 'Errenteria',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ARETXABALETA',
    name: 'Aretxabaleta',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZUMARRAGA',
    name: 'Zumarraga',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ERREZIL',
    name: 'Errezil',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ANDOAIN',
    name: 'Andoain',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'SORALUZE-PLACENCIA DE LAS ARMAS',
    name: 'Soraluze-Placencia de las Armas',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ASTEASU',
    name: 'Asteasu',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'VILLABONA',
    name: 'Villabona',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'IDIAZABAL',
    name: 'Idiazabal',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ELGETA',
    name: 'Elgeta',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZEGAMA',
    name: 'Zegama',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ORMAIZTEGI',
    name: 'Ormaiztegi',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ORIO',
    name: 'Orio',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZERAIN',
    name: 'Zerain',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ORDIZIA',
    name: 'Ordizia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LEINTZ-GATZAGA',
    name: 'Leintz-Gatzaga',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ZIZURKIL',
    name: 'Zizurkil',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'BEIZAMA',
    name: 'Beizama',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ALBIZTUR',
    name: 'Albiztur',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'GABIRIA',
    name: 'Gabiria',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ALTZO',
    name: 'Altzo',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'URRETXU',
    name: 'Urretxu',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'MENDARO',
    name: 'Mendaro',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LIZARTZA',
    name: 'Lizartza',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ALEGIA',
    name: 'Alegia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ALKIZA',
    name: 'Alkiza',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LAZKAO',
    name: 'Lazkao',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ELDUAIN',
    name: 'Elduain',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ASTIGARRAGA',
    name: 'Astigarraga',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'AMEZKETA',
    name: 'Amezketa',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LEZO',
    name: 'Lezo',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'BIDEGOIAN',
    name: 'Bidegoian',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ABALTZISKETA',
    name: 'Abaltzisketa',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'AIZARNAZABAL',
    name: 'Aizarnazabal',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'IBARRA',
    name: 'Ibarra',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'GAZTELU',
    name: 'Gaztelu',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LEGORRETA',
    name: 'Legorreta',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'LARRAUL',
    name: 'Larraul',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'OLABERRIA',
    name: 'Olaberria',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'MUTILOA',
    name: 'Mutiloa',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ADUNA',
    name: 'Aduna',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'BILBAO',
    name: 'Bilbao',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ALTZAGA',
    name: 'Altzaga',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'PARTZUERGO NAGUSIA',
    name: 'Partzuergo Nagusia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ELORRIO',
    name: 'Elorrio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ABADIÑO',
    name: 'Abadiño',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'OREXA',
    name: 'Orexa',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'MARKINA-XEMEIN',
    name: 'Markina-Xemein',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LEABURU',
    name: 'Leaburu',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ISABA',
    name: 'Isaba',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BELAUNTZA',
    name: 'Belauntza',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'BERRIZ',
    name: 'Berriz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ENIRIO-ARALAR',
    name: 'Enirio-Aralar',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'GAINTZA',
    name: 'Gaintza',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ITSASONDO',
    name: 'Itsasondo',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ANOETA',
    name: 'Anoeta',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'ORENDAIN',
    name: 'Orendain',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'HERNIALDE',
    name: 'Hernialde',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'AMOREBIETA-ETXANO',
    name: 'Amorebieta-Etxano',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LARRAUN',
    name: 'Larraun',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'VITORIA-GASTEIZ',
    name: 'Vitoria-Gasteiz',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'BERROBI',
    name: 'Berrobi',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'PAMPLONA',
    name: 'Pamplona',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ZALDIBAR',
    name: 'Zaldibar',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SALZBURGO',
    name: 'Salzburgo',
    parents: ['Salzburgo', 'Austria', 'Europa'],
  },
  {
    value: 'BALIARRAIN',
    name: 'Baliarrain',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'DURANGO',
    name: 'Durango',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'IKAZTEGIETA',
    name: 'Ikaztegieta',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'GERNIKA-LUMO',
    name: 'Gernika-Lumo',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ERMUA',
    name: 'Ermua',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LEKEITIO',
    name: 'Lekeitio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LARRABETZU',
    name: 'Larrabetzu',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'IRURA',
    name: 'Irura',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'UHARTE-ARAKIL',
    name: 'Uharte-Arakil',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'GARAY',
    name: 'Garay',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ETXEBARRIA',
    name: 'Etxebarria',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MAÑARIA',
    name: 'Mañaria',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'GÜEÑES',
    name: 'Güeñes',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'URDUÑA-ORDUÑA',
    name: 'Urduña-Orduña',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BERA/VERA DE BIDASOA',
    name: 'Bera/Vera de Bidasoa',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'LESAKA',
    name: 'Lesaka',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MUXIKA',
    name: 'Muxika',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MALLABIA',
    name: 'Mallabia',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BERMEO',
    name: 'Bermeo',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ARAMA',
    name: 'Arama',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'GALDAKAO',
    name: 'Galdakao',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ZIORTZA-BOLIBAR',
    name: 'Ziortza-Bolibar',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ATXONDO',
    name: 'Atxondo',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'RONCAL/ERRONKARI',
    name: 'Roncal/Erronkari',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ONDARROA',
    name: 'Ondarroa',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MUNGIA',
    name: 'Mungia',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'KARRANTZA ARANA/VALLE DE CARRANZA',
    name: 'Karrantza Arana/Valle de Carranza',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'GAUTEGIZ-ARTEAGA',
    name: 'Gautegiz-Arteaga',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'FORUA',
    name: 'Forua',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BAZTAN',
    name: 'Baztan',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ARAMAIO',
    name: 'Aramaio',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'GETXO',
    name: 'Getxo',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'OTXAGABIA',
    name: 'Otxagabia',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'HENDAIA',
    name: 'Hendaia',
    parents: ['Lapurdi', 'Francia', 'Europa'],
  },
  {
    value: 'ESTELLA/LIZARRA',
    name: 'Estella/Lizarra',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'KORTEZUBI',
    name: 'Kortezubi',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BIENA',
    name: 'Viena',
    parents: ['Viena', 'Austria', 'Europa'],
  },
  {
    value: 'BERRIATUA',
    name: 'Berriatua',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'PEÑACERRADA-URIZAHARRA',
    name: 'Peñacerrada-Urizaharra',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'AULESTI',
    name: 'Aulesti',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'PRAGA',
    name: 'Praga',
    parents: ['Bohemia', 'República Checa', 'Europa'],
  },
  {
    value: 'GAMIZ-FIKA',
    name: 'Gamiz-Fika',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ARRAZUA-UBARRUNDIA',
    name: 'Arrazua-Ubarrundia',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'LEMOA',
    name: 'Lemoa',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LEGUTIANO',
    name: 'Legutiano',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ERRIGOITI',
    name: 'Errigoiti',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'IZURTZA',
    name: 'Izurtza',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'DIMA',
    name: 'Dima',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'OLITE',
    name: 'Olite',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'GERUSALEN',
    name: 'Jerusalén',
    parents: ['Jerusalén', 'Israel', 'Asia'],
  },
  {
    value: 'DONIBANE GARAZI',
    name: 'Donibane Garazi',
    parents: ['Benafarroa', 'Francia', 'Europa'],
  },
  {
    value: 'ARRAIA-MAEZTU',
    name: 'Arraia-Maeztu',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'SANTA GRAZI',
    name: 'Urdatx-Santa Grazi',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'IBARRANGELU',
    name: 'Ibarrangelu',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'CAMPEZO/KANPEZU',
    name: 'Campezo/Kanpezu',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'LONDRES',
    name: 'Londres',
    parents: ['Inglaterra', 'Reino Unido', 'Europa'],
  },
  {
    value: 'BERLIN',
    name: 'Berlin',
    parents: ['Berlín', 'Alemania', 'Europa'],
  },
  {
    value: 'BAKIO',
    name: 'Bakio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'UJUÉ',
    name: 'Ujué',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'EREÑO',
    name: 'Ereño',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'YESA',
    name: 'Yesa',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'OROZKO',
    name: 'Orozko',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LABASTIDA',
    name: 'Labastida',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ARAITZ',
    name: 'Araitz',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'NABARNIZ',
    name: 'Nabarniz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ARBIZU',
    name: 'Arbizu',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ELANTXOBE',
    name: 'Elantxobe',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BARRUNDIA',
    name: 'Barrundia',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ARRANKUDIAGA',
    name: 'Arrankudiaga',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ZIERBANA',
    name: 'Zierbana',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'OTXANDIO',
    name: 'Otxandio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SANGÜESA/ZANGOZA',
    name: 'Sangüesa/Zangoza',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MUNITIBAR-ARBATZEGI-GERRIKAITZ',
    name: 'Munitibar-Arbatzegi-Gerrikaitz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'DONIBANE LOHIZUNE',
    name: 'Donibane Lohizune',
    parents: ['Lapurdi', 'Francia', 'Europa'],
  },
  {
    value: 'BEDIA',
    name: 'Bedia',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ORREAGA/RONCESVALLES',
    name: 'Orreaga/Roncesvalles',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'LAGUARDIA',
    name: 'Laguardia',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'INTERLAKEN',
    name: 'Interlaken',
    parents: ['Berna', 'Suiza', 'Europa'],
  },
  {
    value: 'BARRIKA',
    name: 'Barrika',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'VIDANGOZ/BIDANKOZE',
    name: 'Vidangoz/Bidankoze',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'EA',
    name: 'Ea',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ZIGOITIA',
    name: 'Zigoitia',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ZEBERIO',
    name: 'Zeberio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ZEANURI',
    name: 'Zeanuri',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'UBIDE',
    name: 'Ubide',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'SUKARRIETA',
    name: 'Sukarrieta',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SINTRA',
    name: 'Sintra',
    parents: ['Estremadura', 'Portugal', 'Europa'],
  },
  {
    value: 'SALVATIERRA/AGURAIN',
    name: 'Salvatierra/Agurain',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'PORTUGALETE',
    name: 'Portugalete',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'JAVIER',
    name: 'Javier',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ETXARRI-ARANATZ',
    name: 'Etxarri-Aranatz',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ARRATZU',
    name: 'Arratzu',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ZAMBRANA',
    name: 'Zambrana',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'IGORRE',
    name: 'Igorre',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BAIONA',
    name: 'Baiona',
    parents: ['Lapurdi', 'Francia', 'Europa'],
  },
  {
    value: 'AREATZA',
    name: 'Areatza',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SAN MILLÁN/DONEMILIAGA',
    name: 'San Millán/Donemiliaga',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'GINEBRA',
    name: 'Ginebra',
    parents: ['Ginebra', 'Suiza', 'Europa'],
  },
  {
    value: 'GATIKA',
    name: 'Gatika',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BUSTURIA',
    name: 'Busturia',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'AJANGIZ',
    name: 'Ajangiz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'URDULIZ',
    name: 'Urduliz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'OSPITALEPEA',
    name: "L'Hôpital-Saint-Blaise / Ospitalepea",
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'LOIU',
    name: 'Loiu',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LEMOIZ',
    name: 'Lemoiz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'AYALA/AIARA',
    name: 'Ayala/Aiara',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ARANTZAZU',
    name: 'Arantzazu',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ZARATAMO',
    name: 'Zaratamo',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'TORRALBA DEL RÍO',
    name: 'Torralba del Río',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'NAVASCUÉS',
    name: 'Navascués',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MILAN',
    name: 'Milan',
    parents: ['Lombardía', 'Italia', 'Europa'],
  },
  {
    value: 'MENDATA',
    name: 'Mendata',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LEIOA',
    name: 'Leioa',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LAUKIZ',
    name: 'Laukiz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LANESTOSA',
    name: 'Lanestosa',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BERNEDO',
    name: 'Bernedo',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'BERANGO',
    name: 'Berango',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MORGA',
    name: 'Morga',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'IURRETA',
    name: 'Iurreta',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BALMASEDA',
    name: 'Balmaseda',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ARRIGORRIAGA',
    name: 'Arrigorriaga',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'TORRES DEL RÍO',
    name: 'Torres del Río',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'SANTURTZI',
    name: 'Santurtzi',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MUNDAKA',
    name: 'Mundaka',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ISPASTER',
    name: 'Ispaster',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'GORDEXOLA',
    name: 'Gordexola',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'FRUIZ',
    name: 'Fruiz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ERGOIENA',
    name: 'Ergoiena',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BERANTEVILLA',
    name: 'Berantevilla',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ARRIETA',
    name: 'Arrieta',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ALTSASU/ALSASUA',
    name: 'Altsasu/Alsasua',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'VIANA',
    name: 'Viana',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'SUNBILLA',
    name: 'Sunbilla',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'POSDAM',
    name: 'Potsdam',
    parents: ['Brandeburgo', 'Alemania', 'Europa'],
  },
  {
    value: 'PLENTZIA',
    name: 'Plentzia',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MURUETA',
    name: 'Murueta',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MENDEXA',
    name: 'Mendexa',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'IRURAIZ-GAUNA',
    name: 'Iruraiz-Gauna',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'GIZABURUAGA',
    name: 'Gizaburuaga',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'GALDAMES',
    name: 'Galdames',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ETXALAR',
    name: 'Etxalar',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BURGUI',
    name: 'Burgui',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BUENOS AIRES',
    name: 'Buenos Aires',
    parents: ['Buenos Aires', 'Argentina', 'América'],
  },
  {
    value: 'BERNA',
    name: 'Berna',
    parents: ['Berna', 'Suiza', 'Europa'],
  },
  {
    value: 'BARAKALDO',
    name: 'Barakaldo',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'AURITZ/BURGUETE',
    name: 'Auritz/Burguete',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'AMURRIO',
    name: 'Amurrio',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'AMOROTO',
    name: 'Amoroto',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ZAMUDIO',
    name: 'Zamudio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ZALLA',
    name: 'Zalla',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'VALDEGOVÍA',
    name: 'Valdegovía',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'URZAINQUI/URZAINKI',
    name: 'Urzainqui/Urzainki',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'UGAO-MIRABALLES',
    name: 'Ugao-Miraballes',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SARA',
    name: 'Sara',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'PUENTE LA REINA/GARES',
    name: 'Puente la Reina/Gares',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'PARTZUERGO TXIKIA',
    name: 'Partzuergo Txikia',
    parents: ['Gipuzkoa', 'España', 'Europa'],
  },
  {
    value: 'MEÑAKA',
    name: 'Meñaka',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LLODIO',
    name: 'Llodio',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'IRURTZUN',
    name: 'Irurtzun',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BETELU',
    name: 'Betelu',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BASAURI',
    name: 'Basauri',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BARKOXE',
    name: 'Barkoxe',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'VALLE DE TRÁPAGA-TRAPAGARAN',
    name: 'Valle de Trápaga-Trapagaran',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SOPELANA',
    name: 'Sopelana',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MURREN',
    name: 'Mürren',
    parents: ['Berna', 'Suiza', 'Europa'],
  },
  {
    value: 'GORLIZ',
    name: 'Gorliz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'AOSTA',
    name: 'Aosta',
    parents: ['Valle de Aosta', 'Italia', 'Europa'],
  },
  {
    value: 'AGUILAR DE CODÉS',
    name: 'Aguilar de Codés',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ZUIA',
    name: 'Zuia',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ZERMATT',
    name: 'Zermatt',
    parents: ['Valais', 'Suiza', 'Europa'],
  },
  {
    value: 'ZALDUONDO',
    name: 'Zalduondo',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'SANTA KOLOMA DE ANDORRA',
    name: 'Santa Koloma de Andorra',
    parents: ['Andorra', 'Europa'],
  },
  {
    value: 'OLZA',
    name: 'Olza',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MUSKIZ',
    name: 'Muskiz',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'MARURI-JATABE',
    name: 'Maruri-Jatabe',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'GERNIKA',
    name: 'Gernika',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ASPARRENA',
    name: 'Asparrena',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ARMIÑÓN',
    name: 'Armiñón',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ARAKALDO',
    name: 'Arakaldo',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'AIBAR/OIBAR',
    name: 'Aibar/Oibar',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'VILLAMAYOR DE MONJARDÍN',
    name: 'Villamayor de Monjardín',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ULTZAMA',
    name: 'Ultzama',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'TUDELA',
    name: 'Tudela',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'SORLADA',
    name: 'Sorlada',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MONAKO',
    name: 'Mónaco',
    parents: ['Mónaco', 'Europa'],
  },
  {
    value: 'IZA',
    name: 'Iza',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'GARDE',
    name: 'Garde',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'EULATE',
    name: 'Eulate',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ENGOLASTERS',
    name: 'Engolasters',
    parents: ['Andorra', 'Europa'],
  },
  {
    value: 'BRAGANZA',
    name: 'Braganza',
    parents: ['Trás-os-Montes', 'Portugal', 'Europa'],
  },
  {
    value: 'BIRIATU',
    name: 'Biriatu',
    parents: ['Lapurdi', 'Francia', 'Europa'],
  },
  {
    value: 'URDIINARBE',
    name: 'Ordiarp / Urdiñarbe',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'OYÓN-OION',
    name: 'Oyón-Oion',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ODIETA',
    name: 'Odieta',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'LUZERNA',
    name: 'Lucerna',
    parents: ['Lucerna', 'Suiza', 'Europa'],
  },
  {
    value: 'LEZAMA',
    name: 'Lezama',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'LEXANZU-ZUNHARRE',
    name: 'Lexanzu-Zunharre',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'ITUREN',
    name: 'Ituren',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'GÜESA/GORZA',
    name: 'Güesa/Gorza',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ERANDIO',
    name: 'Erandio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ELVILLAR/BILAR',
    name: 'Elvillar/Bilar',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'BIDARRAI',
    name: 'Bidarrai',
    parents: ['Benafarroa', 'Francia', 'Europa'],
  },
  {
    value: 'ARTZINIEGA',
    name: 'Artziniega',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'ALDUDE',
    name: 'Aldude',
    parents: ['Benafarroa', 'Francia', 'Europa'],
  },
  {
    value: 'ABÁIGAR',
    name: 'Abáigar',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'UZTÁRROZ',
    name: 'Uztárroz',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'TEL ABIB',
    name: 'Tel Aviv',
    parents: ['Tel Aviv', 'Israel', 'Asia'],
  },
  {
    value: 'SESTAO',
    name: 'Sestao',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SENPERE',
    name: 'Senpere',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'SAMANIEGO',
    name: 'Samaniego',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'KANILO',
    name: 'Canillo',
    parents: ['Andorra', 'Europa'],
  },
  {
    value: 'KANBO',
    name: 'Kanbo',
    parents: ['Lapurdi', 'Francia', 'Europa'],
  },
  {
    value: 'ITURMENDI',
    name: 'Iturmendi',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'EZKURRA',
    name: 'Ezkurra',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'EZCAROZ/EZKAROZE',
    name: 'Ezcaroz/Ezkaroze',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ETXEBARRI',
    name: 'Etxebarri',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'ESPRONCEDA',
    name: 'Espronceda',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ESPARZA',
    name: 'Esparza',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'EGÜES',
    name: 'Egües',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'DESOJO',
    name: 'Desojo',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BASABURUA',
    name: 'Basaburua',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BARGOTA',
    name: 'Bargota',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'AYEGUI',
    name: 'Ayegui',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ARANO',
    name: 'Arano',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ANDORRA LA BEILA',
    name: 'Andorra la Vella',
    parents: ['Andorra', 'Europa'],
  },
  {
    value: 'ABÁRZUZA',
    name: 'Abartzuza',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'USCARRÉS/USKARTZE',
    name: 'Uscarrés/Uskartze',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'SONDIKA',
    name: 'Sondika',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'SANSOL',
    name: 'Sansol',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'RIBERA BAJA/ERRIBERA BEITIA',
    name: 'Ribera Baja/Erribera Beitia',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'MUSKILDI',
    name: 'Muskildi',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MAULE',
    name: 'Maule',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'MARAÑÓN',
    name: 'Marañón',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'LEGARIA',
    name: 'Legaria',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'LAPOBLACIÓN',
    name: 'Lapoblación',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'KOLONIA',
    name: 'Colonia',
    parents: ['Colonia', 'Renania del Norte-Westfalia', 'Alemania', 'Europa'],
  },
  {
    value: 'HAILEIN',
    name: 'Hailein',
    parents: ['Salzburgo', 'Austria', 'Europa'],
  },
  {
    value: 'GOTAINE-IRABARNE',
    name: 'Gotaine-Irabarne',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'ETAYO',
    name: 'Etayo',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ELBURGO/BURGELU',
    name: 'Elburgo/Burgelu',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'BREGENZ',
    name: 'Bregenz',
    parents: ['Vorarlberg', 'Austria', 'Europa'],
  },
  {
    value: 'BERTIZARANA',
    name: 'Bertizarana',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'BAIGORRI',
    name: 'Baigorri',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'ANCÍN',
    name: 'Ancín',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'AINZILA',
    name: 'Ainzila',
    parents: ['Benafarroa', 'Francia', 'Europa'],
  },
  {
    value: 'THUN',
    name: 'Thun',
    parents: ['Berna', 'Suiza', 'Europa'],
  },
  {
    value: 'SPIEZ',
    name: 'Spiez',
    parents: ['Berna', 'Suiza', 'Europa'],
  },
  {
    value: 'PIEDRAMILLERA',
    name: 'Piedramillera',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'PERALTA',
    name: 'Peralta',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ORONZ/ORONTZE',
    name: 'Oronz/Orontze',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'OLEJUA',
    name: 'Olejua',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'OLAZTI/OLAZAGUTÍA',
    name: 'Olazti/Olazagutía',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'OCO',
    name: 'Oco',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MURIETA',
    name: 'Murieta',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'MONTREUX',
    name: 'Montreux',
    parents: ['Vaud', 'Suiza', 'Europa'],
  },
  {
    value: 'MERITXEIL',
    name: 'Meritxeil',
    parents: ['Andorra', 'Europa'],
  },
  {
    value: 'LOS ARCOS',
    name: 'Los Arcos',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'LHERS',
    name: 'Lhers',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'LEZÁUN',
    name: 'Lezáun',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'LAKUNTZA',
    name: 'Lakuntza',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'JUSLAPEÑA',
    name: 'Juslapeña',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'IRUÑA DE OCA/IRUÑA OKA',
    name: 'Iruña de Oca/Iruña Oka',
    parents: ['Araba', 'España', 'Europa'],
  },
  {
    value: 'INNSBRUKK',
    name: 'Innsbruck',
    parents: ['Tirol', 'Austria', 'Europa'],
  },
  {
    value: 'IBARGOITI',
    name: 'Ibargoiti',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'HAIFA',
    name: 'Haifa',
    parents: ['Haifa', 'Israel', 'Asia'],
  },
  {
    value: 'GOÑI',
    name: 'Goñi',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'FUNES',
    name: 'Funes',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'EZPEIZE-UNDUREINE',
    name: 'Ezpeize-Undureine',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'ETTXEBAR',
    name: 'Etxebarre',
    parents: ['Zuberoa', 'Francia', 'Europa'],
  },
  {
    value: 'ERRO',
    name: 'Erro',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ERRAZKIN',
    name: 'Errazkin',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ERATSUN',
    name: 'Eratsun',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ELGORRIAGA',
    name: 'Elgorriaga',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'DONAZAHARRE',
    name: 'Saint-Jean-le-Vieux / Donazaharre',
    parents: ['Benafarroa', 'Francia', 'Europa'],
  },
  {
    value: 'DERIO',
    name: 'Derio',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'BIDAXUNE',
    name: 'Bidaxune',
    parents: ['Benafarroa', 'Francia', 'Europa'],
  },
  {
    value: 'BAKAIKU',
    name: 'Bakaiku',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ATEZ',
    name: 'Atez',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'ARTEA',
    name: 'Artea',
    parents: ['Bizkaia', 'España', 'Europa'],
  },
  {
    value: 'AMÉSCOA BAJA',
    name: 'Améscoa Baja',
    parents: ['Nafarroa', 'España', 'Europa'],
  },
  {
    value: 'AKISGRAN',
    name: 'Aachen-Aquisgrán',
    parents: ['Colonia', 'Renania del Norte-Westfalia', 'Alemania', 'Europa'],
  },
]

// Todas las rutas que contienen 20 fotografías o más.
const folders = [
  'jesus-elosegui',
  'urnietako-udal-artxiboko-argazki-bilduma',
  'kultura-ondarearen-zuzendaritza-nagusia-argazkiak-34',
  'kultura-ondarearen-zuzendaritza-nagusia-argazkiak-24',
  'kultura-ondarearen-zuzendaritza-nagusia-argazkiak-14',
  'kultura-ondarearen-zuzendaritza-nagusia-argazkiak-44',
  'indalecio-ojanguren',
  'onatiko-udal-artxiboko-argazki-bilduma',
  'juan-san-martin',
  'beasaingo-udaleko-argazki-bilduma',
  'donostiako-postalen-funtsa',
  'hondarribiko-udal-artxiboko-argazki-bilduma',
  'arantzacuestaezeiza',
  'car2011',
  'marin2011',
  'xeskisabel',
  'herritarrek-utzitako-argazki-historikoak',
  'zaldibiakoudala',
  'gurepasaia',
  'aranzadi',
  'sigfrido-koch',
  'gipuzkoakultura',
  'gurezarautz',
  'samiel-jaietako-argazki-lehiaketa',
  'lzurutuza',
  'carrera-automovilistica-en-el-circuito-de-lasarte',
  'paisajes-espanolesko-argazki-sorta',
  'luismari',
  'beasaingo-diaporamaren-diapolanen-argazkiak',
  '2010ko-sanmiel-jaiak',
  'xabi_beasain',
  'arrasatezientziaelkartea',
  'urnietako-xvii-argazki-rallya',
  'kultur-ekintzak-sarobe-eta-lekaion',
  'eventos-deportivos-playa-zaldi-lasterketa',
  'urnietako-xvi-argazki-rallya',
  '2008ko-sanmiel-jaiak',
  'ayurrita',
  'piraten-abordaia-2011',
  'urnietako-argazki-rally-anitzak',
  'thomas-bilduma',
  'herritarrek-udalari-utzitako-argazkiak',
  'beasaingo-baserriak-eta-eraikinak',
  'indar',
  'gknet',
  'santa-krutz-jaiak',
  'ikastetxeen-bisitak',
  'maisumikel',
  'zuhaitz-eguna',
  'urnieta-elurturik',
  'hegialde83',
  'onatiko-kale-eta-etxeak',
  'eskola-kirola',
  'regatas-de-traineras-en-la-bahia-de-la-concha',
  'extranjeros-que-se-inscriben-como-residentes-en-hondarribia',
  '2004ko-sanmiel-jaiak',
  'fiestas-1988',
  'uda-09-verano-09',
  'gipuzkoamendizmendi',
  'festival-de-cine-de-san-sebastian',
  'highlands-games-goierrin',
  'gazteak20',
  'eventos-culturales-jornada-romana',
  '2009ko-sanmiel-jaiak',
  'urnietako-udala-trantsizio-garaian',
  'temporal-de-mar-en-san-sebastian',
  'escenas-en-la-playa-de-la-concha',
  'tamborrada-de-san-sebastian',
  'maria-cristina-hotela-victoria-eugenia-eta-okendo',
  'patrimonio-monumentos-otros-monumentos',
  'fiestas-euskal-jaia',
  'auggie',
  'boda-de-la-sobrina-del-duque-de-sotomayor',
  'corrida-de-toros-en-la-plaza-de-el-txofre',
  'concurso-internacional-de-perros-pastor-1984-25-aniversario',
  'herriguneko-etxeak',
  'errealari-omenaldia-arantzazun',
  'imanollasa',
  'homenaje-a-la-monja-leturiaga',
  'kale-eta-plazak-1995-urtean',
  'festividad-del-corpus-en-onati-1957',
  'playant',
  'patrimonio-monumentos-ruta-monumental',
  'san-sebastian-carroza-del-carnaval',
  'digitalizatuak',
  'corrida-de-toros-en-una-plaza',
  'san-silbestre-2009',
  'ibarrakultura',
  'eventos-deportivos-playa-triatlon',
  'altzurukuko-maskaradak-mendikotan-1972',
  'tarde-de-toros-en-la-plaza-de-el-txofre',
  'mirene',
  'fiestas-1985',
  'cafeko-argazki-historikoak-eta-anitzak',
  'eventos-deportivos-playa-txaparrotan-balonmano',
  'alona-mendi-futbol-taldea',
  'zahor-taldeko-txirrindulariak',
  'igartubeiti',
  'texa',
  'jose-mari-setien-apezpikuaren-meza-beneditarretan',
  'udalatx',
  'festividad-de-la-virgen-de-arantzazu-1972',
  'concurso-internacional-de-perros-pastor-1956',
  'asarasua',
  'san-sebastian',
  'fiestas-gastronomia-cerveza',
  'eventos-culturales-arte-zarautzart',
  'dantzariak-herriko-plazan',
  'concurso-internacional-de-perros-pastor-1992',
  'igartza-jauregiko-egurraren-xehetasuna',
  'igartza',
  'herri-kirolak-xoxokako-jaietan',
  'gizon-baten-estudio-argazkia',
  'fiestas-cuadrillas',
  'celebracion-del-alarde-de-irun-con-motivo-de-las-fiestas-de-san-marcial',
  'futbol-zelaiaren-inaugurazioa-errealarekin',
  'fiestas-patronales-de-onati-1991',
  'lasarteko-auto-lasterketa-zirkuitoa',
  'eventos-deportivos-playa-surf-rip-curl-pro-wqs',
  'concurso-internacional-de-perros-pastor-1969-1970',
  'vistas-de-san-sebastian-nevado',
  'san-sebastian-avenida-de-la-libertad',
  'mitin-de-eusko-alkartasuna-1988',
  'i-campeonato-local-de-perros-pastor-1990',
  'etorlur',
  'zestoakoudala',
  'patrimonio-esculturas-ruta-escultorica',
  'ermitas',
  'eba',
  'orreaga',
  'markelolano',
  'fiestas-extremadura',
  'fiestas-barrios-urteta',
  'bartzelona-1888',
  'san-migel-goiaingeruaren-metalezko-jantzia',
  'cultura-y-naturaleza-dunas-y-marismas',
  '2001eko-kilometroak',
  'san-sebastian-puente-de-maria-cristina',
  'inude-eta-artzainak-2011',
  'concierto-en-santa-ana-1992',
  'llegada-de-integrantes-de-la-division-azul-a-la-estacion-del-norte',
  'kaldereroak-2011',
  'eventos-deportivos-playa-playeros-futbol',
  'concurso-internacional-de-perros-pastor-1970-1',
  'concierto-en-santa-ana-1990',
  'traslado-y-colocacion-de-barco-pesquero-san-francisco-glorioso-en-el-restaurante-bekoerrota',
  'concurso-internacional-de-perros-pastor-1988',
  'xix-mendeko-kare-hidrauliko-lantegien-aztarnak-beduako-lantegia',
  'orkatz_go',
  'inundaciones-1992',
  'inauguracion-del-tiro-al-plato',
  'fiestas-patronales-herri-eguna-1992',
  'acto-de-inauguracion-de-la-ermita-de-endoia-de-zestoa',
  'tropas-en-la-guerra-de-africa',
  'san-sebastian-la-playa',
  'nevada-de-1993',
  'kilometroak-1989',
  'ingurugiroetxea',
  'hondarribiah1',
  'ez-dok-amairu-1971',
  'ereiten',
  'ekainberri-1',
  'colocacion-del-friso-de-los-apostoles-en-el-santuario-de-arantzazu',
  'procesion-del-corpus-1965',
  'motokros-txapelketa',
  'gipuzkoa-2_0-tabakaleran',
  'carrera-de-motocicletas-en-el-circuito-de-amara',
  '2001-urteko-umeen-danborrada',
  'san-sebastian-desfile-del-carnaval',
  'homenaje-a-juan-mujika-fermin-altube-y-a-jon-zubieta',
  'fiestas-1989',
  'concierto-de-txistularis-1992',
  'tour-de-francia',
  'san-sebastian-el-puerto',
  'san-sebastian-el-casino',
  'recibimiento-a-las-tropas-del-bando-nacional',
  'iii-encuentro-de-corales',
  'fiestas-san-pelayo',
  'eventos-deportivos-playa-travesia-getaria-zarautz',
  'argia-dantza-taldea-1971',
  'santa-fe-jaietako-bazkari-herrikoia',
  'san-sebastian-paseo-de-la-concha',
  'realjab',
  'mikel-marti',
  'homenaje-a-antonino-ibarrondo-1992',
  'goierritarra1',
  'festividad-de-la-virgen-de-arantzazu-1987',
  'fangio',
  'concurso-internacional-de-perros-pastor-1989',
  'concierto-en-santa-ana',
  'competicion-de-tiro-en-el-campo-de-gudamendi',
  'san-sebastian-el-gran-casino',
  'visita-de-autoridad-a-la-exposicion-dentro-de-los-actos-conmemorativos-del-tricentenario-de-la-paz-de-los-pirineos-cena-y-actuacion-de-la-coral-irunesa-de-camara-en-el-castillo',
  'seminario-diocesano-en-el-paseo-de-heriz',
  'santa-fe-jaietako-kontzertua',
  'homenaje-a-los-jubilados-1966',
  'goizaldi-dantza-taldea-1971',
  'flopez',
  'dantzariak-santa-fe-jaietan',
  'asistencia-de-diversas-autoridades-a-la-cena-de-la-vispera-de-san-sebastian',
  'alarde-del-moro',
  'torneo-de-pelota-cuenca-del-deba-1972',
  'inundaciones-en-diversos-lugares-de-gipuzkoa',
  'i-rally-vasco-navarro',
  'competicion-de-motocros-en-la-zona-de-aiete-y-antiguo',
  'circuito-automovilistico-de-lasarte',
  'altzagarateko-sinadura',
  'actos-festivos-con-motivo-del-recibimiento-de-autoridades-en-villabona',
  'san-sebastian-iglesia-del-buen-pastor',
  'rodaje-de-la-pelicula-fiesta',
  'parke-naturala-pagoeta',
  'llegada-de-vagones-del-talgo-al-puerto-de-pasaia',
  'fiestas-patronales-de-onati-1984',
  'festividad-de-arantzazu-1988',
  'concurso-internacional-de-perros-pastor-1969-1971',
  'concurso-internacional-de-perros-pastor-1957',
  'argindar',
  'visita-de-ministros-dentro-de-los-actos-conmemorativos-del-tricentenario-de-la-paz-de-los-pirineos-y-ii-reunion-hispano-francesa-de-estudiantes-universitarios',
  'san-sebastian-vista-general',
  'ibilbidea-talaia',
  'festival-internacional-de-folclore-vasco-en-el-velodromo-de-anoeta',
  'eventos-culturales-teatro-kalerki',
  'don-herbert-artelekun',
  'concurso-internacional-de-perros-pastor-1991',
  'astigarragako-haitzuloa',
  'visita-de-diferentes-personalidades-a-localidades-de-gipuzkoa-y-bizkaia-entre-ellas-se-encuentran-telesforo-monzon-teodoro-hernandorena-y-jose-antonio-aguirre-lekube',
  'santa-fe-jaietako-kale-giroa',
  'san-sebastian-carroza-en-el-desfile-del-carnaval',
  'partido-real-sociedad-malaga',
  'pantanadak-orotz-betelun',
  'marcha-por-la-paz-1992',
  'inauguracion-de-la-ermita-de-urbia',
  'ii-gran-premio-de-san-sebastian-en-el-circuito-automovilistico-de-lasarte',
  'escenas-de-las-carreras-de-caballos-en-el-hipodromo-de-lasarte',
  'congreso-eucaristico-y-festividad-del-corpus-en-onati-1956',
  'celebracion-de-la-carrera-ciclista-vuelta-a-espana',
  'peregrinacion-espanola-al-xxx-congreso-eucaristico-internacional-en-cartago',
  'gipuzkoa',
  'fiestas-barrios-inurritza',
  'fiestas-1993',
  'desfile-de-la-reina-de-san-sebastian',
  'carrera-de-cross-en-san-sebastian',
  'autoridades-visitando-la-compania-y-auxiliar-de-ferrocarriles-caf-de-beasain',
  'visita-de-dos-personalidades-de-francia-y-espana-al-castillo-de-carlos-v-en-el-tricentenario-de-la-paz-de-los-pirineos',
  'recibimiento-del-obispo-jaime-font-y-andreu-a-la-localidad-de-villabona',
  'pruebas-atleticas-en-el-campo-de-berazubi-de-tolosa',
  'luma',
  'el-entonces-cardenal-roncali-y-posteriormente-papa-juan-xxiii-en-pasai-donibane-durante-la-celebracion-del-bautizo-de-la-sobrina-de-monsenor-laboa-maria-luisita',
  'concierto-de-navidad-1990',
  'celebracion-de-una-prueba-ciclista-en-ruta-que-tiene-su-salida-en-el-muelle-de-san-sebastian',
  'artelekuko-baliabideak-2011-urtean',
  'zarautz-recuerdo-modo-vida-deportes-y-ocio',
  'zaldibiako-depositotan-izandako-aizkolarien-apostura',
  'visita-del-papa-juan-pablo-ii-al-santuario-de-loiola',
  'torneo-san-miguel-1990',
  'torneo-de-pelota-san-miguel-1992',
  'santa-agueda-eskean-2011',
  'rodaje-de-la-pelicula-fiesta-1',
  'finales-de-pelota-cuenca-del-deba-1988',
  'festividad-del-corpus-en-onati-1986',
  'concurso-internacional-de-perros-pastor-1954-1955',
  'cena-de-fin-de-temporada-y-entrega-de-trofeos-del-club-deportivo-alona-mendi',
  'carreras-de-caballos-en-el-hipodromo-de-lasarte',
  'carrera-en-san-martin-1986',
  'areantza',
  'zarautz-recuerdo-como-era-playa',
  'xix-mendeko-kare-hidrauliko-lantegien-aztarnak-iraetako-lantegia',
  'tamborrada-infantil-1991',
  'publico-en-los-tendidos-de-la-plaza-de-el-txofre',
  'les-gizarteaz-prozesuko-bilkura-udaletxeko-areto-nagusian',
  'kableen-argazkiak',
  'inauguracion-de-kurtzetxo',
  'homenaje-al-sacerdote-jose-maria-murua-a-su-marcha-a-las-misiones-de-los-rios',
  'finales-del-campeonato-san-miguel-1990',
  'fiestas-santo-tomas',
  'fiestas-feria-de-navidad',
  'festividad-de-los-reyes-magos',
  'eventos-culturales-naturaleza-pagoeta',
  'entrada-de-las-tropas-nacionales-en-san-sebastian',
  'dantzariak-herriko-plazan-juan-ignazio-iztuetaren-omenaldian',
  'competicion-de-fuerabordas-en-la-bahia-de-la-concha',
  'celebracion-de-una-prueba-de-ciclocross-en-san-sebastian',
  'carrera-de-bolidos-en-el-circuito-de-amara',
  'tarde-de-toros-y-rejoneo-en-la-plaza-de-el-txofre',
  'presentacion-de-equipos-de-ciclismo-1987',
  'partido-de-pelota-en-el-fronton-de-gros',
  'marcha-regulada-organizada-por-el-club-deportivo-fortuna',
  'finales-del-campeonato-provincial-de-pelota-1984',
  'finales-de-pelota-1989',
  'fiestas-de-carnaval-en-tolosa',
  'escenas-en-el-parque-de-atracciones-de-igeldo',
  'entierro-de-altuna-joven-muerto-en-burgos',
  'corrida-de-toros-goyesca-en-la-plaza-de-el-txofre',
  'centenario-de-la-coronacion-de-arantzazu',
  'bazkari-herrikoia-antzuolako-jaietan',
  'banistas-en-la-playa-de-la-concha',
  'antzuolakoudala',
  'acto-de-colocacion-de-la-nueva-imagen-en-la-ermita-de-magdalena',
  'zarautz-recuerdo-como-era-villa-manuela-y-otros',
  'visita-de-niceto-alcala-zamora-a-san-sebastian',
  'visita-de-francisco-franco-a-la-localidad-de-tolosa',
  'v-cross-internacional-de-lasarte',
  'traslado-del-santo-aozaraza',
  'taxus',
  'san-sebastian-playa-de-banos',
  'rutas-pr-pagoeta',
  'procesion-del-corpus-1989',
  'mobi-bike-aspanovas-eguna',
  'instalacion-de-campanas-de-la-parroquial',
  'grand-prix-de-pau',
  'finales-de-pelota-escolar-1993',
  'eventos-deportivos-cross-mixto',
  'concurso-internacional-de-perros-pastor-1986',
  'concurso-de-salto-en-la-hipica-militar-de-loiola',
  'celebracion-de-una-romeria-a-arantzazu',
  'celebracion-de-la-bandera-de-la-concha',
  'campeonato-escolar-de-pelota-1990',
  'campeonato-en-el-club-de-tenis-de-san-sebastian',
  'bendicion-de-las-obras-de-bidaurreta',
  'banquete-celebrado-con-motivo-de-la-entrega-de-un-trofeo-a-los-jugadores-de-la-real-sociedad',
  'zumalakarregimuseoa',
  'visita-de-las-autoridades-a-los-campamentos-de-las-o-j-e-en-orio',
  'tropas-en-san-sebastian',
  'tropas-embarcando-en-el-puerto-de-pasaia-con-destino-a-la-contienda-de-africa',
  'tamborrada-1989',
  'rutas-pr-santa-barbara-getaria',
  'prueba-de-natacion-y-salto-de-trampolin-en-el-puerto-de-san-sebastian',
  'portada',
  'participantes-de-una-competicion-automovilistica',
  'motociclistas-en-el-paseo-ramon-maria-de-lili',
  'manolo-santana-durante-un-partido-de-copa-davis-en-el-club-de-tenis-de-san-sebastian',
  'la-trainera-ama-guadalupekoa-en-una-regata-de-traineras',
  'inauguracion-del-auditorium-de-santa-ana',
  'homenaje-al-sacristan-de-zubillaga-1988',
  'herri-eguna-1988',
  'herri-eguna-1985',
  'grupo-de-mujeres-postulantes-por-las-calles-de-san-sebastian',
  'grupo-de-empleados-celebrando-una-fiesta-en-los-locales-de-una-fabrica-de-lanas',
  'grupo-de-empleadas-en-el-interior-y-exterior-de-la-tienda-de-impermeables-el-bufalo',
  'fotografias-en-el-entorno-del-colegio-belen',
  'fiestas-patronales-de-anorga',
  'festival-internacional-de-folclore',
  'eventos-deportivos-montana-subida-zarautz-aia-cross',
  'eventos-deportivos-montana-pagoeta-mendi-lasterketa-cross',
  'eventos-deportivos-montana-pagoeta-mendi-elkartea',
  'diferentes-personalidades-en-las-jornadas-de-confraternidad-vasco-catalana-gallega-entre-las-se-encuentran-juan-olasagasti-buenaventura-elizondo-telesforo-monzon-teodoro-hernandorena-aldazabal',
  'despedida-a-los-soldados-integrantes-de-la-division-azul-tras-una-comida-en-el-patio-del-hospital-militar-mola-antes-de-partir',
  'desfile-de-tropas-por-las-calles-de-san-sebastian',
  'desfile-de-moda-infantil-en-el-monte-igeldo',
  'concurso-nacional-de-platos-regionales',
  'comida-del-club-alona-mendi-junto-a-integrantes-del-fc-barcelona',
  'ciclismo-tour-de-francia-julio-de-1949',
  'campeonato-de-espana-de-ciclocross-celebrado-en-la-localidad-de-onati',
  'burdin-hesia-luxar-guenes',
  'becerrada-benefica-para-ninos-acogidos-organizada-por-la-sociedad-euskal-billera-en-la-plaza-de-el-txofre',
  'baserria',
  'banquete-homenaje-al-pelotari-atano-iii',
  'atabal',
  'actos-de-celebracion-del-centenario-de-la-papelera-de-tolosa',
]

// Estas son las colecciones existentes en guregipuzkoa.eus y los criterios que
// satisfacen las fotografías de cada una de ellas. S
const collections = [
  {
    author: 'BeasaingoUdala',
    name: 'Beasaingo Udala',
  },
  {
    author: 'OnatikoUdala',
    name: 'Oñatiko Udala',
  },
  {
    author: 'HondarribikoUdala',
    name: 'Hondarribiko Udala',
  },
  {
    author: 'pasaiakoUdala',
    name: 'Pasaiako Udala',
  },
  {
    author: 'UrnietakoUdala',
    name: 'Urnietako Udala',
  },
  {
    author: 'ZaldibiakoUdala',
    name: 'Zaldibiako Udala',
  },
  {
    author: 'ZestoakoUdala',
    name: 'Zestoako Udala',
  },
  {
    author: 'gurezarautz',
    name: 'Gure Zarautz',
  },
  {
    author: 'GipuzkoaKultura',
    photographer: 'Ojanguren, Indalecio',
    name: 'Indalecio Ojanguren',
  },
  {
    author: 'ARANZADI',
    photographer: 'Elósegui Irazusta, Jesús',
    name: 'Jesús Elósegui',
  },
  {
    author: 'GipuzkoaKultura',
    photographer: 'San Martin, Juan',
    name: 'Juan San Martín',
  },
  {
    author: 'ARANZADI',
    photographer: 'Fondo NIESSEN - ABB. Desconocido',
    name: 'niessen',
  },
  {
    author: 'ARANZADI',
    photographer: 'Fondo NIESSEN - IÑAKI ZARRANZ. Desconocido',
    name: 'niessen',
  },
  {
    author: 'ARANZADI',
    photographer: 'Fondo NIESSEN - JAVIER CANTERA. Desconocido',
    name: 'niessen',
  },
  {
    author: 'ARANZADI',
    photographer: 'Fondo NIESSEN - ABB. Javier Larrea',
    name: 'niessen',
  },
  {
    author: 'ARANZADI',
    photographer: 'Fondo NIESSEN - MIKEL LIZARRALDE. Desconocido',
    name: 'niessen',
  },
  {
    author: 'GipuzkoaKultura',
    photographer: 'Koch Arruti, Sigfrido',
    name: 'Sigfrido Koch',
  },
  {
    author: 'OnatikoUdala',
    photographer: 'Arlanzón, Andrés',
    name: 'Andrés Arlanzón',
  },
  {
    author: 'ArantzaCuestaEzeiza',
    name: 'Arantza Cuesta Ezeiza',
  },
  {
    author: 'AntzuolakoUdala',
    photographer: 'Ugalde, Mari Paz',
    name: 'Antzuolako Udala',
  },
  {
    photographer: 'Etxaniz Apaolaza, Jabier',
    name: 'Jabier Etxaniz Apaolaza',
  },
  {
    photographer: 'Jone Larrañaga',
    name: 'Jone Larrañaga',
  },
  {
    photographer: 'Larrañaga, Jone',
    name: 'Jone Larrañaga',
  },
  {
    photographer: 'Elosegi Aldasoro, Luis Mari',
    name: 'Luis Mari Elosegi Aldasoro',
  },
  {
    photographer: 'Elosegi Ansola, Polikarpo',
    name: 'Polikarpo Elosegi',
  },
  {
    folder: 'donostiako-postalen-funtsa',
    name: 'Koldo Mitxelena',
  },
  {
    folder: 'kultura-ondarearen-zuzendaritza-nagusia-argazkiak-34',
    name: 'kultura',
  },
  {
    author: 'Kutxa_Fototeka',
    name: 'Kutxa Fototeka',
  },
]

export { photographers, authors, locations, folders, collections }
