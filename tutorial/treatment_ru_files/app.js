var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

var lock_hd = false;
var number_we_speak = 0;
time_we_speak = 500;
play_we_speak = setInterval("ch_we_speak()", 5000);
allow_animate = true;

function ch_we_speak() {
    if (allow_animate) {
        $('.we_speak li:eq(' + number_we_speak + ')').fadeOut(time_we_speak, function () {
            number_we_speak++;
            if (number_we_speak == 5) number_we_speak = 0;
            $('.we_speak li:eq(' + number_we_speak + ')').fadeIn(time_we_speak);
            $('.we_speak li:eq(' + (number_we_speak - 1) + ')').css('display', 'none');
        });
    }

}

$(document).ready(function () {

    /**
     * Changges up and down btn styles on scroll on clinics search pages
     */

    $('#scroll_down').on('click', function () {
        if ($('.section').length) {
            scrolling.scrolledDown('.section', -50);
        }
        else {
            if ($(".s_also").length) {
                scrolling.scroll(".s_also", '.clinic-card', -60);
            }
            else {
                if ($("#topMiniSearch").length) {
                    scrolling.scroll("#topMiniSearch", '.clinic-card', -65);
                }
                else {
                    scrolling.scrolledDown('.scroll', -77);
                }
            }
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() == 0) {
            $('.info-fixed-btns').removeClass('animate-text-descr');
        }
        else {
            $('.info-fixed-btns').addClass('animate-text-descr');
        }
        if ($('#scroll_up').length && $('#scroll_down').length) {
            if ($(document).height() < ($(window).scrollTop() + $(window).height() + 200)) {
                $('#scroll_down').hide();
                $('#scroll_up').show();
            }
            else {
                $('#scroll_down').show();
                $('#scroll_up').hide();
            }
        }
    });

    /**
     * Implements functions for scrolling
     *
     * @type {{scrolledDown: scrolling.scrolledDown, scroll: scrolling.scroll}}
     */
    var scrolling = {
        /**
         * Scrolls window to next element
         *
         * @param el
         * @param delta  - deference betwean menu and top
         */
        scrolledDown: function (el, delta) {
            var sections = [];
            $(el).each(function (i) {
                sections[i] = parseInt(Math.round($(this).offset().top + delta));
            });
            var scrolled = false;
            sections.forEach(function (top) {
                if (parseInt($(window).scrollTop()) + 2 <= top && !scrolled) {  // +1 used if user on current block he will go to next block
                    $('html,body').animate({
                            scrollTop: top
                        },
                        'slow');
                    scrolled = true;
                }
            })
        },

        /**
         * Checks for search menu and if it exist then scroll to menu at first and
         * after menu scroll to other elements
         *
         * @param el
         * @param delta
         */
        scroll: function (menu, el, delta) {
            if ($(window).scrollTop() + 2 <= ($(menu).offset().top - 133)) {
                $('html,body').animate({
                        scrollTop: $(menu).offset().top - 133
                    },
                    'slow');
            }
            else {
                this.scrolledDown(el, delta);
            }
        }


    };

    /**
     * Shows scroll down on clicking for loading more clinics
     */
    $('.more_search_programms button').on('click', function () {
        $('#scroll_down').show();
        $('#scroll_up').hide();
    });

    $('#scroll_up').on('click', function () {
        $('html,body').animate({
                scrollTop: 0
            },
            'slow', function () {
                $('#scroll_down').show();
            });
        $(this).hide();
    });

    /**
     * End scroll block
     */


    $.material.init();


    $('.lazy').lazyload({
        //  threshold: 200
    });

    if (window.location.href.indexOf('#orderModal') != -1) {
        $('#orderModal').modal('show');
    }


    $('#orderModal').on('shown.bs.modal', function () {
        if (env_t == 'xs' || env_t == 'sm') { // для моб
            var p_id = '';

            var phtm = parseInt($('.prid').html());
            if (phtm != 0 && isNaN(phtm) == false) {
                p_id = '/' + phtm + '?program_id=' + phtm;
            }

            window.location.href = 'https://' + document.URL.split('/')[2].split(':')[0] + '/order' + p_id;
        } else {
            // аватарка менеджера
            var w = $('#consultant_avatar').width();
            $('#consultant_avatar').css('left', -w - 23 + 'px');
            $('#consultant_avatar').fadeIn('fast');
        }

    });

    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();


    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    // Active Carousel
    $('.carousel').carousel({
        interval: 400000
    });


    if ($(document).scrollTop() > 120) {
        if (transparent) {
            transparent = false;
            $('.navbar-color-on-scroll').removeClass('navbar-transparent');
        }
    } else {
        if (!transparent) {
            transparent = true;
            $('.navbar-color-on-scroll').addClass('navbar-transparent');
        }
    }

    $('.selectpicker').selectpicker();

    setTimeout(function () {


        $.post("/index.php?ajax=setCountryPhone",
            function (data) {
                if (data.status == 'ok') {

                    if (data.num != '') {
                        $('.c-fn').html(data.num);
                    }

                }
            }, "json");

    }, 2000);


    $(".we_speak").hover(
        function () {
            allow_animate = false;
            $('.we_speak li').finish();

            $(this).addClass("we_speak_hover");

            $(this).find('li').show();
        }, function () {
            allow_animate = true;
            $(this).removeClass("we_speak_hover");

            $(this).find('li').not(":first").hide();
            number_we_speak = 0;
        }
    );

    setMoneyFormat();
    setNumberFormat();

    setDatePickers();

    setLangMenu();
    setCurrencyMenu();

    $('.dropdown-menu').find('.form-group').click(function (e) {
        e.stopPropagation();
    });

    // в форме запроса
    $('input[type=radio][name=who_need_treatment]').change(function () {
        if (this.value == '1') {
            $('.cont-person').hide();
            $('.not-cont-person').show();
        } else {
            $('.cont-person').show();
            $('.not-cont-person').hide();
        }

    });

    $("#smart_search").autocomplete({
        source: "/index.php?ajax=smartSearch",
        minLength: 0,
        select: function (event, ui) {
            if (ui.item.url !== '') {
                location.href = ui.item.url;
            }
            if (ui.item.type == 'countries') {
                location.href = '/clinics/treatment/all/' + ui.item.alt_name + '/';
            }
            if (ui.item.type == 'cities') {
                location.href = '/clinics/treatment/all/' + ui.item.alt_country_name + '/' + ui.item.alt_name + '/';
            }

            $('#s_s_alt_name').val(ui.item.alt_name);
            $('#s_s_type').val(ui.item.type);


        }
    }).focus(function () {
        $(this).autocomplete("search", $(this).val());
    }).autocomplete("widget").addClass("sm_search");


    // сворачивлака
    $('.show_or_hide_closed').append(' <i class="material-icons">keyboard_arrow_down</i>');
    $('.show_or_hide_opened').append(' <i class="material-icons">keyboard_arrow_up</i>');

    $('.show_or_hide').click(function () {
        if ($(this).hasClass('show_or_hide_closed')) { // если свернуто

            $(this).prev('.show_or_hide_hidden').toggleClass('show_or_hide_hidden show_or_hide_not_hidden');
            $(this).find('.material-icons').html('keyboard_arrow_up');
            $(this).toggleClass('show_or_hide_closed show_or_hide_opened');

        } else {// если открыто
            $(this).prev('.show_or_hide_not_hidden').toggleClass('show_or_hide_not_hidden show_or_hide_hidden');
            $(this).find('.material-icons').html('keyboard_arrow_down');
            $(this).toggleClass('show_or_hide_opened show_or_hide_closed');
        }
    });


    $["ui"]["autocomplete"].prototype["_renderItem"] = function (ul, item) {
        return $("<li></li>")
            .data("item.autocomplete", item)
            .append($("<a></a>").html(item.label))
            .appendTo(ul);
    };

    // hold onto the drop down menu
    var dropdownMenu;

    // and when you show it, move it to the body
    $(window).on('show.bs.dropdown', function (e) {

        if ($(e.target).find('.multi-level ').length == 0) {
            dropdownMenu = $(e.target).find('.dropdown-menu');
        } else {
            dropdownMenu = $(e.target).find('.dropdown-menu').first();
        }

        if ($(e.target).hasClass('dropdown-submenu')) {
            return false
        }


        // detach it and append it to the body
        $('body').append(dropdownMenu.detach());

        // grab the new offset position
        var eOffset = $(e.target).offset();

        // make sure to place it where it would normally go (this could be improved)
        dropdownMenu.css({
            'width': $(e.target).width(),
            'display': 'block',
            'top': eOffset.top + $(e.target).outerHeight(),
            'left': eOffset.left
        });

    });

    // and when you hide it, reattach the drop down, and hide it normally
    $(window).on('hide.bs.dropdown', function (e) {
        $(e.target).append(dropdownMenu.detach());
        dropdownMenu.hide();
    });


    $('#multModal').on('hidden.bs.modal', function () {
        // stop mult
        $('#mm_frame')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');

    });


    if (document.getElementById('fdb_file-uploader')) {

        var totaladded = 0;
        var totaluploaded = 0;

        var uploader = new qq.FileUploader({
            element: document.getElementById('fdb_file-uploader'),
            action: '/index.php?ajax=uploadToRequest',
            maxConnections: 1,
            encoding: 'multipart',


            params: {"subaction": "upload"},
            template: '<div class="qq-uploader">' +
            '<div class="qq-upload-drop-area"><span>Drag files here to start uploading</span></div>' +
            '<div class="qq-upload-button" style="width: auto;"><i class="material-icons" style="position: relative; top: 7px">attach_file</i><span style="text-decoration: underline">Прикрепить файлы</span></div>' +
            '<ul class="qq-upload-list" style="display:none;"></ul>' +
            '</div>',
            onSubmit: function (id, fileName) {

                totaladded++;

                $('<div id="fdb_uploadfile-' + id + '" class="file-box"><span class="qq-upload-file">Загруженные: &nbsp;' + fileName + '</span><span class="qq-status"><span class="qq-upload-spinner"></span><span class="qq-upload-size"></span></span></div>').appendTo('#fdb_file-uploader');

            },
            onProgress: function (id, fileName, loaded, total) {
                $('#fdb_uploadfile-' + id + ' .qq-upload-size').text(uploader._formatSize(loaded) + ' of ' + uploader._formatSize(total));
            },
            onComplete: function (id, fileName, response) {
                totaluploaded++;
                if (response.success) {

                    $('#fdb_uploadfile-' + id + ' .qq-status').html(' Successfully completed');

                    var fls = '';
                    if ($('#files').val() != '') {
                        fls = $('#files').val() + '<br/>' + response.path;
                    } else {
                        fls = response.path;
                    }

                    $('#files').val(fls);

                } else {

                    $('#fdb_uploadfile-' + id + ' .qq-status').html('failed');

                    if (response.error) $('#fdb_uploadfile-' + id + ' .qq-status').append('<br /><font color="red">' + response.error + '</font>');

                    setTimeout(function () {
                        $('#fdb_uploadfile-' + id).fadeOut('slow');
                    }, 4000);
                }
            },
            debug: false
        });
    }

});

materialKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > 120) {
            if (transparent) {
                transparent = false;
                $('.navbar-color-on-scroll').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar-color-on-scroll').addClass('navbar-transparent');
            }
        }
    }, 17),


}


var big_image;

materialKitDemo = {
    checkScrollForParallax: debounce(function () {

        if ($(window).width() >= 768) {
            var current_scroll = $(this).scrollTop();

            oVal = ($(window).scrollTop() / 3);
            big_image.css({
                'transform': 'translate3d(0,' + oVal + 'px,0)',
                '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
                '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
                '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
            });
        }


    }, 6)
}
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};


function setDatePickers() {

    $('body').on('click', '.datepicker.normal', function () { // обычный календарь
        $(this).datepicker('destroy').datepicker({

            showOn: 'focus',
            changeMonth: true,
            changeYear: true,
            yearRange: '1947:2015',
            beforeShow: function (input, inst) { // добавляем свой  класс
                $('#ui-datepicker-div').removeClass(function () {
                    return $('input').get(0).id;
                });
                $('#ui-datepicker-div').addClass('short-calendar');
            }
        }).focus();
    }); // потому что теперь можно подключать динамические поля datetpicker


    $('body').on('click', '.datepicker:not(.normal)', function () {
        var from = 3;

        if ($(this).hasClass('dependent')) {
            from = $(this).parent().parent().find('.main').val();
        }

        $(this).datepicker('destroy').datepicker({
            showOn: 'focus',
            numberOfMonths: 3,
            beforeShowDay: noWeekendsOrHolidays,

            minDate: from,

            onSelect: function (date) { // присваиваем дату "до", если она меньше чем "от"
                var to = $(this).parent().parent().find('.dependent').val();

                // устанавливаем куки
                if ($(this).hasClass('main')) {
                    $.cookie('date_from', date, {expires: 20, path: '/'});
                }

                if ($(this).hasClass('sub_main')) {
                    $.cookie('date_to', date, {expires: 20, path: '/'});
                }


                if ($(this).hasClass('main') && to != '' && typeof to !== 'undefined') {


                    var d1 = $(this).datepicker('getDate');
                    var d2 = $(this).parent().parent().find('.dependent').datepicker('getDate');
                    var diff = 0;
                    if (d1 && d2) {
                        diff = Math.floor((d2.getTime() - d1.getTime()) / 86400000); // ms per day
                    }

                    if (diff < 0) {
                        $(this).parent().parent().find('.dependent').val(date);
                    }
                }

                // additional handler for calc. programm
                if (typeof calcChange == 'function') {
                    calcChange($(this));
                }
            },
        }).focus();


        function nationalDays(date) {
            var natDays = [
                [1, 1, 'au'],
                [1, 6, 'au2'],

                [5, 1, 'ar'],

                [6, 6, 'se'],

                [8, 8, 'id'],
                [8, 15, 'id2'],

                [10, 3, 'cn'],
                [10, 31, 'cn2'],

                [11, 1, 'lb'],
                [11, 23, 'lb2'],

                [12, 25, 'ke'],
                [12, 26, 'ke2']
            ];
            for (i = 0; i < natDays.length; i++) {
                if (date.getMonth() == natDays[i][0] - 1
                    && date.getDate() == natDays[i][1]) {
                    return [false, natDays[i][2] + '_day'];
                }
            }
            return [true, ''];
        }

        function noWeekendsOrHolidays(date) {
            var noWeekend = $.datepicker.noWeekends(date);
            if (noWeekend[0]) {
                return nationalDays(date);
            } else {

                return noWeekend;
            }
        }


    });

}

