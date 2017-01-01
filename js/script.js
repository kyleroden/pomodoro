//
document.querySelector("#content").style.backgroundColor = "dodgerblue";
//create all necessary variables
const timer_screen = document.querySelector("#timer_screen");
const rest_screen = document.querySelector("#rest_screen");
const reset_btn = document.querySelector("#reset_button");
const start_btn = document.querySelector("#start_button");
const increase_time = document.querySelector("#increase_time");
const decrease_time = document.querySelector("#decrease_time");

let state = "stopped"; //default: stopped . Addtnl values: paused, started,
let start_interval;

timer_screen.textContent = "25:15";
rest_screen.textContent = "5:00";

//start working period timer
function start_work_timer(){
  console.log("start button clicked");
  if (state !== "started") {
    state = "started";
    //get the current time
    let current_time = new Date();
    let minutes = current_time.getMinutes();
    let seconds = current_time.getSeconds();

    let timer_minutes = parseInt(document.querySelector("#timer_screen").textContent.slice(0,2));
    let timer_seconds = parseInt(document.querySelector("#timer_screen").textContent.slice(3,5));
    //full string of timer screen string
    console.log("full timer string: " + document.querySelector("#timer_screen").textContent);
    console.log("length of timer string: " + document.querySelector("#timer_screen").textContent.length);

    console.log("minutes for timer: ", timer_minutes);
    console.log("seconds for timer: ", timer_seconds);

    console.log('starting timer');
    //get_time();
    start_interval = window.setInterval(function(){
      if(state === "started"); {
        //console.log("type of timer_seconds: ", typeof timer_seconds)
        if (timer_seconds == 0 && timer_minutes == 0){
          start_break_timer();
          return;
        }
        else if (timer_seconds == 0){
          timer_minutes--;
          timer_seconds = 59;
        }
        else if(timer_seconds <= 10) {
          timer_seconds -= 1;
          console.log("when timer seconds is 9 seconds or less, the type of the variable is: ", typeof timer_seconds);
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
        //console.log(seconds);
        timer_screen.textContent = timer_minutes.toString() + ":" + timer_seconds.toString();
      }
    }, 1000);

    //start_interval = countdown_timer(timer_seconds, timer_minutes, state);
  }
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
  window.setInterval(function(){
    if(state === "started"); {
      //console.log("type of timer_seconds: ", typeof timer_seconds)
      if (timer_seconds == 0 && timer_minutes == 0){
        return;
      }
      else if (timer_seconds == 0){
        timer_minutes--;
        timer_seconds = 59;
      }
      else if(timer_seconds <=9) {
        console.log("when timer seconds is 9 seconds or less, the type of the variable is: ", typeof timer_seconds);
      }
      else if (timer_seconds <= 59) {
        timer_seconds -= 1;
      }
      //console.log(seconds);
      timer_screen.textContent = timer_minutes.toString() + ":" + timer_seconds.toString();
    }
  }, 1000);
};
function start_break_timer(){
  console.log("break started.");
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
  //console.log("decrementing");
  let curr_minutes = timer_screen.textContent;
  console.log("curr_minutes length: ", curr_minutes.length);
  console.log(timer_screen);
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

function increment_time() {
  let timer_minutes = parseInt(document.querySelector("#timer_screen").textContent.slice(0,2));
  timer_minutes += 1;
  let current_seconds = timer_screen.textContent.slice(3,5);
  timer_screen.textContent = timer_minutes.toString() + ":" + current_seconds.toString();
}
//also should have start timer function, pause function and reset function
//add event listeners
reset_btn.addEventListener("click", reset_timers);
start_btn.addEventListener("click", start_work_timer);
increase_time.addEventListener("click", increment_time);
decrease_time.addEventListener("click", decrement_time);
