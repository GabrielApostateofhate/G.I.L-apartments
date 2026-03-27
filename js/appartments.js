const apartments = [
    {
        id: 1,
        lat: 48.615748533399895,
        lng: 22.298353367789026,
        title: {
            uk: "вул. О. Вагерича, 1",
            en: "1 O. Vaherycha St."
        },
        description: {
            uk: "Світла квартира в центрі Ужгорода для комфортного короткого проживання.",
            en: "A bright apartment in central Uzhhorod for a comfortable short stay."
        },
        price: 1200,
        img: "images/flats/1.avif",
        gallery: [
            "images/flats/1.avif",
            "images/flats/2.avif",
            "images/flats/3.avif"
        ],
        guests: 2,
        area: "48 м²",
        areaEn: "48 m²",
        rooms: 1,
        beds: 2,
        favorite: true,
        availableFromMonth: 1,
        availableToMonth: 12
    },
    {
        id: 2,
        lat: 48.62066534711328,
        lng: 22.296681075186328,
        title: {
            uk: "пл. Шандора Петефі, 8",
            en: "8 Sandor Petefi Sq."
        },
        description: {
            uk: "Затишні апартаменти поруч із центральною частиною міста та зручним доїздом.",
            en: "A cozy apartment near the city center with convenient access."
        },
        price: 900,
        img: "images/flats/4.avif",
        gallery: [
            "images/flats/4.avif",
            "images/flats/5.avif",
            "images/flats/6.avif"
        ],
        guests: 2,
        area: "42 м²",
        areaEn: "42 m²",
        rooms: 1,
        beds: 2,
        favorite: false,
        availableFromMonth: 3,
        availableToMonth: 11
    },
    {
        id: 3,
        lat: 48.61780145700137,
        lng: 22.289386354295978,
        title: {
            uk: "Проспект Свободи, 20",
            en: "20 Svobody Ave."
        },
        description: {
            uk: "Простора квартира з сучасним інтер'єром для сімейного або ділового перебування.",
            en: "A spacious apartment with a modern interior for family or business stays."
        },
        price: 1900,
        img: "images/flats/2.avif",
        gallery: [
            "images/flats/4.avif",
            "images/flats/5.avif",
            "images/flats/7.avif"
        ],
        guests: 4,
        area: "67 м²",
        areaEn: "67 m²",
        rooms: 3,
        beds: 4,
        favorite: true,
        availableFromMonth: 5,
        availableToMonth: 12
    },
    {
        id: 4,
        lat: 48.60749747628293,
        lng: 22.28848263959362,
        title: {
            uk: "вул. Минайська, 18г",
            en: "18h Mynaiska St."
        },
        description: {
            uk: "Бюджетний та охайний варіант подобової оренди неподалік від основних маршрутів.",
            en: "A clean and budget-friendly short-term rental near major routes."
        },
        price: 500,
        img: "images/flats/7.avif",
        gallery: [
            "images/flats/1.avif",
            "images/flats/2.avif",
            "images/flats/5.avif"
        ],
        guests: 2,
        area: "35 м²",
        areaEn: "35 m²",
        rooms: 1,
        beds: 1,
        favorite: false,
        availableFromMonth: 1,
        availableToMonth: 6
    }
];

const getApartmentById = (id) => apartments.find((apartment) => apartment.id === Number(id));
