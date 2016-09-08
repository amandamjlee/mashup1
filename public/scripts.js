
function makeHTML(theTempData,theNameData,theWeatherData){


 //clear previous deta
	$('#container').html('');
	

	var htmlString = '<div class="weathermusic">';
//htmlString += '<h3 class="Name">'+'City : '+theNameData+'</h3>';
	htmlString += '<h3 class="Temp">'+'Temperature : '+theTempData+'º</h3>';
	htmlString += '<h3 class="Weather">'+'Weather : '+theWeatherData+'</h3>';
	// htmlString +='<h2 class="wind">'+'Wind Speed'+'</h2>';
    htmlString += '</div>';


	$('#container').append(htmlString);

		  
			


		if(theWeatherData==='Clouds'){

			 $(document).ready(function() {
			     var widget1 = SC.Widget(document.getElementById('cloudy_widget'));
			     widget1.bind(SC.Widget.Events.READY, function() {
			       console.log('Ready...');
			     });

			     widget1.play();

			     $('#pause_Button').click(function() {
			       widget1.pause();
			       console.log('pause-pressed');
			     });
			     $('#play_Button').click(function() {
			       widget1.play();
			      
			       console.log('play-pressed');
			     });
			     $('#next_Button').click(function() {
			       widget1.next();
			       widget1.seekTo(0);
			   		console.log('next-pressed');
			     });
			      $('#prev_Button').click(function() {
			       widget1.prev();
			       widget1.seekTo(0);
			       console.log('next-pressed');
			     });


			     
			   });
		}


		else if(theWeatherData==='Rain'){

			 $(document).ready(function() {
			     var widget2 = SC.Widget(document.getElementById('rainy_widget'));
			     widget2.bind(SC.Widget.Events.READY, function() {
			       console.log('Ready...');
			     });

			     widget2.play();

			     $('#pause_Button').click(function() {
			       widget2.pause();
			       console.log('pause-pressed');
			     });
			     $('#play_Button').click(function() {
			       widget2.play();
			     
			       console.log('play-pressed');
			     });
			     $('#next_Button').click(function() {
			       widget2.next();
			       widget2.seekTo(0);
			       console.log('next-pressed');
			     });
			     $('#prev_Button').click(function() {
			       widget2.prev();
			       widget2.seekTo(0);
			       console.log('next-pressed');
			     });

			
			     
			   });
		}
		else if(theWeatherData==='Clear'){
			
	
			 $(document).ready(function() {
			     var widget3 = SC.Widget(document.getElementById('clear_widget'));
			     widget3.bind(SC.Widget.Events.READY, function() {

			       console.log('Ready...');
			     });

			     widget3.play();

			     $('#pause_Button').click(function() {
			       widget3.pause();
			       console.log('pause-pressed');
			     });
			     $('#play_Button').click(function() {
			       widget3.play();
			  
			       console.log('play-pressed');
			     });
			     $('#next_Button').click(function() {
			       widget3.next();
			       widget3.seekTo(0);
			       console.log('next-pressed');
			     });
			     $('#prev_Button').click(function() {
			       widget3.prev();
			       widget3.seekTo(0);
			       console.log('next-pressed');
			     });
			     
			   });
		}
		else {

	
			 $(document).ready(function() {
			     var widget4 = SC.Widget(document.getElementById('random_widget'));
			     widget4.bind(SC.Widget.Events.READY, function() {
			       console.log('Ready...');
			     });

			     widget4.play();

			     $('#pause_Button').click(function() {
			       widget4.pause();
			       console.log('pause-pressed');
			     });
			     $('#play_Button').click(function() {
			       widget4.play();
			     
			       console.log('play-pressed');
			     });
			     $('#next_Button').click(function() {
			       widget4.next();
			       widget4.seekTo(0);
			       console.log('next-pressed');

			     });
			     $('#prev_Button').click(function() {
			       widget4.prev();
			       widget4.seekTo(0);
			       console.log('next-pressed');
			     });

			    
			     
			   });

		}		  

}

var speedDivider = 10;

