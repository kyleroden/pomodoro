'use strict';

//create all necessary variables
const timer_screen = document.querySelector("#timer_screen");
const rest_screen = document.querySelector("#rest_screen");
const reset_btn = document.querySelector("#reset_button");
const start_btn = document.querySelector("#start_button");
const increase_time = document.querySelector("#increase_btn");
const decrease_time = document.querySelector("#decrease_btn");
const instructions = document.querySelector("#instructions");

let state = "stopped"; //default: stopped . Addtnl values: started and on_break
let start_interval;

timer_screen.textContent = "25:00";
rest_screen.textContent = "5:00";

//start working period timer
function start_work_timer(){
  console.log("start button clicked");
  if(state !== "started") {
    state = "started";
    //get the current time
    let current_time = new Date();
    let minutes = current_time.getMinutes();
    let seconds = current_time.getSeconds();

    let timer_minutes = parseInt(document.querySelector("#timer_screen").textContent.slice(0,2));
    let timer_seconds = parseInt(document.querySelector("#timer_screen").textContent.slice(3,5));
    //decrease the value of seconds and minutes
    start_interval = window.setInterval(function(){
      if(state === "started") {
        if (timer_seconds == 0 && timer_minutes == 0){
          start_break_timer("00", "5", "on_break");
          state = "on_break";
          return;
        }
        else if (timer_seconds == 0){
          timer_minutes--;
          timer_seconds = 59;
        }
        else if(timer_seconds <= 10) {
          timer_seconds -= 1;
          let tmp = timer_seconds.toString();
          let tmp_array = [];
          for(let i = 0; i < tmp.length; i++) {
            tmp_array.push(tmp[i]);
          }
          tmp_array.unshift("0");
          timer_seconds = tmp_array.join("");
        }
        else if (timer_seconds <= 59) {
          timer_seconds -= 1;
        }
        timer_screen.textContent = timer_minutes.toString() + ":" + timer_seconds.toString();
      } else {
        return;
      }
    }, 1000);
  }
  //this ensures that if user clicks start again, a new timer does not begin.
  console.log("start button clicked, but timer is already started.");
  return;
};
//reset both timers, work and rest
function reset_timers(){
  console.log('resetting.');
  window.clearInterval(start_interval);
  state = "stopped";
  rest_screen.textContent = "5:00";
  timer_screen.textContent = "25:00";
};
function countdown_timer(timer_seconds, timer_minutes, state) {
  console.log("countdown_timer func called");
  console.log("state is: ", state)
  console.log("timer_seconds is: ", timer_seconds);
  console.log("timer_minutes is: ", timer_minutes);

  if(state === "started") {
    if (timer_seconds == 0 && timer_minutes == 0){
      start_break_timer(timer_seconds, timer_minutes, state);
      return;
    }
    else if (timer_seconds == 0){
      timer_minutes--;
      timer_seconds = 59;
    }
    else if(timer_seconds <= 10) {
      timer_seconds -= 1;
      let tmp = timer_seconds.toString();
      tmp_array = [];
      for(let i = 0; i < tmp.length; i++) {
        tmp_array.push(tmp[i]);
      }
      tmp_array.unshift("0");
      timer_seconds = tmp_array.join("");
    }
    else if (timer_seconds <= 59) {
      timer_seconds -= 1;
    }
    timer_screen.textContent = timer_minutes.toString() + ":" + timer_seconds.toString();
  }
};

