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
let testDuration = 5;
let interval;

function startCountdown(seconds) {
    testDuration = seconds;
    document.getElementById("time-options").classList.add("hidden");
    document.getElementById("countdown").classList.remove("hidden");
    let count = 3;
    let countdownInterval = setInterval(() => {
        document.getElementById("countdown").innerText = count;
        count--;
        if (count < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").classList.add("hidden");
            document.getElementById("click-area").classList.remove("hidden");
            startTest();
        }
    }, 1000);
}

function startTest() {
    clicks = 0;
    let startTime = new Date().getTime();
    interval = setInterval(() => {
        let elapsed = (new Date().getTime() - startTime) / 1000;
        if (elapsed >= testDuration) {
            clearInterval(interval);
            endTest();
        }
    }, 1000);
}

document.getElementById("click-area").addEventListener("click", () => {
    clicks++;
});

function endTest() {
    document.getElementById("main-content").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");
    let cps = (clicks / testDuration).toFixed(2);
    document.getElementById("final-score").innerHTML = `Hai fatto ${clicks} click con una media di ${cps} CPS!`;
}

function restartTest() {
    document.getElementById("results").classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    document.getElementById("time-options").classList.remove("hidden");
}