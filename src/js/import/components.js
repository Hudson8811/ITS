@@include("../../blocks/components/field-file/field-file.js")
@@include("../../blocks/components/copy-block/copy-block.js")
@@include("../../blocks/components/print-text/print-text.js")
@@include("../../blocks/components/tabs-block/tabs-block.js")
@@include("../../blocks/components/show-more/show-more.js")

$(document).ready(function() {
	var videoCase = $('.case__video');
	var blockPreloader = $('.block-preloader');
	var videoLoaded = false;

	if (videoCase.length) {
		videoCase.on('canplaythrough', function() {
			videoLoaded = true;
			checkVideoLoaded();
		});

		videoCase.on('canplay', function() {
			videoLoaded = true;
			checkVideoLoaded();
		});

		function checkVideoLoaded() {
			if (videoLoaded) {
				blockPreloader.addClass('block-preloader--hidden');
				videoCase.css('display', 'block');
				videoCase.get(0).play();
			}
		}

		// Если видео уже загружено до события ready, проверяем его статус сразу
		if (videoCase.get(0).readyState >= 4) {
			videoLoaded = true;
			checkVideoLoaded();
		}
	}

	// Импортированные функции
	fileFieldInit();
	copyBlock();
	printTextController();
	tabsBlockInit();
	showMoreInit();
});