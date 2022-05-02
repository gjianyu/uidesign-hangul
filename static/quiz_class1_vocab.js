var dropbox_text = ""
let letters = [
    "ㄱ",
    "ㄴ",
    "ㅂ",
    "ㅅ",
    "ㅎ",
    "ㅏ"
]

function check_overspill() {
    word = vocab.hangul
    if (word.length > 1) {
        let hangul_vocab = document.getElementById("hangul-character")
        hangul_vocab.style.fontSize = "4em"
        let dropbox = document.getElementById("drop-box")
        dropbox.style.fontSize = "2em"
    }
}

function play() {
    let audio_path = "http://127.0.0.1:8080/"
    audio_path += vocab.audio
    console.log(audio_path)
    let audio = new Audio(audio_path)
    audio.play()
}

function droppableHandler(dragged_letter, dropbox_text){
    $("#drop-box").empty()
    let dropbox_text_dis = Hangul.disassemble(dropbox_text)
    dropbox_text_dis.push(dragged_letter)
    dropbox_text = Hangul.assemble(dropbox_text_dis)
    $("#drop-box").html(dropbox_text)
    return dropbox_text
}

function clear() {
    $("#clear_button").click(function() {
        dropbox_text = ""
        $("#drop-box").html(dropbox_text)
        $("#check-work").empty()
    })
}

function submit() {
    $("#submit_button").click(function() {
        if (dropbox_text == vocab.hangul) {
            $("#check-work").html("Correct!")
            $("#check-work").removeClass("alert-danger")
            $("#check-work").addClass("alert-success")
        }
        else {
            $("#check-work").html("INCORRECT! Try again!")
            $("#check-work").removeClass("alert-success")
            $("#check-work").addClass("alert-danger")
        }
    })
}

function dropboxDroppable(){
    $("#drop-box").droppable({
        tolerance: "touch",
        drop: function(event, ui) {
            let dragged_letter = ui.draggable.attr("data")
            dropbox_text = droppableHandler(dragged_letter, dropbox_text)
        }
    })
}

function draggableTablePopulate(){
    $.each(letters, function(index, value){
        let new_letter = $("<div>")
        $(new_letter).html(value).addClass("col-4")
        $(new_letter).attr("data", value)
        // how to make dragged letter go in front of box?
        // $(new_letter).position("relative")
        // $(new_letter).zIndex(1)
        $(new_letter).on("mouseover", function(){
            $(new_letter).draggable({
                revert: true,
                revertDuration: 0
            })
        })
        
        if (value in ["ㄱ", "ㄴ", "ㅂ"]) {
            $("#first_row_of_drag_table").append(new_letter)
        }
        else {
            $("#second_row_of_drag_table").append(new_letter)
        }
    })
}

$(document).ready(function(){
    draggableTablePopulate()
    dropboxDroppable()
    clear()
    submit()
})