function searchWeather(city){
	console.log("Get Weather Data");
	console.log(city);

	var theURL='http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a2f063a760c57e8197dce2b7162f41f7&units=metric';
 	
 	$.ajax({
 		url: theURL,
 		type:'GET', 
 		dataType: 'jsonp', 
 		error: function(err){
 			console.log("We got problems!");
 			console.log(err);
 		}, 
 		success: function(data){
			console.log("WooHoo!");
			console.log(data);

			var theTempData = data.main.temp;
			var theNameData = data.name;
			
			var theWeatherData = data.weather[0].main;
			var theWindData=data.wind.speed;
			windSpeedValue = data.wind.speed/2;
			speed = windSpeedValue/speedDivider;
			
			console.log(theTempData,theNameData,theWeatherData,theWindData);
			
			makeHTML(theTempData,theNameData,theWeatherData);
		
		}
 	});
}

//DOM EVENTS
$("#the-button").click(function(){
	var theInputValue = $('#the-input').val();
	//Make a request for the data

	
	searchWeather(theInputValue); 


	var resetWidget = $('#clear_Button').val();

	resetWidget.reset();


	
});

$("#the-input").keypress(function(evt){
	if(evt.which==13){
		$("#the-button").trigger('click');
	}
});




//p5
var windSpeedValue = 0;
var speed = 0;


function setup(city) {
	createCanvas(windowWidth, windowHeight/3);  
}

function draw() {
	clear();
	windSpeed(windSpeedValue);
	windSpeedValue = windSpeedValue + speed;
	
	

	textAlign(CENTER);
	text("Wind Speed", 0, 0);
	textFont("sans-serif");
	textSize(11);
	textLeading(10);
	strokeWeight(0);
	fill(220);

	
}


function windSpeed(data){
	// ellipseMode(CENTER);
	// console.log(data); 



	var numCircles = 30;

	translate(width/2, height/2);
	for (var i = 0; i < numCircles; i++) {
		push();	
		rotate(TWO_PI * i / numCircles);
		rotate(TWO_PI * 0.01 * data);
		fill(220);
		noStroke();
		ellipse(100, 0, 5, 5);
		pop();
	}

	

}

//Cloudant



var noteTemplate = function (data) {
	template = '<div class="note">';
	template += new Date(data.created_at);
	template += '<div>'+ data.text +'</div>';
	template += '</div>';

	return template;
};



function saveNotes (theData) {
	
	theData.namespace = window.key;
	console.log("Post!!");
	$.ajax({
		url: "/save",
		contentType: "application/json",
		type: "POST",
		data: JSON.stringify(theData),
		error: function (resp) {
			console.log(resp);
			
			$("#new-note").prepend("<p><strong>Something broke.</strong></p>");
		},
		success: function (resp) {
			console.log(resp);
			
			var htmlString = noteTemplate(theData);
	
			$("#note-text").val("");
			
			$("#note-submit").blur();
		}
	});
}

function testData() {
	$.ajax({
		url: "/test",
		type: "GET",
		data: JSON,
		error: function(err){
			console.log(err);
		},
		success: function (data) {
			console.log(data);
		}
	});
}

//send data to server

function sendTheData(theData){   
	console.log("In send the data function!");

	$.ajax({
		url: "/save",
		contentType: "application/json",
		type: "POST",
		data: JSON.stringify(theData),
		error: function (resp) {
			console.log(resp);
			
		},
		success: function (resp) {
			console.log(resp);
			//Do something with theData
		}
	});
}

// give the data back to client
function giveMeData(){

	$.ajax({
		url: "/api/all",
		type: "GET",
		data: JSON,
		error: function (err) {
			console.log(err);
			
		},
		success: function (data) {
			console.log(data);
			
		}
	});
	//Make an AJAX GET request to the server to a route that will send the DB data back as a JSON

}


$(document).ready(function(){
	console.log("Loaded!");
	testData();

	giveMeData();


	$("#mood-button").click(function(){

		console.log("mood-button was pressed");


		alert("Smile!!!!😃");

		var theMoodInput = $("#note-text").val();
		console.log(theMoodInput);

		//Make an object
		var theMoodData = {"mood": theMoodInput};
		console.log(theMoodData);
		//Call a function to send the object to the server
		sendTheData(theMoodData);
	});


});

