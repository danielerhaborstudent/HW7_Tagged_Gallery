var ImageListView = function () {
	var images;
	this.render = function() {
		this.$el.html(this.template(images));
		return this;
	};
	this.setImages = function(list) {
		images = list;
		this.render();
	};
	this.initialize = function() {
		this.$el = $('<div/>');
		this.render();
	};
	this.initialize();
} // EmployeeListView.js in the js directory