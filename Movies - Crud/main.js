
        $(document).ready(function(){
            var movie = {};
            getList();

            $("#addmovie").click(function(){
                movie.title = $("#title").val();
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

            });
        });


            function Delete(id)
            {
                $.ajax({
                    url:'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/Movies/'+id, 
                    type: 'DELETE',
                    success:function(){
                        alert("Deleted");
                    },
                    error:function(error){
                        alert(error);
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
                           tab1.append('<tr><td>'+title+'</td><td>'+year+'</td><td><button id="btn" onclick = "Delete('+e.id+')">Delete</button>'+"     "+'<button id="btn" onclick = "Edit('+e.id+')">Edit</button></td></tr>')
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
      
