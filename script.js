// add javascript here
let name = prompt('Please enter your name here:') || 'Player';
name = name[0].toUpperCase() + name.slice(1).toLowerCase();
let answer = 0;
let guessCount = 0;
let range = 0;
let startTime = 0;
const scores = [];
const times = [];
time();
setInterval(time, 1000);

document.getElementById("playBtn").addEventListener
("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
document.getElementById("guess").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        makeGuess();
    }
});

function giveUp(){
    updateTimers(new Date().getTime())
    resetGame();
    updateScore(range);
}

function play(){
    let levels = document.getElementsByName("level");
    startTime = new Date().getTime();
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }
    setMsg("Guess a number 1-" + range + " " + name); 
    answer = Math.floor(Math.random()*range) +1; 
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess)){
        setMsg("Please enter a valid number");
        return;
    } else if (guess < 1 || guess > range){
        setMsg("The number you entered is outside the range");
        return;
    }
    guessCount++; 
    if (guess == answer){
        setMsg("Correct " + name + "! It took " + guessCount + " tries.", true);
        updateScore(guessCount);
        updateTimers(new Date().getTime())
        resetGame();
    }
    else if (guess < answer){
        if (Math.abs(guess-answer) <= 2){
            setMsg("Too low, try again " + name + ". You were hot.");
    }   else if (Math.abs(guess-answer) <= 5){
            setMsg("Too low, try again " + name + ". You were warm.");
    }   else if (Math.abs(guess-answer) > 5){
            setMsg("Too low, try again " + name + ". You were cold.");
    }
    }   
    else{
        if (Math.abs(guess-answer) <= 2){
            setMsg("Too high, try again " + name + ". You were hot.");
    }   else if (Math.abs(guess-answer) <= 5){
            setMsg("Too high, try again " + name + ". You were warm.");
    }   else if (Math.abs(guess-answer) > 5){
            setMsg("Too high, try again " + name + ". You were cold.");
    }
    }
}

function updateScore(score){
    scores.push(score);
    wins.textContent = 'Total wins: ' + scores.length;
    let sum = 0;
    for(let i = 0; i<scores.length; i++){
        sum += scores[i]
    }
    avgScore.textContent = "Average score: " + (sum/scores.length).toFixed(1);
    scores.sort(function(a,b){return a-b});
    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if (i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
}

function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
}

function time(){
    let d = new Date();
    let suffix = '';
    if (d.getDate() == 11 || d.getDate() == 12 || d.getDate() == 13){
        suffix = 'th';
    } else if (d.getDate() % 10 == 1){
        suffix = 'st';
    } else if (d.getDate() % 10 == 2){
        suffix = 'nd';
    } else if (d.getDate() % 10 == 3){
        suffix = 'rd';
    } else{
        suffix = 'th'
    }
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date.textContent = months[d.getMonth()] + " " + d.getDate() + suffix + ', ' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}

function updateTimers(endMs){
    let elapsedTime = endMs - startTime;
    let timeSum = 0;
    times.push(elapsedTime);
    times.sort(function(a,b){return a-b});
    for(let i = 0; i<times.length; i++){
        timeSum += times[i];
    }
    avgTime.textContent = "Average time: " + (timeSum/times.length).toFixed(1) + " ms";
    fastest.textContent = "Fastest time: " + times[0].toFixed(1) + " ms";
}

function setMsg(text, celebrate = false) {
    msg.classList.remove('msg-animate', 'win-celebrate');
    void msg.offsetWidth;
    msg.textContent = text;
    msg.classList.add('msg-animate');
    if (celebrate) {
        msg.classList.add('win-celebrate');
    }
}