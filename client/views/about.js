import plugins from '../plugins';

Template.about.onRendered(function() {
  plugins();
});