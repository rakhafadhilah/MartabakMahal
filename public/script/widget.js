function init(){
	document.getElementById("terjual").appendChild(terjualDisplay);
	terjualDisplay = document.createTextNode("");
	timeDisplay = document.createTextNode("");
	document.getElementById("clock").appendChild(timeDisplay);
	dateDisplay = document.createTextNode("");
	document.getElementById("date").appendChild(dayDisplay)
}

function updateClock(){
  var currentTime = new Date();

  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

  // Update the time display
  document.getElementById("clock").firstChild.nodeValue = currentTimeString;
}

function updateDate(){
	var d = new Date();
	var weekday = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]
	var month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
	var currentDay = weekday[d.getDay()];
	var currentDate = d.getDate()
	var currentMonth = month[d.getMonth()];
	var currentYear = d.getFullYear();
	
	currentDateString = currentDay + ", " + currentDate + " " + currentMonth + " " + currentYear;
	document.getElementById("date").firstChild.nodeValue = currentDateString;
}

function updateTerjual(){
	var terjual = 0;
	var i;
	for (i = 0; i < foods.length; i++) {
		terjual += foods[i].terjual;
	};
	var terjualString = "Terjual: " + terjual;
	document.getElementById("terjual").firstChild.nodeValue = terjualString;
}