var ImageService = function() {
    var storage = window.localStorage; // initalize local storage object
    var fname_URL = []; // initialize URL for array of {"fileName": entry.toURL()} dictionary
    this.initialize = function() {
        // No Initialization required
        var deferred = $.Deferred();

        deferred.resolve();
        return deferred.promise();
    }

    this.downloadImage = function(imageURL, imageTags) {

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
        var my_tags_array = imageTags.split(" ").filter(i => i!=="");      // And array of tags namely ["tag1", "tag2", "tag3"]
                                                                                 // Splits on single space,
                                                                                 //  removes empty strings in array after split

        
        var fileURL = cordova.file.cacheDirectory + fileName;     // Here fileURL is where we will save the file "/data/data/com.daniel.workshop/cache/bitcoin1.jpg"
        fileTransfer.download(
            uri,            // source
            fileURL,        // target; where the file will be stored
            function(entry) {
                alert("Download Successful!");          // Do this when the download is successful
                console.log("download complete: " + entry.toURL());     // entry.toURL() helps us get a URL for the image that we can use with href or src


                for (var i = 0; i < my_tags_array.length; i++){
                     storage.setItem(my_tags_array[i], fileName);     // store in localStorage tuples of (tag, fileName) 
                                                                      // Multiple tags can have the same fileName
                }

                fname_URL.push( {fileName: entry.toURL()} );      // append a dictionary of the fileName : entry.toURL to our array fname_URL usefule for src with img;



            },
            function(error) {
                alert("Download Failed!");          // Do this when the download fails
                console.log("download error source " + error.source);
                console.log("download error target " + error.target);
                console.log("download error code " + error.code);
            },
            false,
            {
                headers: {
                    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                }
            }
        );



        deferred.resolve();
        return deferred.promise();


    }

    this.findByTag = function(tag){
        var deferred = $.Deferred();

        


        deferred.resolve();
        return deferred.promise();


    }
}