var caseNumber = 0;
var wait = 5;
var czekajpvp = 200;
var licznik = 0;
var stop = true;
var dogory = false;
var loc;

var move1 = false;
var move2 = false;
var move3 = false;

var i = 0;
var d = 0;
var w = 0;

const $css = "#glebia_helper {min-width:100px; padding:5px; border:solid gray 1px; background:rgba(0, 0, 0, 0.5); color:gold; position: fixed; top: 40px; right: 5px; z-index:5;}#glebia_helper .gwi_button {cursor:pointer;text-align:center;}";
const $html = "<div class='gwi_button gwi_pvp'>GŁĘBIA <b class='gwi_status red'>Off</b></div>";
$('body').append("<div id='glebia_helper'>" + $html + "</div>").append("<style>" + $css + "</style>");

$('#glebia_helper gwi_pvp').click(() => {
    if (stop) {
        $('#glebia_helper gwi_pvp')
        $("gwi_pvp .gwi_status").removeClass("red").addClass("green").html("On");
        stop = false
        start()
    } else {
        $('#glebia_helper gwi_pvp')
        $("gwi_pvp .gwi_status").removeClass("green").addClass("red").html("Off");
        stop = true
    }
});

function start() {
    if (stop === false) {
        if (!GAME.is_loading && !stop) {
            if (!GAME.is_loading) {
                if (!GAME.is_loading && !stop) {
                    action();
                }
            } else {
                window.setTimeout(start, wait);
            }
        } else {
            window.setTimeout(start, wait);
        }
    }

    function action() {
        const functions = [
            check_position_x,
            check_position_y,
            check_players,
            check_players2,
            kill_players,
            check_location,
            go
        ];

        functions[caseNumber]();
        caseNumber = (caseNumber + 1) % functions.length;
    }
}

function go() {
    var x = GAME.char_data.x;
    var y = GAME.char_data.y;

    if (x == 11 && y == 11 && dogory && loc == 1) {
        cofanie2();
    } else if (x == 15 && y == 15 && move3 && loc == 2) {
        cofanie();
    } else if (x == 2 && y == 11 && loc == 1 && move1) {
        przejdz();
        window.setTimeout(move(7), 1000);
    } else if (x == 1 && y == 1 && loc == 2 && move3) {
        przejdz();
        window.setTimeout(move(7), 1000);
    } else if (x == 7 && y == 7 && loc == 2 && move2 || x == 9 && y == 7 && loc == 2 && move2) {
        move(3);

    } else if (x == 8 && y == 8 && loc == 2 && move2 || x == 10 && y == 8 && loc == 2 && move2) {
        move(5);
    } else if (x == 10 && y == 11 && loc == 1) {
        dogory = true;
        move(7);
    } else if (x == 10 && y == 2 && loc == 1) {
        dogory = false;
        move(8);
    } else if (x == 5 && y == 10 && loc == 1) {
        move1 = true;
        move(8);
    } else if (x == 10 && y == 10 && loc == 1) {
        move1 = true;
        move(8);
    } else if (x == 3 && y == 1 && loc == 2) {
        move1 = false;
        move(7);
    } else if (x == 3 && y == 10 && loc == 1) {
        move(4);
    } else if (x == 2 && y == 8 && loc == 1) {
        move(3)
    } else if (x == 11 && y == 11 && loc == 1 || x == 15 && y == 15 && loc == 2) {
        move(2);
    } else if (x == 5 && y == 7 && loc == 2) {
        move2 = true;
        move(7);
    } else if (x == 13 && y == 7 && loc == 2) {
        move2 = false;
        move(7);
    } else if (x == 12 && y == 15 && loc == 2) {
        move3 = true;
        move(7);
    } else if (x == 5 && y == 11 && loc == 1) {
        move3 = false;
        move(7);
    } else if (x == 10 && y == 15 && loc == 2) {
        move3 = true;
        move(7);
    } else if (x == 7 && y == 11 && loc == 1) {
        move3 = false;
        move(7);
    } else if (x == 7 && y == 7 && loc == 2) {
        move(1);
    } else if (x < 11 && y % 2 !== 0 && loc == 1 || x < 15 && y % 2 !== 0 && loc == 2) {
        move(7);
    } else if (x > 2 && y % 2 == 0 && loc == 1 || x > 1 && y % 2 == 0 && loc == 2) {
        move(8);
    } else if (x == 11 && loc == 1 || x == 2 && loc == 1 || x == 3 && y == 9 && loc == 1 || x == 1 && loc == 2 || x == 15 && loc == 2 || x == 7 && y == 7 && loc == 2) {
        move(1);

    }
}

