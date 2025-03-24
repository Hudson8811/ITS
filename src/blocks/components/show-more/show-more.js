function showMoreInit() {
    const blocks = document.querySelectorAll('[data-js="showMoreBlock"]');

    if(blocks.length < 1) return
    
    let btnLayout = `<span class="show">Развернуть</span><span class="hide">Свернуть</span>`;

    blocks.forEach(block => {
        const content = block.querySelector('[data-js="showMoreBlockContent"]');
        const fullHeight = content.offsetHeight;
        const maxHeight = parseInt(block.dataset.height);
        
        if(fullHeight > maxHeight + 20) {
            const btn = document.createElement('button');
            btn.classList.add('show-more__btn');
            btn.innerHTML = btnLayout;
            block.appendChild(btn);
            content.style.maxHeight = maxHeight + 'px';
            
            btn.addEventListener("click", function() {
                if(block.classList.contains('show-more--expanded')) {
                    block.classList.remove('show-more--expanded');
                    content.style.maxHeight = maxHeight + 'px';
                } else {
                    block.classList.add('show-more--expanded');
                    content.style.maxHeight = fullHeight + 'px';
                }
            })
        }
    })
    

}