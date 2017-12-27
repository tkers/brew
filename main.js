var CUP_VOLUME_ML = 150
var FADE_DURATION_MS = 200

function find(xs, f) {
  return Array.prototype.find.call(xs, f);
}

function isChecked(n) {
  return n.checked;
}

function getIntValue(n) {
  return parseInt(n.value, 10);
}

var fadeTimers = {};
function updateFade(elem, value, ms) {

  if (elem.value === "") {
    elem.value = value;
    return;
  }

  if (fadeTimers[elem.id])
    clearTimeout(fadeTimers[elem.id]);

  elem.style.opacity = 0;

  fadeTimers[elem.id] = setTimeout(function () {
    elem.value = value;
    elem.style.opacity = 1;
    fadeTimers[elem.id] = null;
  }, ms);
}

function updateNumbers() {

  var servingsIn = document.getElementsByName("servingsIn");
  var ratioIn = document.getElementsByName("ratioIn");
  var volumeOut = document.getElementById("volumeOut");
  var gramsOut = document.getElementById("gramsOut");

  var servings = getIntValue(find(servingsIn, isChecked));
  var ratio = 1 / getIntValue(find(ratioIn, isChecked));

  var volume = servings * CUP_VOLUME_ML;
  var grams = volume * ratio;

  var displayVolume = volume.toFixed(0).toString();
  if (volumeOut.value !== displayVolume)
    updateFade(volumeOut, displayVolume, FADE_DURATION_MS);

  var displayGrams = grams.toFixed(0).toString();
  if (gramsOut.value !== displayGrams)
    updateFade(gramsOut, displayGrams, FADE_DURATION_MS);
}

window.onload = function () {
  var settingsForm = document.getElementById("settingsForm");
  settingsForm.onchange = updateNumbers;
  updateNumbers();
};
