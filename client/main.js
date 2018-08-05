Meteor.startup(() => {
  $.cloudinary.config;
  cloud_name: "divk5nutg";
});


// code for preloader

if ($().animsition) {
  $(".animsition").animsition({
    inClass: "fade-in",
    outClass: "fade-out",
    inDuration: 1500,
    outDuration: 800,
    loading: true,
    loadingParentElement: "body",
    loadingClass: "animsition-loading",
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [
      "-webkit-animation-duration",
      "-moz-animation-duration",
      "animation-duration"
    ],
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "body",
    transition: function(url) {
      window.location.href = url;
    }
  });
}