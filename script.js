
        $(document).ready(function(){
            $("#addlist").click(function(){

                var txt = JSON.stringify( { "List": ($('#list').val()) } ); 
                $.ajax({ 
                    url: 'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/CRUD',
                    type: 'post',
                    contentType: 'application/json',
                    data: txt,
                    success: function( ){
                        
                        var txt2 = $("<ul></ul>").text( $('#list').val());
                        if(($('#list').val())!=""){
                        $("#list").val("");
                        $("body").append((txt2).append("  ").append('<button id="deletelist">DELETE</button>'));
                        }             
                        
                    },
                    error: function(errorThrown ){
                        console.log( errorThrown );
                    }
                });

            });
                $("#deletelist").click(function(){
                
                var txt = JSON.stringify( { "List": ($('#list').val()) } ); 
                $.ajax({
                    url: 'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/CRUD',
                    method: 'DELETE',
                    dataType: 'json',
                    success: function() {
                        $("#list").val("");
                    }
                });
            });
            function getList(data){
                $.ajax({
                    url: 'https://api.backendless.com/36DC4E7A-2B33-40D0-A382-FD197E23A89B/BC24AD0C-019C-42A0-BAAD-229B8D8F7222/data/CRUD',
                    method: 'get',
                    dataType: 'json',
                    data : data,
                    
                });
           
            }
            
          });

