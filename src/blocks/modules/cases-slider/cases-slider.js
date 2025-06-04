function casesSliderInit() {
    const slider = document.querySelector('[data-js="casesSlider"]')

    if(!slider) return

    const sliderControls = slider.querySelector('[data-js="sliderControls"]')
    const sliderPrev = sliderControls.querySelector('[data-js="sliderControlPrev"]')
    const sliderNext = sliderControls.querySelector('[data-js="sliderControlNext"]')

    const sliderEx = new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 600,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: sliderNext,
            prevEl: sliderPrev,
        }
    })
}