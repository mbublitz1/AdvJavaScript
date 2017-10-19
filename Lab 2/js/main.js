/**
 * Lab 1 application utilizing the Flickr API and JSON to display images
 *
 * @param {object} $ - jQuery dependency
 */
(function($){
    /**
     * Declare variables to be used in appliction
     */
    var count = 0, $perPage = 0, $pageCount = 0, $searchText;
    $('.search').on('submit', function (e)
    {

        //Get the search text and number of pages
        $searchText = $(e.target).find('[name=searchText]').val();
        $perPage = $(e.target).find('[name=perPage] option:selected').text();

        /**
         * Call to function to search and display photos
         * @param {Object} $searchText - The jQuery reference to the searchText DOM element.
         * @param {Object} $perPage - The jQuery reference to the $perPage DOM element.
         * @param {Object} 1 - Default value for page number.
         */
         RenderPhoto($searchText, $perPage, 1)

        e.preventDefault();
    });

    /**
     * Displays photos returned from search.
     * @param {Object} $searchText - The jQuery reference to the searchText DOM element.
     * @param {Object} $perPage - The jQuery reference to the $perPage DOM element.
     * @param {Object} $pageNumber - Value for page number.
     */
    function RenderPhoto($searchText, $perPage, $pageNumber)
    {
        var $query;
        //Check if search text is blank, if blank query recent photos otherwise query for search text
        if($searchText ==='')
        {
            $query = 'flickr.photos.getRecent&api_key=86b74687bf9d2559bfdf7a9d46666c79&per_page=' + $perPage + '&Page=' + $pageNumber + '&format=json&nojsoncallback=1';
        }
        else {
            $query = 'flickr.photos.search&api_key=86b74687bf9d2559bfdf7a9d46666c79&text=' + $searchText + '&per_page=' + $perPage + '&Page=' + $pageNumber + '&format=json&nojsoncallback=1';
        }

        $.getJSON('https://api.flickr.com/services/rest/?method=' + $query, function(data)
        {
            var $totalPages = data.photos.pages;

            //Clear image div
            $("#images").empty();
            //loop through images and generate html to display images
            for(count=0; count < data.photos.photo.length; count++) {
                var $id = data.photos.photo[count].id;
                var $serverId = data.photos.photo[count].server;
                var $farmId = data.photos.photo[count].farm;
                var $secret = data.photos.photo[count].secret;

                var $url = 'https://farm' + $farmId + '.staticflickr.com/' + $serverId + '/' + $id + '_' + $secret +'.jpg';
                //$("<a></a>").attr("class", "thumbnail").attr("data-toggle", "modal").attr("data-target", ".image-modal-lg" ).appendTo("#images");
                var html = $("<a href='#' class='thumbnail' data-toggle='modal' data-target='.image-modal-lg'>").append($("<img>").attr( "src", $url ));
                //$( "#images" ).append(("<a>").attr("class", "thumbnail").attr("data-toggle", "modal").attr("data-target", ".image-modal-lg" )).append(( "<img>" ).attr( "src", $url ).attr("data-toggle", "modal").attr("data-target", ".image-gallery"));
                $("#images").append(html);
            }

            //Determine how many pages there are and create links
            $pageCount = parseInt($perPage) % $totalPages;

            $(".pagination").empty();
            for(count=0; count < $pageCount; count++)
            {
                var $pageNo = count + 1;

                $( "<li><a>" + $pageNo + " " + "</a></li>" ).attr("href", "#").appendTo( ".pagination" );
            }

        });

    };

    /**
     * Event listener to change page upon clicking new page number
     */
    $('.pagination').click(function(evt){
        var $target = evt.target;
        //Get page number that was clicked and then call RenderPhoto method to display photos for that page
        var $newPage = $target.text;
        RenderPhoto($searchText, $perPage, parseInt($newPage.trim()));

        evt.preventDefault();
    });

    $('#images').click(function(evt){
        var $target = evt.target;
        //Get page number that was clicked and then call RenderPhoto method to display photos for that page
        console.log('image clicked');

        evt.preventDefault();
    });
}(jQuery));

