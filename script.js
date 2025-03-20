let progress = 0;
function loadProgress() {
    if (progress < 100) {
        progress++;
        document.getElementById("progress").style.width = progress + "%";
        document.getElementById("progress-text").innerText = progress + "%";
        setTimeout(loadProgress, 30);
    } else {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    }
}
setTimeout(loadProgress, 500);

let clicks = 0;
let startTime = 0;
let testDuration = 5;
let interval;

function startTest(seconds) {
    testDuration = seconds;
    document.getElementById("timer").innerHTML = `${seconds}<br>Timer`;
    clicks = 0;
    document.getElementById("cps").innerHTML = `0<br>Click/s`;
    document.getElementById("score").innerHTML = `0<br>Score`;
    startTime = new Date().getTime();
    interval = setInterval(updateTimer, 1000);
}

document.getElementById("click-area").addEventListener("click", function() {
    if (startTime === 0) return;
    clicks++;
    document.getElementById("score").innerHTML = `${clicks}<br>Score`;
});

function updateTimer() {
    let elapsed = (new Date().getTime() - startTime) / 1000;
    let remaining = testDuration - elapsed;
    if (remaining <= 0) {
        clearInterval(interval);
        document.getElementById("timer").innerHTML = `0<br>Timer`;
    } else {
        document.getElementById("timer").innerHTML = `${Math.ceil(remaining)}<br>Timer`;
        document.getElementById("cps").innerHTML = `${(clicks / elapsed).toFixed(2)}<br>Click/s`;
    }
}