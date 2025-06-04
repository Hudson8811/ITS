function reviewsSliderInit() {
    const sliders = document.querySelectorAll('[data-js="reviewsSlider"]');

    if(sliders.length < 1) return

    sliders.forEach(slider => {
        const sliderControls = slider.querySelector('[data-js="sliderControls"]')
        const sliderPrev = sliderControls.querySelector('[data-js="sliderControlPrev"]')
        const sliderNext = sliderControls.querySelector('[data-js="sliderControlNext"]')

        const sliderEx = new Swiper(slider, {
            slidesPerView: 1.2,
            spaceBetween: 16,
            navigation: {
                nextEl: sliderNext,
                prevEl: sliderPrev,
            },
            breakpoints: {
                561: {
                    slidesPerView: 1.2,
                    spaceBetween: 24,
                },
                768: {
                    slidesPerView: 1.2,
                    spaceBetween: 48,
                },
                1024: {
                    slidesPerView: 1.5,
                    spaceBetween: 64,
                }

            }
        })
    })
}