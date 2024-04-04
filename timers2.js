let mainPanelFound = false;
let ghButtonExecuted = false;

var intervalCheckMainPanel = setInterval(function () {
    var mainPanel = document.getElementById("main_Panel");
    if (mainPanel) {
        clearInterval(intervalCheckMainPanel);
        mainPanelFound = true;
        var onoffDiv = document.createElement("div");
        onoffDiv.id = "onoff";
        onoffDiv.classList.add("ui-draggable");
        var startTimeInput = document.createElement("input");
        startTimeInput.type = "text";
        startTimeInput.placeholder = "Godzina startu (HH mm)";
        startTimeInput.style.width = "120px";
        startTimeInput.style.marginLeft = "5px";
        startTimeInput.style.background = "grey";
        startTimeInput.style.textAlign = "center";
        startTimeInput.style.color = "white";
        var endTimeInput = document.createElement("input");
        endTimeInput.type = "text";
        endTimeInput.placeholder = "Godzina wyłączenia (HH mm)";
        endTimeInput.style.width = "120px";
        endTimeInput.style.marginLeft = "5px";
        endTimeInput.style.background = "grey";
        endTimeInput.style.textAlign = "center";
        endTimeInput.style.color = "white";
        var onOffButton = document.createElement("button");
        onOffButton.textContent = "On";
        onOffButton.style.color = "#00ff00";
        onOffButton.style.backgroundColor = "black";
        onOffButton.style.border = "1px solid white";
        onOffButton.onclick = function() {
            if (onOffButton.textContent === "On") {
                var startTime = parseTime(startTimeInput.value);
                var endTime = parseTime(endTimeInput.value);
                if (!isNaN(startTime) && !isNaN(endTime)) {
                    scheduleOnOff(startTime, endTime);
                    onOffButton.textContent = "Off"; 
                    onOffButton.style.color = "red";
                } else {
                    alert("Wprowadź poprawne godziny (HH mm)!");
                }
            } else {
                clearInterval(intervalId);
                onOffButton.textContent = "On"; 
                onOffButton.style.color = "#00ff00";
            }
        };
        onoffDiv.appendChild(startTimeInput);
        onoffDiv.appendChild(endTimeInput);
        onoffDiv.appendChild(onOffButton);

        var pvpPanel = document.getElementById("pvp_Panel");
        pvpPanel.appendChild(onoffDiv);
        var intervalId; 
        function parseTime(timeString) {
            var timeArray = timeString.split(" ");
            if (timeArray.length === 2) {
                var hours = parseInt(timeArray[0]);
                var minutes = parseInt(timeArray[1]);
                if (!isNaN(hours) && !isNaN(minutes)) {
                    return hours * 60 + minutes;
                }
            }
            return NaN;
        }
        function scheduleOnOff(startTime, endTime) {
            var clickedAtStart = false;
            var clickedAtEnd = false;
            intervalId = setInterval(function() {
                var currentTime = new Date();
                var currentHours = currentTime.getHours();
                var currentMinutes = currentTime.getMinutes();
                var currentTotalMinutes = currentHours * 60 + currentMinutes;
                if (currentTotalMinutes === startTime && !clickedAtStart) {
                    var pvpButton = document.querySelector('.pvp_button.pvp_pvp');
                    if (pvpButton) {
                        pvpButton.click();
                        clickedAtStart = true;
                    }
                }
                if (currentTotalMinutes === endTime && !clickedAtEnd) {
                    var pvpButton = document.querySelector('.pvp_button.pvp_pvp');
                    if (pvpButton) {
                        pvpButton.click();
                        clickedAtEnd = true;
                        clearInterval(intervalId);
                        onOffButton.textContent = "On"; 
                        onOffButton.style.color = "#00ff00";
                    }
                }
            }, 1000);
        }
        var style = document.createElement('style');
        style.innerHTML = `
            ::placeholder {
                color: darkgrey;
            }
        `;
        document.head.appendChild(style);
        var ghButtonIntervalId;
        function checkAndExecuteGHButton() {
            if (!ghButtonExecuted) {
                var ghButton = document.querySelector('.gh_button.gh_res');
                if (ghButton) {
                    var onoffDiv1 = document.createElement("div");
                    onoffDiv1.id = "onoff";
                    onoffDiv1.classList.add("ui-draggable");
                    var startTimeInput1 = document.createElement("input");
                    startTimeInput1.type = "text";
                    startTimeInput1.placeholder = "Godzina startu (HH mm)";
                    startTimeInput1.style.width = "120px";
                    startTimeInput1.style.marginLeft = "5px";
                    startTimeInput1.style.background = "grey";
                    startTimeInput1.style.textAlign = "center";
                    startTimeInput1.style.color = "white";
                    var endTimeInput1 = document.createElement("input");
                    endTimeInput1.type = "text";
                    endTimeInput1.placeholder = "Godzina wyłączenia (HH mm)";
                    endTimeInput1.style.width = "120px";
                    endTimeInput1.style.marginLeft = "5px";
                    endTimeInput1.style.background = "grey";
                    endTimeInput1.style.textAlign = "center";
                    endTimeInput1.style.color = "white";
                    var onOffButton1 = document.createElement("button");
                    onOffButton1.textContent = "On";
                    onOffButton1.style.color = "#00ff00";
                    onOffButton1.style.backgroundColor = "black";
                    onOffButton1.style.border = "1px solid white";
                    onOffButton1.onclick = function() {
                        if (onOffButton1.textContent === "On") {
                            var startTime = parseTime(startTimeInput1.value);
                            var endTime = parseTime(endTimeInput1.value);
                            if (!isNaN(startTime) && !isNaN(endTime)) {
                                scheduleOnOff(startTime, endTime);
                                onOffButton1.textContent = "Off"; 
                                onOffButton1.style.color = "red";
                            } else {
                                alert("Wprowadź poprawne godziny (HH mm)!");
                            }
                        } else {
                            clearInterval(intervalId);
                            onOffButton1.textContent = "On"; 
                            onOffButton1.style.color = "#00ff00";
                        }
                    };
                    onoffDiv1.appendChild(startTimeInput1);
                    onoffDiv1.appendChild(endTimeInput1);
                    onoffDiv1.appendChild(onOffButton1);
                    var codecode = document.getElementById("code_Panel");
                    codecode.appendChild(onoffDiv1);
                    var intervalId; 
                    function parseTime(timeString) {
                        var timeArray = timeString.split(" ");
                        if (timeArray.length === 2) {
                            var hours = parseInt(timeArray[0]);
                            var minutes = parseInt(timeArray[1]);
                            if (!isNaN(hours) && !isNaN(minutes)) {
                                return hours * 60 + minutes;
                            }
                        }
                        return NaN;
                    }
                    function scheduleOnOff(startTime, endTime) {
                        var clickedAtStart = false;
                        var clickedAtEnd = false;
                        intervalId = setInterval(function() {
                            var currentTime = new Date();
                            var currentHours = currentTime.getHours();
                            var currentMinutes = currentTime.getMinutes();
                            var currentTotalMinutes = currentHours * 60 + currentMinutes;
                            if (currentTotalMinutes === startTime && !clickedAtStart) {
                                var codeButton = document.querySelector('.code_button.code_code');
                                if (codeButton) {
                                    codeButton.click();
                                    console.log("Kliknięcie .pvp_button pvp_pvp po godzinie startu!");
                                    clickedAtStart = true;
                                }
                            }
                            if (currentTotalMinutes === endTime && !clickedAtEnd) {
                                var codeButton = document.querySelector('.code_button.code_code');
                                if (codeButton) {
                                    codeButton.click();
                                    console.log("Kliknięcie .pvp_button pvp_pvp po godzinie zakończenia!");
                                    clickedAtEnd = true;
                                    clearInterval(intervalId);
                                    onOffButton1.textContent = "On";
                                    onOffButton1.style.color = "#00ff00";
                                }
                            }
                        }, 1000);
                    }
                    var style = document.createElement('style');
                    style.innerHTML = `
                        ::placeholder {
                            color: darkgrey;
                        }
                    `;
                    document.head.appendChild(style);
                    ghButtonExecuted = true;
                    clearInterval(ghButtonIntervalId);
                }
            }
        }
        ghButtonIntervalId = setInterval(checkAndExecuteGHButton, 1000);
        var intervalCheckMainPanelAfterFound = setInterval(function () {
            if (!mainPanelFound) {
                var mainPanel = document.getElementById("main_Panel");
                if (mainPanel) {
                    mainPanelFound = true;
                    clearInterval(intervalCheckMainPanelAfterFound);
                }
            }
        }, 1000);
    }
}, 1000);

