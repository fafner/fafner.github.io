
var context = [];

var function_maj_map = {
    1: "I",
    2: "ii",
    3: "iii",
    4: "IV",
    5: "V",
    6: "vi",
    7: "vii",
};

var c_maj_map = {
    1: 'C',
    2: 'd',
    3: 'e',
    4: 'F',
    5: 'G',
    6: 'a',
    7: 'b'
};

var button_map = {
    1: "button_I",
    2: "button_II",
    4: "button_IV",
    5: "button_V",
    6: "button_VI",
    7: "button_VII",
};

var activate_map = {
    1: [],
    2: [1, 6, 4],
    4: [1, 6],
    5: [2,7],
    6: [1],
    7: [1,6,4,2],
}

var current_map = c_maj_map;

function clicked(index) {
    context.push(index);
    updateUI();
}

function updateUI() {
    if (context.length == 0) {
        return;
    }

    var last = context.slice(-1)[0];

    var main = $('#main-window');
    main.empty();

    for(var key in button_map) {
        $('#'+button_map[key]).removeClass("disabled");
    }

    var str = context.map(x => current_map[x]).join("-");
    main.html(str);

    activate_map[last].forEach(btn => {
        $('#'+button_map[btn]).addClass("disabled");
    });
}

$(document).ready(function() {

    $('#button_I').click(function() {
        clicked(1);
    });
    $('#button_II').click(function() {
        clicked(2);
    });
    $('#button_IV').click(function() {
        clicked(4);
    });
    $('#button_V').click(function() {
        clicked(5);
    });
    $('#button_VI').click(function() {
        clicked(6);
    });
    $('#button_VII').click(function() {
        clicked(7);
    });
});