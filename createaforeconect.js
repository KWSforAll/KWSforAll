let lastTimestampKody = Date.now();
let clickLinkKody = true;
let isRunningKody = false;
let refreshIntervalKody;

function checkRefreshKody() {
    const currentTimestampKody = Date.now();

    if (currentTimestampKody - lastTimestampKody > 15000 && isRunningKody) {
        lastTimestampKody = currentTimestampKody;

        if (clickLinkKody) {
            const linkElementKody = document.querySelector('.qlink.load_afo');
            if (linkElementKody) {
                linkElementKody.click();
                clickLinkKody = false;

                setTimeout(() => {
                    const ghButtonElementKody = document.querySelector('.gh_button.gh_code');
                    if (ghButtonElementKody) {
                        ghButtonElementKody.click();

                        setTimeout(() => {
                            const KodyButtonElement = document.querySelector('.code_button.code_code');
                            if (KodyButtonElement) {
                                KodyButtonElement.click();
                            }
                        }, 2500);
                    }
                }, 2500);
            }
        }
    }
}

function toggleScriptKody() {
    isRunningKody = !isRunningKody;

    if (isRunningKody) {
        window.localStorage.setItem('isRunningKody', 'true');
        refreshIntervalKody = setInterval(() => {
            checkRefreshKody();
        }, 1000);
    } else {
        window.localStorage.setItem('isRunningKody', 'false');
        clearInterval(refreshIntervalKody);
    }

    updateButtonTextKody();
}

function updateButtonTextKody() {
    const controlButtonKody = document.getElementById('buttonKody');
    if (controlButtonKody) {
        controlButtonKody.textContent = isRunningKody ? 'R-Kody Off' : 'R-Kody On';
    }
}

function checkIfRefreshedKody() {
    if (isRunningKody) {
        const currentTimestampKody = Date.now();
        if (currentTimestampKody - lastTimestampKody > 1000) {
            lastTimestampKody = currentTimestampKody;
        }
    }
}

window.addEventListener('beforeunload', () => {
    lastTimestampKody = Date.now();
});

const runningStateFromStorageKody = window.localStorage.getItem('isRunningKody');
if (runningStateFromStorageKody === 'true') {
    toggleScriptKody();
}

function createControlButtonKody() {
    const controlButtonKody = document.createElement('button');
    controlButtonKody.id = 'buttonKody';
    controlButtonKody.textContent = isRunningKody ? 'R-Kody Off' : 'R-Kody On';
    controlButtonKody.className = 'btn_small_gold';
    controlButtonKody.style.position = 'absolute';
    controlButtonKody.style.top = '30px';
    controlButtonKody.style.right = '10px';
    controlButtonKody.addEventListener('click', () => {
        toggleScriptKody();
        checkIfRefreshedKody();
    });
    document.body.appendChild(controlButtonKody);
}
setTimeout(createControlButtonKody, 2000);

