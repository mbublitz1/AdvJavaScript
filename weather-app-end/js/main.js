/**
 * Simple weather display application for demonstrating AJAX for JSON and
 * best practices for JavaScript development.  The script makes use of the 
 * Yahoo! weather API.
 *
 * @param {object} $ - jQuery dependency (or compatible API such as zepto)
 */
(function ($) {
    'use strict';

    /**
     * Displays a weather forecast for a given location.
     * @param {Object} data - The returned object of forecast weather data from Yahoo!.
     * @param {Object} $el - The jQuery reference to the display DOM element.
     */
    function displayForecast(data, $el) {
        var output = '<ul>',
            i,
            len;

        for (i = 0, len = data.length; i < len; i += 1) {
            output += '<li>';
            output += data[i].day + ' ' + data[i].date + ': hi| ' + data[i].high + ', low| ' + data[i].low;
            output += '</li>';
        }

        output += '</ul>';

        $el.html(output);
    }

    /**
     * Displays the current weather for a given location.
     * @param {Object} data - The returned object of forecast weather data from Yahoo!.
     * @param {Object} $el - The jQuery reference to the display DOM element.
     * @param {boolean} showForecast - Whether to display the forecast or not
     */
    function displayWeather(data, $el, showForecast) {
        var $loc = $el.find('.details>.location'),
            $date = $el.find('.details>.date'),
            $conditions = $el.find('.details>.conditions'),
            $temp = $el.find('.details>.temp'),
            $sunrise = $el.find('.details>.sunrise'),
            $sunset = $el.find('.details>.sunset'),
            $forecast = $el.find('.forecast');

        // display the current weather data
        $loc.text(data.location.city + ', ' + data.location.region);
        $date.text(data.lastBuildDate.split(' ').splice(0, 3).join(' '));
        $conditions.text(data.item.condition.text);
        $temp.text(data.item.condition.temp);
        $sunrise.text(data.astronomy.sunrise);
        $sunset.text(data.astronomy.sunset);

        if (!!showForecast) {
            // display the forecast
            displayForecast(data.item.forecast, $forecast);
        }
    }

    // Event listener for retrieving a weather forecast
    $('.frm.weather').on('submit', function (e) {
        e.preventDefault();

        var location = $(e.target).find('[name=location]').val(),
            query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '") and u="c"&format=json&env=store/datatables.org/alltableswithkeys';

        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=' + query, function (data) {
            data = data.query.results.channel;
            displayWeather(data, $('.weather-display'), true);
        });
    });
}(jQuery));