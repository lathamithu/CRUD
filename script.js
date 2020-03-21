$(document).ready(function(){
    
    get();
    
    $("#newBtn").on("click", function(e){
        $("#newForm").toggle();
    });
    
    function get(){
        $('#Body').html('');
        $.ajax({
            url: 'http://fakerestapi.azurewebsites.net',
            method: 'get',
            dataType: 'json',
            data: {
                test: 'test data'
            },
            success: function(data) {
                $(data).each(function(i, tutorial){
                    $('#Body').append($("<tr>")
                                            .append($("<td>").append(tutorial.Num))
                                            .append($("<td>").append(tutorial.task))
                                            .append($("<td>").append(tutorial._id))
                                            .append($("<td>").append(`
                                            <i class="far fa-edit editTut" data-tutid="`+tutorial._id+`"></i> 
                                            <i class="fas fa-trash deleteTut" data-tutid="`+tutorial._id+`"></i>
                                        `)));
                    });
                loadButtons();
                }
        });
    }
    
    function getOne(id){
        $.ajax({
            url: 'http://fakerestapi.azurewebsites.net' + '/getOne',
            method: 'get',
            dataType: 'json',
            success: function(data) {
                $($("#updateForm")[0].Id).val(data._id);
                $($("#updateForm")[0].updateNum).val(data.Num);
                $($("#updateForm")[0].updateTask).val(data.task);
                $("#updateForm").show();
            }
        });
    }
    
    $("#submit").on("click", function(e) {
       let data = {
           Num: $($("#newForm")[0].Num).val(),
           task: $($("#newForm")[0].task).val()           
       } 
       
        post(data);
        $("#newForm").trigger("reset");
        $("#newForm").toggle();
        e.preventDefault();
       
    });
    
    
    function post(data) {
        $.ajax({
            url: + 'http://fakerestapi.azurewebsites.net',
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
        $(".editTut").click(function(e){
            getOne($($(this)[0]).data("Id"));
            e.preventDefault();
        });
        
        $(".deleteTut").click(function(e){
            Delete($($(this)[0]).data("Id"));
            e.preventDefault();
        })
    }
    
    function put(id, data){
        $.ajax({
            url: 'http://fakerestapi.azurewebsites.net' + '/put',
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
           Num: $($("#updateForm")[0].updateNum).val(),
           task: $($("#updateForm")[0].updateTask).val()           
       } 
       
        put($($("#updateForm")[0].Id).val(), data);
        $("#updateForm").trigger("reset");
        $("#updateForm").toggle();
        e.preventDefault();
       
    });
    

    
    function Delete(id){
        $.ajax({
            url: 'http://fakerestapi.azurewebsites.net' + '/delete',
            method: 'DELETE',
            dataType: 'json',
            success: function(data) {
                console.log(data);
                get();
            }
        });
    }
    
});
  



