import plugins from '../plugins';

Template.register.onRendered(function() {
  plugins();
});