let lastTimestamp = Date.now();
let isRunning = false;
let refreshInterval;

function checkRefresh() {
    const currentTimestamp = Date.now();

    if (currentTimestamp - lastTimestamp > 15000 && isRunning) {
        lastTimestamp = currentTimestamp;

        const linkElement = document.querySelector('.qlink.load_afo');
        if (linkElement) {
            linkElement.click();
            isRunning = false;

            setTimeout(() => {
                const selectedOption = document.getElementById('actionSelect').value;
                switch (selectedOption) {
                    case 'R - Kody':
                        // Code related actions
                        performCodeActions();
                        break;
                    case 'R - PVP':
                        // PVP related actions
                        performPvpActions();
                        break;
                    case 'R - PVM':
                        // PVM related actions
                        performPvmActions();
                        break;
                    case 'R - Listy':
                        // List related actions
                        performListActions();
                        break;
                    case 'R - Zbierajka':
                        // Other related actions
                        performOtherActions();
                        break;
                    default:
                        break;
                }
            }, 2000);
        }
    }
}

function toggleScript() {
    isRunning = !isRunning;

    if (isRunning) {
        window.localStorage.setItem('isRunning', 'true');
        refreshInterval = setInterval(() => {
            checkRefresh();
        }, 1000);
    } else {
        window.localStorage.setItem('isRunning', 'false');
        clearInterval(refreshInterval);
    }

    updateButtonText();
}

function updateButtonText() {
    const controlButton = document.getElementById('toggleButton');
    if (controlButton) {
        controlButton.textContent = isRunning ? 'Refres Afo Stop' : 'Refres Afo Start';
    }
}

function createControlButton() {
    const controlButton = document.createElement('button');
    controlButton.id = 'toggleButton';
    controlButton.textContent = isRunning ? 'Refresh Afo Stop' : 'Refresh Afo Start';
    controlButton.style.position = 'absolute';
    controlButton.style.top = '36px';
    controlButton.style.right = '10px';
    controlButton.style.background = '#333';
    controlButton.style.zIndex = '9999';
    controlButton.style.width = '150px'; 
    controlButton.style.padding = '1px';
    controlButton.style.borderRadius = '5px';
    controlButton.style.borderStyle = 'solid';
    controlButton.style.borderWidth = '5px 6px 5px 6px';
    controlButton.style.display = 'block';
    controlButton.style.userSelect = 'none';
    controlButton.style.color = 'gold'; 
    controlButton.style.borderColor = 'rgba(0,0,0,0.9)'; 
    controlButton.addEventListener('click', () => {
        toggleScript();
    });
    document.body.appendChild(controlButton);

    const selectContainer = document.createElement('div');
    selectContainer.style.position = 'absolute';
    selectContainer.style.top = '73px';
    selectContainer.style.right = '10px';
    selectContainer.style.background = '#333';
    selectContainer.style.zIndex = '9999';
    selectContainer.style.width = '150px'; 
    selectContainer.style.padding = '1px';
    selectContainer.style.borderRadius = '5px';
    selectContainer.style.borderStyle = 'solid';
    selectContainer.style.borderWidth = '5px 6px 5px 6px';
    selectContainer.style.display = 'block';
    selectContainer.style.userSelect = 'none';
    selectContainer.style.color = 'rgba(0,0,0,0.9)'; 

    const actionSelect = document.createElement('select');
    actionSelect.id = 'actionSelect';
    actionSelect.style.color = 'gold'; // Set initial font color to gold
    actionSelect.style.background = '#333333';
    actionSelect.style.border = 'none';
    actionSelect.style.width = '100%';
    actionSelect.style.height = '100%';
    actionSelect.style.padding = '5px';
    actionSelect.style.fontSize = '12px';
    actionSelect.style.fontWeight = 'bold';

    // Retrieve the selected option from local storage, if available
    const savedOption = window.localStorage.getItem('selectedOption');

    // Adding event listener to change the color of the selected option
    actionSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        selectedOption.style.color = 'gold';
        for (let i = 0; i < this.options.length; i++) {
            if (i !== this.selectedIndex) {
                this.options[i].style.color = 'white';
            }
        }
        // Store the selected option in local storage
        window.localStorage.setItem('selectedOption', selectedOption.value);
    });

    const options = ['R - Kody', 'R - PVP', 'R - PVM', 'R - Listy', 'R - Zbierajka'];
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        // Set the selected attribute if the option matches the saved option in local storage
        if (savedOption === option) {
            optionElement.selected = true;
            optionElement.style.color = 'gold'; // Set font color to gold for the saved option
        }
        actionSelect.appendChild(optionElement);
    });

    selectContainer.appendChild(actionSelect);
    document.body.appendChild(selectContainer);
}
function selectSavedSpawners() {
    const selectedSpawners = JSON.parse(localStorage.getItem('selectedSpawners')) || [];
    selectedSpawners.forEach(spawnerId => {
        const spawner = document.getElementById(spawnerId);
        if (spawner) spawner.checked = true;
    });
}
function performCodeActions() {
    let ghButtonElement = document.querySelector('.gh_button.gh_code');
    let codeButtonElement = document.querySelector('.code_button.code_code');
    if (ghButtonElement && codeButtonElement) {
        setTimeout(() => {
            ghButtonElement.click();
            setTimeout(() => {
                codeButtonElement.click();
            }, 2000);
        }, 2000);
    }
}

