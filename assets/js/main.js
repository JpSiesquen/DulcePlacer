const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const state = {
    selectedProduct: '',
};

function setMenuState(isOpen) {
    const navbar = $('.navbar');
    const menuButton = $('#menu-bar');

    navbar.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
}

function initMobileMenu() {
    const navbar = $('.navbar');
    const menuButton = $('#menu-bar');
    const navBackdrop = $('.nav-backdrop');

    if (!navbar || !menuButton || !navBackdrop) {
        return;
    }

    menuButton.addEventListener('click', () => {
        const isOpen = navbar.classList.contains('active');
        setMenuState(!isOpen);
    });

    navBackdrop.addEventListener('click', () => {
        setMenuState(false);
    });

    $$('.navbar a').forEach((link) => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            setMenuState(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            setMenuState(false);
        }
    });
}

function getAutoplayConfig() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
    }

    return {
        delay: 9500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    };
}

function createSwiperConfig(overrides = {}) {
    return {
        spaceBetween: 30,
        loop: true,
        speed: 650,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        autoplay: getAutoplayConfig(),
        ...overrides,
    };
}

function initSwipers() {
    const swiperDefinitions = [
        {
            selector: '.product-row-1',
            options: createSwiperConfig({
                pagination: {
                    el: '.product-pagination-1',
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            }),
        },
        {
            selector: '.product-row-2',
            options: createSwiperConfig({
                pagination: {
                    el: '.product-pagination-2',
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            }),
        },
        {
            selector: '.blogs-row',
            options: createSwiperConfig({
                centeredSlides: true,
                autoHeight: true,
                pagination: {
                    el: '.blogs-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.blogs-next',
                    prevEl: '.blogs-prev',
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                },
            }),
        },
        {
            selector: '.review-row',
            options: createSwiperConfig({
                autoHeight: true,
                pagination: {
                    el: '.review-pagination',
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                },
            }),
        },
    ];

    swiperDefinitions.forEach(({ selector, options }) => {
        if ($(selector)) {
            new Swiper(selector, options);
        }
    });
}

function initNewsletterForm() {
    const form = $('#newsletter-form');
    const emailInput = $('#newsletter-email');
    const status = $('#newsletter-status');

    if (!form || !emailInput || !status) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const isValid = emailInput.checkValidity();

        status.classList.remove('is-error', 'is-success');

        if (!email || !isValid) {
            status.textContent = 'Ingresa un correo válido para recibir novedades.';
            status.classList.add('is-error');
            emailInput.focus();
            return;
        }

        status.textContent = 'Gracias. Tu correo quedó listo para futuras campañas.';
        status.classList.add('is-success');
        form.reset();
    });
}

function initProductCallToActions() {
    const contactHeading = $('.contact-heading');

    $$('[data-product-name]').forEach((link) => {
        link.addEventListener('click', () => {
            state.selectedProduct = link.dataset.productName || '';

            if (contactHeading && state.selectedProduct) {
                contactHeading.textContent = `Información de contacto · ${state.selectedProduct}`;
            }
        });
    });
}

function initVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
        const isHidden = document.hidden;

        $$('.swiper').forEach((element) => {
            const swiper = element.swiper;

            if (!swiper || !swiper.autoplay) {
                return;
            }

            if (isHidden) {
                swiper.autoplay.stop();
            } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                swiper.autoplay.start();
            }
        });
    });
}

function initApp() {
    initMobileMenu();
    initSwipers();
    initNewsletterForm();
    initProductCallToActions();
    initVisibilityHandling();
}

document.addEventListener('DOMContentLoaded', initApp);
