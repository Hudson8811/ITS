function copyBlock() {
    const blocks = document.querySelectorAll('[data-js="copyBlock"]')

    if(blocks.length < 1) return

    blocks.forEach(btn => {
        const tooltip = btn.querySelector('[data-js="copyBlockTooltip"]')

        btn.addEventListener('click', function(e) {
            const content = this.dataset.content;
            navigator.clipboard.writeText(content);

            tooltipСycle(tooltip, e.x, e.y)
        })
    })

    function tooltipСycle(tooltip, left, top) {
        if(tooltip) {
            tooltip.setAttribute("style", "")
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';

            if(window.innerWidth - left < tooltip.offsetWidth + 10) {
                tooltip.style.transform = "translateX(-100%)"
            }

            tooltip.classList.add('active');
            setTimeout(() => {
                tooltip.classList.remove('active');
            }, 1500)
        }
    }
}