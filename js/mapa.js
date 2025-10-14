document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('map')) {
        
        const map = L.map('map').setView([-15.5, -47.9], 4);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }).addTo(map);

        const turtleIcon = L.icon({
            iconUrl: 'assets/imagens/placeholder.png',
            iconSize:     [40, 40],
            iconAnchor:   [20, 40],
            popupAnchor:  [0, -45]
        });

        const basesTamar = [
            { name: "Ubatuba - SP", coords: [-23.433, -45.071], type: "Centro de Visitantes", image: "assets/imagens/bases/ubatuba.jpg" },
            { name: "Praia do Forte - BA", coords: [-12.571, -38.003], type: "Centro de Visitantes Nacional", image: "assets/imagens/bases/praia-do-forte.jpg" },
            { name: "Fernando de Noronha - PE", coords: [-3.854, -32.427], type: "Base de Pesquisa e Conservação", image: "assets/imagens/bases/noronha.jpg" },
            { name: "Oceanário de Aracaju - SE", coords: [-10.978, -37.042], type: "Centro de Visitantes e Oceanário", image: "assets/imagens/bases/aracaju.jpg" }
        ];

        basesTamar.forEach(base => {
            const marker = L.marker(base.coords, { icon: turtleIcon }).addTo(map);
            const popupContent = `
                <img src="${base.image}" alt="Foto de ${base.name}">
                <h3>${base.name}</h3>
                <p>${base.type}</p>
            `;
            marker.bindPopup(popupContent);
        });

        const baseItems = document.querySelectorAll('.base-item');
        baseItems.forEach(item => {
            item.addEventListener('click', () => {
                const lat = item.getAttribute('data-lat');
                const lng = item.getAttribute('data-lng');
                
                map.flyTo([lat, lng], 8, {
                    animate: true,
                    duration: 1.5
                });
            });
        });
    }
});