let postId;

function getCategories() {

  axios.get('http://localhost:3000/posts')
    .then(function (res) {
      res = res.data;
      postId = res[res.length - 1].id;
      disp(res);
    });
}



function create() {
  let newPost = $('#create-post');
  let newCath = $('#create-catg');
  let newUser = $('#create-user');
  let newTitle = $('#create-title');
  postId = postId + 1;

  axios.post('http://localhost:3000/posts', {
      body: newPost.val(),
      title: newTitle.val(),
      userId: newUser.val(),
      categoryId: newCath.val(),
      id: postId
    })
    .then(function (res) {
      alert("postId")
      getCategories();
    })
  newPost.innerHTML = "";
  newCath.innerHTML = "";
  newUser.innerHTML = "";
  newTitle.innerHTML = "";

}


function disp(el) {
  var bodyTab = $('tbody');
  bodyTab.html('');
  el.forEach(el => {
    bodyTab.append(`<tr>\
        <td class="id">` + el.id + `</td>\
        <td>` + el.title + `</td>\
        <td>` + el.body + `</td>\
        <td>\
        <button class="btUp" onclick="up()" ><i class="far fa-edit"></i></button>\
        <button class="btDel" onclick="del()"><i class="fas fa-trash-alt"></i></button>\
        </td>\
    </tr>\``);
  });
}
let id;
function up() {
 
  $(".subb").css("display", "inline");
  $(".sub").css("display", "none");
  $(".tab tbody").on('click', '.btUp', function () {
    var cRow = $(this).closest('tr');
    id = cRow.find("td:eq(0)").text();
    var col1 = cRow.find("td:eq(1)").text();
    title = col1;
    var col2 = cRow.find("td:eq(2)").text();
    body = col2;
    var cato;
    var us;
    axios.get('http://localhost:3000/posts')
      .then(function (res) {
        res = res.data;
        res.forEach(el => {
          console.log(el.id, id)
          if (id == el.id) {
            cato = el.categoryId;
            us = el.userId;
            $('#create-catg').val(cato);
            $('#create-user').val(us);
            $('#create-post').val(body);
            $('#create-title').val(title);
          }
        })
      }.bind(this));
    $(".subb").css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)");
    $(".subb").mouseover(function () {
      $(this).css("border", "1px solid rgb(12, 235, 12)").css("color", "rgb(12, 235, 12)")
    });
    $(".subb").mouseout(function () {
      $(this).css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)")
    });
  })

}

function update() {
  let newCath = $('#create-catg');
  let newUser = $('#create-user');
  let newPost = $('#create-post');
  let newTitle = $('#create-title');
  $.ajax({
    url: 'http://localhost:3000/posts/' + id,
    method: 'PUT',
    data: {
      body: newPost.val(),
      title: newTitle.val(),
      categoryId: newCath.val(),
      userId: newUser.val()
    },
    success: function (res) {
      getCategories();
    }
  });
}





function del() {

  var rowEl = $(this).closest('tr');
  var id = rowEl.find('.id').text();


  $(".tab tbody").on('click', '.btDel', function () {
    var cRow = $(this).closest('tr');
    var id = cRow.find("td:eq(0)").text();
    axios.delete('http://localhost:3000/posts/' + id)
      .then(function (res) {
        getCategories();
      })
  })
}

getCategories();