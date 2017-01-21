$(document).ready(function(){
  // RUBY DATA
var ingredients = rb_ingredients;
var steps = rb_steps;
var recipe_name = rb_recipe_name;
var owner_name = rb_owner_name;
var recipe_time = rb_recipe_time;
var recipe_serves = rb_recipe_serves;
const  INGREDIENTS = ingredients.split(",");
const  STEPS = steps.split(",");
// HTML ELEMENTS -- all elements used in file listed below
var $recipe_name = $(".recipe-name");
var $owner_name = $(".owner-name");
var $recipe_time = $(".recipe-time");
var $recipe_serves =$(".recipe-serves");
var $ingredients_list = $(".ingredients-list");
var $directions_list = $(".directions-list");
var $cooking_item = $(".cooking-item");
var $step_title = $("#step-title");
var $timer_wrap= $(".timer-wrap");
var $directions_next_nav = $(".directions-next-nav");
var $directions_back_nav = $(".directions-back-nav");
var $cooking_container = $(".cooking-container");
var $startcooking = $(".startcooking");
var $directions_container = $(".directions-container");
//INGREDIENTS ---------------------------------------------------------------------------------------------->
$(document).ready(function(){
  displayIngredients(INGREDIENTS);
  displayRecipeTitle(recipe_name,owner_name,recipe_time,recipe_serves);
  displayDirections(STEPS);
})


function displayIngredients(array){
  $.each(array,function(i,val){
    var li = document.createElement("li");
    li.className = "ingredients-list-item";
    li.innerHTML = val;
    $ingredients_list.append(li);
  })
}

function displayRecipeTitle(recipe_name,owner_name,recipe_time,recipe_serves){
  $recipe_name.html(recipe_name);
  $owner_name.html(owner_name);
  $recipe_time.html(recipe_time);
  $recipe_serves.html(recipe_serves);
}
//DIRECTIONS LIST ----------------------------------------------------------------------------------------->
function displayDirections(array){
  $.each(array,function(i,val){
    var li = document.createElement("li");
    li.className = "directions-list-item";
    li.innerHTML = val;
    $directions_list.append(li);
  })
}
// DIRECTIONS COOKING-------------------------------------------------------------------------------------->
var token = 0;
directionsNav(STEPS,token);

function directionsNav(STEPS,token){
  var array_ingredients = splitToSingleItems(INGREDIENTS);
  var array_directions = splitToSingleItems(STEPS[token].split(" "));
  console.log(array_directions)
  $cooking_item.html("");
  printDirections(array_directions,array_ingredients,$cooking_item,"highlight");

  $step_title.html("STEP 1");
  $directions_next_nav.click(function(){
    if(token < STEPS.length-1){
      token += 1;
      var step_title = token+1;
      displayStep(STEPS,step_title)
    }
  });
   $directions_back_nav.click(function(){
    if(token > 0){
      token -= 1;
      var step_title = token+1;
      displayStep(STEPS,step_title)
    }
  });

  function displayStep(STEPS,step_title){
    var $timer_wrap = document.createElement('div');
    $timer_wrap.innerHTML = "";
    var time = STEPS[token];
    var array_ingredients = splitToSingleItems(INGREDIENTS);
    var array_directions = splitToSingleItems(STEPS[token].split(" "));

    $cooking_item.html("");
    printDirections(array_directions,array_ingredients,$cooking_item,"highlight");
    //$cooking_item.html(STEPS[token][0]);
    $step_title.html("STEP "+ step_title);
    if(time > 0){
      timer(time);
    }
  }
}//end directions nav function

// HELPER FUNCTIONS ------------------------------------------------------------------------------------------------->
function splitToSingleItems(array){
  var result = [];
  for(var i = 0; i < array.length; i++){
    var split = array[i].split(" ");
    for(var j = 0; j < split.length; j++){
      var cleanstring = split[j].replace(/[^\w\s]/gi, '');
      result.push(cleanstring);
    }
  }
  return result;
}
function printDirections(array_directions,array_ingredients,$span_parent,span_name){
  for(var i = 0; i < array_directions.length; i++){
    var word = array_directions[i];
    var $word = document.createElement('span');

    $word.id = "word#"+i;
    $word.className = "cooking-item-word";
    $word.innerHTML =word + " ";
    if(array_ingredients.includes(word)){
      $word.className = "cooking-item-word "+span_name;
    }
    $span_parent.append($word);
  }
}
function timer(time){
  var $timer = document.createElement('div');
  var $start_timer = document.createElement('div');
  $timer_wrap.className = "timer-wrap";
  $timer.className = "timer";
  $start_timer.className = "start-timer"
  $start_timer.innerHTML = "START TIMER";
  $timer.innerHTML = time;
  $timer_wrap.append($timer);
  $timer_wrap.append($start_timer);
  $step_title.after($timer_wrap);
}
//click to start cooking
$cooking_container.css("display","none");
$startcooking.click(function(){
  $directions_container.css("display","none");
  $cooking_container.css("display","");
})
})
