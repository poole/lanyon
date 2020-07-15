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


/******************/
/******************/
/******************/
/* Falcon Scripts */

/* Start Video Popup Modal Logic*/
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
/* End Video Popup Modal Logic*/

/* Start Initialize Video Popup*/
const video = new VideoModal({
    triggerElem: document.querySelector(".video-figure"),
    modal: document.getElementById("iframeVideoOverlay"),
    modalActiveClass: "modal-overlay--active",
});
/* End Initialize Video Popup*/

/* Start Gallery */
const swiperBasicSettings = {
    slidesPerView: "auto",
    spaceBetween: 50,
    freeMode: true,
    freeModeMomentumRatio: 0.75,
    freeModeMomentumVelocityRatio: 0.75,
    centeredSlides: false,
    grabCursor: true,
    mousewheel: {
        invert: false,
    },

    breakpoints: {
        1024: {
            spaceBetween: 40,
        },
        768: {
            spaceBetween: 30,
        },
    },
};

const swiperDesktopSettings = {
    centeredSlides: true,
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
};

const gallery = document.querySelector("[data-gallery]");
const mobileGallery = document.querySelector("[data-gallery-mobile]");
let gallerySwiper;
let bodyTag = document.querySelector("body");
let swiperModal = document.getElementById("swiperModal");
let swiperOpenButton = document.getElementById("swiperOpenButton");
let swiperCloseButton = document.getElementById("swiperCloseButton");

function showSwiperModal() {
    bodyTag.classList.add("overflow-hidden");
    swiperModal.classList.remove("is-hidden");
}

function hideSwiperModal() {
    bodyTag.classList.remove("overflow-hidden");
    swiperModal.classList.add("is-hidden");
}

const buildSwiper = function (swiperContainer, parameters) {
    const swiperSlides = Array.from(
        swiperContainer.querySelectorAll(".swiper-slide")
    );
    const swiperImages = Array.from(
        swiperContainer.querySelectorAll(".lazy_load-img--preview")
    );

    return new Swiper(swiperContainer, parameters);
};

const destroySwiper = function (swiperInstance) {
    if (swiperInstance !== null) {
        swiperInstance.destroy(true, true);
    }
};

swiperOpenButton.addEventListener("click", function () {
    showSwiperModal();
    gallerySwiper = buildSwiper(
        gallery,
        Object.assign(swiperBasicSettings, swiperDesktopSettings)
    );
});

swiperCloseButton.addEventListener("click", function () {
    hideSwiperModal();
    setTimeout(() => destroySwiper(gallerySwiper), 500);
});

if (mobileGallery) {
    new Swiper(mobileGallery, swiperBasicSettings);
}

//* Remove display none for gallery
setTimeout(() => swiperModal.removeAttribute("style"), 250);
/* End Gallery */


/* Start Timeline */
new Swiper("[data-timeline]", {
    slidesPerView: 6,
    breakpoints: {
        580: {
            slidesPerView: 2,
        },
        900: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    },
    roundLengths: true,
    centeredSlides: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
/* End Timeline */

/* Start Header Logic */
const checkIE = function () {
    return /*@cc_on!@*/ false || !!document.documentMode;
};

var isIE = checkIE();
var latestKnownScrollY = 0;
var ticking = false;
var scrollingUp = false;
const header = document.getElementById("mainHeader");
const headerHeight = header.offsetHeight;
const threshold = 0;
const classNameBGCChange = "header--scrolled";
const classNameHidden = "header--hidden";
const mobileHeader = document.getElementById("mobileHeader");
const mobileOverlayOpenClassName = 'm_header--open';
let mobileMenuOpen = false;

var onDomReady = () => {
    //* Update scrolled position
    onScroll();

    mobileHeader.addEventListener('click', () => {
        toggleMobileMenu();
    }, false);

    window.addEventListener("scroll", onScroll, false);


    window.addEventListener('resize', onResizing, false);
};

//* Scroll event associated functions/ callbacks
function updateScroll() {
    ticking = false;

    changeHeaderStyle(
        header,
        headerHeight,
        threshold,
        classNameBGCChange,
        classNameHidden,
        latestKnownScrollY,
        scrollingUp
    );
}

function onScroll() {
    //* Window.scrollY not supported by IE
    var latestKnownScrollYNew =
        typeof window.scrollY === "undefined" ? window.pageYOffset : window.scrollY;

    isIE
        ? (scrollingUp = true)
        : latestKnownScrollYNew < latestKnownScrollY
            ? (scrollingUp = true)
            : (scrollingUp = false);
    latestKnownScrollY = latestKnownScrollYNew;

    requestTick();
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateScroll);
    }
    ticking = true;
}

function onResizing() {
    closeMobileMenu();
}

function changeHeaderStyle(
    header,
    headerHeight,
    threshold,
    classNameBGCChange,
    classNameHidden,
    currentScroll,
    scrollingUp
) {
    if (currentScroll > headerHeight + threshold) {
        header.classList.add(classNameBGCChange);
        if (scrollingUp) {
            header.classList.remove(classNameHidden);
        } else {
            header.classList.add(classNameHidden);
        }
    } else {
        header.classList.remove(classNameBGCChange);
    }
}

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    mobileHeader.classList.toggle(mobileOverlayOpenClassName);
    document.body.classList.toggle('overflow-hidden');
}

function closeMobileMenu() {
    if(mobileMenuOpen) {
        mobileMenuOpen = false;
        mobileHeader.classList.remove(mobileOverlayOpenClassName);
        document.body.classList.remove('overflow-hidden');
    }
}


//* Document.ready();
if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    onDomReady();
} else {
    document.addEventListener("DOMContentLoaded", onDomReady);
}
/* End Header Logic */