var ImageService = function() {

    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.downloadImage = function(imageURL, imageTag) {

        var deferred = $.Deferred();

        // function checkURL(url) { 
        //     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null); 
        // }

        var fileTransfer = new FileTransfer();      // Create new FileTransfer object
        var uri = encodeURI(imageURL);              // extract the Uniform Resource Identifier

        var my_url_split = imageURL.split("/");     // Split url on "/" separator and return an array of the elements separated by a "/"

        var fileName = my_url_split.[my_url_split.length - 1];      // Get the last element in the array 
                                                                    // if the url was "http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg" then the fileName would be 
                                                                    // bitcoin1.jpg
        



        
    }




        deferred.resolve();
        return deferred.promise();


    }
}