var ghButtonIntervalId;
var ghButtonExecuted2 = false;
function sprawdzIWykonajGHButton() {
    ghButtonIntervalId = setInterval(function() {
        var pvmPanel = document.getElementById('resp_Panel');
        if (pvmPanel) {
            clearInterval(ghButtonIntervalId);
            wykonajKodGHButton(pvmPanel);
        }
    }, 1000);
}
function wykonajKodGHButton(panel) {
    if (!ghButtonExecuted2) {
        var ghButton = panel.querySelector('.resp_button.resp_resp');
        if (ghButton) {
            var onoffDiv2 = document.createElement("div");
            onoffDiv2.id = "onoff";
            onoffDiv2.classList.add("ui-draggable");

            var startTimeInput2 = document.createElement("input");
            startTimeInput2.type = "text";
            startTimeInput2.placeholder = "Godzina startu (HH mm)";
            startTimeInput2.style.width = "120px";
            startTimeInput2.style.marginLeft = "5px";
            startTimeInput2.style.background = "grey";
            startTimeInput2.style.textAlign = "center";
            startTimeInput2.style.color = "white";

            var endTimeInput2 = document.createElement("input");
            endTimeInput2.type = "text";
            endTimeInput2.placeholder = "Godzina wyłączenia (HH mm)";
            endTimeInput2.style.width = "120px";
            endTimeInput2.style.marginLeft = "5px";
            endTimeInput2.style.background = "grey";
            endTimeInput2.style.textAlign = "center";
            endTimeInput2.style.color = "white";

            var onOffButton2 = document.createElement("button");
            onOffButton2.textContent = "On";
            onOffButton2.style.color = "#00ff00";
            onOffButton2.style.backgroundColor = "black";
            onOffButton2.style.border = "1px solid white";
            onOffButton2.onclick = function() {
                if (onOffButton2.textContent === "On") {
                    var startTime = parseTime(startTimeInput2.value);
                    var endTime = parseTime(endTimeInput2.value);
                    if (!isNaN(startTime) && !isNaN(endTime)) {
                        planujWlWyl(startTime, endTime);
                        onOffButton2.textContent = "Off";
                        onOffButton2.style.color = "red";
                    } else {
                        alert("Wprowadź poprawne godziny (HH mm)!");
                    }
                } else {
                    clearInterval(intervalId);
                    onOffButton2.textContent = "On";
                    onOffButton2.style.color = "#00ff00";
                }
            };

            onoffDiv2.appendChild(startTimeInput2);
            onoffDiv2.appendChild(endTimeInput2);
            onoffDiv2.appendChild(onOffButton2);

            panel.appendChild(onoffDiv2);

            var intervalId;

            function parseTime(timeString) {
                var timeArray = timeString.split(" ");
                if (timeArray.length === 2) {
                    var hours = parseInt(timeArray[0]);
                    var minutes = parseInt(timeArray[1]);
                    if (!isNaN(hours) && !isNaN(minutes)) {
                        return hours * 60 + minutes;
                    }
                }
                return NaN;
            }

            function planujWlWyl(startTime, endTime) {
                var clickedAtStart = false;
                var clickedAtEnd = false;
                intervalId = setInterval(function() {
                    var currentTime = new Date();
                    var currentHours = currentTime.getHours();
                    var currentMinutes = currentTime.getMinutes();
                    var currentTotalMinutes = currentHours * 60 + currentMinutes;
                    if (currentTotalMinutes === startTime && !clickedAtStart) {
                        var codeButton = panel.querySelector('.resp_button.resp_resp');
                        if (codeButton) {
                            codeButton.click();
                            console.log("Kliknięcie .resp_button.resp_resp po godzinie startu!");
                            clickedAtStart = true;
                        }
                    }
                    if (currentTotalMinutes === endTime && !clickedAtEnd) {
                        var codeButton = panel.querySelector('.resp_button.resp_resp');
                        if (codeButton) {
                            codeButton.click();
                            console.log("Kliknięcie .resp_button.resp_resp po godzinie zakończenia!");
                            clickedAtEnd = true;
                            clearInterval(intervalId);
                            onOffButton2.textContent = "On";
                            onOffButton2.style.color = "#00ff00";
                        }
                    }
                }, 1000);
            }
        }
    }
}
sprawdzIWykonajGHButton();
