Template.home.onCreated(function() {
  let sub = this.subscribe("services.all");
  let blog = this.subscribe("posts.all");
  let parts = this.subscribe("parts.all");
  let cars = this.subscribe("cars.all");
  this.autorun(function() {
    if (sub.ready() == true) {
      let res = Services.find({}, {}).fetch();
      Session.setPersistent("services", res);
    }
    if (blog.ready() == true) {
      let res = Posts.find({}, {}).fetch();
      Session.setPersistent("posts", res);
    }
    if (parts.ready() == true) {
      let res = SpareParts.find({}, {}).fetch();
      Session.setPersistent("parts", res);
    }
    if (cars.ready() == true) {
      let res = Cars.find({}, {}).fetch();
      Session.setPersistent("cars", res);
    }
  });
});

Template.home.helpers({
  data: function() {
    console.log("Services are", Session.get("services"));
    return Session.get("services");
  },
  posts: function() {
    return Session.get("posts");
  },
  parts: function() {
    return Session.get("parts");
  },
  cars: function() {
    return Session.get("cars");
  }
});

Template.home.events({
  "click .add-to-cart": function(event, template) {
    event.preventDefault();
    let id = event.currentTarget.id;
    let product = SpareParts.findOne({ _id: id }, {});
    console.log(product);
    let cartItems = Session.get("cartItems") || [];
    let contains = false;

    if (cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        if (id == item.productId) {
          item.quantity = item.quantity + 1;
          contains = true;
        }
      });
      if (contains == false) {
        let data = { productId: id, product: product, quantity: 1 };
        cartItems.push(data);
      }
    } else {
      let data = { productId: id, product: product, quantity: 1 };
      cartItems.push(data);
    }
    alert("Item added to cart");
    console.log(cartItems);
    //Session.setPersistent("cartItems", cartItems);
  }
});

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

  var carouselBoxOwl = function() {
    if ($().owlCarousel) {
      $(".wprt-carousel-box").each(function() {
        var $this = $(this),
          auto = $this.data("auto"),
          loop = $this.data("loop"),
          item = $this.data("column"),
          item2 = $this.data("column2"),
          item3 = $this.data("column3"),
          gap = Number($this.data("gap"));

        $this.find(".owl-carousel").owlCarousel({
          loop: loop,
          margin: gap,
          nav: true,
          navigation: true,
          pagination: true,
          autoplay: auto,
          autoplayTimeout: 5000,
          responsive: {
            0: {
              items: item3
            },
            600: {
              items: item2
            },
            1000: {
              items: item
            }
          }
        });
      });
    }
  };

  var imagePopup = function() {
    if ($().magnificPopup) {
      $(
        ".wprt-gallery, .wprt-gallery-grid, .wprt-thumb-slider, .wprt-images-grid"
      ).each(function() {
        $(this)
          .find(".zoom-popup")
          .magnificPopup({
            disableOn: 700,
            type: "image",
            gallery: {
              enabled: true
            },
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
          });
      });
    }
  };

  var galleryOwl = function() {
    if ($().owlCarousel) {
      $(".wprt-gallery").each(function() {
        var $this = $(this),
          auto = $this.data("auto"),
          item = $this.data("column"),
          item2 = $this.data("column2"),
          item3 = $this.data("column3"),
          gap = Number($this.data("gap"));

        $this.find(".owl-carousel").owlCarousel({
          loop: false,
          margin: gap,
          nav: true,
          navigation: true,
          pagination: true,
          autoplay: auto,
          autoplayTimeout: 5000,
          responsive: {
            0: {
              items: item3
            },
            600: {
              items: item2
            },
            1000: {
              items: item
            }
          }
        });
      });
    }
  };

  var newsOwl = function() {
    if ($().owlCarousel) {
      $(".wprt-news").each(function() {
        var $this = $(this),
          auto = $this.data("auto"),
          item = $this.data("column"),
          item2 = $this.data("column2"),
          item3 = $this.data("column3"),
          gap = Number($this.data("gap"));

        $this.find(".owl-carousel").owlCarousel({
          loop: false,
          margin: gap,
          nav: true,
          navigation: true,
          pagination: true,
          autoplay: auto,
          autoplayTimeout: 5000,
          responsive: {
            0: {
              items: item3
            },
            600: {
              items: item2
            },
            1000: {
              items: item
            }
          }
        });
      });
    }
  };

  var teamOwl = function() {
    if ($().owlCarousel) {
      $(".wprt-team").each(function() {
        var $this = $(this),
          auto = $this.data("auto"),
          item = $this.data("column"),
          item2 = $this.data("column2"),
          item3 = $this.data("column3"),
          gap = Number($this.data("gap"));

        $this.find(".owl-carousel").owlCarousel({
          loop: false,
          margin: gap,
          nav: true,
          navigation: true,
          pagination: true,
          autoplay: auto,
          autoplayTimeout: 5000,
          responsive: {
            0: {
              items: item3
            },
            600: {
              items: item2
            },
            1000: {
              items: item
            }
          }
        });
      });
    }
  };

  var partnerOwl = function() {
    if ($().owlCarousel) {
      $(".wprt-partner").each(function() {
        var $this = $(this),
          auto = $this.data("auto"),
          loop = $this.data("loop"),
          item = $this.data("column"),
          item2 = $this.data("column2"),
          item3 = $this.data("column3"),
          gap = Number($this.data("gap"));

        $this.find(".owl-carousel").owlCarousel({
          loop: loop,
          margin: gap,
          nav: true,
          navigation: true,
          pagination: true,
          autoplay: auto,
          autoplayTimeout: 5000,
          responsive: {
            0: {
              items: item3
            },
            600: {
              items: item2
            },
            1000: {
              items: item
            }
          }
        });
      });
    }
  };

  Meteor.setTimeout(() => {
    animation();
    parallax();
    counter();
    accordions();
    spacer();
    imagePopup();
    carouselBoxOwl();
    partnerOwl();
    newsOwl();
    teamOwl();
    galleryOwl();
  }, 555);
});
