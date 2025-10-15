document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([-14.235, -51.925], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const tamarIcon = L.icon({
        iconUrl: 'assets/imagens/placeholder.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
    });

    const baseItems = document.querySelectorAll('.base-item');
    const markers = [];

    baseItems.forEach((item, index) => {
        const lat = parseFloat(item.dataset.lat);
        const lng = parseFloat(item.dataset.lng);
        const name = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const imgSrc = item.dataset.img;

        const marker = L.marker([lat, lng], { icon: tamarIcon }).addTo(map);

        const popupContent = `
            <img src="${imgSrc}" alt="${name}">
            <h3>${name}</h3>
            <p>${description}</p>
        `;
        marker.bindPopup(popupContent);

        markers.push(marker);

        item.addEventListener('click', () => {
            map.flyTo([lat, lng], 13);
            marker.openPopup();
        });

        marker.on('popupopen', () => {
            baseItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            
             item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });
});