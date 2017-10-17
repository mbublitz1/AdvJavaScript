/**
 * Simple weather display application for demonstrating AJAX for JSON and
 * best practices for JavaScript development.  The script makes use of the 
 * Yahoo! weather API.
 *
 * @param {object} $ - jQuery dependency (or compatible API such as zepto)
 */
(function($) {
    'use strict';

    /**
     * Displays a weather forecast for a given location.
     * @param {Object[]} data - The array of forecast weather objects.
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
     * @param {Object[]} data - The array of forecast weather objects.
     * @param {Object} $el - The jQuery reference to the display DOM element.
     * @param {boolean} showForecast - Whether to display the forecast or not
     */
    function displayWeather(data, $el, showForecast) {
        // build the template object
        var obj = {
                location: data.location.city + ', ' + data.location.region,
                date: data.lastBuildDate.split(' ').splice(0, 3).join(' '),
                conditions: data.item.condition.text,
                temp: data.location.temp,
                sunrise: data.astronomy.sunrise,
                sunset: data.astronomy.sunset
            },
            // find and compile the template
            templateSource = $('#current-weather').html(),
            template = Handlebars.compile(templateSource);

        // display the current weather data
        $el.find('.current').html(template(obj));

        // reveal the display
        $el.removeClass('hidden');

        if (!!showForecast) {
            // display the forecast
            displayForecast(data.item.forecast, $el.find('.forecast'));
        }
    }

    // Event listener for retrieving a weather forecast
    $('.frm.weather').on('submit', function(e) {
        e.preventDefault();

        // hide the display
        $('.weather-display').addClass('hidden');

        var location = $(e.target).find('[name=location]').val(),
            query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '") and u="c"&format=json&env=store/datatables.org/alltableswithkeys';

        $.getJSON('https://query.yahooapis.com/v1/public/yql?q=' + query, function(data) {
            data = data.query.results.channel;
            displayWeather(data, $('.weather-display'), true);
        });
    });
}(jQuery));
