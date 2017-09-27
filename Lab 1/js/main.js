(function($){
    var count = 0;
    $('.search').on('submit', function (e)
    {
        console.log('in submit');
        var searchText = $(e.target).find('[name=searchText]').val(),
        query = 'flickr.photos.search&api_key=86b74687bf9d2559bfdf7a9d46666c79&text=' + searchText + '&format=json&nojsoncallback=1';
        console.log('https://api.flickr.com/services/rest/?method=' + query);
         $.getJSON('https://api.flickr.com/services/rest/?method=' + query, function(data)
         {
             console.log(data);
             console.log(data.photos.total);
            for(count=0; count < data.photos.photo.length; count++) {
                var $id = data.photos.photo[count].id;
                var $serverId = data.photos.photo[count].server;
                var $farmId = data.photos.photo[count].
                var $secret = data.photos.photo[count].

                console.log($id);

            }
         });

        e.preventDefault();
    });

}(jQuery));

