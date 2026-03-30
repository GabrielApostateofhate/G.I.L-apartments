const SITE_ROOT = new URL("../", document.currentScript.src);

const buildUrl = (relativePath) => new URL(relativePath, SITE_ROOT).href;

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
            main: "html/ua/mainUA.html",
            map: "html/ua/map.html",
            booking: "html/ua/booking.html",
            contacts: "html/ua/contacts.html",
            apartment: "html/ua/appartments.html"
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
            main: "html/en/mainEN.html",
            map: "html/en/mapEN.html",
            booking: "html/en/bookingEN.html",
            contacts: "html/en/contactsEN.html",
            apartment: "html/en/appartmentsEN.html"
        },
        alt: {
            logo: "G.I.L Apartments",
            lang: "Language"
        }
    }
};

const getCurrentLang = () => document.documentElement.lang.startsWith("uk") ? "uk" : "en";
const getSiteText = () => SITE_CONFIG[getCurrentLang()];
const getAssetUrl = (relativePath) => buildUrl(relativePath);
const getPageUrl = (relativePath) => buildUrl(relativePath);
const getPageUrlWithCurrentParams = (relativePath, allowedParams = []) => {
    const url = new URL(getPageUrl(relativePath));
    const currentParams = new URLSearchParams(window.location.search);

    allowedParams.forEach((param) => {
        const value = currentParams.get(param);
        if (value) {
            url.searchParams.set(param, value);
        }
    });

    return url.href;
};
const getApartmentTitle = (apartment, lang = getCurrentLang()) => apartment.title?.[lang] || apartment.title?.uk || "";
const getApartmentDescription = (apartment, lang = getCurrentLang()) => apartment.description?.[lang] || apartment.description?.uk || "";
const getApartmentUrl = (id, lang = getCurrentLang()) => `${getPageUrl(SITE_CONFIG[lang].paths.apartment)}?id=${id}`;

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
    const preservedParams = page === "apartment" || page === "booking" ? ["id"] : [];

    const items = ["main", "map", "booking", "contacts"].map((key) => {
        const className = key === page ? "navigation_current" : "navigation";
        const href = key === page ? "#" : getPageUrl(site.paths[key]);
        const label = site.nav[key];

        return `
            <div class="${className}">
                <a href="${href}">${label}</a>
            </div>
        `;
    }).join("");

    return `
        <header class="header">
            <a href="${getPageUrl(site.paths.main)}" class="logo_link" aria-label="${site.alt.logo}">
                <img src="${getAssetUrl("images/site/logo.png")}" alt="${site.alt.logo}" id="logo">
            </a>
            <div class="header_nav">${items}</div>
            <div class="lang_switch">
                <img src="${getAssetUrl("images/site/lang.png")}" alt="${site.alt.lang}" id="lang">
                <div class="languages">
                    <a href="${getPageUrlWithCurrentParams(SITE_CONFIG.en.paths[page] || SITE_CONFIG.en.paths.main, preservedParams)}" class="lang_btn ${lang === "en" ? "current_lang" : ""}">EN</a>
                    <a href="${getPageUrlWithCurrentParams(SITE_CONFIG.uk.paths[page] || SITE_CONFIG.uk.paths.main, preservedParams)}" class="lang_btn ${lang === "uk" ? "current_lang" : ""}">UA</a>
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

const createApartmentMarkerIcon = () => {
    if (typeof L === "undefined") {
        return null;
    }

    return L.divIcon({
        className: "apartment-marker",
        html: "<span>🏢</span>",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -14]
    });
};

mountSiteHeader();
