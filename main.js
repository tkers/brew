function find(xs, f) {
  return Array.prototype.find.call(xs, f);
}

function isChecked(n) {
  return n.checked;
}

function getIntValue(n) {
  return parseInt(n.value, 10);
}

function updateNumbers() {

  var servingsIn = document.getElementsByName("servingsIn");
  var ratioIn = document.getElementsByName("ratioIn");
  var volumeOut = document.getElementById("volumeOut");
  var gramsOut = document.getElementById("gramsOut");

  var servings = getIntValue(find(servingsIn, isChecked));
  var ratio = 1 / getIntValue(find(ratioIn, isChecked));

  var volume = servings * 200;
  var grams = volume * ratio;

  volumeOut.value = volume.toFixed(0);
  gramsOut.value = grams.toFixed(0);
}

window.onload = function () {
  var settingsForm = document.getElementById("settingsForm");
  settingsForm.onchange = updateNumbers;
  updateNumbers();
};