function start_break_timer(timer_seconds, timer_minutes, state){
  console.log("break started. Current seconds: ", timer_seconds, "timer minutes: ", timer_minutes, "state: ", state);
  document.querySelector("#content").style.backgroundColor = "#FFAB1E";
  window.clearInterval(start_interval);
  let rest_screen = document.querySelector("#rest_screen");
  let break_interval = window.setInterval(function(){
    if (timer_seconds == 0 && timer_minutes == 0){
      //start_break_timer(timer_seconds, timer_minutes, state);
      return;
    }
    else if (timer_seconds == 0){
      timer_minutes--;
      timer_seconds = 59;
    }
    else if(timer_seconds <= 10) {
      timer_seconds -= 1;
      let tmp = timer_seconds.toString();
      let tmp_array = [];
      for(let i = 0; i < tmp.length; i++) {
        tmp_array.push(tmp[i]);
      }
      tmp_array.unshift("0");
      timer_seconds = tmp_array.join("");
    }
    else if (timer_seconds <= 59) {
      timer_seconds -= 1;
    }
    rest_screen.textContent = timer_minutes.toString() + ":" + timer_seconds.toString();
  }, 1000);
}
//get current time
function get_time(){
  let current_time = new Date();
  let minutes = current_time.getMinutes();
  let seconds = current_time.getSeconds();
  console.log("minutes: ", minutes);
  console.log("seconds: ", seconds);
  return current_time;
}
//add time to pomodoro session time
function decrement_time() {
  //if the user has clicked decrement (or increment) while a timer has already started, notify that a new timer must be started to adjust time
  if(state === "started") {
    //store the default instructions so we can return the textContent to default instructions after warning
    let default_instructions = instructions.textContent;
    //set warning instructions
    instructions.textContent = "Warning: once started, pomodoro timer cannot be adjusted.";
    let timeout_id;
    //reverts instructions to their original state
    function reset_instructions() {
      instructions.textContent = default_instructions;
      clear_warning();
    }
    //allows warning to display for 2.5 seconds before reverting instructions to their default value
    function start_warning() {
      timeout_id = window.setTimeout(reset_instructions, 2500);
    }
    //stops timeout event in window
    function clear_warning() {
      window.clearTimeout(timeout_id);
    }
    //changes instructions text to warn user that timer can't be adjusted after starting
    start_warning();
    return;
}
  else {
    let curr_minutes = timer_screen.textContent;
    if(curr_minutes.length < 5) {
      let timer_minutes = parseInt(timer_screen.textContent.slice(0,1));
      timer_minutes -= 1;
      let current_seconds = timer_screen.textContent.slice(2,4);
      timer_screen.textContent = timer_minutes.toString() + ":" + current_seconds.toString();
    }
    else {
    //if the length is 5 or greater, than we don't need to add a 0 to the seconds digit
    let timer_minutes = parseInt(timer_screen.textContent.slice(0,2));
    timer_minutes -= 1;
    let current_seconds = timer_screen.textContent.slice(3,5);
    timer_screen.textContent = timer_minutes.toString() + ":" + current_seconds.toString();
    }
  }
}

function increment_time() {
  if(state === "started") {
    //store the default instructions so we can return the textContent to default instructions after warning
    let default_instructions = instructions.textContent;
    //set warning instructions
    instructions.textContent = "Warning: once started, pomodoro timer cannot be adjusted.";
    let timeout_id;
    //reverts instructions to their original state
    function reset_instructions() {
      instructions.textContent = default_instructions;
      clear_warning();
    }
    //allows warning to display for 2.5 seconds before reverting instructions to their default value
    function start_warning() {
      timeout_id = window.setTimeout(reset_instructions, 2500);
    }
    //stops timeout event in window
    function clear_warning() {
      window.clearTimeout(timeout_id);
    }
    //changes instructions text to warn user that timer can't be adjusted after starting
    start_warning();
  return;
}
  else {
    let timer_minutes = parseInt(document.querySelector("#timer_screen").textContent.slice(0,2));
    timer_minutes += 1;
    let current_seconds = timer_screen.textContent.slice(3,5);
    timer_screen.textContent = timer_minutes.toString() + ":" + current_seconds.toString();
  }
}
//this following function is part of my attempt to refactor the main setInterval functions
function simple_timer(timer_seconds, timer_minutes, state){
  console.log("called simple_timer");
  if (timer_seconds == 0 && timer_minutes == 0){
    //start_break_timer(timer_seconds, timer_minutes, state);
    return;
  }
  else if (timer_seconds == 0){
    timer_minutes--;
    timer_seconds = 59;
  }
  else if(timer_seconds <= 10) {
    timer_seconds -= 1;
    let tmp = timer_seconds.toString();
    tmp_array = [];
    for(let i = 0; i < tmp.length; i++) {
      tmp_array.push(tmp[i]);
    }
    tmp_array.unshift("0");
    console.log("temp array: ", tmp_array);
    timer_seconds = tmp_array.join("");
  }
  else if (timer_seconds <= 59) {
    timer_seconds -= 1;
  }
};
//add event listeners
reset_btn.addEventListener("click", reset_timers);
start_btn.addEventListener("click", start_work_timer);
increase_time.addEventListener("click", increment_time);
decrease_time.addEventListener("click", decrement_time);

console.log("Easter egg: Hire me. kyleroden77@gmail.com");