function setLangMenu() {
    var allow_lang = {
        'bookinghealth.com': 'English',
        // 'bookinghealth.ru': 'Русский',
        //'#de': 'Deutsch',
        'bookinghealth.cn': '中文',
        'bookinghealth.ae': 'العربية'

    };

    var newUrl = $(location).attr('pathname');

    var menu = '';
    $.each(allow_lang, function (index, value) {
        menu += '<a href="https://' + index + newUrl + '"><b>' + value + '</b></a>';
    });

    $('.langSelect').html(menu);

}

var allow_currency = {
    'EUR': '€',
    'USD': '$',
    'RUB': 'руб.',
    'KZT': '₸',
    'UAH': '₴',
    'INR': '₹',
    'CNY': '¥',
    'AED': 'د.إ',
    'SAR': '﷼',
};


function setCurrencyMenu() {
    var menu = '';

    if (typeof $.cookie('currency') !== 'undefined') {
        menu += '<a href="#"  data-target="#currencyMenuModal" data-toggle="modal" ><b>' + $.cookie('currency') + ' - ' + allow_currency[$.cookie('currency')] + '</b></a>';
    } else {
        menu += '<a href="#" data-target="#currencyMenuModal" data-toggle="modal"><b>EUR - €</b></a>';
    }

    $('.currencySelect').html(menu);

    $('#ulCurr').html('');
    $.each(allow_currency, function (index, value) {
        $('#ulCurr').append('<li><span onclick="changeCurrency(\'' + index + '\')" class="pseudo"> ' + index + ' - ' + value + '</span></li>');
    });
}
function changeCurrency(cur) {
    $('.modal').modal('hide');
    $.cookie('currency', cur, {expires: 20, path: '/'});
    setMoneyFormat();
    setCurrencyMenu();
}
function formatDate(dateString) {
    if (dateString !== null && dateString !== undefined) {
        // Convert from 'yyyy-mm-dd hh:mm:ss'
        return dateString.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1').split(" ")[0];
    }
};

