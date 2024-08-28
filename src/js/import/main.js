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
        $.fancybox.close();
        $.fancybox.open({
            src: "#modalThanks",
            type: "inline",
        });
    }
    $(".contacts__form__select").select2({
        placeholder: "Бюджет проекта",
        allowClear: true
    });

    if ($('.rellax').length > 0){
        var rellax = new Rellax('.rellax', {
            // center:true
            // wrapper:'.cases__section'
        });
        if(document.documentElement.clientWidth < 767) {
            rellax.destroy();
        }
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
            let href = this.getAttribute('href');
            if (href.includes('#')) {
                href = href.substring(href.indexOf('#') + 1);
            } else {
                return;
            }
            const scrollTarget = document.getElementById(href);
            if (scrollTarget !== null) {
                e.preventDefault();
                const topOffset = document.querySelector('.section__header').offsetHeight;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                mobMenu.classList.remove("active");
                humb.classList.remove("is-active");
                bodyYesScroll();
            }


        });
    });

    document.querySelectorAll('.start__btn').forEach(link => {
        link.addEventListener('click', function(e) {
            let href = this.getAttribute('href');
            if (href.includes('#')) {
                href = href.substring(href.indexOf('#') + 1);
            } else {
                return;
            }
            const scrollTarget = document.getElementById(href);
            if (scrollTarget !== null) {
                e.preventDefault();
                const topOffset = document.querySelector('.section__header').offsetHeight;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                mobMenu.classList.remove("active");
                humb.classList.remove("is-active");
                bodyYesScroll();
            }


        });
    });



    var allowAjaxForm = true;
    $('.js-contact-form').on('submit',function (){
       event.preventDefault();
    });
    $('.js-contact-form button[type="submit"]').on('click',function (){
       event.preventDefault();
       let button = $(this);
       let form = $(this).closest('form');
       let allowSend = true;

       form.find('input[required]').each(function (){
           if (!checkField($(this))){
               allowSend = false;
           }
       });

       if (allowSend && allowAjaxForm){
           allowAjaxForm = false;
           let formData = form.serialize();
           $.ajax({
               type: 'POST',
               url: '/php/mail.php',
               data: formData,
               dataType: 'json',
               beforeSend: function() {
                   button.attr('disabled',true);
               },
               success: function(response) {
                   if (response && response.status === true) {
                       modalThanks();
                       form.trigger('reset');
                   } else {
                       alert('Ошибка отправки формы.');
                   }
                   button.attr('disabled',false);
                   allowAjaxForm = true;
               },
               error: function(error) {
                   console.error('Error: ' + JSON.stringify(error));
                   button.attr('disabled',false);
                   allowAjaxForm = true;
                   alert('Ошибка отправки формы.');
               }
           });
       }
    });

    $('.js-show-form').on('click', function (){
        event.preventDefault();
        $.fancybox.open({
            src: "#modalForm",
            type: "inline",
        });
    });


    $('.js-contact-form input[required]').on('blur',function (){
        checkField($(this));
    });

    $('.js-contact-form input[required]').on('keyup paste',function (){
        if ($(this).parent().hasClass('error'))
            checkField($(this));
    });

    function checkField(field){
        let type = field.attr('type');
        let value = $.trim(field.val());
        let isValid = true;
        switch(type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'tel':
                let digitsOnly = value.replace(/\D/g, '');
                isValid = /^[\d]{10,}$/.test(digitsOnly);
                break;
            case 'checkbox':
                isValid = field.is(':checked');
                break;
            default:
                isValid = value !== '';
                break;
        }
        if (!isValid){
            field.parent().addClass('error');
        } else {
            field.parent().removeClass('error');
        }
        return isValid;
    }






});