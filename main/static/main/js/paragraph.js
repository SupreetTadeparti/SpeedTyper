const words = []
let wordList = document.querySelectorAll('.word');
let typingInput = document.getElementById('typing-input');
let typingText = document.getElementById('typing-text');
let timer = document.querySelector('.timer')
let highlightedNumber = 0;
let errorCount = 0;
let wordCount = 0;
let first = true;

typingInput.focus();
wordList[highlightedNumber].style.backgroundColor = "lightgray";
typingInput.addEventListener('keypress', function(event) {
    first ? startTimer() : null;
    if (event.keyCode == 32) {
        let currentWord = typingInput.value.replace(' ', '');
        typingInput.value = '';
        if (currentWord != wordList[highlightedNumber].textContent.replace(' ', '')) {
            wordList[highlightedNumber].style.color = "red";
            errorCount += 1;
        } else {
            wordList[highlightedNumber].style.color = "green";
        }
        highlightedNumber += 1;
        wordList[highlightedNumber].style.backgroundColor = "lightgray";
        wordList.forEach(function(_, index) {
            if (index !== highlightedNumber) {
                wordList[index].style.backgroundColor = "";
            }
        })
        wordCount++;
    }
});

let seconds = 0;
let minutes = 0;
let stopwatch;
function startTimer() {
    first = false;
    timer.style.display = 'block';
    seconds < 10 ? second = `0${seconds}` : second = seconds;
    minutes < 10 ? minute = `0${minutes}` : minute = minutes;
    timer.innerHTML = minute+":"+second;
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
        timer.innerHTML = minute+':'+second;
    }
    seconds += 1;
    if (highlightedNumber >= wordList.length) {
        typingInput.disabled = true;
        let allEntries = 0;
        for (var i=0; i<wordList.length; i++) {
            for(var j=0; j<wordList[i].textContent.length; j++) {
                allEntries++;
            }
        }
        let accuracy = Math.ceil((((wordCount - errorCount)/wordCount) * 100));
        let timeInMinutes = minutes + seconds/60;
        let finalRawResult = Math.ceil(wordCount/timeInMinutes);
        let finalResult = Math.ceil((wordCount-errorCount)/timeInMinutes);

        var CSRFtoken = $('input[name=csrfmiddlewaretoken]').val();
        $.post('../wpm', {
            wpm: finalResult,
            url: 'paragraph',
            csrfmiddlewaretoken: CSRFtoken
        });

        document.querySelector('.result-container').style.display = "block";
        document.querySelector('.result').innerHTML = finalResult+" WPM";
        document.querySelector('.raw').innerHTML = "Raw speed : "+finalRawResult+" WPM";
        document.querySelector('.accuracy').innerHTML = "Accuracy : "+accuracy+"%";
        let keyboardImage = document.querySelector('.keyboard-image');
        let level = document.querySelector('.level')
        let testSpan = document.getElementById('tests-span');
        let testsTaken = parseInt(testSpan.innerHTML);
        testSpan.innerHTML = parseInt(testSpan.innerHTML) + 1;
        if (testSpan.innerHTML.slice(-1) === "5" || testSpan.innerHTML.slice(-1) === "0") {
            testsTaken = 3;
        }
        document.getElementById('wpm-span').innerHTML = Math.ceil((averageWPM * (testsTaken - 1) + parseInt(finalResult)) / testsTaken);
        if (accuracy < 50) {
            keyboardImage.setAttribute('src', "../static/main/img/noob-keyboard.png");
            level.textContent = "NOOB!";
            document.querySelector('.result-container').style.backgroundColor = "rgba(255, 166, 0, 0.8)";
            return
        }
        if (finalResult < 20) {
            keyboardImage.setAttribute('src', "../static/main/img/baby-keyboard.png");
            level.textContent = "Baby";
            document.querySelector('.result-container').style.backgroundColor = "rgba(255, 166, 0, 0.8)";
            return
        }
        if (finalResult > 20 && finalResult <= 60) {
            keyboardImage.setAttribute('src', "../static/main/img/normal-keyboard.png");
            level.textContent = "Normal";
            document.querySelector('.result-container').style.backgroundColor = "rgba(255, 166, 0, 0.8)";
            return
        }
        if (finalResult > 60 && finalResult <= 90) {
            keyboardImage.setAttribute('src', "../static/main/img/pro-keyboard.png");
            level.textContent = "Pro";
            document.querySelector('.result-container').style.backgroundColor = "rgba(255, 166, 0, 0.8)";
            return
        }
        if (finalResult > 90 && finalResult <= 120) {
            keyboardImage.setAttribute('src', "../static/main/img/elite-keyboard.png");
            level.textContent = "Elite";
            document.querySelector('.result-container').style.backgroundColor = "rgba(255, 166, 0, 0.8)";
            return
        }
        if (finalResult > 120) {
            keyboardImage.setAttribute('src', "../static/main/img/type-master-keyboard.png");
            level.textContent = "Type Master";
            document.querySelector('.result-container').style.backgroundColor = "black";
            return
        }
    }
    stopwatch = setTimeout(startTimer, 1000);
}

document.getElementById('settings-btn').addEventListener('click', function() {
    if (document.querySelector('.modes-panel').classList.contains('fade')) {
        document.querySelector('.modes-panel').classList.toggle('fade');
    }
    document.querySelector('.settings-panel').classList.toggle('fade');
})


document.getElementById('modes-btn').addEventListener('click', function() {
    if (document.querySelector('.settings-panel').classList.contains('fade')) {
        document.querySelector('.settings-panel').classList.toggle('fade');
    }
    document.querySelector('.modes-panel').classList.toggle('fade')
})

document.getElementById('new-btn').addEventListener('click', () => {reset()})
document.getElementById('words-select').addEventListener('change', function() {reset()})

function reset() {
    let new_words = [];
    let select = document.getElementById('words-select');
    if (select.value == 15) {
        document.querySelector('.typing-container').style.top = "55%";
    } else {
        document.querySelector('.typing-container').style.top = "60%";
    }
    for (var i = 0; i < select.value; i++) {
        let item = words[Math.floor(Math.random() * words.length)];
        new_words.push(item);
    }
    typingText.innerHTML = '';
    for (var i = 0; i < new_words.length; i++) {
        typingText.innerHTML += `<span class="word">${new_words[i]} </span>`;
    }
    wordList = document.querySelectorAll('.word');
    highlightedNumber = 0;
    wordList[highlightedNumber].style.backgroundColor = "lightgray";
    seconds = 0; minutes = 0; first = true; errorCount = 0; allEntries = 0; wordCount = 0;
    timer.innerHTML = "";
    timer.style.display = "none";
    clearTimeout(stopwatch);
    typingInput.disabled = false;
    typingInput.value = "";
    typingInput.focus();
}