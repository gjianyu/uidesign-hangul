$(document).ready(function() {
})
function display_featured(featuredBooks){
    $("#books").empty()
    console.log(featuredBooks)
    let row = $("<div class = 'row'>")
    $("#books").append(row)
    $.each(featuredBooks, function(i, bookData){
        if(i==4 || i==7 || i==0){
            let row = $("<div class = 'row'>")
            $("#books").append(row)

            let bookTitle = $("<div class = 'col-md-6 book'>")
            $(bookTitle).append("<a href='http://127.0.0.1:5000/view/"+bookData["id"]+"'>"+bookData["title"]+"</a>")
            $(row).append(bookTitle)
            console.log(bookTitle)

            let bookAuthor = $("<div class = 'col-md-3 book'>")
            $(bookAuthor).append(bookData["author"])
            $(row).append(bookAuthor)
            console.log(bookAuthor)

            let bookPrice = $("<div class = 'col-md-3 book'>")
            $(bookPrice).append(bookData["price"])
            $(row).append(bookPrice)
            console.log(bookPrice)
        }
    })
}
