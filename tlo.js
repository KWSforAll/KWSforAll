let klawiszMinusNacisniety = false;

document.addEventListener('keydown', function(event) {
    if (!$("input, textarea").is(":focus")) {
        if (event.key === "-" && !klawiszMinusNacisniety) {
            document.body.style.backgroundSize = 'auto';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.height = (window.innerHeight + 250) + 'px';
            document.body.style.backgroundPositionX = '-223px';
            document.body.style.backgroundSize = '120%';
            document.body.style.zoom = "75%";
            klawiszMinusNacisniety = true;
        } else if (event.key === "-") {

            document.body.style.backgroundSize = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.height = '';
            document.body.style.backgroundPositionX = '';
            document.body.style.backgroundSize = '';
            document.body.style.zoom = "";
            klawiszMinusNacisniety = false;
        }
    }
});
