const navbar = document.querySelector('.navbar');

document.querySelector('#menu-bar').onclick = () => {
    navbar.classList.toggle('active');
};

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

const baseConfig = {
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 9500,
        disableOnInteraction: false,
    },
};

const swiperProductos1 = new Swiper(".product-row-1", {
    ...baseConfig,
    pagination: {
        el: ".product-pagination-1",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

const swiperProductos2 = new Swiper(".product-row-2", {
    ...baseConfig,
    pagination: {
        el: ".product-pagination-2",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

const swiperBlogs = new Swiper(".blogs-row", {
    ...baseConfig,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 1,
        },
        1024: {
            slidesPerView: 1,
        },
    },
});

const swiperReviews = new Swiper(".review-row", {
    ...baseConfig,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});
