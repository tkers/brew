function updateNumbers() {

  var servingsIn = document.getElementById("servingsIn");
  var servingsOut = document.getElementById("servingsOut");
  var volumeOut = document.getElementById("volumeOut");

  var ratioIn = document.getElementById("ratioIn");
  var ratioOut = document.getElementById("ratioOut");
  var gramsOut = document.getElementById("gramsOut");

  var servings = servingsIn.valueAsNumber;
  var ratio = ratioIn.valueAsNumber;

  var volume = servings * 200;
  var grams = volume / ratio;

  servingsOut.value = servings.toFixed(1);
  volumeOut.value = volume.toFixed(0);
  ratioOut.value = ratio.toFixed(1);
  gramsOut.value = grams.toFixed(0);
}

window.onload = function () {
  var settingsForm = document.getElementById("settingsForm");
  settingsForm.oninput = updateNumbers;
  updateNumbers();
};
