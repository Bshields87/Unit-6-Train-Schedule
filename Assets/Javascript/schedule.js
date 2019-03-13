//on ready

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD6jlfyD-3S4AziudfEKY_fD70zSJdjcco",
    authDomain: "train-schedule-988d2.firebaseapp.com",
    databaseURL: "https://train-schedule-988d2.firebaseio.com",
    projectId: "train-schedule-988d2",
    storageBucket: "train-schedule-988d2.appspot.com",
    messagingSenderId: "55370344969"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //train info
    var trainName = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = $("#frequency-input").val();
    console.log(frequency);


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
   console.log("ARRIVAL TIME: " + nextTrain)


    //temp train info
    var newTrain = {
        title: trainName ,
        destination: destination,
        freq: frequency,
       next: nextTrain,
       timeLeft: tMinutesTillTrain,
    };

    database.ref().push(newTrain);

    console.log(newTrain.title);
    console.log(newTrain.destination);
    console.log(newTrain.freq);
    console.log(newTrain.next);
    console.log(newTrain.timeLeft)

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
   
    database.ref().on("child_added", function(childSnap){
        console.log(childSnap.val());
        var trainName = childSnap.val().title;
        var destination = childSnap.val().destination;
        var nextTrain = childSnap.val().next;
        var frequency = childSnap.val().freq;
       var tMinutesTillTrain = childSnap.val().timeLeft
    
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(frequency),
           $("<td>").text(nextTrain),
          $("<td>").text(tMinutesTillTrain),
          
        );
        $("#train-table > tbody").append(newRow)    
    });
    
    
});






