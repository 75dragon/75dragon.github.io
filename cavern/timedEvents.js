setTimeout(eventA, 2000);
setTimeout(eventB, 4000);
setTimeout(eventC, 4000);

function eventA() {
  sendEvent("darkness")
}

function eventB() {
  sendEvent("fatigue")
}

function eventC() {
  sendEvent("dizzy")
}
