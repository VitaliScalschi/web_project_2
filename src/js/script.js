$(document).ready(function(){
    $('.carusel__inner').slick({
        // adaptiveHeight: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icon/left.svg" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icon/right.svg" alt=""></button>',
    });

    ///Taburile la compartimentul catalog.
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_activ').eq($(this).index()).addClass('catalog__content_activ');
      });    

    //////Functionarea butonului de  informare la comparimentul catalog
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_activ');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_activ');
            });
        });
    }
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');


    ///Modal 

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button__catalog-item').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

/// validarea datelor introduse
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                phone:"required",
                email:{
                    required: true,
                    email:true
                }
            },
            messages: {
                name: {
                    required :"Introduceti datele",
                    minlength: jQuery.validator.format("Introduceti {0} simboluri")
                },
                email: {
                  required: "Introduceti email",
                  email: "Your email address must be in the format of name@domain.com"
                },
                phone: {
                    required: "Introduceti nr de telefon"
                }
    
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //// Masca la numarul de telefon
    $('input[name=phone]').mask("(+373) 999-9999");



    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()){
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation', '#order').fadeOut();
            $('.overlay', '#thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });


    ///Scroll page up


    $(window).scroll(function(){
        if ($(this).scrollTop() > 1600) {
            $('.page__up').fadeIn();
        } else {
            $('.page__up').fadeOut();
        }
    });
    


    $("a[href = #up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();


});