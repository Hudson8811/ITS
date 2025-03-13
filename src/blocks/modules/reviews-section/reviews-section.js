function reviewsSliderInit() {
    const sliders = document.querySelectorAll('[data-js="reviewsSlider"]');

    if(sliders.length < 1) return

    console.log(sliders)

    sliders.forEach(slider => {
        const sliderControls = slider.querySelector('[data-js="sliderControls"]')
        const sliderPrev = sliderControls.querySelector('[data-js="sliderControlPrev"]')
        const sliderNext = sliderControls.querySelector('[data-js="sliderControlNext"]')

        const sliderEx = new Swiper(slider, {
            slidesPerView: 1.5,
            spaceBetween: 64,
            navigation: {
                nextEl: sliderNext,
                prevEl: sliderPrev,
            }
        })
    })
}