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

$("td#target").attr("contenteditable", "");

    function getList(){
       
        $.ajax({
            url:'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/Movies',
            type: 'GET',
            dataType: 'json',
           success:function(data){
               var tab1 = $('#tb1movie tbody');
               tab1.empty();
                $(data).each(function(i,e){
                   tab1.append('<tr><td contenteditable="true" id="sav1">'+e.Title+'</td><td contenteditable="true" id="sav2">'+e.Year+'</td><td><button class="delbtn" data-id="'+this.objectId+'" onclick = "Delete(this)">Delete</button><button class="savbtn" data-id="'+this.objectId+'" onclick = "Save(this)">Save</button></td></tr>');
                });
               
           },
           error: function (error){
            alert(error);
            }
        });
   
    } 
    function Delete(btn) 
    {
        console.log(btn.dataset.id);
        var a ='https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/Movies/'+btn.dataset.id;
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

function Save(obj)
{console.log(obj.dataset.id);
    var movie={};
    movie.title = $("#sav1").text();
    movie.year = $("#sav2").text();
    var ob = JSON.stringify(movie);
    $.ajax({ 
        url:'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/Movies', 
        type: 'PUT',
        contentType: 'application/json',
        data:ob,
        success: function( ){
            
            alert("Altered successfully");
            getList();
            reset();
            },              
         
        error: function(error){
            alert( error );
        }
    });
}

  function reset(){
        $('#title').val('');
        $('#year').val('');
    }
