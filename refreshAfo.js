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
                if (document.getElementById('checkbox1').checked) {
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
                } else if (document.getElementById('checkbox2').checked) {
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
                } else if (document.getElementById('checkbox3').checked) {
                    const ghRespButton = document.querySelector('.gh_button.gh_resp');
                    if (ghRespButton) {
                        setTimeout(() => {
                            ghRespButton.click();
                            setTimeout(() => {
                                const respButton = document.querySelector('.resp_button.resp_resp');
                                if (respButton) {
                                    respButton.click();
                                }
                            }, 2000);
                        }, 2000);
                    }
                } else if (document.getElementById('checkbox4').checked) {
                    const ghLpvmButton = document.querySelector('.gh_button.gh_lpvm');
                    if (ghLpvmButton) {
                        setTimeout(() => {
                            ghLpvmButton.click();
                            setTimeout(() => {
                                const lpvmUButton = document.querySelector('.lpvm_button.lpvm_u');
                                if (lpvmUButton) {
                                    lpvmUButton.click();
                                    setTimeout(() => {
                                        const lpvmLpvmButton = document.querySelector('.lpvm_button.lpvm_lpvm');
                                        if (lpvmLpvmButton) {
                                            lpvmLpvmButton.click();
                                        }
                                    }, 2000);
                                }
                            }, 2000);
                        }, 2000);
                    }
                } else if (document.getElementById('checkbox5').checked) {
                    const ghResButton = document.querySelector('.gh_button.gh_res');
                    if (ghResButton) {
                        setTimeout(() => {
                            ghResButton.click();
                            setTimeout(() => {
                                const resButton = document.querySelector('.res_button.res_res');
                                if (resButton) {
                                    resButton.click();
                                }
                            }, 2000);
                        }, 2000);
                    }
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
    controlButton.style.width = '150px'; 
    controlButton.style.padding = '1px';
    controlButton.style.borderRadius = '5px';
    controlButton.style.borderStyle = 'solid';
    controlButton.style.borderWidth = '7px 8px 7px 7px';
    controlButton.style.display = 'block';
    controlButton.style.userSelect = 'none';
    controlButton.style.color = 'gold'; 
    controlButton.style.borderColor = '#333333'; 
    controlButton.addEventListener('click', () => {
        toggleScript();
    });
    document.body.appendChild(controlButton);

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
    checkboxContainer.style.color = '#333333'; 

    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'checkbox1';
    checkbox1.checked = window.localStorage.getItem('checkbox1_checked') === 'true'; 
    checkbox1.addEventListener('change', () => {
        window.localStorage.setItem('checkbox1_checked', checkbox1.checked); 
        if (checkbox1.checked) {
            document.getElementById('checkbox2').checked = false;
        }
    });

    const label1 = document.createElement('label');
    label1.htmlFor = 'checkbox1';
    label1.textContent = 'R - Kody';
    label1.style.color = 'gold'; 
    label1.style.paddingLeft = '10px';
    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'checkbox2';
    checkbox2.checked = window.localStorage.getItem('checkbox2_checked') === 'true'; 
    checkbox2.addEventListener('change', () => {
        window.localStorage.setItem('checkbox2_checked', checkbox2.checked); 
        if (checkbox2.checked) {
            document.getElementById('checkbox1').checked = false;
        }
    });

    const label2 = document.createElement('label');
    label2.htmlFor = 'checkbox2';
    label2.textContent = ' R - PVP';
    label2.style.color = 'gold';
    label2.style.paddingLeft = '10px';
    checkboxContainer.appendChild(checkbox1);
    checkboxContainer.appendChild(label1);
    checkboxContainer.appendChild(document.createElement('br'));
    checkboxContainer.appendChild(checkbox2);
    checkboxContainer.appendChild(label2);

    const checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.id = 'checkbox3';
    checkbox3.checked = window.localStorage.getItem('checkbox3_checked') === 'true';
    checkbox3.addEventListener('change', () => {
        window.localStorage.setItem('checkbox3_checked', checkbox3.checked);
    });

    const label3 = document.createElement('label');
    label3.htmlFor = 'checkbox3';
    label3.textContent = ' R - PVM';
    label3.style.color = 'gold';
    label3.style.paddingLeft = '10px';
    checkboxContainer.appendChild(checkbox3);
    checkboxContainer.appendChild(label3);
    checkboxContainer.appendChild(document.createElement('br'));

    const checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';
    checkbox4.id = 'checkbox4';
    checkbox4.checked = window.localStorage.getItem('checkbox4_checked') === 'true';
    checkbox4.addEventListener('change', () => {
        window.localStorage.setItem('checkbox4_checked', checkbox4.checked);
    });

    const label4 = document.createElement('label');
    label4.htmlFor = 'checkbox4';
    label4.textContent = ' R - Listy';
    label4.style.color = 'gold';
    label4.style.paddingLeft = '10px';
    checkboxContainer.appendChild(checkbox4);
    checkboxContainer.appendChild(label4);
    checkboxContainer.appendChild(document.createElement('br'));

    const checkbox5 = document.createElement('input');
    checkbox5.type = 'checkbox';
    checkbox5.id = 'checkbox5';
    checkbox5.checked = window.localStorage.getItem('checkbox5_checked') === 'true';
    checkbox5.addEventListener('change', () => {
        window.localStorage.setItem('checkbox5_checked', checkbox5.checked);
    });

    const label5 = document.createElement('label');
    label5.htmlFor = 'checkbox5';
    label5.textContent = 'R - Zbie';
    label5.style.color = 'gold';
    label5.style.paddingLeft = '10px';
    checkboxContainer.appendChild(checkbox5);
    checkboxContainer.appendChild(label5);
    checkboxContainer.appendChild(document.createElement('br'));

    document.body.appendChild(checkboxContainer);
}

createControlButton();

const runningStateFromStorage = window.localStorage.getItem('isRunning');
if (runningStateFromStorage === 'true') {
    toggleScript();
}
