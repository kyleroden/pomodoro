//
document.querySelector("#content").style.backgroundColor = "dodgerblue";
let timer_screen = document.querySelector("#timer_screen");
timer_screen.textContent = "24:00";
let rest_screen = document.querySelector("#rest_screen");
rest_screen.textContent = "4:00";
let reset_btn = document.querySelector("#reset_button");
let start_btn = document.querySelector("#start_button");
console.log('loaded');
let state = "stopped"; //default: stopped . Addtnl values: paused, started,
let start_interval;
//create all necessary variables
//start working period timer
function start_work_timer(){
  console.log("start button clicked");
  if (state !== "started") {
    console.log("if started condition passed.");
    state = "started";
    let current_time = new Date();
    let minutes = current_time.getMinutes();
    let seconds = current_time.getSeconds();
    let timer_minutes = document.querySelector("#timer_screen").textContent.slice(0,2);
    console.log("minutes for timer: ", timer_minutes);
    console.log('starting timer');
    //get_time();
    start_interval = window.setInterval(function(){
      if(state === "started"); {
        if (seconds == 0){
          seconds = 59;
        }
        else if (seconds <= 59) {
          seconds -= 1;
        }
        //console.log(seconds);
        timer_screen.textContent = "22:" + seconds.toString();
      }
    }, 1000);
  }
  return;
};
//reset both timers, work and rest
function reset_timers(){
  console.log('resetting.');
  window.clearInterval(start_interval);
  rest_screen.textContent = "5:00";
  timer_screen.textContent = "25:00";
  state = "stopped";
};
//get current time
function get_time(){
  let current_time = new Date();
  let minutes = current_time.getMinutes();
  let seconds = current_time.getSeconds();
  console.log("minutes: ", minutes);
  console.log("seconds: ", seconds);
  return current_time;
}
//also should have start timer function, pause function and reset function
//add event listeners
reset_btn.addEventListener('click', reset_timers);
start_btn.addEventListener("click", start_work_timer);
