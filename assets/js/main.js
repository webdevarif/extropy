(function ($) {
	"use strict";

	$(window).on('load', function () {
        bootstrapFunctions();
	});

	preloader();
    mobileHeaderActive();

    
	/*=============================================
		=    		 Bootstrap			      =
	=============================================*/
	function bootstrapFunctions() {
		// Add slideDown animation to Bootstrap dropdown when expanding.
		$('.dropdown').on('show.bs.dropdown', function () {
			$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
		});

		// Add slideUp animation to Bootstrap dropdown when collapsing.
		$('.dropdown').on('hide.bs.dropdown', function () {
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp(0);
		});

	}
    
	/*=============================================
		=    		 Preloader			      =
	=============================================*/
    function preloader() {
        // Code to run when the document is ready.
		$(window).on('load', function () {
			$('#avs-preloader').addClass('loaded');
			$("#loading").fadeOut(500);

			if ($('#avs-preloader').hasClass('loaded')) {
				$('#preloader').delay(900).queue(function () {
					$(this).remove();
				});
			}
		});
    }
	
   
	/*=============================================
		=    		 Header Sticky			      =
	=============================================*/
    if ($('#header-sticky').length) {
		window.onscroll = function () {
			const left = document.getElementById("header-sticky");

			if (left.scrollTop > 50 || self.pageYOffset > 50) {
				left.classList.add("header__sticky")
			} else {
				left.classList.remove("header__sticky");
			}
		}
    }
    
	/*=============================================
		=    		 Swiper Slider			      =
	=============================================*/
	var avs_slider = $('[avs-slider]');
    if (avs_slider.length) {
		avs_slider.each(function () {
			var SwiperCarousel = $(this),
			slidesAutoplay = SwiperCarousel.data('autoplay'),
			slidesLoop = SwiperCarousel.data('loop'),
			slidesPerView = SwiperCarousel.data('items'),
			slidesSpeed = SwiperCarousel.data('speed'),
			slidesLazy = SwiperCarousel.data('lazy'),
			slidesNextEl = SwiperCarousel.data('next'),
			slidesPrevEl = SwiperCarousel.data('prev');
			
			var swiper = new Swiper(SwiperCarousel[0], {
				slidesPerView: (slidesPerView ? slidesPerView : 1),
				loop: (slidesLoop ? slidesLoop : true),
				speed: (slidesSpeed ? slidesSpeed : 600),
				lazy: (slidesLazy ? slidesLazy : true),
				navigation: {
					nextEl: slidesNextEl,
					prevEl: slidesPrevEl,
				},
				fadeEffect: {
					crossFade: true,
				},
				autoplay: (slidesAutoplay ? slidesAutoplay : false),
			});		
		});		
	}

	
	/*=============================================
		=    		 Mobile Menu  	         =
	=============================================*/
    /* Get Sibling */
    const getSiblings = function (elem) {
        const siblings = []
        let sibling = elem.parentNode.firstChild
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling)
            }
            sibling = sibling.nextSibling
        }
        return siblings
    }

    /* Slide Up */
    const slideUp = (target, time) => {
        const duration = time ? time : 500;
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.boxSizing = 'border-box'
        target.style.height = target.offsetHeight + 'px'
        target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        window.setTimeout(() => {
            target.style.display = 'none'
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Down */
    const slideDown = (target, time) => {
        const duration = time ? time : 500;
        target.style.removeProperty('display')
        let display = window.getComputedStyle(target).display
        if (display === 'none') display = 'block'
        target.style.display = display
        const height = target.offsetHeight
        target.style.overflow = 'hidden'
        target.style.height = 0
        target.offsetHeight
        target.style.boxSizing = 'border-box'
        target.style.transitionProperty = 'height, margin, padding'
        target.style.transitionDuration = duration + 'ms'
        target.style.height = height + 'px'
        window.setTimeout(() => {
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
        }, duration)
    }

    /* Slide Toggle */
    const slideToggle = (target, time) => {
        const duration = time ? time : 500;
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration)
        } else {
            return slideUp(target, duration)
        }
    }

	/*=============================================
		=  Offcanvas/Collapseable Menu	         =
	=============================================*/
    if ($('.offcanvas-menu').length) {
        const offCanvasMenu = function (selector) {
            const $offCanvasNav = document.querySelector(selector),
            $subMenu = $offCanvasNav.querySelectorAll('.sub-menu');
            $subMenu.forEach(function (subMenu) {
                const menuExpand = document.createElement('span')
                menuExpand.classList.add('menu-expand')
                // menuExpand.innerHTML = '+'
                subMenu.parentElement.insertBefore(menuExpand, subMenu)
                if (subMenu.classList.contains('mega-menu')) {
                    subMenu.classList.remove('mega-menu')
                    subMenu.querySelectorAll('ul').forEach(function (ul) {
                        ul.classList.add('sub-menu')
                        const menuExpand = document.createElement('span')
                        menuExpand.classList.add('menu-expand')
                        menuExpand.innerHTML = '+'
                        ul.parentElement.insertBefore(menuExpand, ul)
                    })
                }
            })

            $offCanvasNav.querySelectorAll('.menu-expand').forEach(function (item) {
                item.addEventListener('click', function (e) {
                    e.preventDefault()
                    const parent = this.parentElement
                    if (parent.classList.contains('active')) {
                        parent.classList.remove('active');
                        parent.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                            subMenu.parentElement.classList.remove('active');
                            slideUp(subMenu)
                        })
                    } else {
                        parent.classList.add('active');
                        slideDown(this.nextElementSibling)
                        getSiblings(parent).forEach(function (item) {
                            item.classList.remove('active')
                            item.querySelectorAll('.sub-menu').forEach(function (subMenu) {
                                subMenu.parentElement.classList.remove('active');
                                slideUp(subMenu)
                            })
                        })
                    }
                })
            })
        }
        offCanvasMenu('.offcanvas-menu');
    }

	// console.log($subMenu);

    /*====== Sidebar menu Active ======*/
    function mobileHeaderActive() {
        var navbarTrigger = $(".burger-icon"),
            endTrigger = $(".mobile-menu-close"),
            container = $(".mobile-header-active"),
            wrapper4 = $("body");

        wrapper4.prepend('<div class="body-overlay"></div>');

        navbarTrigger.on("click", function (e) {
            e.preventDefault();
            container.addClass("sidebar-visible");
            wrapper4.addClass("mobile-menu-active");
        });

        endTrigger.on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
        });

        $(".body-overlay").on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
        });
    }

    

	/*=============================================
		=            Nice Select	         =
	=============================================*/
	$('[nice-select]').niceSelect();

    $('[date-time-picker]').datetimepicker({
    });


})(jQuery);

// Passing a named function instead of an anonymous function.