function format_by_count(count, form1, form2, form3) {
    form1 = form1 || lang.day;
    form2 = form2 || lang.days1;
    form3 = form3 || lang.days2;

    count = Math.abs(parseInt(count)) % 100;
    lcount = count % 10;
    if (count >= 11 && count <= 19) return (form3);
    if (lcount >= 2 && lcount <= 4) return (form2);
    if (lcount == 1) return (form1);
    return form3;
}


$().ready(function () {
    //materialKit.initSliders();
    $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);

    window_width = $(window).width();

    if (window_width >= 768) {
        big_image = $('.wrapper > .header ');

        if ($("#startSearch").length) { // если на главной
            big_image = $('.wrapper > .header, .ui-autocomplete ');
        }
        $(window).on('scroll', materialKitDemo.checkScrollForParallax);
    }

    var request_step = 1;
    $('#request_next').click(function () {
        request_step++;
        $('.request_step').hide();

        $('.request_inner_' + request_step).show();

        $('#request_send').hide();
        if (request_step > 1) {
            $('#request_prev').show();
        } else {
            $('#request_prev').hide();
        }

        if (request_step > 2) {
            $('#request_next').hide();
            $('#request_send').show();
        } else {
            $('#request_next').show();
        }
        $('.progress-bar').css('width', request_step * 33.333 + '%');
    });

    $('#request_prev').click(function () {
        request_step--;
        $('.request_step').hide();

        $('.request_inner_' + request_step).show();

        $('#request_send').hide();
        if (request_step > 2) {
            $('#request_next').hide();
            $('#request_send').show();
        } else {
            $('#request_next').show();
        }

        if (request_step > 1) {
            $('#request_prev').show();
        } else {
            $('#request_prev').hide();
        }

        $('.progress-bar').css('width', request_step * 33.333 + '%');
    });


    showOrHideCallToDoctor();

    $("input").focus(function () {
        lock_hd = true;
        $('.bMenuMob').fadeOut('fast');
    }).focusout(function () {
        lock_hd = false;
        showOrHideCallToDoctor();

    });

    $('.t_t_more').click(function () {
        $('.text-description-content, .text-description-content').toggleClass('box-hide');
        $('.t_t_more').toggle();
    });


    $(".am-menu li").click(function () {
        $(this).toggleClass('active_menu');
    });


    $(".am-menu").menuAim({
        activate: activateSubmenu,
        deactivate: deactivateSubmenu
    });

    function activateSubmenu(row) {

        var $row = $(row),

            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId),
            width = $row.outerWidth();

        if ($(window).width() <= $row.offset().left + $row.width() + 300) {
            width -= ($row.width() + 265);
        }


        // Show the submenu
        $submenu.css({
            display: "block",
            top: -1,
            left: width - 3
        });

        $row.find(".m-a-top").addClass("maintainHover");
    }

    function deactivateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId);

        $submenu.css("display", "none");
        $row.find(".m-a-top").removeClass("maintainHover");
    }


    $(".am-menu li").click(function (e) {
        e.stopPropagation();
    });


    $(window).on('show.bs.dropdown', function (e) {
        if ($(e.target).find('.am-menu').length != 0) {
            $('html').append('<div class="modal-backdrop ma-back fade in"></div>');
        }
    });
    $(window).on('hide.bs.dropdown', function (e) {
        $('.ma-back').remove();
    });
});


