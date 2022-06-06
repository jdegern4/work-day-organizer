var events = {};


var loadEvents = function () {
    events = JSON.parse(localStorage.getItem("events"));

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

    // POPULATE EACH HOUR'S EVENT BOX WITH PREVIOUSLY SAVED EVENTS
    $.each(events, function(index, value) {
        
    });
};

var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
  };

var chkTime = function() {
    var currentTime = moment().hour();
    var startTime = 8;
    var timeDifference = currentTime - startTime;
    var eventTime = events[i];
    console.log(timeDifference);
}

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

// CLICKED OUT OF EDITING TIME BLOCK
/*$(".time-block").on("blur", "textarea", function() {
    // get current value of textarea
    var text = $(this).val();
  
    // get status type and position in the list
    var eventHour = $(this)
      .closest(".time-block");
    var index = $(this)
      .index();
  
    // update task in array and re-save to localstorage
    tasks[eventHour][index].text = text;
    saveTasks();
  
    // recreate section element
    var taskSection = $("<section>")
      .addClass("m-1")
      .text(text);
  
    // replace textarea with new content
    $(this).replaceWith(taskSection);
  }); */

  // CLICKED A SAVE BUTTON, SAVE EVENT FOR THAT HOUR
$(".saveBtn").click(function(event) {
    var eventInput = $(event.target).siblings("textarea");
    var eventText = $(event.target).siblings("textarea").val();
    var eventBox = $("<section>").addClass("time-block col-10 p-2").append(eventText);
    $(eventInput).replaceWith(eventBox);

    console.log(eventBox);
    saveEvents();
});


  // LOAD TASKS FOR THE FIRST TIME
  loadEvents();

  
  // UPDATE EVENT BLOCK COLORS EVERY 10 MINUTES
  /* setInterval(function() {
    $(".row .time-block").each(function() {
      chkTime($(this));
    });
  }, 300000); */