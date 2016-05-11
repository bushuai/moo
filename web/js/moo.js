$(function() {
    // back to top
    $('#top').click(function() {
        $('body,html').animate({
            'scrollTop': 0
        }, 300)
    })
    $('.main').width($('html,body').width()).height($('html,body').height())
})
