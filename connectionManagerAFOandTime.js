
function runCodeWithDelay() {   
    const logoutButton = document.querySelector('button[data-option="logout"]');
    const startStopButton = document.getElementById('startStopButton');
    startStopButton.style.display = 'none';
    function showStartStopButton() {
        startStopButton.style.display = 'block';
        startStopButton.style.zIndex = '9999';
    }
    function hideStartStopButton() {
        startStopButton.style.display = 'none';
    }
    logoutButton.addEventListener('mouseenter', function() {
        showStartStopButton();
    });
    logoutButton.addEventListener('mouseleave', function() {
        hideStartStopButton();
    });
    startStopButton.addEventListener('mouseenter', function() {
        clearTimeout(startStopHideTimer);
        showStartStopButton();
    });
    startStopButton.addEventListener('mouseleave', function() {
        hideStartStopButton();
    });
    let startStopHideTimer;

}

let intervalId;
let recordingEnabled = JSON.parse(localStorage.getItem('recordingEnabled')) || false;
let stopReplay = false; 
function replaySavedClicks() {
    console.log('Attempting to replay saved clicks...');
    const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || {};
    const clickClasses = Object.keys(savedClicks);

    if (clickClasses.length > 0 && !stopReplay) { 
        console.log('Found saved clicks:', clickClasses);
        clickClasses.forEach(function(buttonClass, index) {
            setTimeout(function() {
                if (!stopReplay) { 
                    const buttons = document.querySelectorAll(`.${buttonClass}`);
                    buttons.forEach(function(button) {
                        console.log('Clicking button:', buttonClass);
                        button.click();
                        console.log('Click executed.');
                        savedClicks[buttonClass] = { clicked: true };
                        localStorage.setItem('savedClicks', JSON.stringify(savedClicks)); 
                    });
                }
            }, index * 800);
        });
    } else {
        console.log('No saved clicks found in local storage or stopped replaying.');
    }
}

function startRecording() {
    enableLocalStorage();
    intervalId = setInterval(checkMainPanel, 1000);
    console.log('Started recording clicks.');
    recordingEnabled = true;
    localStorage.setItem('recordingEnabled', true);
    setInterval(saveSelectedSpawners, 2000);
}

function stopRecording() {
    clearInterval(intervalId);
    localStorage.removeItem('savedClicks');
    localStorage.removeItem('selectedSpawners');
    console.log('Stopped recording clicks and cleared data.');
    recordingEnabled = false; 
    localStorage.setItem('recordingEnabled', false);
    stopReplay = true; 
}    


function checkMainPanel() {
    const mainPanel = document.getElementById("main_Panel");
    if (mainPanel) {
        enableLocalStorage();
        clearInterval(intervalId);
        replaySavedClicks(); 
    }
    const respPanel = document.getElementById("resp_Panel");
    if (respPanel) {
        enableLocalStorageWithClass('.resp_button');
    }
}

function handleButtonClick(event) {
    const buttonClass = event.target.className.replace(/\s+/g, '.');
    let savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || {};
    if (!savedClicks[buttonClass]) {
        savedClicks[buttonClass] = { clicked: false }; 
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log('Click saved:', buttonClass);
    }
}

function enableLocalStorageWithClass(className) {
    const divs = document.querySelectorAll(className);
    divs.forEach(function(div) {
        div.addEventListener('click', handleButtonClick);
    });
}

function enableLocalStorage() {
    const buttonClasses = ['.gh_button', '.pvp_button', '.lpvm_button', '.res_button', '.code_button', '.resp_button','.qlink.manage_auto_abyss', '.qlink.manage_auto_arena', '.qlink.manage_autoExpeditions'];
    buttonClasses.forEach(function(className) {
        const buttons = document.querySelectorAll(className);
        buttons.forEach(function(button) {
            button.addEventListener('click', handleButtonClick);
        });
    });
}

const startStopButton = document.createElement('button');
startStopButton.textContent = recordingEnabled ? 'Off' : 'On'; 
startStopButton.id = 'startStopButton';
startStopButton.style.position = 'fixed';
startStopButton.style.top = '30px'; 
startStopButton.style.background = '#333';
startStopButton.style.borderRadius = '5px';
startStopButton.style.borderWidth = '5px 6px 5px 6px';
startStopButton.style.display = 'block';
startStopButton.style.color = 'gold'; 
startStopButton.style.borderColor = 'rgba(0,0,0,0.9)';
startStopButton.style.right = '5px';
startStopButton.addEventListener('click', function() {
    if (recordingEnabled) {
        stopRecording();
    } else {
        startRecording();
    }
    startStopButton.textContent = recordingEnabled ? 'Off' : 'On'; 
});
document.body.appendChild(startStopButton);
setTimeout(function() {
    runCodeWithDelay();
}, 1000);

function selectSavedSpawners() {
    const selectedSpawners = JSON.parse(localStorage.getItem('selectedSpawners')) || [];
    let index = 0;
    const intervalId = setInterval(() => {
        if (index >= selectedSpawners.length) {
            clearInterval(intervalId);
            return;
        }
        const spawnerId = selectedSpawners[index];
        const spawner = document.getElementById(spawnerId);
        if (spawner) {
            spawner.click(); 
        }
        index++;
    }, 800);
}

function saveSelectedSpawners() {
    const selectedSpawners = [];
    const spawners = document.querySelectorAll('[id^="kws_spawner_ignore_"]');
    spawners.forEach(spawner => {
        if (spawner.checked) {
            selectedSpawners.push(spawner.id);
        }
    });
    localStorage.setItem('selectedSpawners', JSON.stringify(selectedSpawners));
}

function performPvmActions() {
    selectSavedSpawners(); 
    const spawners = document.querySelectorAll('[id^="kws_spawner_ignore_"]');
    spawners.forEach(spawner => {
        spawner.addEventListener('change', saveSelectedSpawners); 
    });
}

checkMainPanel();

const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || {};
if (Object.keys(savedClicks).length > 0) {
    console.log('Found saved clicks.');
    setTimeout(function() {
        console.log('Calling GAME.page_switch(\'game_map\')');
        GAME.page_switch('game_map');
        setTimeout(function() {
            const elementToClick = document.querySelector('.qlink.load_afo');
            if (elementToClick) {
                console.log('Clicking .qlink.load_afo after 13 seconds');
                elementToClick.click();
            }
        }, 3000);
    }, 10000); 
    setTimeout(function() {
        replaySavedClicks();
        setTimeout(performPvmActions, 3000);
    }, 17000); 
} else {
    console.log('No saved clicks found in localStorage.');
}

