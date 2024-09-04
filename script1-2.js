if (typeof GAME === 'undefined') { } else {
    let Pog = setInterval(() => {
        if (!GAME.pid) { } else {
            clearInterval(Pog);
        }
    }, 50);

    var modalStyle = document.createElement('style')
    modalStyle.textContent = `
     /* The Modal (background) */
.kwaModal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.kwaModalContent {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.closeModalUpdate {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.closeModalUpdate:hover,
.closeModalUpdate:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
} 
    `;
    document.head.appendChild(modalStyle);
    $("body").append(`<div id="kwaModalUpdate" class="kwaModal"> <div class="kwaModalContent"> <span class="closeModalUpdate">&times;</span> <p>Korzystasz ze starej wersji rozszerzenia. Pobierz aktualizacje z działu aktualizacje:
        https://discord.com/invite/FCsgB6EQw9</p> </div>`);
}
