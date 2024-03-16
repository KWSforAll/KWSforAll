let lastTimestamkody = Date.now();
let clickLinkKody = true;
let isRunningKody = false;
let refreshIntervalKody;

function checkRefreshKody() {
    const currentTimestamKody = Date.now();

    if (currentTimestamKody - lastTimestamkody > 15000 && isRunningKody) {
        lastTimestamkody = currentTimestamKody;

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

    updateButtonText();
}

function updateButtonText() {
    const controlButtonKody = document.getElementById('buttonKody');
    if (controlButtonKody) {
        controlButtonKody.textContent = isRunningKody ? 'R-Kody Off' : 'R-Kody On';
    }
}

function checkIfRefreshedKody() {
    if (isRunningKody) {
        const currentTimestamKody = Date.now();
        if (currentTimestamKody - lastTimestamkody > 1000) {
            lastTimestamkody = currentTimestamKody;
        }
    }
}

window.addEventListener('beforeunload', () => {
    lastTimestamkody = Date.now();
});

const runningStateFromStorage = window.localStorage.getItem('isRunningKody');
if (runningStateFromStorage === 'true') {
    toggleScriptKody();
}

function createcontrolButtonKody() {
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
setTimeout(createcontrolButtonKody, 2000);

