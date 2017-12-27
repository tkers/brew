var queryVars = getQueryVars();

var SERVING_VOLUME = toInt(queryVars['serving_volume'] || 200);

var GRIND_CHEMEX   = toInt(queryVars['grind_chemex']   || 21);
var GRIND_FRENCH   = toInt(queryVars['grind_french']   || 30);
var GRIND_HARIO    = toInt(queryVars['grind_hario']    || 14);
var GRIND_ESPRESSO = toInt(queryVars['grind_espresso'] || 5);

var RATIO_LIGHT    = toInt(queryVars['ratio_light']    || 16);
var RATIO_MEDIUM   = toInt(queryVars['ratio_medium']   || 14);
var RATIO_STRONG   = toInt(queryVars['ratio_strong']   || 12);

var DEFAULT_FADE_INTERVAL = 200;

function getQueryVars() {
  var query = window.location.search.substring(1);
  var kvs = query.split('&');
  return kvs.reduce(function (vars, kv) {
    var pair = kv.split('=');
    var qKey = decodeURIComponent(pair[0]);
    var qVal = decodeURIComponent(pair[1]);
    vars[qKey] = qVal;
    return vars;
  }, {});
}

function find(xs, f) {
  return Array.prototype.find.call(xs, f);
}

function isChecked(n) {
  return n.checked;
}

function findChecked(xs) {
  return find(xs, isChecked);
}

function getValue(n) {
  return n.value;
}

function toInt(n) {
  return parseInt(n, 10);
}

function getIntValue(n) {
  return toInt(getValue(n));
}

var fadeTimers = {};
function updateFade(elem, value, ms = DEFAULT_FADE_INTERVAL) {

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

  var methodIn = document.getElementsByName("methodIn");
  var servingsIn = document.getElementsByName("servingsIn");
  var strengthIn = document.getElementsByName("strengthIn");
  var courseOut = document.getElementById("courseOut");
  var volumeOut = document.getElementById("volumeOut");
  var gramsOut = document.getElementById("gramsOut");

  var method = getValue(findChecked(methodIn));
  var isChemex = method === "chemex";
  var isFrench = method === "french";
  var isHario = method === "hario";
  var isEspresso = method === "espresso";

  var course = isChemex ? GRIND_CHEMEX : isFrench ? GRIND_FRENCH : isHario ? GRIND_HARIO : isEspresso ? GRIND_ESPRESSO : 0;

  var servings = getIntValue(findChecked(servingsIn));
  var volume = servings * SERVING_VOLUME;

  var strength = getIntValue(findChecked(strengthIn));
  var isLight = strength === 1;
  var isMedium = strength === 2;
  var isStrong = strength === 3;

  var ratio = isLight ? RATIO_LIGHT : isMedium ? RATIO_MEDIUM : isStrong ? RATIO_STRONG : 0;

  var grams = volume / ratio;

  var displayCourse = course.toFixed(0).toString();
  if (courseOut.value !== displayCourse)
    updateFade(courseOut, displayCourse, 200);

  var displayVolume = volume.toFixed(0).toString();
  if (volumeOut.value !== displayVolume)
    updateFade(volumeOut, displayVolume, 200);

  var displayGrams = grams.toFixed(0).toString();
  if (gramsOut.value !== displayGrams)
    updateFade(gramsOut, displayGrams, 200);
}

window.onload = function () {
  var settingsForm = document.getElementById("settingsForm");
  settingsForm.onchange = updateNumbers;
  updateNumbers();
};
