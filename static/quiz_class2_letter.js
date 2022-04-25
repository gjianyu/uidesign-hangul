$(document).ready(function() {
})
function display_info(info){
    $("#quiz-hangul").empty()
    $("#hangul-question").empty()
    $("#input-feedback").empty()
    console.log(info)
    find_letter(info)
}
function show_info(info){
    $("#quiz-hangul").html(letter.hangul)
    console.log(letter)
    $(".question").append("<p>How do you pronounce " + letter.hangul + "?</p>")

    $(".form").submit(function(event){
        $("#input-feedback").empty()
        event.preventDefault()
        answerVal = $("#hangul-question").val()
        console.log(letter.pronunciation)
        if($.trim(answerVal) == letter.pronunciation){
            console.log($.trim(answerVal))
            $("#input-feedback").append("Correct!")
        }
        else{
            console.log($.trim(answerVal))
            $("#input-feedback").append("Incorrect. Try again.")
        }
    });
    $("#change-state").append("<div class = 'd-flex justify-content-between prev-next'>")

    let prev_id = stats["id"] - 1
    let curr_id = stats["id"]
    let next_id = stats["id"] + 1

    quiz_done = false
    total = 100
    score = 85

    if (total > 6 && score/total >= 0.85) {
        quiz_done = true
    }
    else {
        quiz_done = false
    }

    if (quiz_done) {
        alert("You're ready to do level 2!")
    }
    else {
        $("#change-state").append("<a class = 'p-3 prev-next-button'  href='../../quiz/class1/letter'> NEXT →</a>")
    }

    // if(stats["end"]=="1"){
    //     $("#change-state").append("<a class = 'p-3 prev next-button' href='127.0.0.1:5000/learn/letter"+ prev_id +"'>← PREVIOUS</a>")
    //     $("#change-state").append("<a class = 'p-3 prev next-button' href = '../../../learn/syllable/1'>NEXT →</a></div>")
    // }
    // else if(prev_id == 0){
    //     $("#change-state").append("<a class = 'p-3 prev next-button' href='#'>← PREVIOUS</a>")
    //     $("#change-state").append("<a class = 'p-3 prev next-button' href = '" + next_id+"'>NEXT →</a></div>")
    // }
    // else{
    //     $("#change-state").append("<a class = 'p-3 prev next-button' href='"+prev_id +"'>← PREVIOUS</a>")
    //     $("#change-state").append("<a class = 'p-3 prev next-button' href = '"+ next_id+"'>NEXT →</a></div>")
    // }

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
