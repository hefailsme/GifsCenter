// key =  UFdB0LeoIzt9ZxF20upxMU6AEGM8g9tJ
// endpoint = api.gify
$(document).ready(function () {

    // making object named sports
    var sports = {
        name: 'sport collection',
        sportsList: ['major-league-baseball', 'olympic-curling', 'boxing', 'table-tennis', 'skateboarding']
    }
    // assigning listOfSports to array of sports.sportsList
    var listOfSports = sports.sportsList
    // hooking into button container, where i will place dynamically placed buttons
    var btnBox = $("#btn-box")
    for (var i = 0; i < listOfSports.length; i++) {
        // creating new button
        var newBtn = $('<button class="search-btns">' + listOfSports[i] + '</button>')
        // placing in DOM
        btnBox.append(newBtn)
    }

    //hooking into submit button with id selector, which creates a jquery object
    var submitBtn = $('#submitBtn')
    // attaching click handler function to the submit button
    submitBtn.on('click', function () {
        // prevent button from submitting page
        event.preventDefault();
        var newSearchTerm = $('#new-search-term').val();
        var newSearchBtn = $('<button class="search-btns">' + newSearchTerm + '</button>')
        btnBox.append(newSearchBtn)
     })
    $(document).on('click', '.search-btns', function (event) {
        event.preventDefault()
        $("#sports").empty();
        var qTerm = $(this).text()
        // console.log(qTerm)
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + qTerm + '&api_key=UFdB0LeoIzt9ZxF20upxMU6AEGM8g9tJ&limit=10';
        // console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            //div to hold gifs
            var gifsContainer = $("#sports");

            var gifs = response.data //ARRAY

            // console.log('gifs ==== ', gifs)

            // console.log('for loop starting --------- >')
            for (var i = 0; i < gifs.length; i++) {

                // console.log('index of gifs[' + i + ']')
                var gifStill = gifs[i].images["original_still"].url
                // ["0"].images.original_still 480w_still
                // console.log(gifStill)
                var gifLoop = gifs[i].images["original"].url
                // console.log(gifLoop)
                //storing rating data
                var rating = gifs[i].rating
                // console.log(rating)
                // Saving the image_original_still_url property
                var imageURL = gifStill;
                // saving the image_original_url property
                var loopURL = gifLoop;
                // creating and storing image tag
                var sportsImage = $('<img id="sports-image"/>');
                // setting the sportsImage src attr to imageUrl
                sportsImage.attr("src", imageURL);
                // creating an element to have rating displayed
                var pOne = $("<p>").text("Rating: " + rating);
                // appending sportsImage to img div
                $("#sports").append(sportsImage).append(pOne);
                // display rating in <p> div
            }
            $('#sports-image').on('click', function (event) {
                var source = $(this).attr("src")
                console.log(source)
                // if (source === sportsImage) {
                //     $(this).attr("src", $(this).attr(loopURL));
                //     // $(this).attr("data-state", "animate");
                //   } else {
                //     $(this).attr("src", $(this).attr(imageURL));
                //     // $(this).attr("data-state", "still");
                //   }
            })


        });

    })


});