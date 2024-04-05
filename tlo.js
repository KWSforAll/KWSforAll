let klawiszMinusNacisniety = false;

document.addEventListener('keydown', function(event) {
    if (!$("input, textarea").is(":focus")) {
        if (event.key === "-" && !klawiszMinusNacisniety) {
            addToCSS.innerHTML += `
                body {
                    background-size: auto;
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    height: ${(window.innerHeight + 250)}px;
                    background-position-x: -223px;
                    background-size: 120%;
                    zoom: 75%;
                }
            `;
            klawiszMinusNacisniety = true;
        }
    }
});