function performPvpActions() {
    let ghButtonElement = document.querySelector('.gh_button.gh_pvp');
    let codeButtonElement = document.querySelector('.pvp_button.pvp_pvp');
    if (ghButtonElement && codeButtonElement) {
        setTimeout(() => {
            ghButtonElement.click();
            setTimeout(() => {
                codeButtonElement.click();
            }, 2000);
        }, 2000);
    }
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
    const ghRespButton = document.querySelector('.gh_button.gh_resp');
    if (ghRespButton) {
        setTimeout(() => {
            ghRespButton.click();
            setTimeout(() => {
                const respButton = document.querySelector('.resp_button.resp_resp');
                if (respButton) {
                    GAME.page_switch('game_map');
                    setTimeout(() => {
                        // Odczekaj 2 sekundy po wykonaniu GAME.page_switch('game_map')
                        setTimeout(() => {
                            // Zaznaczenie spawnerów na podstawie danych z local storage
                            const spawners = document.querySelectorAll('[id^="kws_spawner_ignore_"]');
                            spawners.forEach(spawner => {
                                spawner.addEventListener('change', saveSelectedSpawners);
                            });
                        }, 2000);

                        // Odczekaj 3 sekundy po wykonaniu GAME.page_switch('game_map')
                        setTimeout(() => {
                            respButton.click();
                        }, 3000);
                    }, 2000);
                }
            }, 2000);
        }, 2000);
    }
}





function performListActions() {
    const ghLpvmButton = document.querySelector('.gh_button.gh_lpvm');
    if (ghLpvmButton) {
        setTimeout(() => {
            ghLpvmButton.click();
            setTimeout(() => {
                const lpvmUButton = document.querySelector('.lpvm_button.lpvm_u');
                if (lpvmUButton) {
                    lpvmUButton.click();
                    setTimeout(() => {
                        // Execute GAME.page_switch('game_map');
                        GAME.page_switch('game_map');
                        setTimeout(() => {
                            const lpvmLpvmButton = document.querySelector('.lpvm_button.lpvm_lpvm');
                            if (lpvmLpvmButton) {
                                lpvmLpvmButton.click();
                            }
                        }, 2000);
                    }, 2000);
                }
            }, 2000);
        }, 2000);
    }
}


function performOtherActions() {
    const ghResButton = document.querySelector('.gh_button.gh_res');
    if (ghResButton) {
        setTimeout(() => {
            ghResButton.click();
            setTimeout(() => {
                // Execute GAME.page_switch('game_map');
                GAME.page_switch('game_map');
                setTimeout(() => {
                    const resButton = document.querySelector('.res_button.res_res');
                    if (resButton) {
                        resButton.click();
                    }
                }, 2000);
            }, 2000);
        }, 2000);
    }
}

createControlButton();

const runningStateFromStorage = window.localStorage.getItem('isRunning');
if (runningStateFromStorage === 'true') {
    toggleScript();
}
