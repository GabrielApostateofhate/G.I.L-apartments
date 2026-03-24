const SITE_CONFIG = {
    uk: {
        nav: {
            main: "Головна",
            map: "Мапа",
            booking: "Бронювання",
            contacts: "Контакти",
            apartment: "Квартира"
        },
        paths: {
            main: "/html/ua/mainUA.html",
            map: "/html/ua/map.html",
            booking: "/html/ua/booking.html",
            contacts: "/html/ua/contacts.html",
            apartment: "/html/ua/appartments.html"
        },
        alt: {
            logo: "G.I.L Apartments",
            lang: "Мова"
        }
    },
    en: {
        nav: {
            main: "Main",
            map: "Map",
            booking: "Booking",
            contacts: "Contacts",
            apartment: "Apartment"
        },
        paths: {
            main: "/html/en/mainEN.html",
            map: "/html/en/mapEN.html",
            booking: "/html/en/bookingEN.html",
            contacts: "/html/en/contactsEN.html",
            apartment: "/html/en/appartmentsEN.html"
        },
        alt: {
            logo: "G.I.L Apartments",
            lang: "Language"
        }
    }
};

const getCurrentLang = () => document.documentElement.lang.startsWith("uk") ? "uk" : "en";

const getSiteText = () => SITE_CONFIG[getCurrentLang()];

const getApartmentTitle = (apartment, lang = getCurrentLang()) => apartment.title?.[lang] || apartment.title?.uk || "";

const getApartmentDescription = (apartment, lang = getCurrentLang()) => apartment.description?.[lang] || apartment.description?.uk || "";

const getApartmentUrl = (id, lang = getCurrentLang()) => `${SITE_CONFIG[lang].paths.apartment}?id=${id}`;

const formatPrice = (price, lang = getCurrentLang()) => (
    lang === "uk" ? `${price} ₴ / день` : `${price} UAH / day`
);

const formatGuests = (guests, lang = getCurrentLang()) => (
    lang === "uk" ? `${guests} гості` : `${guests} guests`
);

const formatRooms = (rooms, lang = getCurrentLang()) => (
    lang === "uk" ? `${rooms} кімн.` : `${rooms} rooms`
);

const formatBeds = (beds, lang = getCurrentLang()) => (
    lang === "uk" ? `${beds} сп. місця` : `${beds} beds`
);

const buildHeaderMarkup = (page) => {
    const lang = getCurrentLang();
    const site = getSiteText();

    const items = ["main", "map", "booking", "contacts"].map((key) => {
        const className = key === page ? "navigation_current" : "navigation";
        const href = key === page ? "#" : site.paths[key];
        const label = site.nav[key];

        return `
            <div class="${className}">
                <a href="${href}">${label}</a>
            </div>
        `;
    }).join("");

    return `
        <header class="header">
            <a href="${site.paths.main}" class="logo_link" aria-label="${site.alt.logo}">
                <img src="/images/site/logo.png" alt="${site.alt.logo}" id="logo">
            </a>
            <div class="header_nav">${items}</div>
            <div class="lang_switch">
                <img src="/images/site/lang.png" alt="${site.alt.lang}" id="lang">
                <div class="languages">
                    <a href="${SITE_CONFIG.en.paths[page] || SITE_CONFIG.en.paths.main}" class="lang_btn ${lang === "en" ? "current_lang" : ""}">EN</a>
                    <a href="${SITE_CONFIG.uk.paths[page] || SITE_CONFIG.uk.paths.main}" class="lang_btn ${lang === "uk" ? "current_lang" : ""}">UA</a>
                </div>
            </div>
        </header>
    `;
};

const mountSiteHeader = () => {
    const headerRoot = document.querySelector("[data-site-header]");

    if (!headerRoot) {
        return;
    }

    const page = document.body.dataset.page || "main";
    headerRoot.innerHTML = buildHeaderMarkup(page);
};

const createLeafletMap = (elementId, center, zoom = 16) => {
    if (typeof L === "undefined") {
        return null;
    }

    const map = L.map(elementId).setView(center, zoom);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 20
    }).addTo(map);

    return map;
};

mountSiteHeader();
