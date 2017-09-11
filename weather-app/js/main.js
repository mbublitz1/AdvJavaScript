$('.frm.weather').on('submit', function(e) {
	console.log("In event");
	var location = $(e.target).find('[name=location]').val();


	$.getJSON('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json&env=store://datatables.org/alltableswithkeys', function(data){
	 	console.log(data.query.results.channel);
	 });

	e.preventDefault();
});
