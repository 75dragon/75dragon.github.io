(function($){
  $(function(){
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown({hover: true, alignment: "left", constrainWidth: false});
    $(document).ready(function(){$('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
       fullWidth: true,
       indicators: true
     });
  });
  }); // end of document ready
})(jQuery); // end of jQuery name space
