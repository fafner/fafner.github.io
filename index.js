
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

function generate_diatonic(index) {
    if (index > 7) return;

    var base = 4;

    var one = current_map[index].toLowerCase() + "/" + base;

    index += 2;
    if (index > 7) {
        index -= 7;
        base++;
    }
    var two = current_map[index].toLowerCase() + "/" + base;

    index += 2;
    if (index > 7) {
        index -= 7;
        base++;
    }
    var three = current_map[index].toLowerCase() + "/" + base;

    return [one, two, three];
}

function clicked(index) {
    context.push(index);
    updateUI();
}

function updateUI() {
    if (context.length == 0) {
        return;
    }

    var last = context.slice(-1)[0];

    var main = $('#chords-holder');
    main.empty();

    for(var key in button_map) {
        $('#'+button_map[key]).removeClass("disabled");
    }

    var str = context.map(x => current_map[x]).join("-");
    main.html(str);

    activate_map[last].forEach(btn => {
        $('#'+button_map[btn]).addClass("disabled");
    });

    redrawSheetMusic();
}

VF = Vex.Flow;

function redrawSheetMusic() {
    $('#sheet-music').empty();
    var div = document.getElementById("sheet-music");
    var width = div.clientWidth;
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    renderer.resize(width, 500);

    var vfContext = renderer.getContext();

    // Create a stave at position 10, 40 of width 400 on the canvas.
    var stave = new VF.Stave(10, 40, width);

    // Add a clef and time signature.
    stave.addClef("treble");

    // Connect it to the rendering context and draw!
    stave.setContext(vfContext).draw();


    var last = context.slice(-1)[0];
    var chord = generate_diatonic(last);
        
    var notes = [
    
        // A C-Major chord.
        new VF.StaveNote({clef: "treble", keys: chord, duration: "2" })
    ];

    var chords = context.map(c => generate_diatonic(c));

    var notes = chords.map(c => new VF.StaveNote({clef: "treble", keys: c, duration: "2" }));
    
    // Create a voice in 4/4 and add above notes
    var voice = new VF.Voice({num_beats: context.length,  beat_value: 2});
    voice.addTickables(notes);
    
    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], width);
    
    // Render voice
    voice.draw(vfContext, stave);
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