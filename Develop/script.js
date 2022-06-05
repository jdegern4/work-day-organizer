var tasks = {};


var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    // IF NOTHING IN LOCALSTORAGE, CREATE NEW ARRAY FOR HOURLY EVENTS
    if (!tasks) {
        tasks = {
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

    $.each(tasks, function(list, arr) {
        arr.forEach(function(task) {
            createTask
        });
    });
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

var chkTime = function() {
    var currentTime = moment();
    console.log(currentTime);
}

// TIME BLOCK WAS CLICKED, BEGIN EDITING TEXT
$(".time-block").on("click", function() {
    // GET CURRENT TEXT OF CLICKED TIME BLOCK
    var text = $(this)
        .text()
        .trim();
    console.log(text);

    // CHANGE TO TEXTAREA TO EDIT TEXT
    var textInput = $("<textarea>").val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

// CLICKED OUT OF EDITING TIME BLOCK
$(".time-block").on("blur", "textarea", function() {
    // get current value of textarea
    var text = $(this).val();
  
    // get status type and position in the list
    var eventHour = $(this)
      .closest(".time-block")
      .attr("id")
      .replace("list-", "");
    var index = $(this)
      .index();
  
    // update task in array and re-save to localstorage
    tasks[eventHour][index].text = text;
    saveTasks();
  
    // recreate p element
    var taskSection = $("<section>")
      .addClass("m-1")
      .text(text);
  
    // replace textarea with new content
    $(this).replaceWith(taskSection);
  });

  /*$(".saveBtn").click(function() {
    var eventText = 
  }); */


  // LOAD TASKS FOR THE FIRST TIME
  loadTasks();

  
  // UPDATE EVENT BLOCK COLORS EVERY 10 MINUTES
  setInterval(function() {
    $(".row .time-block").each(function() {
      chkTime($(this));
    });
  }, 600000);