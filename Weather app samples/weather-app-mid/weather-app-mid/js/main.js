(function ($) {
    'use strict';

    // Event listener for retrieving a weather forecast
    $('.frm.weather').on('submit', function (e) {
        var location = $(e.target).find('[name=location]').val(),
            query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '") and u="c"&format=json&env=store://datatables.org/alltableswithkeys';

        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=' + query, function (data) {
            // Refine the data
            data = data.query.results.channel;
            console.log(data);
            // Display the weather data... best to use a function
        });

        e.preventDefault();
    });
}(jQuery));