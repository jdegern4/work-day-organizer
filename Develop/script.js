var events = [];
var currentDay = $("#currentDay");
currentDay.text(moment().format("dddd, MMMM Do"));
console.log(currentDay.text);

var loadEvents = function() {
  // events = JSON.parse(localStorage.getItem("events"));
  // IF NOTHING IN LOCALSTORAGE, CREATE NEW ARRAY FOR HOURLY EVENTS
  
  if (!events) {
    events = {
      eightAM: [],
      nineAM: [],
      tenAM: [],
      elevenAM: [],
      twelvePM: [],
      onePM: [],
      twoPM: [],
      threePM: [],
      fourPM: [],
      fivePM: [],
    };
  };
  $("#8 .time-block").text(localStorage.getItem("8"));
  $("#9 .time-block").text(localStorage.getItem("9"));
  $("#10 .time-block").text(localStorage.getItem("10"));
  $("#11 .time-block").text(localStorage.getItem("11"));
  $("#12 .time-block").text(localStorage.getItem("12"));
  $("#13 .time-block").text(localStorage.getItem("13"));
  $("#14 .time-block").text(localStorage.getItem("14"));
  $("#15 .time-block").text(localStorage.getItem("15"));
  $("#16 .time-block").text(localStorage.getItem("16"));
  $("#17 .time-block").text(localStorage.getItem("17"));
}

var saveEvents = function () {
  localStorage.setItem("events", JSON.stringify(events));
};

var chkTime = function () {
  var currentHour = moment().hour();
  
  $("section").each(function(index) {
    var sectionTime = $(this).parent().attr("id");
    if (sectionTime < currentHour) {
      $(this).addClass("past");
    } else if (sectionTime === currentHour) {
      $(this).addClass("present");
    } else if (sectionTime < currentHour) {
      $(this).addClass("future");
    };
    
  });
};

// TIME BLOCK WAS CLICKED, BEGIN EDITING TEXT
$(".time-block").on("click", function() {
  // GET CURRENT TEXT OF CLICKED TIME BLOCK
  var text = $(this)
    .text()
    .trim();


  // CHANGE TO TEXTAREA TO EDIT TEXT
  var textInput = $("<textarea>").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

// CLICKED A SAVE BUTTON, SAVE EVENT FOR THAT HOUR
$(".saveBtn").click(function(event) {
  var eventInput = $(event.target).siblings("textarea");
  var eventText = $(event.target).siblings("textarea").val();
  var eventBox = $("<section>").addClass("time-block col-10 p-2").append(eventText);
  var sectionTime = $(event.target).parent().attr("id");
  $(eventInput).replaceWith(eventBox);
  console.log(eventText);
  console.log(eventBox);
  console.log(sectionTime);
  localStorage.setItem(sectionTime, eventText);
  saveEvents();
});


// LOAD EVENTS FOR THE FIRST TIME
loadEvents();
chkTime();

  // UPDATE EVENT BLOCK COLORS EVERY 10 MINUTES
 setInterval(function() {
   $(".row .time-block").each(function() {
     chkTime($(this));
   });
 }, 5000);