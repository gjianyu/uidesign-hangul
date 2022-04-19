let curr = ""

$(document).ready(function() {
    console.log("Test.")
})
function display_info(info){
    $("#hangul-question").empty()
    $("#input-feedback").empty()
    console.log(info)
    all_letters(info)
}

function play() {
    console.log(stats)
    let audio_path = "http://127.0.0.1:8080/"
    audio_path += letter.audio
    console.log(audio_path)
    let audio = new Audio(audio_path)
    audio.play()
    curr = letter.hangul
    // console.log(letter.hangul)
}

function show_info(info){
    $.each(stats, function(i, letter){
        let row = $("<div class = 'row'>")
        $("#options").append(row)
        let col_options = $("<div class = 'col-md-12'>")
        $(col_options).append("<button type='button' class='btn btn-secondary' id= '"+ i + "' value= '" + letter["hangul"] + "'>"+letter["hangul"]+"</button>")

        // $(col_options).append("<button type='button' class='btn btn-secondary' id= '"+ i + "'>"+letter["hangul"]+"</button>")
        $(row).append(col_options)

        $(".btn-secondary").click(function(e) {
            let clicked = e.target
            console.log(clicked.value)

            if (curr == clicked.value) {
                $("#input-feedback").empty()
                $("#input-feedback").append("Correct!")
            }
            else {

                $("#input-feedback").empty()
                $("#input-feedback").append("Incorrect!")
            }

        });
    })
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
