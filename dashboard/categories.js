let flag = true;

function getCategories() {

    axios.get('http://localhost:3000/categories')
        .then(function (res) {
            res = res.data;
            disp(res);
        });
}

let catId = 2;

function create() {

    if (flag === true) {

        catId++;
        let newCat = $('#create-cat');
        flag =false;
        axios.post('http://localhost:3000/categories', {
                name: newCat.val()
            })
            .then(function (res) {
                getCategories();
            })
        event.preventDefault();
        create();
    }

}


function disp(el) {

    var bodyTab = $('tbody');

    bodyTab.html('');
    el.forEach(el => {
        bodyTab.append(`<tr>\
        <td class="id">` + el.id + `</td>\
        <td class="catN">` + el.name + `</td>\
        <td>\
        <button class="btUp" onclick="update()" ><i class="far fa-edit"></i></button>\
        <button class="btDel" onclick="del()"><i class="fas fa-trash-alt"></i></button>\
        </td>\
    </tr>\``);
    });
}

function update() {
    let id; 
    flag = false;
    $(".tab tbody").on('click', '.btUp', function () {
        var cRow = $(this).closest('tr');
        id = cRow.find("td:eq(0)").text();
        var col1 = cRow.find("td:eq(1)").text();
        catName = col1;

        $('#create-cat').val(catName);
        $(".sub").html('<i class="fas fa-check"></i>').css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)");
      

        $(".sub").mouseover(function() {
            $(this).css("border", "1px solid rgb(12, 235, 12)").css("color", "rgb(12, 235, 12)")
          });

          $(".sub").mouseout(function() {
            $(this).css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)")
          });

        
    })
    $('.sub').on('click', function(){
        let newCat = $('#create-cat');
        if(flag===false){
        $.ajax({
            url: 'http://localhost:3000/categories/'+id,
            method: 'PUT',
            data: 
                {name: newCat.val()}
            ,success: function (res) { 
                flag = true;
             }
        });}

        create()
        update()
    })
}

function del(){

    var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();


        $(".tab tbody").on('click', '.btDel', function () {
            var cRow = $(this).closest('tr');
            var id = cRow.find("td:eq(0)").text();
            
             
        axios.delete('http://localhost:3000/categories/'+ id)
        .then(function (res) {
            getCategories();
        })
  })
}

getCategories();