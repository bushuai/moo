$(function() {
    // back to top
    $('#top').click(function() {
        $('body,html').animate({
            'scrollTop': 0
        }, 300)
    })

    $('.fa-heart').click(function() {
        $(this).toggleClass('liked')
    })

  

    $('.main').width($('html,body').width()).height($('html,body').height())

   


})
