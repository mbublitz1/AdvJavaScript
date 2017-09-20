(function($){
    $('.Search').on('submit', function (e)
    {
        console.log('in submit');
        var searchText = $(e.target).find('[name=searchText]').val(),
        query = 'flickr.photos.search&api_key=a7aa4bea8f141275bc7c69292b51b672&text=' + searchText + '&format=json&nojsoncallback=1';

        $.getJSON('https://api.flickr.com/services/rest/?method=' + query, function(data)
        {
            console.log(data);
        });
    });

}(jQuery));
