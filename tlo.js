
let klawiszMinusNacisniety = false;

$(document).one('keydown', function(event) {
    if (event.key === "-") {
        document.body.style.backgroundSize = 'auto';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.height = (window.innerHeight + 250) + 'px';
        document.body.style.backgroundPositionX = '-223px';
        document.body.style.backgroundSize = '120%';
        document.body.style.zoom = "75%";
        klawiszMinusNacisniety = true;
    }
});
