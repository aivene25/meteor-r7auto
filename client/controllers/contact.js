import plugins from '../plugins';

Template.contact.onRendered(function() {
  plugins();
});