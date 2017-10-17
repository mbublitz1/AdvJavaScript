/**
 * Simple weather display application for demonstrating AJAX and JSON an best
 * practices for JavaScript development.  The script makes use of the Yahoo!
 * weather API.
 *
 * @param [Object] $ - jQuery dependency (or compatible API such as Zepto)
 */
(function ($) {
    'use strict';
    /**
     * Displays the current weather for a given location.
     * @param {object} data - an object of all relevant weather data.
     * @param {object} $el - the jQuery reference to display the DOM element.
     */
    function displayWeather(data, $el){
        //var $loc = $('.weather-display .location');
        //Below shows how to use the element to find the location
        //When using templates, lines below can be removed.
        // var $loc = $el.find('.details>.location');
        // var $weatherdate  = $el.find('.details>.date');
        // var $condition = $el.find('.details>.conditions');
        // var $currentTemp = $el.find('.details>.temp');
        // var $sunRise = $el.find('.details>.sunrise');
        // var $sunSet = $el.find('.details>.sunset');

        var returnData = {

            location: data.location.city + ', ' + data.location.region,
            date: data.lastBuildDate.split(' ').splice(0, 3).join(' '),
            condition: data.item.condition.text,
            temperature: data.item.condition.temp
        },
        //find an compilte the template
        templateSource = $('#weather-template').html(),
        templateFn = Handlebars.compile(templateSource);

        $el.find('.current').html(templateFn(returnData));

        //TODO: complete variables for the other pieces of data
        //Display the data
        $el.removeClass('hidden');


    }

    $('.frm.weather').on('submit', function (e) {
        var location = $(e.target).find('[name=location]').val(),
            query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json&env=store://datatables.org/alltableswithkeys';

        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=' + query, function (data) {
            //refine the data
            data = data.query.results.channel;
            console.log(data);
            displayWeather(data, $('.weather-display'))
        });

        e.preventDefault();
    })

}(jQuery));