/**
 * Implements mobile am_menu interface
 *
 * Class MobileMenu
 *
 * @param menu string
 * @param submenu string
 */
function MobileMenu(menu, submenu) {
    this.menu = menu;
    this.submenu = submenu;

    $(this.menu).on('click', function () {
        $(this).parent().toggleClass('active_menu');
    });
}

/**
 * Removing bootstrap menu and adding own mobile menu
 *
 * @param string menu
 * @param string submenu
 */
MobileMenu.prototype.addMenu = function () {
    if ($('.modal-backdrop').length != 0) {
        $('.modal-backdrop').click();
    }
    $(this.submenu).removeAttr('style');
    if ($(this.submenu).parent().hasClass('active_menu')) {
        $(this.submenu).parent().removeClass('active_menu')
    }

    if ($(this.submenu).hasClass('dropdown-menu')) {
        $(this.submenu).removeClass('dropdown-menu');
        $(this.submenu).addClass('am-dropdown-menu');
    }
    if ($(this.menu).attr('data-toggle')) {
        $(this.menu).removeAttr('data-toggle');
    }
};

/**
 * Returns bootstrap menu and removes own mobile menu
 *
 * @param string menu
 * @param string submenu
 */
MobileMenu.prototype.removeMenu = function () {
    $(this.submenu).addClass('dropdown-menu');
    $(this.menu).attr('data-toggle', 'dropdown');
    if ($(this.submenu).hasClass('am-dropdown-menu')) {
        $(this.submenu).removeClass('am-dropdown-menu');
    }
};

