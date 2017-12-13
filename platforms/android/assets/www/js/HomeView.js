var HomeView = function (service) {

	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');	
	};
	this.initialize();
	this.render = function() {
		this.$el.html( this.template());
		return this;
	};
	
	
} // 