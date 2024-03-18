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
                let ghButtonElement, codeButtonElement;

                if (document.getElementById('checkbox1').checked) {
                    ghButtonElement = document.querySelector('.gh_button.gh_code');
                    codeButtonElement = document.querySelector('.code_button.code_code');
                } else if (document.getElementById('checkbox2').checked) {
                    ghButtonElement = document.querySelector('.gh_button.gh_pvp');
                    codeButtonElement = document.querySelector('.pvp_button.pvp_pvp');
                }

                if (ghButtonElement && codeButtonElement) {
                    ghButtonElement.click();
                    setTimeout(() => {
                        codeButtonElement.click();
                    }, 2500);
                }
            }, 2500);
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
        controlButton.textContent = isRunning ? 'Reconnect Stop' : 'Reconnect Start';
    }
}

function createControlButton() {
    const controlButton = document.createElement('button');
    controlButton.id = 'toggleButton';
    controlButton.textContent = isRunning ? 'Reconnect Stop' : 'Reconnect Start';
    controlButton.style.position = 'absolute';
    controlButton.style.top = '36px';
    controlButton.style.right = '10px';
    controlButton.style.background = 'rgba(0,0,0,0.9)';
    controlButton.style.zIndex = '9999';
    controlButton.style.width = '150px'; // Zmiana szerokości na 50px
    controlButton.style.padding = '1px';
    controlButton.style.borderRadius = '5px';
    controlButton.style.borderStyle = 'solid';
    controlButton.style.borderWidth = '7px 8px 7px 7px';
    controlButton.style.display = 'block';
    controlButton.style.userSelect = 'none';
    controlButton.style.color = 'gold'; // Zmiana koloru czcionki na gold
    controlButton.style.borderColor = '#333333'; // Zmiana koloru obramowania na #333333
    controlButton.addEventListener('click', () => {
        toggleScript();
    });
    document.body.appendChild(controlButton);

    // Create checkboxes
    const checkboxContainer = document.createElement('div');
    checkboxContainer.style.position = 'absolute';
    checkboxContainer.style.top = '73px';
    checkboxContainer.style.right = '28px';
    checkboxContainer.style.background = 'rgba(0,0,0,0.9)';
    checkboxContainer.style.zIndex = '9999';
    checkboxContainer.style.width = '100px';
    checkboxContainer.style.padding = '1px';
    checkboxContainer.style.borderRadius = '5px';
    checkboxContainer.style.borderStyle = 'solid';
    checkboxContainer.style.borderWidth = '7px 8px 7px 7px';
    checkboxContainer.style.display = 'block';
    checkboxContainer.style.userSelect = 'none';
    checkboxContainer.style.color = '#333333'; //

    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'checkbox1';
    checkbox1.checked = window.localStorage.getItem('checkbox1_checked') === 'true'; // Ustawienie stanu z localStorage
    checkbox1.addEventListener('change', () => {
        window.localStorage.setItem('checkbox1_checked', checkbox1.checked); // Zapisanie stanu do localStorage
        if (checkbox1.checked) {
            document.getElementById('checkbox2').checked = false;
        }
    });

    const label1 = document.createElement('label');
    label1.htmlFor = 'checkbox1';
    label1.textContent = 'R - Kody';
    label1.style.color = 'gold'; // Zmiana koloru tekstu na gold
    label1.style.paddingLeft = '10px';    
    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'checkbox2';
    checkbox2.checked = window.localStorage.getItem('checkbox2_checked') === 'true'; // Ustawienie stanu z localStorage
    checkbox2.addEventListener('change', () => {
        window.localStorage.setItem('checkbox2_checked', checkbox2.checked); // Zapisanie stanu do localStorage
        if (checkbox2.checked) {
            document.getElementById('checkbox1').checked = false;
        }
    });

    const label2 = document.createElement('label');
    label2.htmlFor = 'checkbox2';
    label2.textContent = ' R - PVP';
    label2.style.color = 'gold'; // Zmiana koloru tekstu na gold
    label2.style.paddingLeft = '10px';    
    checkboxContainer.appendChild(checkbox1);
    checkboxContainer.appendChild(label1);
    checkboxContainer.appendChild(document.createElement('br'));
    checkboxContainer.appendChild(checkbox2);
    checkboxContainer.appendChild(label2);

    document.body.appendChild(checkboxContainer);
}

createControlButton();

const runningStateFromStorage = window.localStorage.getItem('isRunning');
if (runningStateFromStorage === 'true') {
    toggleScript();
}
