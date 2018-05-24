(function($){
    // AJAX for posting
    function create_post() {
        console.log("create post is working!") // sanity check
        $.ajax({
            url : $("#Url").attr("data-url"), // the endpoint
            type : "POST", // http method
            data : { "p" : $('#myInput').val() }, // data sent with the post request

            // handle a successful response
            success : function(json) {
                // $('#myInput').val(''); // remove the value from the input
                console.log("success"); // another sanity check
                $("#nada").empty();
                for(var i = 0; i < json.options.length; i++){
                    $("#nada").append("<li>"+json.options[i].text+"</li>");
                }
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    };

    // handle on change value of input field
    $('#myInput').on('input',function(e){
        create_post();
    });
})(jQuery); 