let curr = ""
var score = {"total": 0, "correct": 0}

$(document).ready(function() {
    console.log("Test.")
})
function display_info(info){
    $("#hangul-question").empty()
    $("#check-work").empty()
    console.log(info)
    all_letters(info)
}

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

function play() {
    // console.log(stats)
    let audio_path = "http://127.0.0.1:8080/"
    // audio_path += stats["audio"]
    console.log("letter.audio", letter.audio)
    audio_path += letter.audio
    console.log(audio_path)
    let audio = new Audio(audio_path)
    audio.play()
    // reidojakfdjls
    // curr = stats["hangul"]
    console.log(letter.hangul)
    curr = letter.hangul
    // console.log(letter.hangul)
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
    // deactive all the other buttons bro, otherwise the score gets messed up!
    document.getElementById("0").disabled = true
    document.getElementById("1").disabled = true
    document.getElementById("2").disabled = true
    document.getElementById("3").disabled = true
    document.getElementById("4").disabled = true
    document.getElementById("5").disabled = true
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

function show_info(info){

    get_score()
    console.log("out of get_score total:", score["total"])
    console.log("out of get_score correct:", score["correct"])
    console.log(score)
    // show_score()

    let options = $("#options")
    let first_row = $("<div class = 'row'>")
    let second_row = $("<div class = 'row'>")
    let third_row = $("<div class = 'row'>")

    $.each(stats, function(i, letter) {
        if (i < 2) {
            let button_col = $("<div class = 'col-6 d-flex justify-content-center'>")
            first_row.append(button_col)
            button_col.append("<button type='button' class='btn btn-hangul-option' id= '" + i + "' value= '" + letter["hangul"] + "'>" + letter["hangul"] + "</button>")
        } else if (i < 4) {
            let button_col = $("<div class = 'col-6 d-flex justify-content-center'>")
            second_row.append(button_col)
            button_col.append("<button type='button' class='btn btn-hangul-option' id= '" + i + "' value= '" + letter["hangul"] + "'>" + letter["hangul"] + "</button>")
        } else {
            let button_col = $("<div class = 'col-6 d-flex justify-content-center'>")
            third_row.append(button_col)
            button_col.append("<button type='button' class='btn btn-hangul-option' id= '" + i + "' value= '" + letter["hangul"] + "'>" + letter["hangul"] + "</button>")
        }
    })



    options.append(first_row)
    options.append(second_row)
    options.append(third_row)

    $(".btn-hangul-option").click(function(e) {
        let clicked = e.target
        console.log(clicked.value)

        let check_work = $("#check-work")
        let change_state = $("#change-state")
        var quiz_done = false

        if (curr == clicked.value) {
            check_work.empty()
            change_state.empty()
            score["total"] = score["total"] + 1
            console.log("score, total:", score["total"])
            score["correct"] = score["correct"] + 1
            console.log("score, correct:", score["correct"])
            check_work.html("Correct!")
            post_score()
            deactive_buttons()
            check_work.removeClass("alert-danger")
            check_work.addClass("alert-success")
            get_score()
            console.log("before check progress:", score["total"])
            console.log("before check progress:", Math.round(score["correct"]/score["total"]))
            quiz_done = check_quiz_progress()
            if (quiz_done) {
                reset_score()
                alert("You're ready to do level 2!")
            }
            else {
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../quiz/class2/letter'> NEXT →</a>")
                quiz_done = false
            }
        }
        else {
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
                alert("You're ready to do level 2!")
            }
            else {
                console.log("10")
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../quiz/class2/letter'> NEXT →</a>")
                quiz_done = false
            }
            get_score()
        }
    });
}

function get_id(getId){
    let info = getId
    find_letter(info)
}
function show_letter(info){
    $("#change-state").append("<div class = 'd-flex justify-content-between prev-next'>")

    let prev_id = stats["id"] - 1
    console.log(stats["id"])
    let curr_id = stats["id"]
    let next_id = stats["id"] + 1

/*
    if(stats["end"]=="1"){
        $("#change-state").append("<a class = 'p-3 prev next-button' href='127.0.0.1:5000/learn/letter"+ prev_id +"'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 prev next-button' href = '../../class2/letter/1'>NEXT →</a></div>")
    }
    else if(prev_id == 0){
        $("#change-state").append("<a class = 'p-3 prev next-button' href='#'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 prev next-button' href = '" + next_id+"'>NEXT →</a></div>")
    }
    else{
        $("#change-state").append("<a class = 'p-3 prev next-button' href='"+prev_id +"'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 prev next-button' href = '"+ next_id+"'>NEXT →</a></div>")
    }
*/

    // HAVE TO DO: Check if selected button is same as audio
}
function find_letter(info){
    $.ajax({
        type: "POST",
        url: "/find_letter",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(info),

        success: function(result){
            let all_data = result["stats"]
            console.log("yo wtf")
            console.log(all_data)
            stats = all_data
            show_letter(stats)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(info)
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
function all_letters(info){
    $.ajax({
        type: "POST",
        url: "/all_letters",
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(info),
        success: function(result){
            let all_data = result["stats"]
            console.log("wtf pt 2")
            console.log(all_data)
            stats = all_data
            show_info(stats)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(info)
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}
