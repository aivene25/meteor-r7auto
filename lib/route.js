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
    template:'blog',
    layoutTemplate:"withSidebar"
});
Router.route('/about', {
    name:'about',
    template:'about'
});
Router.route('/contact', {
    name:'contact',
    template:'contact'
});
Router.route('/services', {
    name:'services',
    template:'services'
});
Router.route("/service/:id", {
    name:'serviceItem',
    template:'serviceItem'
});

Router.route("/shop/cars", {
    name:'shopCars',
    template:'shopCars',
    layoutTemplate:"withSidebar"
});
Router.route("/shop/parts", {
    name:'shopParts',
    template:'shopParts',
    layoutTemplate:"withSidebar"
});