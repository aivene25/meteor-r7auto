Template.slider.onRendered(function() {
  Meteor.setTimeout(() => {
    RevSlider.init();
  }, 900);
});
