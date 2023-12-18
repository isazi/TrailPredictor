
var isPaused = true;


function evaluate(input, output) {
  if ( isPaused ) {
    return;
  }

  // If following (or snapping to) a route, use that as remaining values
  if ( input.navigation == 3 || input.navigation == 7) {
    output.remaining_distance = input.nav_remaining_distance;
    output.remaining_ascent = input.nav_remaining_ascent;
  }
  // If not navigating, use values set by user in the App
  else {
    output.remaining_distance = Number(localStorage.getItem("planned_distance")) - input.distance;
    output.remaining_ascent = Number(localStorage.getItem("planned_ascent")) - input.ascent;
  }

  var eqSPEED = (((input.distance / 1000) + input.ascent) / 100) / (input.duration / 3600)
  output.predicted_duration = input.duration + (((output.remaining_distance + output.remaining_ascent) / 100) / eqSPEED);
}


function onLoad(input, output) {
  output.predicted_duration = 0;
  output.remaining_distance = 0;
  output.remaining_ascent = 0;
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
    tl: {input: 'output/remaining_distance', format: 'Distance_Accurate'},
    tr: {input: 'output/remaining_ascent', format: 'Ascent_Sixdigits'},
    mid: {input: 'output/predicted_duration', format: 'Duration_Accurate'},
    bottom: {input: 'Activity/Move/-1/Duration/Current', format: 'Duration_Accurate'}
  };
}


function getSummaryOutputs(input, output) {
}
