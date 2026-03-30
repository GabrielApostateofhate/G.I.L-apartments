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
        img: "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        gallery: [
            "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1678386645963-3f5b0bdb8dcd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
        img: "https://images.unsplash.com/photo-1633545923722-83621046b261?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZsYXRzfGVufDB8fDB8fHww",
        gallery: [
            "https://images.unsplash.com/photo-1633545923722-83621046b261?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZsYXRzfGVufDB8fDB8fHww",
            "https://plus.unsplash.com/premium_photo-1680100256112-2e1231d9d0df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZsYXRzfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1630699034276-0be879da7ebf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGZsYXRzfGVufDB8fDB8fHww"
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
        img: "https://images.unsplash.com/photo-1741764014072-68953e93cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGZsYXRzfGVufDB8fDB8fHww",
        gallery: [
            "https://images.unsplash.com/photo-1741764014072-68953e93cd48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGZsYXRzfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1669066972075-72b6a5fa88e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGZsYXRzfGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1542855596-45eb2695c74c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fGZsYXRzfGVufDB8fDB8fHww"
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
        img: "https://i.pinimg.com/1200x/ea/88/28/ea8828438128fb2a34875569afe8aa96.jpg",
        gallery: [
            "https://i.pinimg.com/1200x/ea/88/28/ea8828438128fb2a34875569afe8aa96.jpg",
            "https://i.pinimg.com/1200x/41/c9/fa/41c9fa5a67198a710cfc3a8fdd409b33.jpg",
            "https://i.pinimg.com/1200x/a5/46/e3/a546e3b64b67b48792e2db1d1c6cec81.jpg"
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
