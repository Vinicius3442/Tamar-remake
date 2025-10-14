document.addEventListener("DOMContentLoaded", function () {
  
  const hamburger = document.querySelector(".menu-hamburger");
  const mobileNav = document.querySelector(".nav-mobile");
  const closeMenu = document.querySelector(".close-menu");

  if (hamburger && mobileNav && closeMenu) {
    hamburger.addEventListener("click", () => {
      mobileNav.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });
  }

  
  const slideshowCards = document.querySelectorAll(".slideshow-card");
  const slideInterval = 4000; 

  slideshowCards.forEach((card) => {
    const images = card.querySelectorAll(".cta-card-image");
    let currentIndex = 0;

    if (images.length > 1) {
      setInterval(() => {
        images[currentIndex].classList.remove("visible");

        currentIndex = (currentIndex + 1) % images.length;

        images[currentIndex].classList.add("visible");
      }, slideInterval);
    }
    
    const slideshowContainer = document.querySelector(
      ".species-hero-slideshow"
    );
    const speciesGrid = document.querySelector(".species-grid");

    
    if (slideshowContainer && speciesGrid) {
      const speciesData = [
        {
          name: "Tartaruga-Verde",
          description:
            "Conhecida como a jardineira dos oceanos, essencial para a saúde dos ecossistemas marinhos.",
          img: "../assets/images/species/hero/tartaruga-verde-hero.jpg",
          link: "../especie/tartaruga-verde.html",
        },
        {
          name: "Tartaruga-de-Pente",
          description:
            "Criticamente ameaçada, é famosa pela beleza de seu casco, o que a tornou alvo da caça.",
          img: "../assets/images/species/hero/tartaruga-de-pente-hero.jpg",
          link: "../especie/tartaruga-de-pente.html",
        },
        {
          name: "Tartaruga-Cabeçuda",
          description:
            "Uma grande viajante dos oceanos, reconhecida por sua cabeça robusta e mandíbulas fortes.",
          img: "../assets/images/species/hero/tartaruga-cabecuda-hero.jpg",
          link: "../especie/tartaruga-cabecuda.html",
        },
        {
          name: "Tartaruga-de-Couro",
          description:
            "A maior de todas as tartarugas marinhas, uma gigante que mergulha a profundidades incríveis.",
          img: "../assets/images/species/hero/tartaruga-de-couro-hero.jpg",
          link: "../especie/tartaruga-de-couro.html",
        },
        {
          name: "Tartaruga-Oliva",
          description:
            "Famosa por suas 'arribadas', eventos de desova em massa com milhares de fêmeas na mesma praia.",
          img: "../assets/images/species/hero/tartaruga-oliva-hero.jpg",
          link: "../especie/tartaruga-oliva.html",
        },
      ];

      const navContainer = slideshowContainer.querySelector(".slideshow-nav");
      const prevBtn = slideshowContainer.querySelector(".slideshow-arrow.prev");
      const nextBtn = slideshowContainer.querySelector(".slideshow-arrow.next");

      let slides = [];
      let navDots = [];
      let currentIndex = 0;
      const slideIntervalTime = 6000; 
      let slideInterval;

      
      slideshowContainer
        .querySelectorAll(".slide")
        .forEach((el) => el.remove());

      
      speciesData.forEach((species, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.style.backgroundImage = `url('${species.img}')`;
        slide.innerHTML = `
                <div class="slide-overlay"></div>
                <div class="slide-content container">
                    <span class="slide-category">Espécie em Destaque</span>
                    <h1>${species.name}</h1>
                    <p>${species.description}</p>
                    <a href="${species.link}" class="hero-button">Saiba Mais</a>
                </div>
            `;
        slideshowContainer.appendChild(slide);
        slides.push(slide);

        const dot = document.createElement("div");
        dot.className = "nav-dot";
        dot.addEventListener("click", () => goToSlide(index));
        navContainer.appendChild(dot);
        navDots.push(dot);
      });

      function goToSlide(index) {
        slides[currentIndex].classList.remove("active");
        navDots[currentIndex].classList.remove("active");
        currentIndex = index;
        slides[currentIndex].classList.add("active");
        navDots[currentIndex].classList.add("active");
        resetInterval();
      }

      function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }

      function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
      }

      function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, slideIntervalTime);
      }

      
      prevBtn.addEventListener("click", prevSlide);
      nextBtn.addEventListener("click", nextSlide);

      
      if (slides.length > 0) {
        goToSlide(0);
      }

      
      const gridCards = speciesGrid.querySelectorAll(".species-card");
      let spotlightIndex = 0;
      const spotlightIntervalTime = 4000; 

      function updateSpotlight() {
        gridCards.forEach((card, index) => {
          if (index === spotlightIndex) {
            card.classList.add("spotlight");
          } else {
            card.classList.remove("spotlight");
          }
        });
        spotlightIndex = (spotlightIndex + 1) % gridCards.length;
      }

      if (gridCards.length > 0) {
        setInterval(updateSpotlight, spotlightIntervalTime);
        updateSpotlight(); 
      }
    }
  });
});
const galleryItems = document.querySelectorAll(".gallery-item");


if (galleryItems.length > 0) {
  
  const lightbox = document.getElementById("lightbox");
  const lightboxMediaContainer = lightbox.querySelector(
    ".lightbox-media-container"
  );
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-arrow.prev");
  const nextButton = lightbox.querySelector(".lightbox-arrow.next");
  const lightboxOverlay = lightbox.querySelector(".lightbox-overlay");

  let currentIndex = 0;

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const mediaSrc = item.getAttribute("href");
    const mediaType = item.getAttribute("data-type");
    const captionText = item.getAttribute("data-caption");
    lightboxMediaContainer.innerHTML = "";

    if (mediaType === "video") {
      const video = document.createElement("video");
      video.src = mediaSrc;
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      lightboxMediaContainer.appendChild(video);

    } else {
      const image = document.createElement("img");
      image.src = mediaSrc;
      lightboxMediaContainer.appendChild(image);
    }
    lightboxCaption.textContent = captionText;

    lightbox.classList.add("active");
  }

  function closeLightbox() {
    lightbox.classList.remove("active");

    const video = lightboxMediaContainer.querySelector("video");
    if (video) {
      video.pause();
    }
  }

  function showNextMedia() {
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(nextIndex);
  }

  function showPrevMedia() {
    const prevIndex =
      (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(prevIndex);
  }

  
  closeButton.addEventListener("click", closeLightbox);
  lightboxOverlay.addEventListener("click", closeLightbox); 
  nextButton.addEventListener("click", showNextMedia);
  prevButton.addEventListener("click", showPrevMedia);

  
  document.addEventListener("keydown", (event) => {
    if (lightbox.classList.contains("active")) {
      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowRight") {
        showNextMedia();
      }
      if (event.key === "ArrowLeft") {
        showPrevMedia();
      }
    }
  });
}
