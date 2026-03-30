const mapLang = getCurrentLang();
const map = createLeafletMap("map", [48.61939, 22.28306], 14);
const apartmentMarkerIcon = createApartmentMarkerIcon();

if (map) {
    apartments.forEach((apartment) => {
        const marker = L.marker([apartment.lat, apartment.lng], {
            icon: apartmentMarkerIcon
        }).addTo(map);
        const apartmentUrl = getApartmentUrl(apartment.id, mapLang);
        const title = getApartmentTitle(apartment, mapLang);
        const detailsText = mapLang === "uk" ? "Детальніше" : "Details";

        marker.bindPopup(`
            <div class="popup">
                <img src="${getAssetUrl(apartment.img)}" width="200" alt="${title}">
                <h3>${title}</h3>
                <p>${formatPrice(apartment.price, mapLang)}</p>
                <a href="${apartmentUrl}" class="popup-btn">${detailsText}</a>
            </div>
        `);
    });
}
