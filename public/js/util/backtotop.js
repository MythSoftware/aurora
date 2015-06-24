
jQuery(document).ready(function() {
  var offset = 200;
  var duration = 500;
  jQuery(window).scroll(function() {
     if (jQuery(this).scrollTop() > offset) {
       jQuery('.to-top').fadeIn(duration);
     } else {
       jQuery('.to-top').fadeOut(duration);
     }
  });

  jQuery('.to-top').click(function(event) {
     event.preventDefault();
     jQuery('html, body').animate({scrollTop: 0}, duration);
     return false;
    })
});
