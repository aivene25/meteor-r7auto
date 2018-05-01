Router.configure({
	layoutTemplate: 'main'
});


Router.route('/', {
    name:'home',
    template:'home'
});

Router.route('/register', {
    name:'register',
    template:'register'
});
Router.route('/blog', {
    name:'blog',
    template:'blog'
});
Router.route('/services', {
    name:'services',
    template:'services'
});
Router.route("/service/:id", {
    name:'serviceItem',
    template:'serviceItem'
});