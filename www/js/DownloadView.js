var DownloadView = function (service) {
	
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)

		this.$el = $('<div/>');	
		this.$el.on(' keyup', '.department-name', findByDepTitle);
		this.$el.on(' keyup', '.employee-title', findByDepTitle);
	};
	this.initialize();
	this.render = function() {
		this.$el.html( this.template());
		// $('.content', this.$el).html(employeeListView.$el);
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
} // HomeView.js in the js directory