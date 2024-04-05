document.addEventListener('wheel', function(event) {
    if (event.ctrlKey) { 
        event.preventDefault(); 

        let scaleChange = event.deltaY > 0 ? -0.1 : 0.1; 

        let currentScale = parseFloat(document.body.style.zoom || 1);
        let newScale = currentScale + scaleChange; 

        newScale = Math.min(Math.max(newScale, 0.1), 10);

        document.body.style.zoom = newScale; 
    }
});
