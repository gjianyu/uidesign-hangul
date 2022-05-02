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
            audio_path += "hangul_audios/1_g.mp3"
            break;
        case "ㄴ":
            audio_path += "hangul_audios/2_n.mp3"
            break;
        case "ㅂ":
            audio_path += "hangul_audios/3_b.mp3"
            break;
        case "ㅅ":
            audio_path += "hangul_audios/4_s.mp3"
            break;
        case "ㅎ":
            audio_path += "hangul_audios/5_h.mp3"
            break;
        case "ㅏ":
            audio_path += "hangul_audios/6_ah.mp3"
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
    $("#drop-box").html(dropbox_text)
    if(dropbox_text.length === 1) {
        $("#drop-box").css("font-size", "8em")
        $("#drop-box").css("padding-top", "0")
    }
    if(dropbox_text.length === 2) {
        $("#drop-box").css("font-size", "4em")
        $("#drop-box").css("padding-top", "45px")
    }
    if(dropbox_text.length === 3) {
        $("#drop-box").css("font-size", "3em")
        $("#drop-box").css("padding-top", "55px")
    }
    return dropbox_text
}

function clear() {
    $("#clear_button").click(function() {
        dropbox_text = ""
        $("#drop-box").html(dropbox_text)
        $("#check-work").empty()
        $("#check-work").removeClass("alert-danger")
    })
}

function submit() {
    $("#submit_button").click(function() {
        if (dropbox_text == syllable.hangul) {
            $("#check-work").html("Correct!")
            $("#check-work").removeClass("alert-danger")
            $("#check-work").addClass("alert-success")
            document.getElementById("clear_button").disabled = true;
            document.getElementById("submit_button").disabled = true;
            loadPages()
        }
        else {
            $("#check-work").html("Incorrect. Try again!")
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

function loadPages() {
    let prev_id = id - 1
    let curr_id = id
    let next_id = id + 1

    if(curr_id == 12){
        $("#change-state").append("<a class = 'mr-auto p-3 btn prev-next-button' href='"+ prev_id +"'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '../../quiz/syllable'>NEXT →</a></div>")
    }
    else if(prev_id == 0){
        $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '" + next_id+"'>NEXT →</a></div>")
    }
    else{
        $("#change-state").append("<a class = 'mr-auto p-3 btn prev-next-button' href='"+prev_id +"'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '"+ next_id+"'>NEXT →</a></div>")
    }
}

$(document).ready(function(){
    draggableTablePopulate()
    dropboxDroppable()
    clear()
    submit()
})