function cofanie() {
    y = GAME.char_data.y
    if (y <= 1) {
        window.setTimeout(start, wait);
    } else {
        GAME.emitOrder({
            a: 4,
            dir: 6,
            vo: GAME.map_options.vo
        });
        window.setTimeout(cofanie, 50);
    }
}

function cofanie2() {
    y = GAME.char_data.y
    if (y <= 2) {
        window.setTimeout(start, wait);
    } else {
        GAME.emitOrder({
            a: 4,
            dir: 2,
            vo: GAME.map_options.vo
        });
        move1 = true;
        window.setTimeout(cofanie2, 50);
    }
}

function move(direction) {
    const direct = [2, 1, 8, 7, 5, 4, 3];

    if (direct.includes(direction)) {
        GAME.emitOrder({
            a: 4,
            dir: direction,
            vo: GAME.map_options.vo
        });
        window.setTimeout(start, wait);
    }
}

function check_position_x() {
    x = GAME.char_data.x
    window.setTimeout(start, wait);
}

function check_position_y() {
    y = GAME.char_data.y
    window.setTimeout(start, wait);
}

function check_players() {

    if (0 < document.getElementById("player_list_con").childElementCount) {
        y = GAME.char_data.y
        tabb = document.getElementById("player_list_con").children[0].children[1].children[0].textContent.split(":");
        if (document.getElementById("player_list_con").children[0].children[1].childElementCount == 3) {
            tabb = document.getElementById("player_list_con").children[0].children[1].children[0].textContent.split(":");
            if (parseInt(tabb[1]) <= 1 && y == 2) {
                window.setTimeout(check_players, 1500);
            } else {
                window.setTimeout(start, wait);
            }
        } else {
            window.setTimeout(start, wait);
        }
    } else {
        window.setTimeout(start, wait);
    }

}

function check_players2() {
    if (0 < document.getElementById("player_list_con").childElementCount) {
        tabb = document.getElementById("player_list_con").children[0].children[1].children[0].textContent.split(":");
        if (parseInt(tabb[2]) <= 30 && parseInt(tabb[1]) <= 0) {
            window.setTimeout(check_players2, 1500);
        } else {
            window.setTimeout(start, czekajpvp)
        }
    } else {
        window.setTimeout(start, czekajpvp)
    }
}

function kill_players() {
    if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
        $("#player_list_con").find("[data-option=load_more_players]").click();
        window.setTimeout(kill_players, 150);
    } else if (licznik < document.getElementById("player_list_con").childElementCount) {
        if (document.getElementById("player_list_con").children[licznik].children[1].children[0].attributes[1].value === "gpvp_attack" || document.getElementById("player_list_con").children[licznik].children[1].children[1].attributes[1].value === "gpvp_attack") {
            GAME.emitOrder({
                a: 24,
                type: 1,
                char_id: document.getElementById("player_list_con").children[licznik].children[0].children[1].attributes[2].value,
                quick: 1
            });
            licznik++;
            window.setTimeout(kill_players, czekajpvp);
        } else {
            GAME.emitOrder({
                a: 24,
                char_id: document.getElementById("player_list_con").children[licznik].children[1].children[1].attributes[2].value,
                quick: 1
            });
            licznik++;
            window.setTimeout(kill_players, czekajpvp);

        }
    } else {
        window.setTimeout(start, wait);
        licznik = 0;
        kom_clear();
    }
}

function przejdz() {
    GAME.emitOrder({
        a: 6,
        tpid: 0
    });
    window.setTimeout(stop, 1000);
    move3 = false;
    move1 = false;
}

function check_location() {
    const locationMap = {
        "Głębia": 1,
        "Głębia Rajskiej Sali": 2
    };

    const locationName = GAME.current_loc.name
    loc = locationMap[locationName] || 7;
    window.setTimeout(start, wait);
}

start();