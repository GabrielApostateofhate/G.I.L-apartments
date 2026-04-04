const initMapPage = () => {
    const mapLang = window.getCurrentLang();
    const map = window.createLeafletMap("map", [48.61939, 22.28306], 14);
    const apartmentMarkerIcon = window.createApartmentMarkerIcon();

    if (!map) {
        return;
    }

    window.apartments.forEach((apartment) => {
        const marker = L.marker([apartment.lat, apartment.lng], {
            icon: apartmentMarkerIcon
        }).addTo(map);
        const apartmentUrl = window.getApartmentUrl(apartment.id, mapLang);
        const title = window.getApartmentTitle(apartment, mapLang);
        const detailsText = window.t("common.actions.details", { lng: mapLang });

        marker.bindPopup(`
            <div class="popup">
                <img src="${window.getAssetUrl(apartment.img)}" width="200" alt="${title}">
                <h3>${title}</h3>
                <p>${window.formatPrice(apartment.price, mapLang)}</p>
                <a href="${apartmentUrl}" class="popup-btn">${detailsText}</a>
            </div>
        `);
    });
};

Promise.resolve(window.i18nReady).catch(() => undefined).then(() => {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMapPage, { once: true });
    } else {
        initMapPage();
    }
});
