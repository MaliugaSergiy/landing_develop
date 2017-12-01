$(document).ready(function(){
	  $('.tabs-link[href^="#"]').click(function(){
    	//console.log(1);
        if ($('.tabs-link')!=$(this)) {
            $('.tabs-link').removeClass('selected');
        }
        $(this).addClass('selected');
        var target = $(this).attr('href');
        // $('html, body').animate({scrollTop: $(target).offset().top}, 800);
        $('.tab-it').removeClass('selected');
        $(target).addClass('selected');
        return false;
    });
    function hash_change(event)
    {
        var hash = document.location.hash;
        $('.tabs-link[href^="'+hash+'"]').click();
    }
    if ($('.tabs-link[href^="#"]').length>0) {
        hash_change();
    }
	/**************swipe menu***************/
jQuery('body').click(function(){
	if(jQuery(this).parents('body').hasClass('ind')){
		jQuery(this).parents('body').removeClass('ind');
		return false
	}
	})
	jQuery('.swipe-control').click(function(){
		if(jQuery(this).parents('body').hasClass('ind')){
		jQuery(this).parents('body').removeClass('ind');
		return false
	}
	else{
		jQuery(this).parents('body').addClass('ind');
		return false
	}
});
	/**************swipe menu***************/
});