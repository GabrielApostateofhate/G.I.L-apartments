const apartmentId = new URLSearchParams(window.location.search).get("id");
const apartment = getApartmentById(apartmentId);
const pageLang = getCurrentLang();

const apartmentPageText = {
    uk: {
        fallbackTitle: "Квартиру не знайдено",
        fallbackDescription: "Схоже, що переданий id відсутній у базі apartments.",
        rent: "Орендувати"
    },
    en: {
        fallbackTitle: "Apartment not found",
        fallbackDescription: "The provided id is missing from the apartments data.",
        rent: "Rent"
    }
}[pageLang];

if (apartment) {
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const image = document.getElementById("image");
    const address = document.getElementById("address");
    const description = document.getElementById("description");
    const capacity = document.getElementById("capacity");
    const area = document.getElementById("area");
    const rentButton = document.querySelector(".rent_btn");
    const thumbImages = document.querySelectorAll(".thumb_image");
    const apartmentTitle = getApartmentTitle(apartment, pageLang);
    const gallery = apartment.gallery?.length ? apartment.gallery : [apartment.img];
    const mainImageSrc = getAssetUrl(gallery[0]);

    if (title) {
        title.textContent = apartmentTitle;
        document.title = `${apartmentTitle} - G.I.L Apartments`;
    }

    if (price) {
        price.textContent = formatPrice(apartment.price, pageLang);
    }

    if (image) {
        image.src = mainImageSrc;
        image.alt = apartmentTitle;
        image.decoding = "async";
    }

    if (address) {
        address.textContent = apartmentTitle;
    }

    if (description) {
        description.textContent = getApartmentDescription(apartment, pageLang);
    }

    if (capacity) {
        capacity.textContent = formatGuests(apartment.guests, pageLang);
    }

    if (area) {
        area.textContent = pageLang === "uk" ? apartment.area : apartment.areaEn;
    }

    if (rentButton) {
        rentButton.href = `${getPageUrl(SITE_CONFIG[pageLang].paths.booking)}?id=${apartment.id}`;
        rentButton.textContent = apartmentPageText.rent;
    }

    thumbImages.forEach((thumb, index) => {
        const galleryImage = gallery[index] || gallery[0];
        const galleryImageSrc = getAssetUrl(galleryImage);

        thumb.src = galleryImageSrc;
        thumb.alt = apartmentTitle;
        thumb.loading = "lazy";
        thumb.decoding = "async";
        thumb.addEventListener("click", () => {
            if (image) {
                image.src = galleryImageSrc;
            }
        });
    });

    const map = createLeafletMap("map", [apartment.lat, apartment.lng], 16);
    if (map) {
        L.marker([apartment.lat, apartment.lng], {
            icon: createApartmentMarkerIcon()
        }).addTo(map);
    }
} else {
    const title = document.getElementById("title");
    const description = document.getElementById("description");

    if (title) {
        title.textContent = apartmentPageText.fallbackTitle;
    }

    if (description) {
        description.textContent = apartmentPageText.fallbackDescription;
    }
}
