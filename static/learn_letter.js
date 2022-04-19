$(document).ready(function() {

})
function display_info(info){
    $("#hangul-character").empty()
    $("#hangul-image").empty()
    $("#hangul-desc").empty()
    $("#input-feedback").empty()
    console.log(info)
    find_letter(info)
}

function play() {
    let audio_path = "http://127.0.0.1:8080/"
    audio_path += stats["audio"]
    console.log(audio_path)
    let audio = new Audio(audio_path)
    audio.play()
}

function show_info(info){
    $("#hangul-character").append(stats["hangul"])
    $("#image").append("<img src ='"+ stats["image"]+"' width = '200'></img>")
    $("#hangul-audio").on("click", function() {
        play()
    })
    $("#hangul-desc").append("<p>" + stats["pronunciation"] + " like '" + stats["english_word"] + "'</p>")
    $(".question").append("<label for='hangul-question'>What english letter does <b>"+stats["hangul"]+"</b> sound like?</label>")

    $("#form").submit(function(event){
        $("#input-feedback").empty()
        event.preventDefault()
        answerVal = $("#hangul-question").val()
        if($.trim(answerVal) == stats["pronunciation"]){
            $("#input-feedback").append("Correct!")
        }
        else{
            $("#input-feedback").append("Incorrect. Try again.")
        }
    });
    $("#change-state").append("<div class = 'd-flex justify-content-between prev-next'>")

    let prev_id = stats["id"] - 1
    let curr_id = stats["id"]
    let next_id = stats["id"] + 1

    if(stats["end"]=="1"){
        $("#change-state").append("<a class = 'p-3 prev next-button' href='127.0.0.1:5000/learn/letter"+ prev_id +"'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 prev next-button' href = '../../quiz/class1/letter/1'>NEXT →</a></div>")
    }
    else if(prev_id == 0){
        $("#change-state").append("<a class = 'p-3 prev next-button' href='#'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 prev next-button' href = '" + next_id+"'>NEXT →</a></div>")
    }
    else{
        $("#change-state").append("<a class = 'p-3 prev next-button' href='"+prev_id +"'>← PREVIOUS</a>")
        $("#change-state").append("<a class = 'p-3 prev next-button' href = '"+ next_id+"'>NEXT →</a></div>")
    }
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
