$(document).ready(function() {

    if (navigator.appVersion.indexOf("MSIE 8.") != -1) {
        alert('You are using an old version of Internet Explorer. Official support for this version is scheduled to end on Jan 12, 2016. However lots of issues arise from using outdated software such as rendering and security. For this reason we suggest you try out Chrome or Firefox. Thank you!');
    }

    $('.footer').hide();

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('.nav').css('top', Math.max(0, $('.banner').height() - $(this).scrollTop()));
        }
        else {
            $('.nav').css('top', $('.banner').height());
        }
    });

    $(window).scroll(function() {
        if($(this).scrollTop() >= $('.banner').height()) {
            $('.footer').fadeIn();
        }
        else {
            $('.footer').fadeOut();
        }
    });

    $(window).resize(function() {
        if ($(this).scrollTop() > 0) {
            $('.nav').css('top', Math.max(0, $('.banner').height() - $(this).scrollTop()));
        }
        else {
            $('.nav').css('top', $('.banner').height());
        }
    });

    if (window.location.pathname === '/next') {
        $('a[href="/start"]').parent('li').addClass('pure-menu-selected');
    }
    else {
        $('a[href="' + window.location.pathname + '"]').parent('li').addClass('pure-menu-selected');
    }

    $('#submit').click(function() {
        $(this).addClass('pure-button-disabled');
    });

    var form = $('#questions');
    form.submit(function(ev) {
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function(data) {
                $('input:checked').parent('p').css('color', 'red');

                for (var i = 0; i < data.length; ++i) {
                    $('input[value=' + data[i] + ']').parent('p').css('color', '#33CC00');
                }

                $('#submit').replaceWith('<a class="pure-button" href="/next">next</a>');
            }
        });

        ev.preventDefault();


    });
});
