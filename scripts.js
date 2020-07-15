let timerObj = {
    minutes: 0,
    seconds: 0,
    timerId: 0
}

// let color = document.getElementByid("color");
// function ChangeColor() {
//     color.style.backgroundColor = "blue";
// }
// let backgroundimg = document.getElementByid("Background");
// function selectfile() {
//     buttonManager(["start", true], ["pause", true], ["stop", false]);
//     $("#body").html("background-image", "url(backgroundimg)");
// }
// let modal = document.getElementByid("modal");
// function showModel() {
//     modal.showModal();
// }
function closeModal() {
    modal.closeModal();
}


function soundAlarm() {
    let amount = 2;
    let audio = new Audio('Timer_Sound_Effect.mp3');
    function playSound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }

    for (let i = 1; i < amount; i++) {
        setTimeout(playSound, 1200 * i);
    }
}


function updateValue(key, value) {
    if (value < 0) {
        value = 0;
        console.log("Positive Numbers Only, Please.");
    }

    if (key == "seconds") {
        if (value < 10) {
            value = "0" + value;
        }

        if (value > 59) {
            value = 59;
        }

    }

    $("#" + key).html(value || 0);
    timerObj[key] = value;
}


(function detectChanges(key) {
    let input = "#" + key + "-input";

    $(input).change(function () {
        updateValue(key, $(input).val());
    });

    $(input).keyup(function () {
        updateValue(key, $(input).val());
    });
    return arguments.callee;
}
)("minutes")("seconds");



function startTimer() {
    buttonManager(["start", false], ["pause", true], ["stop", true]);
    freezeInputs();

    timerObj.timerId = setInterval(function () {
        timerObj.seconds--;
        if (timerObj.seconds < 0) {
            if (timerObj.minutes == 0) {
                soundAlarm();
                showModel();
                return stopTimer();
            }
            timerObj.seconds = 59;
            timerObj.minutes--;



        }

        updateValue("minutes", timerObj.minutes);
        updateValue("seconds", timerObj.seconds);
    }, 1000);

}


function stopTimer() {
    clearInterval(timerObj.timerId);
    buttonManager(["start", true], ["pause", false], ["stop", false]);
    unfreezeInputs();
    updateValue("minutes", $("#minutes-input").val());

    let seconds = $("#seconds-input").val();
    if (seconds < 10) {
        seconds = " " + seconds;
        if (seconds = 0) {
            value = "0" + seconds;
        }
    }
    updateValue("seconds", seconds);
}


function pauseTimer() {
    buttonManager(["start", true], ["pause", false], ["stop", true]);
    clearInterval(timerObj.timerId);
}

// The array will be an array of button states.Each state consist of the name of the button and the state.If the state is true, then the button is enabled.
function buttonManager(...buttonsArray) {
    for (let i = 0; i < buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";
        if (buttonsArray[i][1]) {
            $(button).removeAttr('disabled');
        }
        else {
            $(button).attr('disabled', 'disabled');
        }
    }
}


function freezeInputs() {
    $("#minutes-input").attr('disabled', 'disabled');
    $("#seconds-input").attr('disabled', 'disabled');
}

function unfreezeInputs() {
    $("#minutes-input").removeAttr('disabled');
    $("#seconds-input").removeAttr('disabled');
}

// image upload file
document.getElementById('imagevalue').addEventListener('change', readURL, true);
function readURL() {
    var file = document.getElementById("imagevalue").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementsByClassName('background-image')[0].style.backgroundImage = "url(" + reader.result + ")";
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {

    }
}

// end of img upload
