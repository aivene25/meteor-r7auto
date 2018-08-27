import plugins from '../plugins';

Template.appointments.onRendered(function() {
  plugins();
});