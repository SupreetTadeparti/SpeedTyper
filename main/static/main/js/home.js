let start = document.getElementById('start-button');

start.addEventListener('click', function() {
    window.location.href = "/typing-test";
})

$(document).ready(function() {
    $(".messages").hide();
    $(".messages").fadeIn(500).delay(2000).fadeOut(1000);
})