$(document).ready(function() {
})
function display_info(info){
    $("#quiz-audio").empty()
    $("#hangul-question").empty()
    $("#input-feedback").empty()
    console.log(info)
    all_letters(info)
}
function show_info(info){
    $.each(stats, function(i, letter){
        let row = $("<div class = 'row'>")
        $("#options").append(row)
        let col_options = $("<div class = 'col-md-12'>")
        $(col_options).append("<button type='button' class='btn btn-secondary' id= '"+ i + "'>"+letter["hangul"]+"</button>")
        $(row).append(col_options)

        $(".btn-secondary").click(function() {
            $("#input-feedback").empty()
            if()
            $("#input-feedback").append("Correct!")
        });
    })
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
