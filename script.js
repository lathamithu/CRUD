$(document).ready(function(){
    
    get();
    
    $("#newBtn").on("click", function(e){
        $("#newForm").toggle();
    });
    
    function get(){
        $('#Body').html('');
        $.ajax({
            url: 'http://localhost:3000/api/tutorials',
            method: 'get',
            dataType: 'json',
            data: {
                test: 'test data'
            },
            success: function(data) {
                $(data).each(function(i, e){
                    $('#Body').append($("<tr>")
                                            .append($("<td>").append(e.todoNumber))
                                            .append($("<td>").append(e.task))
                                            .append($("<td>").append(e._id))
                                            .append($("<td>").append(`
                                                <i class="far fa-edit editTut" data-tutid="`+e._id+`"></i> 
                                                <i class="fas fa-trash deleteTut" data-tutid="`+e._id+`"></i>
                                            `)));
                    });
                loadButtons();
                }
        });
    }
    
    function getOne(id){
        $.ajax({
            url: 'http://localhost:3000/api/tutorials/' + id,
            method: 'get',
            dataType: 'json',
            success: function(data) {
                $($("#updateForm")[0].Id).val(data._id);
                $($("#updateForm")[0].updateNum).val(data.todoNumber);
                $($("#updateForm")[0].updateType).val(data.type);
                $("#updateForm").show();
            }
        });
    }
    
    $("#submit").on("click", function(e) {
       let data = {
           todoNumber: $($("#newForm")[0].Num).val(),
           title: $($("#newForm")[0].task).val()
       } 
       
        post(data);
        $("#newForm").trigger("reset");
        $("#newForm").toggle();
        e.preventDefault();
       
    });
    
    
    function post(data) {
        $.ajax({
            url: 'http://localhost:3000/api/tutorials',
            method: 'POST',
            dataType: 'json',
            data: data,
            success: function(data) {
                console.log(data);
                get();
            }
        });
    }
    
    function loadButtons() {
        $(".edit").click(function(e){
            getOne($($(this)[0]).data("id"));
            e.preventDefault();
        });
        
        $(".delete").click(function(e){
            Delete($($(this)[0]).data("id"));
            e.preventDefault();
        })
    }
    
    function put(id, data){
        $.ajax({
            url: 'http://localhost:3000/api/tutorials/' + id,
            method: 'PUT',
            dataType: 'json',
            data: data,
            success: function(data) {
                console.log(data);
                get();
            }
        });
    }
    
    $("#update").on("click", function(e) {
       let data = {
           todoNumber: $($("#updateForm")[0].updateNum).val(),
           task: $($("#updateForm")[0].updateTask).val()
       } 
       
        put($($("#updateForm")[0].Id).val(), data);
        $("#updateForm").trigger("reset");
        $("#updateForm").toggle();
        e.preventDefault();
       
    });
    

    
    function Delete(id){
        $.ajax({
            url: 'http://localhost:3000/api/tutorials/' + id,
            method: 'DELETE',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                get();
            }
        });
    }
    
});
  



