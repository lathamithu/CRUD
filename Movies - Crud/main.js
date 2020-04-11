$(document).ready(function(){
    var movie = {};
    getList();

    $("#addmovie").click(function(){
        if($("#title").val()!="" && $("#year").val()!="")
        {movie.title = $("#title").val();
        movie.year = $("#year").val();
        var obj = JSON.stringify(movie);
        $.ajax({ 
            url:'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/Movies', 
            type: 'POST',
            contentType: 'application/json',
            data: obj,
            success: function( ){
                
                alert("Saved successfully");

                getList();
                reset();
                },           
             
            error: function(error){
                alert( error );
            }
        });
    }
    });
});

    
function Delete()
{   
    var a='https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/Movies/5B9EAC90-84DB-9329-FFB1-5D31F5EFCA00';
    $.ajax({
        url:a,
        type: 'DELETE',
        success:function(resp, status, xhr){
            alert("Deleted");
            console.log(resp, status, xhr);
            getList();
        },
        error:function(xhr){
            alert("error");
            console.log(JSON.parse(xhr.responseText), xhr);
            getList();
        }
});
    
}
       
       



    function getList(){
        $.ajax({
            url:'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/Movies',
            type: 'GET',
            dataType: 'json',
           success:function(data){
               var tab1 = $('#tb1movie tbody');
               tab1.empty();
               $(data).each(function(i,e){
                   tab1.append('<tr><td>'+e.Title+'</td><td>'+e.Year+'</td><td><button id="delbtn" onclick = "Delete()">Delete</button></td></tr>')
               });
           },
           error: function (error){
            alert(error);
            }
        });
   
    } 

    function reset(){
        $('#title').val('');
        $('#year').val('');
    }
