$('nav').find('a').click(function(){
  var $href = $(this).attr('href');
  if ($href != "") {
    var $anchor = $($href).offset();
    $('body').animate({ scrollTop: $anchor.top-45 }, 'slow');
  } else {
    $('body').animate({ scrollTop: 0 });
  }
  return false;
});

$("nav a").click(function(){
  $(".nav").find(".active").removeClass("active");
  $(this).parent().addClass("active");
});