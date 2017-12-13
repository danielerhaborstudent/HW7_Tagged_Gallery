var ImageService = function() {

    var storage = window.localStorage; // initalize local storage object
    // storage.clear();
    // var fname_URL = []; // initialize URL for array of {"fileName": entry.toURL()} dictionary
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

        var fileName = my_url_split[my_url_split.length - 1];      // Get the last element in the array 
                                                                    // if the url was "http://s14.postimg.org/i8qvaxyup/bitcoin1.jpg" then the fileName would be 
                                                                    // bitcoin1.jpg
        var my_tags_array = imageTags.split(" ").filter(i => i!=="");      // And array of tags namely ["tag1", "tag2", "tag3"]
                                                                                 // Splits on single space,
                                                                                 //  removes empty strings in array after split

        my_tags_array = Array.from(new Set(my_tags_array));     // Remove any duplicate tags such as ["tag1", "tag2", "tag3","tag1", "tag2", "tag3"]
                                                                // Just becomes ["tag1", "tag2", "tag3"]
        
        var fileURL = cordova.file.cacheDirectory + fileName;     // Here fileURL is where we will save the file "/data/data/com.daniel.workshop/cache/bitcoin1.jpg"
        fileTransfer.download(
            uri,            // source
            fileURL,        // target; where the file will be stored
            function(entry) {
                alert("Download Successful!");          // Do this when the download is successful
                console.log("download complete: " + entry.toURL());     // entry.toURL() helps us get a URL for the image that we can use with href or src


                for (var i = 0; i < my_tags_array.length; i++){
                    if (!(my_tags_array[i] in storage)){                    // If the tag is not already in local storage then add it
                        storage.setItem(my_tags_array[i], fileName);     // store in localStorage tuples of ("tag", fileName) 
                                                                      // Multiple tags can have the same fileName
                    }
                    else{
                        var item = storage.getItem(my_tags_array[i]);       // Same tag can have multiple fileNames associated with it
                        if (item !== fileName){
                            storage.setItem(my_tags_array[i], item + ";" + fileName)    // ('tag1', "fileName1;fileName2;fileName3")
                        }

                    }

                }
                



                // need to 

                // fname_URL.push( {"file_name": fileName,  "url" : entry.toURL()} );      // append a dictionary of the fileName and entry.toURL 
                                                                                        //to our array fname_URL useful for src with img;




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

    this.findByTag = function(searchTag){
        var deferred = $.Deferred();
        var storage_array = [];
        for (var key in storage){
          var storage_values_split = storage.getItem(key).split(";");   // get my array of ['fileName1','fileName2','fileName3']

          for (var i = 0; i < storage_values_split.length; i++){

            storage_array.push({"key":key, "value": storage_values_split[i]}); // Turn storage into an array of dictionaries of the form
                                                                            // [{key: 'tag1', value : fileName1}]
          }

        }


        var tag_filtered = storage_array.filter(function(element){
          var tag = element.key;                                        // filter our storage_array to the tags matching the search tag
          // var FN = element.value;                                    // return our matching array with the tags that match the search tag
          
          return tag.toLowerCase().indexOf(searchTag.toLowerCase()) > -1;
        });

        // var results = [];

        // for (var i = 0; i < tag_filtered.length; i++){

        //     var name = tag_filtered[i].value;           // file name


        //     var temp_array = fname_URL.filter(function(element){

        //         return name === element.file_name;            // array of single dictionary element where the fileName from a tag_filtered elemet matches the 
        //                                                         // fileName of fname_URL array of dictionary elements

        //     });

        //     if (results.indexOf(temp_array[0]) <= -1) {
        //         results.push(temp_array[0]);                    // if the dictionary in temp_array is not in results append it
        //     }


        // }
        unique_names = [];
        for (var i = 0; i < tag_filtered.length; i++){          // get array of unique file_names from tag_filtered
            if (!(tag_filtered[i].value in unique_names)){      // [fileName1, fileName2]
                unique_names.push(tag_filtered[i].value);
            }
        }

       var results = [];
       for (var i = 0; i < unique_names.length; i++){
            results.push({"file_name" : unique_names[i]});      // append {"file_name": fileName} 
       }

        


        deferred.resolve(results);
        return deferred.promise();


    }

    this.findByFileName = function(file_name){
        var deferred = $.Deferred();                    // will have to use localStorage instead
        // var image = null;
        var image = null;

        // for (var i = 0; i < fname_URL.length; i++){
        //     if (name === fname_URL[i].file_name){
        //         image = fname_URL[i];                // Find the dictionary with teh file_name that matches the name that you are looking for
        //     }
        // }


        readFile(file_name);

        function readFile(name) {
            var type = window.TEMPORARY;
            var size = 5*1024*1024;
            window.requestFileSystem(type, size, successCallback, errorCallback);
            var outsideSuccess = null;
            function successCallback(fs) {
                // var insideSuccess = null;
                fs.root.getFile(name, {}, myFileEntryFunction, errorCallback);
                // console.log("Inside success: ", insideSuccess);

            }
            // var image = image
            //console.log("After successCallback: ", outsideSuccess);
            function myFileEntryFunction(fileEntry) {

                console.log(fileEntry.toURL());
                image = {"file_name":name, "url" : fileEntry.toURL()};
            //     console.log("Inside fileEntry: ", insideSuccess);
                        console.log(image);
                        deferred.resolve(image);
                        // return deferred.promise();
            }
            function errorCallback(error) {alert("Reading failed"); console.log("Reading failed: " + error.code); }
        
        }

        
        // console.log(image);
        // deferred.resolve(image);
        // return deferred.promise();
        return deferred.promise();

    }
}