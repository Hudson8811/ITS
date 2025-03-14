function printTextController() {
    const printTexts = document.querySelectorAll('[data-js="printText"]');

    if(printTexts.length < 1) return

    printTexts.forEach(textBlock => {
        const printingBlock = textBlock.querySelector('[data-js="printTextPrinting"]');
        const textStr = textBlock.dataset.text;
        let textArr = JSON.parse(textStr);
        textArr = textArr.map(str => str = str.trim())

        new Typewriter(printingBlock, {
            strings: textArr,
            autoStart: true,
            loop: true,
            pauseFor: 1000,
            delay: 90
          });
    })
}
