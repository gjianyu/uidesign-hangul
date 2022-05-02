var score = {"total": 0, "correct": 0}

$(document).ready(function() {})

function reset_score() {
    $.ajax({
        type: "POST",
        url: "../../../score",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify("result"),
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

function get_score() {
    $.ajax({
        type: "GET",
        url: "../../../score",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            console.log("ajax get:", result)
            score["total"] = result["total"]
            score["correct"] = result["correct"]
            show_score()
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
    document.getElementById("submit_button").disabled = true
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

function display_info(info){
    $("#quiz-hangul").empty()
    $("#hangul-question").empty()
    $("#input-feedback").empty()
    console.log(info)
    find_letter(info)
}
function show_info(info){
    console.log("testing show_info")

    get_score()
    $("#change-state").empty()
    console.log("showing score:", score)

    $("#quiz-hangul").html(letter.hangul)
    console.log(letter)
    $(".question").append("<p>How do you pronounce " + letter.hangul + "?</p>")

    var quiz_done = false

    $(".form").submit(function(event){
        $("#input-feedback").empty()
        event.preventDefault()
        answerVal = $("#hangul-question").val()
        console.log(letter.pronunciation)
        if($.trim(answerVal) == letter.pronunciation){
            console.log($.trim(answerVal))
            score["total"] = score["total"] + 1
            console.log("score, total:", score["total"])
            score["correct"] = score["correct"] + 1
            console.log("score, correct:", score["correct"])
            // show_score()
            $("#input-feedback").append("Correct!")
            $("#input-feedback").removeClass("alert-danger")
            $("#input-feedback").addClass("alert-success")
            post_score()
            deactive_buttons()
            get_score()

            quiz_done = check_quiz_progress()

            if (quiz_done) {
                reset_score()
                alert("You're ready to do level 2!")
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../begin/syllable'> NEXT →</a>")
            }
            else {
                $("#change-state").append("<a class = 'p-3 prev-next-button'  href='../../quiz/class1/letter'> NEXT →</a>")
                quiz_done = false
            }
        }
        else{
            $("#input-feedback").empty()
            console.log($.trim(answerVal))
            score["total"] = score["total"] + 1
            // show_score()

            post_score()
            deactive_buttons()
            $("#input-feedback").append("Incorrect. Keep going! You need to get above 85% accuracy after answering more than 6 questions")
            $("#input-feedback").removeClass("alert-success")
            $("#input-feedback").addClass("alert-danger")

            // quiz_done = check_quiz_progress()

            if (quiz_done) {
                reset_score()
                alert("You're ready to do level 2!")
                change_state.append("<a class = 'p-3 prev-next-button'  href='../../begin/syllable'> NEXT →</a>")
            }
            else {
                $("#change-state").append("<a class = 'p-3 prev-next-button'  href='../../quiz/class1/letter'> NEXT →</a>")
                quiz_done = false
            }
            get_score()

        }
    });

    let prev_id = stats["id"] - 1
    let curr_id = stats["id"]
    let next_id = stats["id"] + 1

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
