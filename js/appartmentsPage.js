const initApartmentPage = () => {
    const apartmentId = new URLSearchParams(window.location.search).get("id");
    const apartment = window.getApartmentById(apartmentId);
    const pageLang = window.getCurrentLang();

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
        const apartmentFeatures = document.getElementById("apartmentFeatures");
        const apartmentFeaturesBox = document.getElementById("apartmentFeaturesBox");
        const apartmentTitle = window.getApartmentTitle(apartment, pageLang);
        const gallery = apartment.gallery?.length ? apartment.gallery : [apartment.img];
        const mainImageSrc = window.getAssetUrl(gallery[0]);

        if (title) {
            title.textContent = apartmentTitle;
            window.updateDocumentTitle("pages.apartment.detailTitle", { lng: pageLang, title: apartmentTitle });
        }

        if (price) {
            price.textContent = window.formatPrice(apartment.price, pageLang);
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
            description.textContent = window.getApartmentDescription(apartment, pageLang);
        }

        if (capacity) {
            capacity.textContent = window.formatGuests(apartment.guests, pageLang);
        }

        if (area) {
            area.textContent = window.getApartmentArea(apartment, pageLang);
        }

        if (rentButton) {
            rentButton.href = `${window.getPageUrl(window.SITE_CONFIG[pageLang].paths.booking)}?id=${apartment.id}`;
            rentButton.textContent = window.t("common.actions.rent", { lng: pageLang });
        }

        if (apartmentFeatures && apartmentFeaturesBox) {
            const featureKeys = window.getApartmentFeatures(apartment);

            if (featureKeys.length === 0) {
                apartmentFeaturesBox.hidden = true;
            } else {
                apartmentFeatures.innerHTML = "";
                featureKeys.forEach((featureKey) => {
                    const item = document.createElement("div");
                    item.className = "apartment_feature_item";
                    item.innerHTML = `
                        <span class="apartment_feature_check">&#10003;</span>
                        <span>${window.getFeatureLabel(featureKey, pageLang)}</span>
                    `;
                    apartmentFeatures.appendChild(item);
                });
            }
        }

        thumbImages.forEach((thumb, index) => {
            const galleryImage = gallery[index] || gallery[0];
            const galleryImageSrc = window.getAssetUrl(galleryImage);

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

        const map = window.createLeafletMap("map", [apartment.lat, apartment.lng], 16);
        if (map) {
            L.marker([apartment.lat, apartment.lng], {
                icon: window.createApartmentMarkerIcon()
            }).addTo(map);
        }

        return;
    }

    const title = document.getElementById("title");
    const description = document.getElementById("description");

    if (title) {
        title.textContent = window.t("pages.apartment.fallbackTitle", { lng: pageLang });
    }

    if (description) {
        description.textContent = window.t("pages.apartment.fallbackDescription", { lng: pageLang });
    }
};

Promise.resolve(window.i18nReady).catch(() => undefined).then(() => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initApartmentPage, { once: true });
    } else {
        initApartmentPage();
    }
});
