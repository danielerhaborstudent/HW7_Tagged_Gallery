var ImageView = function(image) {
	this.initialize = function() {
		this.$el = $('<div/>');
		// this.$el.on('click', '.add-location-btn', this.addLocation);


	};
	this.render = function() {
		this.$el.html(this.template(image));
		return this;
	};
	// this.addLocation = function(event) {
	// 	event.preventDefault();
	// 	navigator.geolocation.getCurrentPosition(
	// 		function(position) {
	// 			alert(position.coords.latitude + ','
	// 			+ position.coords.longitude);
	// 		},
	// 		function() {
	// 			alert('Error getting location');
	// 		});
	// 	console.log('I have a location')
	// 	return false;
	// };

	this.initialize();
}
