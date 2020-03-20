$(document).ready(function(){
 
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-product-button', function(){
        // load list of categories

        $.getJSON("http://localhost/api/category/read.php", function(data){
    // build categories option html
// loop through returned list of data
var categories_options_html=`<select name='category_id' class='form-control'>`;
$.each(data.records, function(key, val){
    categories_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`;
});
categories_options_html+=`</select>`;
var create_product_html=
 
   <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
        <span class='glyphicon glyphicon-list'></span> Read Products
    </div>


    <form id='create-product-form' action='#' method='post' border='0'>
    <table class='table table-hover table-responsive table-bordered'>
 
        <tr>
            <td>Name</td>
            <td><input type='text' name='name' class='form-control' required /></td>
        </tr>
 
        <tr>
            <td>Price</td>
            <td><input type='number' min='1' name='price' class='form-control' required /></td>
        </tr>
 

        <tr>
            <td>Description</td>
            <td><textarea name='description' class='form-control' required></textarea></td>
        </tr>
        

        <tr>
            <td>Category</td>
            <td>` + categories_options_html + `</td>
        </tr>
 
 
        <tr>
            <td></td>
            <td>
                <button type='submit' class='btn btn-primary'>
                    <span class='glyphicon glyphicon-plus'></span> Create Product
                </button>
            </td>
        </tr>
 
    </table>
</form>
$("#page-content").html(create_product_html);
 
// chage page title
changePageTitle("Create Product");
 
});
    });
 
    // 'create product form' handle will be here
});