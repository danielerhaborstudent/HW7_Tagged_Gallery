var SearchView = function (service) {
	var imageListView;
	// var employeePhoneNumbers;
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)

		this.$el = $('<div/>');	
		this.$el.on(' keyup', '.image-tag', findByTag);
		imageListView = new ImageListView();
	};
	this.initialize();
	this.render = function() {
		this.$el.html( this.template());
		$('.content', this.$el).html(imageListView.$el);
		return this;
	};


	// function findByDepTitle() {
	// 	service.findByDepTitle($.trim($('.department-name').val()),$.trim($('.employee-title').val()))
	// 	.done(function(employees) {
	// 		empty_array = [];
	// 		if ($.trim($('.department-name').val()).length > 0 || $.trim($('.employee-title').val()).length > 0){
	// 			employeeListView.setEmployees(employees);
	// 		}
	// 		else{
	// 			// employeeListView.setEmployees(employees);
	// 			employeeListView.setEmployees(empty_array);
	// 		}
			
	// 	});
	// };

	function findByTag(){
		service.findByTag($.trim($('.image-tag').val())).done(function(files){
			var empty_array = [];
			if ($.trim($('.image-tag').val()).length > 0){
				imageListView.setImages(files);
			}
			else{
				imageListView.setImages(empty_array);
			}
		});


	};
} // HomeView.js in the js directory