function showOrHideCallToDoctor() {
    window.onscroll = function () {
        if (window.innerWidth <= 992) {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled > 300) {
                if (!lock_hd) {
                    $('.bMenuMob').fadeIn('fast');
                }
            } else {
                $('.bMenuMob').fadeOut('fast');
            }

        }
    }
}
function getUrlParameter(sParam) {
    var sPageURL = window.location.href.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function diff_dates(date1, date2) {


    var a = $.datepicker.parseDate("dd.mm.yy", date1).getTime(),
        b = $.datepicker.parseDate("dd.mm.yy", date2).getTime(),
        c = 24 * 60 * 60 * 1000,
        diffDays = Math.round((b - a) / (c));

    return diffDays;
}


function doFavorites(a, b, c) {
    //ShowLoading("");
    $.get(dle_root + "/index.php?ajax=favorites", {fav_id: a, action: b, skin: dle_skin, alert: c}, function (b) {
        // HideLoading("");
        c ? XLEalert(b, xle_info) : $("#fav-id-" + a).html(b)
    });
    return !1
}


function setMoneyFormat() {

    var selected_f_rate = 1;
    var sufix = '€'

    //console.log(allow_currency);
    if (typeof $.cookie('currency') !== 'undefined' && $.cookie('currency') != 'EUR') {
        selected_f_rate = f_rates[$.cookie('currency')];

        sufix = allow_currency[$.cookie('currency')];
    }


    sufix = '&nbsp;<span class="pseudo"  data-target="#currencyMenuModal" data-toggle="modal">' + sufix + '</span>';


    $(".money_format").not('.freezed').each(function () {

        var euro_price;

        if ($(this).attr('content') !== undefined) { // реальная цена в евро
            euro_price = $(this).attr('content');

        } else {
            var tmp = $(this).html().replace(",", ".");

            matchesCount = tmp.split(".").length - 1;

            if (matchesCount > 1) {
                var parts = tmp.split('.');
                tmp = parts.slice(0, -1).join('') + '.' + parts.slice(-1);
            }

            var val = parseFloat(tmp);

            $(this).attr('content', val);

            euro_price = val;
        }


        var val = euro_price * selected_f_rate;

        if ((val != 0 && isNaN(val) == false) || $(this).hasClass('can_be_null')) {
            $(this).html(accounting.formatMoney(val, sufix));

            //  if($( this).attr('itemprop') !== undefined){
            //      $( this ).html($( this ).html().replace('€','')).after('<span itemprop="priceCurrency" content="EUR">€</span>');
            //   }

        } else {
            $(this).html(lang.on_request);
        }

        if ($(this).hasClass('freeze')) {
            $(this).addClass('freezed').removeClass('freeze');
        }
    });
};


function setNumberFormat() {

    $(".number_format").not('.freezed').each(function () {
        $(this).html($(this).html().replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? " " + c : c;
        }));
    });
};


function sendOrder() {
    var postData = $("#requestRForm").serialize();

    if (document.getElementById('main_c_form')) { // если есть калькулятор, то это заказ
        postData += '&' + $("#main_c_form").serialize();

    }


    if ($("#requestRForm").valid()) {
        yaCounter33016854.reachGoal('/thankyou');
        ga('send', 'pageview', '/virtual/thankyou');

        ga('send', 'event', 'mail1', 'send1');

        $('#request_send').attr('disabled', true);

        $.post("/index.php?ajax=fastorder",
            postData + '&url=' + window.location.href,
            function (data) {


                $('.thx').show();
                $('.h_o_s').hide();

            }, "json").success(function () {
            fbq('track', 'Lead');
        });
    } else {
        alert('Please correct your form data');
    }
}

var env_t = findBootstrapEnvironment();

function findBootstrapEnvironment() {
    var envs = ['xs', 'sm', 'md', 'lg'];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
        var env = envs[i];

        $el.addClass('hidden-' + env);
        if ($el.is(':hidden')) {
            $el.remove();
            return env;
        }
    }
}


// язык
var lang = {};
lang.on_request = 'По запросу';
lang.show = 'показать';
lang.hide = 'скрыть';
lang.big_text = 'Selected area is too large text';
lang.n_s_s = 'Notification sent successfully';
lang.is_ambulant = 'Амбулаторно ';
lang.is_stationary = 'Стационарно ';
lang.h_more = 'Больше';
lang.h_less = '<i>Меньше</i>';
lang.processing = 'Обработка...';
lang.add_to_selected = '  Add to favorites';
lang.remove_from_selected = '  Added to favorites';
lang.selected = 'Favorites <span class="favoritesCount"></span>';
lang.fill_fields = 'Пожалуйста, заполните поля';
lang.a_s_clinic = 'Услуги клиники:';
lang.hours = 'часов';
lang.pages = 'Станиц';
lang.day = 'день';
lang.days1 = 'дня';
lang.days2 = 'дней';
