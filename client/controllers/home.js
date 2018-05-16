Template.home.onRendered(function() {
  // taken from --rev-slider.js to initialize slider
  // Revolution Slider
  RevSlider.init();
  var parallax = function() {
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
    /*
      * Please note that background attachment fixed doesn't work on iOS
    */
    if (!iOS) {
      $(".parallax").css({ backgroundAttachment: "fixed" });
    } else {
      $(".parallax").css({ backgroundAttachment: "scroll" });
    }

    if (
      $().parallax &&
      matchMedia("only screen and (min-width: 992px)").matches
    ) {
      $(".row-certified-1").parallax("50%", 0.45);
      $(".row-trusted-1").parallax("50%", 0.4);
      $(".row-facts-1").parallax("50%", 0.5);
    }
  };

  var animation = function() {
    $(".wprt-animation-block").each(function() {
      var el = $(this),
        animate = el.data("animate"),
        duration = el.data("duration"),
        delay = el.data("delay"),
        position = el.data("position");

      el.css({
        "-webkit-animation-delay": delay,
        "animation-delay": delay,
        "-webkit-animation-duration": duration,
        "animation-duration": duration
      });

      el.waypoint(
        function() {
          el.addClass("animated").addClass(animate);
        },
        {
          triggerOnce: true,
          offset: position
        }
      );
    });
  };
  var counter = function() {
    if ($().countTo) {
      $(".wprt-counter").on("on-appear", function() {
        $(this)
          .find(".number")
          .each(function() {
            var to = $(this).data("to"),
              speed = $(this).data("speed");

            $(this).countTo({
              to: to,
              speed: speed
            });
          });
      });
    }
  };

  var accordions = function() {
    var args = { easing: "easeOutExpo", duration: 300 };

    $(".accordion-item.active")
      .find(".accordion-content")
      .show();
    $(".accordion-heading").on("click", function() {
      if (
        !$(this)
          .parent()
          .is(".active")
      ) {
        $(this)
          .parent()
          .toggleClass("active")
          .children(".accordion-content")
          .slideToggle(args)
          .parent()
          .siblings(".active")
          .removeClass("active")
          .children(".accordion-content")
          .slideToggle(args);
      } else {
        $(this)
          .parent()
          .toggleClass("active");
        $(this)
          .next()
          .slideToggle(args);
      }
    });
  };

  var spacer = function() {
    var mode = "desktop";

    if (matchMedia("only screen and (max-width: 991px)").matches)
      mode = "mobile";

    if (matchMedia("only screen and (max-width: 767px)").matches)
      mode = "smobile";

    $(".wprt-spacer").each(function() {
      if (mode == "desktop") {
        $(this).attr("style", "height:" + $(this).data("desktop") + "px");
      } else if (mode == "mobile") {
        $(this).attr("style", "height:" + $(this).data("mobi") + "px");
      } else {
        $(this).attr("style", "height:" + $(this).data("smobi") + "px");
      }
    });
  };

  $(".owl-carousel").owlCarousel();
  animation();
  parallax();
  counter();
  accordions();
  spacer();

  /*
  console.log('i m in header')
  $.getScript('b-plugins.js', function(data, text, xhr){
    console.log('i m in header', data);
    console.log('i m in header', text);
    console.log('i m in header', xhr.status);
    console.log('loadperfomerd')
  });
  $.getScript('/c-bootstrap.min.js');
  $.getScript('/d-animstion.js');
  $.getScript('/e-countto.js');
  $.getScript('/f-cubeportfolio.js');
  $.getScript('/fixtext.js');
  $.getScript('/flexislider.min.js');
  $.getScript('/g-owl-carousel.min.js');
  $.getScript('/gmap3.min.js');
  $.getScript('/h-magnific-popup.min.js');
  $.getScript('/i-equalize.min.js');
  $.getScript('/j-shortcodes.js');
  $.getScript('/k-main.js');
  $.getScript('/l-jquery.themepunch.tools.min.js');
  $.getScript('/m-jquery.themepunch.revolution.min.js');
  $.getScript('/n-rev-slider.js');
  $.getScript('/o-revolution.extension.actions.min.js');
  $.getScript('/p-revolution.extension.carousel.min.js');
  $.getScript('/q-revolution.extension.kenburn.min.js');
  $.getScript('/r-revolution.extension.layeranimation.min.js');
  $.getScript('/simple.text.rotator.js');
  $.getScript('/s-revolution.extension.migration.min.js');
  $.getScript('/t-revolution.extension.navigation.min.js');
  $.getScript('/typed.js');
  $.getScript('/u-revolution.extension.parallax.min.js');
  $.getScript('/validate.js');
  $.getScript('/vegas.js');
  $.getScript('/v-revolution.extension.slideanims.min.js');
  $.getScript('/w-revolution.extension.video.min.js');
  console.log('i m out of header')
  */
});
