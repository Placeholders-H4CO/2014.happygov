$(document).ready(function(){ resizeDiv(); });
window.onresize = function(event) { resizeDiv(); };

function resizeDiv() {
  // Viewport
  vpw = $(window).width();
  vph = $(window).height();

  // Elements
  mapOffset = $('#main').offset().top;
  footerH = $('footer').height();

  // Map
  $('#main').css({'height': vph / 1.6 + 'px'});
  $('#main #map').css({'height': vph / 1.6 + 'px'});

}

// Main Toggles (map, list)
$('#mapToggle').click(function(){
  $('#listToggle').removeClass('active');
  $('#list').removeClass('active');
  $(this).addClass('active');
  $('#main').addClass('active');
});

$('#listToggle').click(function(){
  $('#mapToggle').removeClass('active');
  $('#main').removeClass('active');
  $(this).addClass('active');
  $('#list').addClass('active');
});

// Map Toggles
$('#tog').click(function(){
  //$('#tog2').toggleClass('active');
  $(this).toggleClass('active');
});
$('#tog2').click(function(){
  //$('#tog').removeClass('active');
  $(this).toggleClass('active');
});


// Newsletter Form Toggle
$('#signup-toggle').click(function(){
  $('#mc_embed_signup').addClass('active');
});
$('#form-close').click(function(){
  $('#mc_embed_signup').removeClass('active');
});

$('#infoToggle').click(function(){
  $('#configArea').toggleClass('hide');
  $(this).toggleClass('hide');
});
