jQuery(function () { 

	$('.contacts__form__input').on('input', function (e) {
		var state = e.target.value;
		if (state.length > 0) {
			$(this).addClass( "value" );
		} else {
			$(this).removeClass( "value" );
		}
	});

	$('.js-mask-phone').mask('+7(000)000-00-00');
	var partnersSlider
	$('.js-partners__slider').each(function(){
		var slider=$(this)
		var partnersSlider = new Swiper(slider[0], {
			spaceBetween: 0,
			speed: 4000,
			freeMode: true,
			loop: true,
			pagination: false,
			// centeredSlides: true,
			slidesPerView: 'auto',
			// setWrapperSize: true,
			allowTouchMove: false,
			autoplay: {
				delay: 0,
				// reverseDirection: true,
				disableOnInteraction: false,
			},	
		});

	})
	function modalThanks() {
		event.preventDefault();
		$.fancybox.open({
			src: "#modalThanks",
			type: "inline",
		});
	}
	$(".js-modalThanks").on('click', ()=> {
		modalThanks()
	})
	var rellax = new Rellax('.rellax', {
		// center:true
		// wrapper:'.cases__section'
	});
	if(document.documentElement.clientWidth < 767) {
		rellax.destroy();
  }


	function bodyNoScroll() {
		let bodyBodymotionless = document.querySelector('body')
		bodyBodymotionless.classList.add("Bodymotionless")
		
	}
	function bodyYesScroll() {
		let bodyBodymotionless = document.querySelector('body')
		bodyBodymotionless.classList.remove("Bodymotionless")	
	}
	
	$( ".header__menu__item" ).mouseenter(function () {
		let headerMenuItem = $(this);
		let headerMenuList = headerMenuItem.children( '.header__menu__list' )
		headerMenuList.addClass('active')
	});
	$( ".header__menu__item" ).mouseleave(function () {
		let headerMenuItem = $(this);
		let headerMenuList = headerMenuItem.children( '.header__menu__list' )
		headerMenuList.removeClass('active')
	});


	let overlayBg = document.querySelector(".mob-menu--overlay");
	let mobMenu = document.querySelector(".mob-menu__section");
	let humb = document.querySelector(".hamburger");

	var hamburger = $(".hamburger");
	hamburger.on("click", function(e) {
		hamburger.toggleClass("is-active");
	});
	var search = $(".header__other__search");
	search.click( function(e) {
		$(this).children(".header__other__search__input").addClass("active"); 

	});
	$(document).mouseup(function (e){ 
		var search = $(".header__other__search");
		if (!search.is(e.target) 
				&& search.has(e.target).length === 0) { 
					search.children(".header__other__search__input").removeClass("active"); 
		}
	});

	overlayBg.addEventListener("click", function () {
		mobMenu.classList.remove("active");
		humb.classList.remove("is-active");
		bodyYesScroll()
	});
	humb.addEventListener("click", function () {
		let kye = mobMenu.classList.contains("active");
		if (kye == false) {
			mobMenu.classList.add("active");
			bodyNoScroll()
		}else {
			mobMenu.classList.remove("active");
			bodyYesScroll()
		}


	});


	document.querySelectorAll('.js-header__menu__item').forEach(link => {

		link.addEventListener('click', function(e) {
				e.preventDefault();
	
				let href = this.getAttribute('href').substring(1);
	
				const scrollTarget = document.getElementById(href);
	
				const topOffset = document.querySelector('.section__header').offsetHeight;
				// const topOffset = 0; // если не нужен отступ сверху 
				const elementPosition = scrollTarget.getBoundingClientRect().top;
				const offsetPosition = elementPosition - topOffset;
	
				window.scrollBy({
						top: offsetPosition,
						behavior: 'smooth'
				});
				mobMenu.classList.remove("active");
				humb.classList.remove("is-active");
				bodyYesScroll()
		});
	});





});