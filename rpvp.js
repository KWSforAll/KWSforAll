let lastTimestampvp = Date.now();
let clickLinkpvp = true;
let isRunningpvp = false;
let refreshIntervalpvp;

function checkRefreshpvp() {
    const currentTimestampvp = Date.now();

    if (currentTimestampvp - lastTimestampvp > 15000 && isRunningpvp) {
        lastTimestampvp = currentTimestampvp;

        if (clickLinkpvp) {
            const linkElementpvp = document.querySelector('.qlink.load_afo');
            if (linkElementpvp) {
                linkElementpvp.click();
                clickLinkpvp = false;

                setTimeout(() => {
                    const ghButtonElementpvp = document.querySelector('.gh_button.gh_pvp');
                    if (ghButtonElementpvp) {
                        ghButtonElementpvp.click();

                        setTimeout(() => {
                            const pvpButtonElement = document.querySelector('.pvp_button.pvp_pvp');
                            if (pvpButtonElement) {
                                pvpButtonElement.click();
                            }
                        }, 2500);
                    }
                }, 2500);
            }
        }
    }
}

function toggleScriptpvp() {
    isRunningpvp = !isRunningpvp;

    if (isRunningpvp) {
        window.localStorage.setItem('isRunningpvp', 'true');
        refreshIntervalpvp = setInterval(() => {
            checkRefreshpvp();
        }, 1000);
    } else {
        window.localStorage.setItem('isRunningpvp', 'false');
        clearInterval(refreshIntervalpvp);
    }

    updateButtonText();
}

function updateButtonText() {
    const controlButtonpvp = document.getElementById('buttonpvp');
    if (controlButtonpvp) {
        controlButtonpvp.textContent = isRunningpvp ? 'R-PVP Off' : 'R-PVP On';
    }
}

function checkIfRefreshedpvp() {
    if (isRunningpvp) {
        const currentTimestampvp = Date.now();
        if (currentTimestampvp - lastTimestampvp > 1000) {
            lastTimestampvp = currentTimestampvp;
        }
    }
}

window.addEventListener('beforeunload', () => {
    lastTimestampvp = Date.now();
});

const initialStateFromStorage = window.localStorage.getItem('isRunningpvp');
if (initialStateFromStorage === 'true') {
    toggleScriptpvp();
}

function createcontrolButtonpvp() {
    const controlButtonpvp = document.createElement('button');
    controlButtonpvp.id = 'buttonpvp';
    controlButtonpvp.textContent = isRunningpvp ? 'R-PVP Off' : 'R-PVP On';
    controlButtonpvp.className = 'btn_small_gold';
    controlButtonpvp.style.position = 'absolute';
    controlButtonpvp.style.top = '60px';
    controlButtonpvp.style.right = '10px';
    controlButtonpvp.addEventListener('click', () => {
        toggleScriptpvp();
        checkIfRefreshedpvp();
    });
    document.body.appendChild(controlButtonpvp);
}
setTimeout(createcontrolButtonpvp, 2000);
