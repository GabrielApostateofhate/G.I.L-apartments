const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const filterOverlay = document.getElementById("filterOverlay");
const filterForm = document.getElementById("filterForm");
const filterReset = document.getElementById("filterReset");
const flatsCatalog = document.getElementById("flatsCatalog");
const catalogEmpty = document.getElementById("catalogEmpty");
const heroFlatLink = document.getElementById("heroFlatLink");
const heroFlatImage = document.getElementById("heroFlatImage");
const lang = getCurrentLang();

const mainPageText = {
    uk: {
        openApartment: "Відкрити",
        rent: "Орендувати",
        allAds: "Всі оголошення",
        noResults: "За вашим фільтром квартири не знайдені."
    },
    en: {
        openApartment: "Open",
        rent: "Rent",
        allAds: "All listings",
        noResults: "No apartments match your filter."
    }
}[lang];

const setFilterState = (isOpen) => {
    if (!filterPanel || !filterOverlay || !filterToggle) {
        return;
    }

    filterPanel.classList.toggle("is-open", isOpen);
    filterOverlay.classList.toggle("is-open", isOpen);
    filterToggle.setAttribute("aria-expanded", String(isOpen));
};

if (filterToggle && filterPanel && filterOverlay) {
    filterToggle.addEventListener("click", () => {
        const isOpen = filterToggle.getAttribute("aria-expanded") === "true";
        setFilterState(!isOpen);
    });

    filterOverlay.addEventListener("click", () => setFilterState(false));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setFilterState(false);
        }
    });
}

const createApartmentCard = (apartment) => {
    const article = document.createElement("article");
    article.className = "flat_card flat_card_linked";

    const apartmentTitle = getApartmentTitle(apartment, lang);
    const apartmentUrl = getApartmentUrl(apartment.id, lang);

    article.innerHTML = `
        <a href="${apartmentUrl}" class="flat_card_anchor" aria-label="${mainPageText.openApartment} ${apartmentTitle}"></a>
        <img src="${getAssetUrl(apartment.img)}" alt="${apartmentTitle}" class="flat_card_image">
        <div class="flat_card_body">
            <p class="flat_location">${apartmentTitle}</p>
            <div class="flat_card_details">
                <span class="flat_detail">${formatGuests(apartment.guests, lang)}</span>
                <span class="flat_detail">${formatRooms(apartment.rooms, lang)}</span>
                <span class="flat_detail">${formatBeds(apartment.beds, lang)}</span>
            </div>
            <div class="flat_meta">
                <span class="flat_price">${formatPrice(apartment.price, lang)}</span>
                <a href="${apartmentUrl}" class="flat_button">${mainPageText.rent}</a>
            </div>
        </div>
    `;

    return article;
};

const renderCatalog = (catalogApartments) => {
    if (!flatsCatalog || !catalogEmpty) {
        return;
    }

    flatsCatalog.innerHTML = "";
    catalogEmpty.textContent = mainPageText.noResults;

    if (catalogApartments.length === 0) {
        catalogEmpty.hidden = false;
        return;
    }

    catalogEmpty.hidden = true;
    catalogApartments.forEach((apartment) => flatsCatalog.appendChild(createApartmentCard(apartment)));
};

const updateHero = (apartment) => {
    if (!apartment || !heroFlatImage || !heroFlatLink) {
        return;
    }

    heroFlatLink.href = getApartmentUrl(apartment.id, lang);
    heroFlatImage.src = getAssetUrl(apartment.img);
    heroFlatImage.alt = getApartmentTitle(apartment, lang);
};

const getNumericValue = (formData, key) => Number(formData.get(key)) || null;

const getFilters = () => {
    if (!filterForm) {
        return {};
    }

    const formData = new FormData(filterForm);

    return {
        rooms: getNumericValue(formData, "rooms"),
        priceFrom: getNumericValue(formData, "price_from"),
        priceTo: getNumericValue(formData, "price_to"),
        monthFrom: getNumericValue(formData, "month_from"),
        monthTo: getNumericValue(formData, "month_to"),
        bedsFrom: getNumericValue(formData, "beds_from"),
        bedsTo: getNumericValue(formData, "beds_to"),
        favorite: formData.get("favorite") === "true"
    };
};

const apartmentMatchesFilters = (apartment, filters) => {
    if (filters.rooms && apartment.rooms !== filters.rooms) return false;
    if (filters.priceFrom && apartment.price < filters.priceFrom) return false;
    if (filters.priceTo && apartment.price > filters.priceTo) return false;
    if (filters.monthFrom && apartment.availableFromMonth > filters.monthFrom) return false;
    if (filters.monthTo && apartment.availableToMonth < filters.monthTo) return false;
    if (filters.bedsFrom && apartment.beds < filters.bedsFrom) return false;
    if (filters.bedsTo && apartment.beds > filters.bedsTo) return false;
    if (filters.favorite && !apartment.favorite) return false;

    return true;
};

const applyFilters = () => {
    const filteredApartments = apartments.filter((apartment) => apartmentMatchesFilters(apartment, getFilters()));
    renderCatalog(filteredApartments);
    updateHero(filteredApartments[0] || apartments[0]);
};

renderCatalog(apartments);
updateHero(apartments[0]);

if (filterForm) {
    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        applyFilters();
        setFilterState(false);
    });

    filterForm.addEventListener("change", applyFilters);
}

if (filterReset && filterForm) {
    filterReset.addEventListener("click", () => {
        filterForm.reset();
        applyFilters();
    });
}
