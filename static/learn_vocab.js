$(document).ready(function() {

})
function display_info(info){
    $("#hangul-character").empty()
    $("#hangul-image").empty()
    $("#hangul-desc").empty()
    $("#check-work").empty()
    console.log(info)
    find_word(info)
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
    if (stats["hangul"].length > 1) {
        // $("#hangul-character").removeClass("hangul-character")
        // $("#hangul-character").addClass("hangul-character-small")
        document.getElementById("hangul-character").style.fontSize = "60px"
    }
    if(stats["hangul"].length === 2) {
        $("#hangul-character").css("font-size", "4em")
        $("#hangul-character").css("padding-top", "45px")
    }
    if(stats["hangul"].length === 3) {
        $("#hangul-character").css("font-size", "3em")
        $("#hangul-character").css("padding-top", "55px")
    }
    $("#hangul-image-div").append("<img id='hangul-image' src ='" + stats["image"] + "'/>")
    $("#hangul-audio").on("click", function() {
        play()
    })
    $("#hangul-desc").append("<p> Pronunciation: '" + stats["pronunciation"] + "'</p>")
    $("#hangul-desc").append("<p> Definition: " + stats["definition"] + "</p>")
    $("#question-1").append("<label for='hangul-question-1'>How do you pronounce <b>"+stats["hangul"]+"</b>?</label>")
    $("#question-2").append("<label for='hangul-question-2'>What does <b>"+stats["hangul"]+"</b> mean?</label>")


    $("#form").submit(function(event){
        $("#check-work").empty()
        event.preventDefault()
        pronunVal = $("#hangul-question-1").val()
        defnVal = $("#hangul-question-2").val()
        if($.trim(pronunVal) == stats["pronunciation"] && $.trim(defnVal) == stats["definition"]){
            $("#check-work").html("Correct!")
            $("#check-work").removeClass("alert-danger")
            $("#check-work").addClass("alert-success")
            document.getElementById("submit").disabled = true;

            $("#change-state").append("<div class = 'd-flex justify-content-between prev-next'>")

            let prev_id = stats["id"] - 1
            let curr_id = stats["id"]
            let next_id = stats["id"] + 1

            if(stats["end"]=="1"){
                $("#change-state").append("<a class = 'p-3 mr-auto btn prev-next-button' href='"+ prev_id +"'>??? PREVIOUS</a>")
                $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '../../begin/quiz/word'>TAKE QUIZ ???</a></div>")
            }
            else if(prev_id == 0){
                $("#change-state").append("<a class = 'mr-auto p-3 btn prev-next-button disabled'>??? PREVIOUS</a>")
                $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '" + next_id+"'>NEXT ???</a></div>")
            }
            else{
                $("#change-state").append("<a class = 'p-3 mr-auto btn prev-next-button' href='"+prev_id +"'>??? PREVIOUS</a>")
                $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '"+ next_id+"'>NEXT ???</a></div>")
            }
        }
        else{
            $("#check-work").html("Incorrect. Try again.")
            $("#check-work").removeClass("alert-success")
            $("#check-work").addClass("alert-danger")
        }
    });
    // $("#change-state").append("<div class = 'd-flex justify-content-between prev-next'>")

    // let prev_id = stats["id"] - 1
    // let curr_id = stats["id"]
    // let next_id = stats["id"] + 1

    // if(stats["id"] == 0){
    //     console.log("case3")
    //     $("#change-state").append("<a class = 'p-3 mr-auto btn prev-next-button' href='#'>??? PREVIOUS</a>")
    //     $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '" + next_id+"'>NEXT ???</a></div>")
    // }
    // else if(stats["id"] == 5){
    //     console.log("case2")
    //     $("#change-state").append("<a class = 'p-3 mr-auto btn prev-next-button' href='#'>??? PREVIOUS</a>")
    //     $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '" + 5+"'>NEXT ???</a></div>")
    // }
    // else{
    //     console.log("case1")
    //     $("#change-state").append("<a class = 'p-3 mr-auto btn prev-next-button' href='"+prev_id +"'>??? PREVIOUS</a>")
    //     $("#change-state").append("<a class = 'p-3 btn prev-next-button' href = '"+ next_id+"'>NEXT ???</a></div>")
    // }

}

function find_word(info){
    $.ajax({
        type: "POST",
        url: "/find_word",
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
