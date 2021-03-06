var dropbox_text = ""
let letters = [
    "ㄱ",
    "ㄴ",
    "ㅂ",
    "ㅅ",
    "ㅎ",
    "ㅏ"
]
let curr = ""
var score = {"total": 0, "correct": 0}
let starting = true

function reset_score() {
    score = {"total": 0, "correct": 0}
    $.ajax({
        type: "POST",
        url: "../../../score",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify("reset"),
        success: function(result) {
            console.log(result)
            score["total"] = result["total"]
            score["correct"] = result["correct"]
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function show_score() {
    $("#score").html(
        "Score: " + score["correct"] + "/" + score["total"]
    )
    let percentage
    if (score["total"] == 0) {
        percentage = 0
    }
    else {
        percentage = Math.round((score["correct"] / score["total"]) * 100)
    }
    $("#percent").html(
        "Percent: " + percentage + "%"
    )
}

function get_score() {
    $.ajax({
        type: "GET",
        url: "../../../score",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            score["total"] = result["total"]
            score["correct"] = result["correct"]
            console.log(result)
            show_score()
            console.log("ajax get total:", result["total"])
            console.log("ajax get correct:", result["correct"])
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function post_score(search_str) {
    $.ajax({
        type: "POST",
        url: "../../../score",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(score),
        success: function(result) {
            console.log(result)
            if (score["total"] != result["total"] && score["correct"] != result["correct"]) {
                console.log("score:", score)
                console.log("result:", result)
                // alert("Conflict in score!")
            }
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

function deactive_buttons() {
    // deactive all dragging dropping bro?!?!?!
    console.log("can they still drag drop? SHOULDNT!")
    return
}

function check_quiz_progress() {
    if (score["total"] > 6) {
        console.log("greater than 6:", score["total"])
        // alert("total:", score["total"])
        // alert("corr:", score["correct"])
        if (score["correct"]/score["total"] >= 0.85) {
            console.log("greater than or equal to 0.85:", Math.round(score["correct"]/score["total"]))
            return true
        }
    }
    else {
        return false
    }
}

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
        console.log("hi!")
        let check_work = $("#check-work")
        let change_state = $("#change-state")
        var quiz_done = false
        if (dropbox_text == syllable.hangul) {


            check_work.empty()
            change_state.empty()
            score["total"] = score["total"] + 1
            console.log("score, total:", score["total"])
            score["correct"] = score["correct"] + 1
            console.log("score, correct:", score["correct"])
            $("#check-work").html("Correct!")
            $("#check-work").removeClass("alert-danger")
            $("#check-work").addClass("alert-success")
            // check_work.html("Correct!")
            post_score()
            deactive_buttons()
            // check_work.removeClass("alert-danger")
            // check_work.addClass("alert-success")
            get_score()
            console.log("before check progress:", score["total"])
            console.log("before check progress:", Math.round(score["correct"]/score["total"]))
            quiz_done = check_quiz_progress()
            if (quiz_done) {
                reset_score()
                document.getElementById("submit_button").disabled = true
                document.getElementById("clear_button").disabled = true
                alert("You're ready to do level 3!")
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../begin/word'> NEXT →</a>")
            }
            else {
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../quiz/syllable'> NEXT →</a>")
                quiz_done = false
            }






            // $("#change-state").html("!!")
            // $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '../../quiz/syllable'>NEXT →</a></div>")
            // document.getElementById("submit").disabled = true;
        }
        else {
            // $("#check-work").html("INCORRECT! Try again!")
            // $("#check-work").removeClass("alert-success")
            // $("#check-work").addClass("alert-danger")





            check_work.empty()
            change_state.empty()
            $("#check-work").empty()
            score["total"] = score["total"] + 1
            post_score()
            deactive_buttons()
            console.log("0")
            $("#check-work").append("Incorrect. Keep going! You need to get above 85% accuracy after answering more than 6 questions")
            $("#check-work").removeClass("alert-success")
            $("#check-work").addClass("alert-danger")
            if (quiz_done) {
                reset_score()
                alert("You're ready to do level 3!")
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../learn/syllable'> NEXT CLASS →</a>")
            }
            else {
                console.log("10")
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../quiz/syllable'> NEXT →</a>")
                quiz_done = false
            }
            get_score()
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
    // if (starting == true) {
    //     reset_score()
    //     starting = false
    // }
    get_score()
    console.log("out of get_score total:", score["total"])
    console.log("out of get_score correct:", score["correct"])
    console.log(score)
    draggableTablePopulate()
    dropboxDroppable()
    clear()
    submit()

})
