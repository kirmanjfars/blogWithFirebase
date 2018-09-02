let flag = true;

function getCategories() {

    axios.get('http://localhost:3000/comments')
        .then(function (res) {
            res = res.data;
            disp(res);
        });
}

let comId = 1;

function create() {

    if (flag === true) {

        comId++;
        let newCom = $('#create-com');
        let uid = $('#create-userId');
        let posId = $('#create-postId');

        flag =false;
        axios.post('http://localhost:3000/comments', {
                body: newCom.val(), 
                userId: uid.val(), 
                postId: posId.val()
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
        <td class="catN">` + el.body + `</td>\
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
        comName = col1;
        

        axios.get('http://localhost:3000/comments')
      .then(function (res) {
        res = res.data;
        res.forEach(el => {
          console.log(el.id, id)
          if (id == el.id) {
            let posti = el.postId;
            let usi = el.userId;
            $('#create-postId').val(posti);
            $('#create-userId').val(usi);
            $('#create-com').val(comName);
          }
        })
      }.bind(this));

       
        $(".sub").html('<i class="fas fa-check"></i>').css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)");
      

        $(".sub").mouseover(function() {
            $(this).css("border", "1px solid rgb(12, 235, 12)").css("color", "rgb(12, 235, 12)")
          });

          $(".sub").mouseout(function() {
            $(this).css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)")
          });

        
    })
    
    $('.sub').on('click', function(){

        let newCom = $('#create-com');
        let usi = $('#create-userId');
        let posi = $('#create-postId');
        if(flag===false){
        $.ajax({
            url: 'http://localhost:3000/comments/'+id,
            method: 'PUT',
            data: 
                {body: newCom.val(), 
                    userId: usi.val(), 
                    postId: posi.val()
                }
            ,success: function (res) { 
                flag = true;
             }
        });}
    })
}

function del(){

  
     $(".tab tbody").on('click', '.btDel', function () {
            var cRow = $(this).closest('tr');
            var id = cRow.find("td:eq(0)").text();
            alert(id)
        axios.delete('http://localhost:3000/comments/'+ id)
        .then(function (res) {
            getCategories();
        })
  })
}

getCategories();