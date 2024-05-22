$(document).ready(function () {

  var SnakeDirection = "right";
  var SnakeXPositon = 1;
  var SnakeYPositon = 1;

  var TheSnake = [];
  var SnakeLength = 5;

  var LastKeyPress = 0;


  ///=========================================

  
  function addFood() {
    var Random_X = Math.floor(Math.random() * 20);
    var Random_Y = Math.floor(Math.random() * 20);

    $(".a_square").removeClass("has_food");

    $("#x_" + Random_X + "_y_" + Random_Y).addClass("has_food");
  }

  function UpdateSnakeHead() {
    if (SnakeDirection === "up") {
      SnakeYPositon--;
    }
    if (SnakeDirection === "down") {
      SnakeYPositon++;
    }
    if (SnakeDirection === "left") {
      SnakeXPositon--;
    }
    if (SnakeDirection === "right") {
      SnakeXPositon++;
    }

    if (SnakeXPositon > 19) {
      SnakeXPositon = 0;
    }
    if (SnakeXPositon < 0) {
      SnakeXPositon = 19;
    }

    if (SnakeYPositon > 19) {
      SnakeYPositon = 0;
    }
    if (SnakeYPositon < 0) {
      SnakeYPositon = 19;
    }
  }


  //----------- DRAW FIRST GAME
  for (var y = 0; y < 20; y++) {

    var rowString = "";
    for (var x = 0; x < 20; x++) {
      rowString += "<div class='a_square' id='x_" + x + "_y_" + y + "'></div>";
    }
    $("#game_board").append("<div class='a_row'>" + rowString + "</div>");
  }

  addFood();


  //-------FOOD LOOP
  var FoodInterval = setInterval(function () {
    addFood();
  }, 15000);


  //--------GAME LOOP
  var GameInterval = setInterval(function () {
    if (LastKeyPress === 38) {
      if (SnakeDirection!=="down") {
        SnakeDirection = "up";
      }
      console.log("up");
      // up arrow
    }
    else if (LastKeyPress === 40) {
      if (SnakeDirection!=="up") {
        SnakeDirection = "down";
      }
      console.log("down");
      // down arrow
    }
    else if (LastKeyPress === 37) {
      if (SnakeDirection!=="right") {
        SnakeDirection = "left";
      }
      console.log("left");
      // left arrow
    }
    else if (LastKeyPress === 39) {
      if (SnakeDirection!=="left") {
        SnakeDirection = "right";
      }
      console.log("right");
      // right arrow
    }

    UpdateSnakeHead();

    $(".a_square").removeClass("a_snake");

    if ($("#x_" + SnakeXPositon + "_y_" + SnakeYPositon).hasClass("has_food")) {
      addFood();
      SnakeLength = SnakeLength + 5;
      console.log("ate food");
    }

    TheSnake.push("#x_" + SnakeXPositon + "_y_" + SnakeYPositon);
    if (TheSnake.length>SnakeLength) {
      TheSnake.shift();
    }
    console.log(TheSnake);

    for (var i=0; i<TheSnake.length; i++) {
      if ($(TheSnake[i]).hasClass("a_snake")) {
        clearInterval(GameInterval);
        clearInterval(FoodInterval);
        $("#game_over").show();

      }
      $(TheSnake[i]).addClass("a_snake");
    }

  }, 100);




  //------------------ KEYPRESS STUFF
  document.onkeydown = checkKey;

  function checkKey(e) {

    e = e || window.event;
    LastKeyPress = e.keyCode;

  }

});