(function($){
    $('.search').on('submit', function (e)
    {
        console.log('in submit');
        var searchText = $(e.target).find('[name=searchText]').val(),
        query = 'flickr.photos.search&api_key=86b74687bf9d2559bfdf7a9d46666c79&text=' + searchText + '&format=json&nojsoncallback=1';
        console.log('https://api.flickr.com/services/rest/?method=' + query);
         $.getJSON('https://api.flickr.com/services/rest/?method=' + query, function(data)
         {

             var $id = data.
             console.log(data);
         });

        e.preventDefault();
    });

}(jQuery));

