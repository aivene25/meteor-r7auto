Template.contact.onRendered(function() {
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
  var googleMap = function() {
    if ($().gmap3) {
      $(".wprt-gmap").each(function() {
        var $this = $(this),
          lat = $this.data("lat"),
          lng = $this.data("lng"),
          marker = $this.data("marker"),
          zoom = $this.data("zoom");

        var center = [lat, lng];
        $this
          .gmap3({
            center: center,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          })
          .marker({
            position: center,
            icon: marker
          });
      });
    }
  };
  spacer();
  googleMap();
});
