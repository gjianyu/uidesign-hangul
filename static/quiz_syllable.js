var dropbox_text = ""
let letters = [
    "ㄱ",
    "ㄴ",
    "ㅂ",
    "ㅅ",
    "ㅎ",
    "ㅏ"
]

function play(x) {
    let audio_path = "http://127.0.0.1:8080/"
    switch(x) {
        case "ㄱ":
            break;
        case "ㄴ":
            break;
        case "ㅂ":
            break;
        case "ㅅ":
            break;
        case "ㅎ":
            break;
        case "ㅏ":
            break;
        default:
            audio_path += syllable.audio
            break;
    }
    console.log(audio_path)
    let audio = new Audio(audio_path)
    audio.play()
}
function droppableHandler(dragged_letter, dropbox_text){
    $("#drop-box").empty()
    let dropbox_text_dis = Hangul.disassemble(dropbox_text)
    dropbox_text_dis.push(dragged_letter)
    dropbox_text = Hangul.assemble(dropbox_text_dis)
    console.log(dropbox_text.length)
    $("#drop-box").html(dropbox_text)
    return dropbox_text
}

function clear() {
    $("#clear_button").click(function() {
        dropbox_text = ""
        $("#check-work").removeClass("alert-danger")
        $("#check-work").removeClass("alert-success")
        $("#drop-box").html(dropbox_text)
        $("#check-work").empty()
    })
}

function submit() {
    $("#submit_button").click(function() {
        // console.log("hi!")
        if (dropbox_text == syllable.hangul) {
            $("#check-work").html("Correct!")
            $("#check-work").removeClass("alert-danger")
            $("#check-work").addClass("alert-success")

            // $("#change-state").html("!!")
            $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '../../quiz/syllable'>NEXT →</a></div>")
            document.getElementById("submit").disabled = true;
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
        let new_letter = $("<div class='draggable-letter'>")
        $(new_letter).html(value).addClass("col-4")
        $(new_letter).attr("data", value)
        $(new_letter).on("click", function() {
            play(value)
        })
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

