
var isPaused = true;


function evaluate(input, output) {
  if ( isPaused ) {
    return;
  }

  // If following (or snapping to) a route, use that as remaining values
  if ( input.navigation == 3 || input.navigation == 7) {
    output.remaining_distance = input.nav_remaining_distance;
    output.remaining_ascent = input.nav_remaining_ascent;
    output.remaining_descent = input.nav_remaining_descent;
  }
  // If not navigating, use values set by user in the App
  else {
    output.remaining_distance = Number(localStorage.getItem("planned_distance")) - input.distance;
    output.remaining_ascent = Number(localStorage.getItem("planned_ascent")) - input.ascent;
    output.remaining_descent = Number(localStorage.getItem("planned_descent")) - input.descent;
  }

  // equivalent speed is in km/h
  var eq_speed = (input.distance / 1000) + ((input.ascent / 100) * 0.6) + ((input.descent / 100) * 0.4) / (input.duration / 3600);
  // predicted durations are always in seconds
  output.ete = ((output.remaining_distance / 1000) + ((output.remaining_ascent / 100) * 0.6) + ((output.remaining_descent / 100) * 0.4) / eq_speed) * 3600;
  output.ett = (((input.distance + output.remaining_distance) / 1000) + (((input.ascent +output.remaining_ascent) / 100) * 0.6) + (((input.descent + output.remaining_descent) / 100) * 0.4) / eq_speed) * 3600;
}


function onLoad(input, output) {
  output.ett = 0;
  output.ete = 0;
  output.remaining_distance = 0;
  output.remaining_ascent = 0;
  output.remaining_descent = 0;
}


function onExerciseStart()
{
  isPaused = false;
}


function onExercisePause()
{
  isPaused = true;
}


function onExerciseContinue()
{
  isPaused = false;
}


function getUserInterface() {
  return {
    template: 't',
    tl: {input: 'output/remaining_ascent', format: 'Ascent_Sixdigits'},
    tr: {input: 'output/remaining_descent', format: 'Descent_Sixdigits'},
    ml: {input: 'output/ete', format: 'Duration_Accurate'},
    mr: {input: 'output/ett', format: 'Duration_Accurate'},
    bottom: {input: 'Activity/Move/-1/Duration/Current', format: 'Duration_Accurate'}
  };
}


function getSummaryOutputs(input, output) {
}
