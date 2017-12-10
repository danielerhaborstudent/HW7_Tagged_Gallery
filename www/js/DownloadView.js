var DownloadView = function (service) {
	
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)

		this.$el = $('<div/>');	
		this.$el.on('click', '.download-image', downloadImage);
	};
	this.initialize();
	this.render = function() {
		this.$el.html( this.template());
		// $('.content', this.$el).html(employeeListView.$el);
		return this;
	};

	function downloadImage() {
		service.downloadImage($.trim($('.image-url').val()),$.trim($('.image-tag').val())){
			

		}
		
			
	
	};
} // HomeView.js in the js directory