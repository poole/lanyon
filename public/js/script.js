// (function(document) {
//   var toggle = document.querySelector('.sidebar-toggle');
//   var sidebar = document.querySelector('#sidebar');
//   var checkbox = document.querySelector('#sidebar-checkbox');

//   document.addEventListener('click', function(e) {
//     var target = e.target;

//     if(!checkbox.checked ||
//        sidebar.contains(target) ||
//        (target === checkbox || target === toggle)) return;

//     checkbox.checked = false;
//   }, false);
// })(document);


/* Falcon Scripts */

  /*Start Video Popup Modal Logic*/
  const VideoModal = function (options) {
    const body = document.body;
    const triggerElem = options.triggerElem;
    const modal = options.modal;
    const iframe = modal.querySelector("iframe");

    function openModal() {
      modal.classList.add(options.modalActiveClass);
      body.classList.add("overflow-hidden");
      const url = iframe.dataset.src;
      iframe.setAttribute("src", url);
    }

    function closeModal() {
      iframe.setAttribute("src", "");
      body.classList.remove("overflow-hidden");
      modal.classList.remove(options.modalActiveClass);
    }

    if (triggerElem) {
      triggerElem.addEventListener("click", function () {
        openModal();
      });
    }

    if (modal) {
      modal.addEventListener("click", function () {
        closeModal();
      });
    }
  };
  /*End Video Popup Modal Logic*/

  /*Start Initialize Video Popup*/
  const video = new VideoModal({
    triggerElem: document.querySelector(".video-figure"),
    modal: document.getElementById("iframeVideoOverlay"),
    modalActiveClass: "modal-overlay--active",
  });
  /*End Initialize Video Popup*/


  const swiperBasicSettings = {
    slidesPerView: 'auto',
    spaceBetween: 50,
    freeMode: true,
    freeModeMomentumRatio: 0.75,
    freeModeMomentumVelocityRatio: 0.75,
    centeredSlides: false,
    grabCursor: true,
    mousewheel: {
        invert: false
    },

    breakpoints: {
        1024: {
            spaceBetween: 40
        },
        768: {
            spaceBetween: 30
        }
    }
};

const swiperDesktopSettings = {
    centeredSlides: true,
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
};

const swiperTestimonialsSettingsMobile = {
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 20,
    grabCursor: false,   
    speed: 500,
    preloadImages: false,
    lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 3,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
};

const gallery = document.querySelector('[data-gallery]');
const mobileGallery = document.querySelector('[data-gallery-mobile]');
let gallerySwiper;
let bodyTag = document.querySelector('body');
let swiperModal = document.getElementById('swiperModal');
let swiperOpenButton = document.getElementById('swiperOpenButton');
let swiperCloseButton = document.getElementById('swiperCloseButton');

function showSwiperModal() {
    bodyTag.classList.add('overflow-hidden');
    swiperModal.classList.remove('is-hidden');
}

function hideSwiperModal() {
    bodyTag.classList.remove('overflow-hidden');
    swiperModal.classList.add('is-hidden');
}

const buildSwiper = function (swiperContainer, parameters) {
    const swiperSlides = Array.from(swiperContainer.querySelectorAll('.swiper-slide'));
    const swiperImages = Array.from(
        swiperContainer.querySelectorAll('.lazy_load-img--preview')
    );
    if (swiperImages) {
        //swiperSlides.forEach(image => loadImage(image));
    }
    // eslint-disable-next-line no-undef
    return new Swiper(swiperContainer, parameters);
};

const destroySwiper = function (swiperInstance) {
    if (swiperInstance !== null) {
        swiperInstance.destroy(true, true);
    }
};

swiperOpenButton.addEventListener('click', function () {
    showSwiperModal();
    gallerySwiper = buildSwiper(
        gallery,
        Object.assign(swiperBasicSettings, swiperDesktopSettings)
    );
});

swiperCloseButton.addEventListener('click', function () {
    hideSwiperModal();
    setTimeout(() => destroySwiper(gallerySwiper), 500);
});

if (mobileGallery) {
    // eslint-disable-next-line no-undef
    new Swiper(mobileGallery, swiperBasicSettings);
}

//* Remove display none for gallery
setTimeout(() => swiperModal.removeAttribute('style'), 250);