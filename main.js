	/*===============================================
    Script initialize load images
  	===============================================*/
	$(window).load(function() {
		window.setTimeout(function() {
			$("img").unveil();
		}, 500);

	/*===============================================
    Список категорий и подкатегорий на Desktop
  	===============================================*/
    if (window.matchMedia("(min-width: 992px)").matches) {
		
		$('.hasSubcats').each(function() {
			var tempStyle = $('.nav-row--category-list').attr('style');
			$('.nav-row--category-list').css({
				visibility: 'hidden',
				display: 'block'
			});
			
			var li = $(this).parent();
			var topSubCats = -(63 - li.height() + 1) / 2 + 'px';
			li.find('.sub-cats').css('top', topSubCats);
		
			li.hover(function() {
				$(this).find('.sub-cats').stop(true,true).delay(100).fadeIn(200);
				$('.nav_overlay').stop(true,true).delay(100).fadeIn(200);
			}, function() {
				$(this).find('.sub-cats').stop(true,true).delay(100).fadeOut(200);
                $('.nav_overlay').stop(true,true).delay(100).fadeOut(200);
			});
			
			$('.nav-row--category-list').css({
				visibility: '',
				display: ''
			});
			$('.nav-row--category-list').attr('style', tempStyle);
		});		
    }
	// Click toggle Category
    $('.nav-row--nav-toggle-clickable').on('click', function() {
        $('.nav-row--category-list').slideToggle();
        $('.nav-row--category-list').toggleClass('open');
//		$('#wrapper.open').height($('.nav-row--category-list.open').height());
    });
		
    if ($('.nav-row--nav-toggle').hasClass('nav-row--nav-toggle-clickable')) {
        $(document).click(function(e) {
            if ($(e.target).closest('.nav-row--nav-toggle-clickable').length) return;
            $('.nav-row--category-list').slideUp();
//			$('#wrapper').removeClass('open');
//			$('#wrapper').height('auto');
            e.stopPropagation();
        });
    }
//	if ($('#wrapper').height() < $('.nav-row--category-list').height()) {
//		$('#wrapper').height($('.nav-row--category-list').height());
//	}
	// Высота категорий
    if ($('.home-menu-buffer').length) {
        var menuHeight = $('.nav-row--category-list').height() - 20;
        $('.home-menu-buffer').outerHeight(menuHeight)
    }
	
	/*===============================================
    Cart - Fancybox popup
  	===============================================*/
    $('.header-cart').on('click', function() {
        $.fancybox.open({
            src: '.cart-box--container',
            type: 'inline',
            opts: {
                focus: false
            }
        });
    });

	/*===============================================
    "Добавить в корзину" - Ajax
  	===============================================*/
    $(document).on('click', '.cart-ajax', function() {
        $(this).closest('form').append('<div class="w-overlay"><div class="loader loader--style1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg></div></div>');
        var urlLink = $(this).closest('form').attr('action') + $(this).closest('form').serialize();
        var thisButton = $(this);
        var thisButtonText = $(this).html();
        thisButton.width(thisButton.width());
        thisButton.height(thisButton.height());
        thisButton.html('<span class="preloader"></div>');

        $.ajax({
            url: urlLink,
            type: 'get',
            dataType: 'html',
            success: function(data) {
                var $response = $(data);
                var count = $response.find('.header-cart').html();
                var cart = $response.find('#basketModal').html();
                $('#basketModal').html(cart);
                $('.header-cart').html(count);
                updatePriceCur($('.cart-list--item-price, .cart-list--total-price'));
                if ($('.header-cart--total').length) {
                    var newPrice = priceTool($('.header-cart--total .finalSumTotal').text());
                    $('.header-cart--total .finalSumTotal').html(newPrice);
                }
                $.fancybox.open({
                    src: '.cart-box--container',
                    type: 'inline',
                    opts: {
                        focus: false
                    }
                });
                thisButton.html(thisButtonText);
                thisButton.removeAttr('style');
                $('.w-overlay').remove();
            }
        });
    });
    
	/*===============================================
    "Добавить в избранное" - Ajax
  	===============================================*/
    $(document).on('click', '.wishlist-ajax', function(e) {
        e.preventDefault();
        $(this).closest('form').append('<div class="w-overlay"><div class="loader loader--style1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg></div></div>');
        var thisButton = $(this);
        var wishlistForm = thisButton.closest('form');
        var wishlistFormActions = thisButton.closest('form .wishlistBlock');
        var wishlistFormId = '#' + thisButton.closest('form').attr('id');
        var cnid = wishlistForm.find('.hidden input[name="cnid"]').val(),
            actcontrol = wishlistForm.find('.hidden input[name="actcontrol"]').val(),
            stoken = wishlistForm.find('.hidden input[name="stoken"]').val(),
            lang = wishlistForm.find('.hidden input[name="lang"]').val(),
            pgNr = wishlistForm.find('.hidden input[name="pgNr"]').val(),
			cl = wishlistForm.find('.hidden input[name="cl"]').val(),
            anid = wishlistForm.find('.hidden input[name="anid"]').val();
		if (cl === "details") {
			if ($('body').hasClass('cl-start')) {
				cl = "start";
			}
			if ($('body').hasClass('cl-alist')) {
				cl = "alist";
			}
        }
        var urlLink = '/index.php?cnid=' + cnid + '&actcontrol=' + actcontrol + '&stoken=' + stoken + '&lang=' + lang + '&pgNr=' + pgNr + '&cl=' + cl +'&fnc=tonoticelist&aid=' + anid + '&anid=' + anid + '&am=1';
        
        if (thisButton.hasClass('wishlist-is')) {
            urlLink = urlLink.replace('am=1', 'am=0');
            var wishlistPopupText = 'Artikel gelöscht';
        }
        if (thisButton.hasClass('wishlist-not')) {
            var wishlistPopupText = 'Artikel merken';
        }

        var thisButtonText = $(this).html();
        thisButton.width(thisButton.width());
        thisButton.height(thisButton.height());
        thisButton.find('i').replaceWith('<span class="preloader"></span>');
        $.ajax({
            url: urlLink,
            type: 'get',
            dataType: 'html',
            success: function(data) {
                var $response = $(data);
                var servicemenu = $response.find('.service-menu-box').html();
                $('.service-menu-box').html(servicemenu);
                wishlistFormActions.html($response.find(wishlistFormId + ' .wishlistBlock').html());
				if (!isMobile.any()) {
					wishlistFormActions.find('.hasTooltip').tooltip();
				}
                $.fancybox.open({
                    src: '<div style="display: inline-block; background: #fff; max-width: 320px; width: 100%;"><div style="width: 100%; max-width: 800px; "><div style="text-align: center;"><i class="fa fa-heart-o" aria-hidden="true" style="color: #F62F5E; font-weight: 700; margin-right: 10px;"></i>' + wishlistPopupText + '</div></div><button data-fancybox-close="" class="fancybox-close-small"></button></div>',
                    type: 'inline',
                    opts: {
                        focus: false
                    }
                });
                thisButton.html(thisButtonText);
                thisButton.removeAttr('style');
                $('.w-overlay').remove();
                setTimeout(function() {
                    $.fancybox.close();
                }, 2000);
            }
        });
    });

	/*===============================================
    Удаление товара в Cart Fancybox
  	===============================================*/
	$(document).on('click', '.cart-list--item-info-remove', function() {
		$(this).closest('form').append('<input type="hidden" name="removeBtn" value="1" />');
		updateCart($(this));
	});
		
	/*===============================================
    Number Counter в Cart Fancybox
  	===============================================*/
	// прибавляем
	$(document).on('click', '.cart-list--item .number-icon .down', function() {
		var curInput = $(this).parent().find('input[type="text"]');
		if (curInput.val() > 1) {
			curInput.val(+curInput.val() - 1);
		}
		updateCart($(this));
	});
	// уменьшаем
   	$(document).on('click', '.cart-list--item .number-icon .up', function() {
       var curInput = $(this).parent().find('input[type="text"]');
       curInput.val(+curInput.val() + 1);
       updateCart($(this))
   	});
	// ввод с клавиатуры
    $('.cart-list--item .number-icon input[type="text"]').each(function() {
        $(this).on('keyup change', function() {
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
            $(this).closest('form').find('.hidden input[name="am"]').val(this.value);
            updateCart($(this));
        });
    });
	// Ajax
	function updateCart(targetThis) {
		$('.cart-box--container-inner').append('<div class="w-overlay"><div class="loader loader--style1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg></div></div>');
		var urlLink = targetThis.closest('form').attr('action') + targetThis.closest('form').serialize();
		$.ajax({
			url: urlLink,
			type: 'post',
			dataType: 'html',
			success: function(data) {
				var $response = $(data);
				var count = $response.find('.header-cart').html();
				var cart = $response.find('#basketModal').html();
				$('#basketModal').html(cart);
				$('.header-cart').html(count);
				$('.cart-list--item .number-icon input[type="text"]').each(function() {
					$(this).on('keyup change', function() {
						if (/\D/g.test(this.value)) {
							this.value = this.value.replace(/\D/g, '');
						}
						$(this).closest('form').find('.hidden input[name="am"]').val(this.value);
						updateCart($(this));
					});
				});
				updatePriceCur($('.cart-list--item-price, .cart-list--total-price'));
				if ($('.header-cart--total').length) {
					var newPrice = priceTool($('.header-cart--total .finalSumTotal').text());
					$('.header-cart--total .finalSumTotal').html(newPrice);
				}
				$('.w-overlay').remove();
			}
		});
	}
	// Удаляем товар
    $(document).on('click', '.basketTotalForm--item-remove', function() {
        $(this).closest('form').append('<input type="hidden" name="removeBtn" value="1" />');
        updateCartTotal($(this));
    });

	/*===============================================
    Удаление всех товаров на странице Корзины
  	===============================================*/
    $(document).on('click', '.removeAllProducts', function() {
        $('.basketTotalForm--item').each(function() {
            $('.remove_main_all').val('1');
            $(this).closest('form').append('<input type="hidden" name="removeBtn" value="1" />');
        });
        updateCartTotal($(this));
    });
	
	/*===============================================
    Number Counter на странице Корзины
  	===============================================*/
	// уменьшаем
    $(document).on('click', '.basketTotalForm--item .number-icon .down', function() {
        if ($(this).hasClass('mobile-sign')) {
            var curInputDefault = $(this).parent().find('input[type="text"]').attr('name');
            var curInput = $(this).closest('form').find('#basket_table input[name="' + curInputDefault + '"]');
        } else {
            var curInput = $(this).parent().find('input[type="text"]');
        }
        if (curInput.val() > 1) {
            curInput.val(+curInput.val() - 1);
        }
        updateCartTotal($(this));
    });
	// прибавляем
    $(document).on('click', '.basketTotalForm--item .number-icon .up', function() {
        if ($(this).hasClass('mobile-sign')) {
            var curInputDefault = $(this).parent().find('input[type="text"]').attr('name');
            var curInput = $(this).closest('form').find('#basket_table input[name="' + curInputDefault + '"]');
        } else {
            var curInput = $(this).parent().find('input[type="text"]');
        }
        curInput.val(+curInput.val() + 1);
        updateCartTotal($(this));
    });
	// ввод с клавиатуры
    $('.basketTotalForm--item .number-icon input[type="text"]').each(function() {
        $(this).on('keyup change', function() {
            if ($(this).hasClass('mobile-sign-am')) {
                var curInputDefault = $(this).attr('name');
                var curInput = $(this).closest('form').find('#basket_table input[name="' + curInputDefault + '"]');
            } else {
                var curInput = $(this);
            }
            if (/\D/g.test(this.value)) {
                this.value = this.value.replace(/\D/g, '');
            }
            curInput.val(this.value);
            $(this).closest('form').find('.hidden input[name="am"]').val(this.value);
            updateCartTotal($(this));
        });
    });
	// Ajax
    function updateCartTotal(targetThis) {
        $('#basketTotalForm').append('<div class="w-overlay"><div class="loader loader--style1"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"><path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/><path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/></path></svg></div></div>');
        var urlLink = targetThis.closest('form').attr('action') + targetThis.closest('form').serialize();
		
        $.ajax({
            url: urlLink,
            type: 'post',
            dataType: 'html',
            success: function(data) {
                var $response = $(data);
                var count = $response.find('.header-cart').html();
                var cart = $response.find('#basketTotalForm').html();
                if (cart) {
                    $('#basketTotalForm').html(cart);
                } else {
                    cart = $response.find('#empty-basket-warning').html();
                    $('#basketTotalForm').replaceWith('<div id="empty-basket-warning">' + cart + '</div>')
                    $('.well').remove();
                }
                $('.header-cart').html(count);

                $('.basketTotalForm--item .number-icon input[type="text"]').each(function() {
                    $(this).on('keyup change', function() {
                        if ($(this).hasClass('mobile-sign-am')) {
                            var curInputDefault = $(this).attr('name');
                            var curInput = $(this).closest('form').find('#basket_table input[name="' + curInputDefault + '"]');
                        } else {
                            var curInput = $(this);
                        }
                        if (/\D/g.test(this.value)) {
                            this.value = this.value.replace(/\D/g, '');
                        }
                        curInput.val(this.value);
                        $(this).closest('form').find('.hidden input[name="am"]').val(this.value);
                        updateCartTotal($(this));
                    });
                });

                updatePriceCur($('.basketTotalForm--item-price, .basketTotalForm--price'));
                if ($('.header-cart--total').length) {
                    var newPrice = priceTool($('.header-cart--total .finalSumTotal').text());
                    $('.header-cart--total .finalSumTotal').html(newPrice);
                }
                $('.w-overlay').remove();
            }
        });
    }

	/*===============================================
    Удаление всех товаров из Списка избранного
  	===============================================*/
    $(document).on('click', '.clearAllWishlist', function() {
        $('#boxwrapper_noticelistProductList .js-oxProductForm').each(function() {
            $('.remove_main_all').val('1');
            $(this).append('<input type="hidden" name="removeBtn" value="1" />');
        });
    });

	/*===============================================
    Sly Carousel
  	===============================================*/
    $('.sly-carousel').each(function() {
        if ($(this).hasClass('check-size-topcat')) {
            var productContainer = $('.check-size-product-container-topcat').width();
        } else {
            var productContainer = $('.check-size-product-container-inner').width();
        }
        $(this).find('li').each(function() {
            $(this).width(productContainer);
            $(this).css('min-width', productContainer + 'px');
            $(this).css('max-width', productContainer + 'px');
            $(this).closest('.fadeIn').css('opacity', '1');
        });
        var $slidee = $(this).children('ul').eq(0);
        var $wrap = $(this).parent();
        $(this).sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            // activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
			swingSpeed: 0.5,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 500,
            elasticBounds: 1,
            easing: 'swing',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            // Buttons
            forward: $wrap.find('.forward'),
            backward: $wrap.find('.backward'),
            prev: $wrap.find('.prev'),
            next: $wrap.find('.next'),
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });
    });

	/*===============================================
    Разделение цены
  	===============================================*/
    function priceTool(value) {
        return value.split(',')[0] + '<span class="sup-price">' + value.split(',')[1].replace(/\s/g, '') + '</span>';
    }
		
    function priceToolCur(value) {
        var price = value.replace(/\s/g, '').split('€')[0];
        return price.split(',')[0] + '<span class="sup-price">' + price.split(',')[1].replace(/\s/g, '') + '</span> €';
    }

    if ($('.header-cart--total').length) {
        var newPrice = priceTool($('.header-cart--total .finalSumTotal').text());
        $('.header-cart--total .finalSumTotal').html(newPrice);
    }

    function updatePriceCur(value) {
        value.each(function() {
            var newPrice = priceToolCur($(this).text());
            $(this).html(newPrice);
        });
    }

    updatePriceCur($('.cart-list--item-price, .cart-list--total-price, .basketTotalForm--item-price, .basketTotalForm--price'));
		
		
    /*================================================================================================
	  ================================================================================================
	  ================================================================================================
      VAL.JS
	  ================================================================================================
	  ================================================================================================
	  ==============================================================================================*/

	/*===============================================
    Mobile detection
  	===============================================*/
	var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
	
	/*===============================================
    Tooltop script initialize
  	===============================================*/
	if (!isMobile.any()) {
		$('.hasTooltip').tooltip();
	}
    
	/*===============================================
    Вырезаем title в карточке товара при моб.версии
  	================================================*/
    if ($('#detailsMain').length && isMobile.any()) {
        $('.details--top-info').addClass('details--top-info-bottom');
        $('.details-col-left').prepend('<div class="details--top-info"><span class="small text-muted">'+$('.details--top-info .text-muted').text()+'</span></div>');
        $('.details--top-info-bottom .text-muted').remove();
        $('.details-col-left').prepend($('#productTitle'));
    }
  
    /*===============================================
    Верхнее меню в мобильной версии
  	===============================================*/
    var sideMenu = '<div class="sideMenu"><div class="sideMenu--head">' + $('.logo-col').html() + '<div class="sideMenuClose block-shadow"><i class="fa fa-arrow-right"></i></div></div><div class="sideMenu--wrapper">';
    sideMenu += '<div class="top-row--user"><p>Mein Konto</p>';
    if ($('.top-row--login').length) {
        sideMenu += '<a class="top-row--login">' + $('.top-row--login').html() + '</a>' + '<div class="sideMenu--cabinet-form">' + $('.login-box--container-inner').html() + '</div>';
        sideMenu += $('.top-row--register').clone().wrap('<div></div>').parent().html();
    } else {
        sideMenu += '<div class="top-row--user-loggedin"><a class="top-row--profile">' + $('.top-row--profile').html() + '</a>';
        sideMenu += '<div class="sideMenu--cabinet-form"><ul>' + $('#services').html() + '</ul></div>';
        sideMenu += $('.prifile--out').html() + '</div>';
    }

    sideMenu += '</div><p>Info</p>' + $('.top-row--info-list').html() + '</div><div class="sideMenu--bottom">';

    sideMenu += '<p>Rückruf</p><p>Brauchen Sie Hilfe?<br>Rufen Sue uns an oder bestellen Sie ein Rückruf</span>';

    sideMenu += '<div class="sideMenu--phone-col">' + $('.phone-item-1').html() + $('.phone-item-2').html() + '</p></div>';

    sideMenu += '<div class="phone-col--callback-wrap">' + $('.callback-box--container').html() + '</div></div>';

    sideMenu += '<div class="top-row--social"><p>Wir in sozialen Medien</p>' + $('.top-row--social-links').html() + '</div></div>';

    $('body').prepend(sideMenu);
    // Toggle Side Menu
    $('.m-menu').on('click', function() {
        $('.sideMenu').toggleClass('sideMenuShow');
        $('body,html').prepend('<div class="overlay-site"></div>');
        setTimeout(function() {
            $('body').toggleClass('bodyHide');
        }, 200);
    });
    // Hide Side Menu
    $('body').on('click', '.sideMenuClose, .overlay-site', function() {
        $('.sideMenu').removeClass('sideMenuShow');
        $('.overlay-site').remove();
        $('body,html').removeClass('bodyHide');

    });
	
    $('body').on('click', '.top-row--login, .top-row--profile', function() {
        $(this).toggleClass('menu--click');
        $('.sideMenu--cabinet-form').slideToggle(200);
    });

    if (isMobile.any()) {
        $('body').on('click', '.phone-col--callback', function() {
            $(this).toggleClass('menu--click');
            $('.phone-col--callback-wrap').slideToggle(200);
            $('.phone-col--number').toggleClass('hidden');
        });
    }

    /*===============================================
    Меню категорий в мобильной версии
  	===============================================*/
    var mobileCategory = '<div class="mobileCategory"><div class="sideMenu--head">' + $('.logo-col').html() + '<div class="mobileCategoryClose block-shadow"><i class="fa fa-arrow-left"></i></div></div><div class="sideMenu--wrapper">';
    mobileCategory += '<div class="sliding-menu-wrapper">' + $('.nav-row--category-list').html() + '</div></div></div>';
    $('body').append(mobileCategory);
    // Toggle Side Menu
    $('.m-category-toggle').on('click', function() {
        $('.mobileCategory').toggleClass('mobileCategoryShow');
        $('body').prepend('<div class="overlay-site"></div>');
        setTimeout(function() {
            $('body').toggleClass('bodyHide');
        }, 200);
    });
    // Hide Side Menu
    $('body').on('click', '.mobileCategoryClose, .overlay-site', function() {
        $('.mobileCategory').removeClass('mobileCategoryShow');
        $('.overlay-site').remove();
        $('body').removeClass('bodyHide');
    });
    if (window.matchMedia("(max-width: 991px)").matches || isMobile.any()) {
        //кнопка "назад" в подкатегориях
        $('.sub-cats').prepend('<a class="back" href="#"> <i class="fa fa-chevron-left"></i>zurück</a>');
		$('.sub-cats .imageWrapper').html('<i class="fa fa-chevron-circle-right" aria-hidden="true" style="color: #87B144;"></i>');
        var backTop;
        $('.mobileCategory .sub-cats').each(function() {
            var $this = $(this);
            var dataHrefAttr = $this.parent().find('i');
            var id = Math.random().toString(36).substring(3, 8);
            var dataHref = '#cat-id-' + id;
            $this.closest('ul').addClass('menu-cat-parent');
            $this.attr('id', 'cat-id-' + id);
            dataHrefAttr.attr('data-href', dataHref);
            $this.detach();
			
            $('.mobileCategory .sliding-menu-wrapper').append($this);
            $('.mobileCategory .sideMenu--wrapper').css('height', $('.menu-cat-parent').height());
            $('.sliding-menu-wrapper').css('width', $('.sub-cats').length * ($('.menu-cat-parent').width()));
			
            dataHrefAttr.on('click', function() {
                backTop = $(this).parent().position().top;
                $('.mobileCategory .sideMenu--wrapper').css('height', $('#cat-id-' + id + ' ul').height() + 60);
                $('#cat-id-' + id).insertAfter('.menu-cat-parent');
                $('.sliding-menu-wrapper').css('transform', 'translate(-295px, 0px)');
            });
			
            $('.back').on('click', function() {
                $('.mobileCategory .sideMenu--wrapper').css('height', $('.menu-cat-parent').height());
                $('.sliding-menu-wrapper').css('transform', 'translate(0px, 0px)');
                // $('#cat-id-' + id).css('display', 'none');

                $('.mobileCategory').animate({
                    scrollTop: backTop + 82 + 'px'
                }, 0);
            });

        });
    }

	/*===============================================
    Делаем квадратные картинки подкатегорий
  	===============================================*/
    function squareImagesCat(curSubCat) {
        var tempStyle = $('.nav-row--category-list').attr('style');
        $('.nav-row--category-list').css({
            visibility: "hidden",
            display: "block"
        });
        curSubCat.css({
            visibility: "hidden",
            display: "block"
        });
        var subCat = curSubCat.find('li a .imageWrapper');
        subCat.each(function() {
            $(this).height($(this).width());
            $(this).find('img').css({
                maxHeight: $(this).width()
            });
        });
        curSubCat.css({
            visibility: "",
            display: ""
        });
        $('.nav-row--category-list').attr('style', tempStyle);
    }
	
    if (window.matchMedia("(min-width: 992px)").matches) {
        setSubmenuSize();
		
        function setSubmenuSize() {
            var submenuWidth = $('#nav-row .container').width() - $('#nav-row .col-lg-3').width();
            $('.sub-cats').each(function() {
                $(this).width(submenuWidth);
                if (!isMobile.any()) {
                    squareImagesCat($(this));
                }
            });
        }
    }

   	/*===============================================
    Accordion footer title in mobile
  	===============================================*/
    if (window.matchMedia("(max-width: 767px)").matches || isMobile.any()) {
        $('.footer-box-title').each(function() {
            $(this).on('click', function() {
                $(this).toggleClass('active');
                $(this).parent().find('.footer-box-content').slideToggle(200);
            });
        });
    }

	/*===============================================
    Заменяем ссылки вo всех видео
  	===============================================*/
    if ($('object').length) {
        $('object').each(function() {
            $(this).find('embed').attr('src', $(this).find('embed').attr('src').replace('https://www.youtube-nocookie.com', 'https://www.youtube.com'));
			$(this).find('param[name="movie"]').attr('value', $(this).find('param[name="movie"]').attr('value').replace('https://www.youtube-nocookie.com', 'https://www.youtube.com'));
			 $(this).find('embed').attr('src', $(this).find('embed').attr('src').replace('http://', 'https://'));
        });
    }

	/*===============================================
    Оборочиваем все видео в container
  	===============================================*/
    $('iframe[src*="youtube.com"], object').not('.noresize').wrap('<div id="video" class="block-videocontainer"><div class="videocontainer-wrapper"><div class="videocontainer"></div></div></div>');

	/*===============================================
    Кнопка "Video" scroll and autoplay
  	===============================================*/
    if ($('#video').length) {
        $('.detailsInfo .picture').append('<a id="play-video" href="#video"><i class="fa fa-play-circle" aria-hidden="true"></i> Video</a>');
    }
	
    $(document).on('click', '#play-video', function(e) {
        if ($('#video embed').length) {
            $("#video embed")[0].src += "&autoplay=1";
        }
        if ($('#video iframe').length) {
            $("#video iframe")[0].src += "?rel=0&autoplay=1";
        }
        if ($('#video object[type="application/x-shockwave-flash"]').length) {
            $("#video object")[0].data += "&autoplay=1";
        }
        e.preventDefault();
        var idHref = $(this).attr('href'),
            topHref = $(idHref).offset().top;
        $('body,html').animate({
            scrollTop: topHref - 5
        }, 800);
    });

	/*===============================================
    Делаем квадратной гл.картинку в карточке товара
  	===============================================*/
    function squareImagesDetails(parrentContainerImg) {
        var heightPicture = $('.detailsInfo .picture');
        heightPicture.height(heightPicture.width());
        heightPicture.find('img').css('max-height', (heightPicture.width() + 'px'));
    }
    squareImagesDetails('.detailsInfo');

	/*===============================================
    Плавный scroll к комментариям
  	===============================================*/
    $(document).on('click', '.star-ratings a', function(event) {
        event.preventDefault();
        var idHref = $(this).attr('href'),
            topHref = $(idHref).offset().top;
        $('body,html').animate({
            scrollTop: topHref - 5
        }, 800);
    });
	
	/*===============================================
    Price Counter
  	===============================================*/
    function counterPrice() {
        if ($('.finalSum').length) {
            $('.finalSum').each(function() {
                var container = $(this).closest('.js-oxProductForm');
                var finalSum = container.find('.priceDefault').html();
                var reg = new RegExp("[ ]+", "g");
                container.find('.finalSum').html(finalSum.split(',')[0] + '<span class="sup-price">' + finalSum.split(',')[1].replace(/\s/g, '') + '</span>');
            })
        }

        $('.js-oxProductForm input').each(function() {
            $(this).on('keyup change', function() {
                if (/\D/g.test(this.value)) {
                    this.value = this.value.replace(/\D/g, '');
                }
                $(this).closest('form').find('.hidden input[name="am"]').val(this.value);
                printSum($(this));
                printOldSum($(this));
            });
        });

        $('.js-oxProductForm .number.down').on('click', function() {
            var numberInput = $(this).parent().find('input');
            if ($(numberInput).val() > 1) {
                $(numberInput).val(+$(numberInput).val() - 1);
            }
            $(this).closest('.js-oxProductForm').find('.hidden input[name="am"]').val(numberInput.val());
            printSum($(this));
            printOldSum($(this));
        });

        $('.js-oxProductForm .number.up').on('click', function() {
            var numberInput = $(this).parent().find('input');
            $(numberInput).val(+$(numberInput).val() + 1);
            $(this).closest('.js-oxProductForm').find('.hidden input[name="am"]').val(numberInput.val());
            printSum($(this));
            printOldSum($(this));
        });

        function printSum(clickedObject) {
            var container = $(clickedObject).closest('.js-oxProductForm');
            var numberInput = container.find('input.textbox');
            if (container.find('.priceDefault').length) {
                var finalSum = (parseFloat(container.find('.priceDefault').html().replace(',', '.')) * +$(numberInput).val()).toFixed(2);
                var finalSumSup = finalSum.split('.')[1];
                if (finalSum.split('.')[1] == '00') {
                    finalSum = finalSum.split('.')[0];
                } else {
                    finalSum = finalSum.replace('.', ',');
                }
                container.find('.finalSum').html(finalSum.split(',')[0] + '<span class="sup-price">' + finalSumSup + '</span>');
            }
        }

        function printOldSum(clickedObject) {
            var container = $(clickedObject).closest('form');
            var numberInput = container.find('input.textbox');
            if ($('.oldPrice del').length) {
                var finalOldSum = (parseFloat($('.oldPrice del').data('oldprice').split(' €')[0].replace(',', '.')) * +$(numberInput).val()).toFixed(2);
                var finalOldSumSup = finalOldSum.split('.')[1];
                if (finalOldSum.split('.')[1] == '00') {
                    finalOldSum = finalOldSum.split('.')[0];
                } else {
                    finalOldSum = finalOldSum.replace('.', ',');
                }
                container.find('.oldPrice del').html(finalOldSum.split(',')[0] + ',' + finalOldSumSup + ' €');
            }
        }
    }
	
    counterPrice();

	/*===============================================
    Owl Carousel for Other Pictures
  	===============================================*/
    if ($('.owl-morePics img').length > 4) {
        if (window.matchMedia("(max-width: 991px)").matches) {
            var morePicsMargin = 5;
        } else {
            var morePicsMargin = 12;
        }
		
        var owlPics = $('.owl-morePics');
        owlPics.owlCarousel({
            loop: false,
            margin: morePicsMargin,
            nav: true,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsive: {
                0: {
                    items: 4
                },
                700: {
                    items: 4
                }
            }
        })
    }

	/*===============================================
    Делаем кватдратными Other Pictuers
  	===============================================*/
    function squareOtherPictures() {
		var heightOtherPicture = $('.otherPictures li a');
        if ($('.owl-morePics img').length > 4) {
            heightOtherPicture.height($('.owl-item').width());
        } else {
//            heightOtherPicture.height(heightOtherPicture.find('img').height() - 2);
//            heightOtherPicture.find('img').css('max-height', (heightOtherPicture.find('img').height() + 'px'));
			heightOtherPicture.height(heightOtherPicture.width());
            heightOtherPicture.find('img').css('max-height', (heightOtherPicture.width() + 'px'));
        }
        $('.otherPictures').css('opacity', '1');
    }
	
    squareOtherPictures();

	/*===============================================
    Profile - Fancybox popup
  	===============================================*/
    if (!isMobile.any()) {
        $('.top-row--profile').on('click', function() {
            $.fancybox.open({
                src: '.profile-box--container',
                type: 'inline',
                opts: {
                    focus: false
                }
            });
        });
    }

	/*===============================================
    Log In - Fancybox popup
  	===============================================*/
    if (!isMobile.any()) {
        $('.top-row--login').on('click', function() {
            $.fancybox.open({
                src: '.login-box--container',
                type: 'inline',
                opts: {
                    afterLoad: function() {
                        inputInt($('.form-group input, .form-group textarea'));
                    }
                }
            });
        });
    }

	/*===============================================
    Callback - Fancybox popup
  	===============================================*/
    if (!isMobile.any()) {
        $('.phone-col--callback').on('click', function() {
            $.fancybox.open({
                src: '.callback-box--container',
                type: 'inline',
                opts: {
                    afterLoad: function() {
                        inputInt($('.form-group input, .form-group textarea'));
                    }
                }
            });
        });
    }

	/*===============================================
    Настройка Sly Carousel
  	===============================================*/
    $('.sly-wrapper').each(function() {
        if (window.matchMedia("(max-width: 767px)").matches) {
            var productDataLength = 2;
        } else {
            if ($('body').hasClass('cl-start')) {
               var productDataLength = 4;
            } else {
               var productDataLength = 5;
            }
        }
		
        if ($(this).find('.productData').length < productDataLength) {
            $(this).find('.controls,.scrollbar').hide();
        }

        if (window.matchMedia("(min-width: 992px)").matches) {
            if ($(this).find('.category--type').length < 7) {
                $(this).closest('.subcatList').find('.controls,.scrollbar').hide();
            }
        }
    });

	/*===============================================
    Checkval form label
  	===============================================*/
    function inputInt(inputs) {
        var showClass = 'show';
        inputs.each(function() {
            $(this).on('checkval', function() {
                var label = $(this).parent().find('label');
				
                if (this.value !== '') {
                    label.addClass(showClass);
                    $(this).addClass(showClass);
                } else {
                    label.removeClass(showClass);
                    $(this).removeClass(showClass);
                }
				
            }).on('keyup', function() {
                $(this).trigger('checkval');
            });
        });
    }

	/*===============================================
    Callback form validation
  	===============================================*/
    $('.callback-box--container').find('form').submit(function(e) {
        var countField = $(this).find('.required');
        countField.each(function() {
            if (countField.val() !== '') {
                return true;
            }
            if (countField.val() === '') {
                $(this).parent().find('label').addClass('show').text('Pflichtfeld.').css('color', '#FF4139');
                setTimeout(function() {
                    $('label.show').text('Telefon').css('color', '#2e2e2e');
                }, 3000);
                e.preventDefault();
            }
        });
    });

	/*===============================================
    Magnify script initialize - Zoom
  	===============================================*/
    if (!isMobile.any()) {
        var $zoom = $('.zoom').magnify();
		
        $(document).on('click', '.otherPictures a', function() {
            $zoom.destroy();
            $zoom = $('.zoom').magnify();
        });
    }
	
	/*===============================================
    Галерея при клике на картинку товара - Fancybox
  	===============================================*/
    $(document).on('click', '#zoom1', function(e) {
        e.preventDefault();
        var fancyStart;
        if ($('.otherPictures').length) {
            var galleryObject = [];

            $('.otherPictures--container li a').each(function(i) {
                var productsImg = $(this).data('zoom-url');
                galleryObject[i] = {
                    src: productsImg,
                    opts: {
                    }
                }
                if ($(this).hasClass('selected')) {
                    fancyStart = i;
                }
            });

            $.fancybox.open(
                galleryObject, {
                    loop: true
                });
			
            $.fancybox.getInstance().jumpTo(fancyStart);
        } else {
            fancyStart = $('#zoom1').attr('href');
            $.fancybox.open({
                src: fancyStart,
                type: 'image',
                opts: {
                    focus: false
                }
            });
        }
    });

	/*===============================================
    Вызов Fancybox при отправки формы Callback
  	===============================================*/
    function get(name) {
        if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }
    if (get('emaildone'))
        showModal();
    if (get('orderdone'))
        showModalOrder();

    function showModal() {
        $.fancybox.open({
            src: '<div style="display: inline-block; background: #fff; max-width: 420px; width: 100%;"><div style="width: 100%; max-width: 420px; "><div style="text-align: center;">Danke! Wir werden uns in Kürze mit Ihnen in Verbindung setzen!</div></div><button data-fancybox-close="" class="fancybox-close-small"></button></div>',
            type: 'inline',
            opts: {
                focus: false
            }
        });
        setTimeout(function() {
            $.fancybox.close();
        }, 7000);
    }

	/*===============================================
    Скрываем список категорий на странице Thankyou
  	===============================================*/
    if ($('body').hasClass('cl-thankyou')) {
        $('.nav-row--nav-toggle').addClass('nav-row--nav-toggle-clickable');
        $('.nav-row--category-list').hide();
    }

	/*===============================================
    Меняем .png на .svg в Paypal
   	===============================================*/
    var paypalInput = $('input[name="paypalExpressCheckoutButton"]');
    if (paypalInput.length) {
        var paypalImg =paypalInput.attr('src').replace('.png', '.svg');
        paypalInput.attr('src', paypalImg);
        paypalInput.parent().css('opacity', '1');
    }
	
	/*===============================================
    При клике на вариант товара отправка формы 
  	===============================================*/
    $(document).on('click', '.selectVariantPopup a', function(e) {
        e.preventDefault();
        var targetId = $(this).closest('.selectVariantPopup--container').attr('data-target-id');
        var varId = $(this).attr('data-selection-id');
        $('body').find('#detailsMain a[data-selection-id="'+varId+'"]').trigger('click');
        if (targetId === 'toBasket') {
            $('body').addClass('add-variation-to-cart');
        }
        if (targetId === 'paypalVarintOverlay') {
            $('body').addClass('add-variation-to-paypal');
        }
        
        $.fancybox.close();
    });

	/*===============================================
    Варианты товаров Fancybox если есть варанты
  	===============================================*/
    if ($('#variants').length) {

        // $('#detailsMain #paypalExpressCheckoutDetailsButton').removeAttr('disabled');
		
        $(document).on('click', '#toBasket, #paypalVarintOverlay', function() {
            if ($('input[name="varselid[0]"]').val() == "") { 
                var currentId = $(this).attr('id');
                var selectVariant = $('.variant-label').html() + '<ul>' + $('#variants .vardrop').html() + '</ul>';
                $.fancybox.open({
                        src: '<div class="selectVariantPopup--container" data-target-id="' + currentId + '"><div class="selectVariantPopup--container-inner"><div class="selectVariantPopup">' + selectVariant + '</div></div><button data-fancybox-close="" class="fancybox-close-small"></button></div>',
                        type: 'inline',
                        opts: {
                            focus: false
                        }
                });
            }
        });
    }
	
	/*===============================================
    В Select, "Германия" на 1-е место ставим
  	===============================================*/
    if ($('#invCountrySelect').length) {
        	$('#invCountrySelect').parent().find('.dropdown-menu li[data-original-index="1"]').before($('.dropdown-menu li[data-original-index="46"]'));
		if ($('.dropdown-menu li.selected')) {
			$('.dropdown-menu li[data-original-index="46"]:first').next().remove();
		}
	}
	
	/*===============================================
    Google Analitics Click
  	===============================================*/	
	function cartAjaxClick() {
		$(document).on('click', '.cart-ajax', function() {
			ga('send', 'event', 'In den Warenkorb', 'Add to cart');
		}); 
		
		$(document).on('click', '#userNextStepTop, #userNextStepBottom, #paymentStep', function() {
			ga('send', 'event', 'Button', 'Zum Zahlungsart');
		}); 
		
		$(document).on('click', '#paymentNextStepBottom, #orderStep', function() {
			ga('send', 'event', 'Button', 'Überprüfen');
		}); 
		
		$(document).on('click', '#orderConfirmAgbBottom .submitButton', function() {
			ga('send', 'event', 'Button', 'Bestellung abgeschlossen');
		});
		
		$('input[name="paymentid"]').each(function() {
			$(this).on('click', function() {
				var paymentName = $(this).attr('id');
				
				if (paymentName === "payment_oxidpaypal") {
					ga('send', 'event', 'Payment Methods', 'PayPal');
					
				} else if (paymentName === "payment_trosofortgateway_su") {
					ga('send', 'event', 'Payment Methods', 'SOFORTÜberweisung');
					
				} else if (paymentName === "payment_oxidcashondel") {
					ga('send', 'event', 'Payment Methods', 'Nachnahme');
					
				} else if (paymentName === "payment_klarna_part") {
					ga('send', 'event', 'Payment Methods', 'Ratenkauf');
					
				} else if (paymentName === "payment_klarna_invoice") {
					ga('send', 'event', 'Payment Methods', 'Rechnung');
				} else {
					ga('send', 'event', 'Payment Methods', 'Vorauskasse');
				}
			});
		});
	}
	
	cartAjaxClick();

	/*===============================================
    Submit reviews to Email
  	===============================================*/
	$(document).on('click', '#reviewSave', function(e) {
		e.preventDefault();
		if ($('textarea[name="rvw_txt"]').val() !== '') {
			var title = '&titleProduct=' + $('#productTitle').text();
			var article = '&articleProduct=' + $('.details--top-info .small.text-muted').text();
			var email = '&emailUser=' + $('input[name="emailUser"]').val();
			var URL = 'https://www.kaufbei.tv/comments.php?' + $('#rating').serialize() + title + article + email;
			$.ajax({
				url: URL,
				type: 'get',
				dataType: 'html',
				success: function(data) {	
					$('#rating').submit();
				}
        	});
		} else{
			$('textarea[name="rvw_txt"]').focus();
		}
	});
		
		
	/*===============================================
    Search Ajax
  	===============================================*/
	if (window.location.href === 'https://www.kaufbei.tv/AGB/') {
		
//		$('#searchParam').keyup(function() {
//			var search = this.value;
//			var URL = $(this).closest('form').attr('action') + $(this).closest('form').serialize();
//			console.log(URL);
//			if(search.length > 2) {
//				$.ajax({
//					url: URL,
//					type: 'post',
//					dataType: 'html',
//					success: function(data){
//						var $response = $(data);
////						$(".search_result").html(data).fadeIn();
//						console.log($response.find('.service-menu-box').html());
//						$('.ui-autocomplete').fadeIn();
//						$('form.search').find('.form-control').css('border-radius', '20px 20px 0 0');
//						
//						
//				   }
//			   })
//			} else{
//				$('.ui-autocomplete').fadeOut();
//				$('form.search').find('.form-control').css('border-radius', '20px');
//						
//			}
//		});
		
	}
	
		
//	$('.ui-autocomplete').wrap('<div class="search--result"></div>');

	$('form.search').after($('.ui-autocomplete'));
	$('.ui-autocomplete').width($('form.search .form-control').width()+24);
	$('.ui-autocomplete').css('max-width', $('form.search .form-control').width()+24);
		
	if ($('.ui-autocomplete').is(':visible')) {
		 $('form.search').find('.form-control').css('border-radius', '20px 20px 0 0');
	} else {
		$('form.search').find('.form-control').css('border-radius', '20px');
	}
		
	$(document).on('click', '.search--result-f-all', function() {
		$('.form.search').submit();
	});
		
		
	if (window.location.href === 'https://www.kaufbei.tv/index.php?news=1') {
		$('#newsBox').show();
	}
	
}); // End Document