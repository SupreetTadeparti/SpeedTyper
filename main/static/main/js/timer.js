const words = []
let wordList = document.querySelectorAll('.word');
let typingInput = document.getElementById('typing-input');
let typingText = document.getElementById('typing-text');
let timer = document.querySelector('.timer');
let timeSelected = document.getElementById('words-select')
let highlightedNumber = 0;
let errorCount = 0;
let allEntries = 0;
let wordCount = 0;
let first = true;
let iter = 0;

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
        if (iter == 34) {
            for (var i=0; i<wordList.length; i++) {
                for(var j=0; j<wordList[i].textContent.length; j++) {
                    allEntries++;
                }
            }
            newWords();
            highlightedNumber -= 1;
            iter = 0;
        }
        highlightedNumber += 1;
        wordList[highlightedNumber].style.backgroundColor = "lightgray";
        wordList.forEach(function(_, index) {
            if (index !== highlightedNumber) {
                wordList[index].style.backgroundColor = "";
            }
        })
        iter++
        wordCount++
    }
});

let seconds = timeSelected.value;
let stopwatch;
function startTimer() {
    first = false;
    timer.style.display = 'block';
    seconds < 10 ? second = `0${seconds}` : second = seconds;
    timer.innerHTML = second;
    seconds -= 1;
    if (seconds < 0) {
        typingInput.disabled = true;
        let timeInMinutes = timeSelected.value / 60;
        let accuracy = Math.ceil(((wordCount - errorCount)/wordCount) * 100);
        let finalRawResult = Math.ceil(wordCount/timeInMinutes);
        let finalResult = Math.ceil((wordCount-errorCount)/timeInMinutes);

        var CSRFtoken = $('input[name=csrfmiddlewaretoken]').val();
        $.post('../wpm', {
            wpm: finalResult,
            url: 'timer',
            csrfmiddlewaretoken: CSRFtoken
        });

        document.querySelector('.result-container').style.display = "block";
        document.querySelector('.result').innerHTML = finalResult+" WPM";
        document.querySelector('.raw').innerHTML = "Raw speed : "+finalRawResult+" WPM";
        document.querySelector('.accuracy').innerHTML = "Accuracy : "+accuracy+"%";
        let keyboardImage = document.querySelector('.keyboard-image');
        let level = document.querySelector('.level');
        let testSpan = document.getElementById('tests-span');
        let testsTaken = parseInt(testSpan.innerHTML);
        testSpan.innerHTML = parseInt(testSpan.innerHTML) + 1;
        if (testSpan.innerHTML.slice(-1) === "5" || testSpan.innerHTML.slice(-1) === "0") {
            testsTaken = 3;
        }
        document.getElementById('wpm-span').innerHTML = Math.round((averageWPM * (testsTaken - 1) + parseInt(finalResult)) / testsTaken);
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
    for (var i=0; i < 35; i++) {
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
    seconds = timeSelected.value; first = true; errorCount = 0; allEntries = 0; iter = 0; wordCount = 0;
    timer.innerHTML = "";
    timer.style.display = "none";
    clearTimeout(stopwatch);
    typingInput.disabled = false;
    typingInput.value = "";
    typingInput.focus();
}

function newWords() {
    next_words = [];
    for (var i=0; i<35; i++) {
        let new_item = words[Math.floor(Math.random() * words.length)];
        next_words.push(new_item);
    }
    typingText.innerHTML = "";
    for (var i = 0; i < next_words.length; i++) {
        typingText.innerHTML += `<span class="word">${next_words[i]} </span>`;
    }
    wordList = document.querySelectorAll('.word');
    highlightedNumber = 0;
}