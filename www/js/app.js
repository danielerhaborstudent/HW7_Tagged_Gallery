// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    // var homeTpl = Handlebars.compile($("#home-tpl").html());
    // var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());

    DownloadView.prototype.template = Handlebars.compile($("#download-tpl").html());

    SearchView.prototype.template = Handlebars.compile($("#search-tpl").html());

    ImageListView.prototype.template = Handlebars.compile($("#image-list-tpl").html())

    // EmployeePhoneNumbers.prototype.template = Handlebars.compile($("#employee-phone-tpl").html());

    var service = new ImageService();
    service.initialize().done(function () {
        // $('body').html(new HomeView(service).render().$el);
        router.addRoute('', function() {
            $('body').html(new HomeView().render().$el);
        });

        router.addRoute('downloadRoute/:download-view',function (){
            $('body').html(new DownloadView(service).render().$el);

        });
        
        router.addRoute('searchRoute/:search-view',function (){
            $('body').html(new SearchView(service).render().$el);

        });

        // router.addRoute('employees/:id', function(id) {
        //     service.findById(parseInt(id)).done(function(employee) {
        //         $('body').html(new EmployeeView(employee).render().$el);
        //     });
        // });
        router.start();

        console.log("Service initialized");
    });

    /* --------------------------------- Event Registration -------------------------------- */
    // $('.search-key').on('keyup', findByName);
    // $('.help-btn').on('click', function() {
    //     alert("Employee Directory v3.4");
    // });
    document.addEventListener('deviceready', function () {
    // Override default HTML alert with native dialog
        //if ( navigator.notification) {
          if (device.platform != "browser"){  
            window.alert = function (message) {
                navigator.notification.alert(
                    message, // message
                    null, // callback
                    "Workshop on Android", // title
                    'OK' // buttonName
                );
            };
        }
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    // function renderHomeView() {
    //     var html =
    //     "<p><button class='help-btn'>Help</button></p>" + "<h1>Directory</h1>" + 
    //     "<input class='search-key' type='search' placeholder='Enter name'/>" +
    //     "<ul class='employee-list'></ul>";
    //     //$('body').html(html);

    //     $('body').html( homeTpl());
    //     $('.search-key').on(' keyup', findByName);
    //     $('.help-btn').on('click', function() {
    //         alert("Employee Directory v3.4");
    //     });
    //  }
    // function findByName() {
    //     service.findByName($('.search-key').val()).done(function (employees) {
    //         // var l = employees.length;
    //         // var e;
    //         // $('.employee-list').empty();
    //         // for (var i = 0; i < l; i++) {
    //         //     e = employees[i];
    //         //     $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
    //         // }
    //         $('.content').html( employeeListTpl(employees));
            

    //     });
    // }

}());