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

    //for user profile toggle 
    var profileMenu = $('.profile-menu')

    $('.menu-item').has('ul').hover(function() {
        profileMenu.toggle()
    })

    //for dashboard
    $('.note').click(function() {
        $('.editor-note').show()
    })

    $('.travel').click(function() {
        $('.editor-travel').show()
    })

    $('.editor-close').click(function() {
        $(this).closest('.editor-container').hide()
    })


    $('.main').width($('html,body').width()).height($('html,body').height())

   


})
