var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {


    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Button clicked , store id and push to Array
$(".btn").click(function() {
  // store id of button clicked
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern.
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    // check that they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
  }
}


// random color
function nextSequence() {
// when triggered, reset  userClickedPattern ready for the next level
userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Add animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


function playSound(name) {
  // Add sounds
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
};


function animatePress(currentColour) {
  // add class"pressed" to clicked button
  $("#" + currentColour).addClass("pressed");

  // 100 ms delay
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 90);
}


function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
