let postId;
let flag = true;


var config = {
  apiKey: "AIzaSyAX3sDpO_OkcPsquVPQjGpypj1212CTxJw",
  authDomain: "blogfirebase-6fe7f.firebaseapp.com",
  databaseURL: "https://blogfirebase-6fe7f.firebaseio.com",
  projectId: "blogfirebase-6fe7f",
  storageBucket: "blogfirebase-6fe7f.appspot.com",
  messagingSenderId: "1036854052247"
};
firebase.initializeApp(config);
const databaseConnect = firebase.firestore();
databaseConnect.settings({timestampsInSnapshots: true});


function getPosts() {

  databaseConnect.collection("posts")
  .onSnapshot(snap => {
      disp(snap.docs)
  })

}



function create() {
 
  if(flag ==  true){


    flag = false;
    let newPost = $('#create-post').val();
    let newCath = $('#create-catg').val();
    let newUser = $('#create-user').val();
    let newTitle = $('#create-title').val();
    databaseConnect.collection("posts")
    .add({
        body:newPost,
        categoryId:newCath, 
        userId: newUser, 
        title: newTitle
    });
     $('#create-post').val("");
     $('#create-catg').val("");
     $('#create-user').val("");
      $('#create-title').val("");
   
  }

}


function disp(el) {

  var bodyTab = $('tbody');
    bodyTab.html('');
    el.forEach((t,i) => {
        let el = {...t.data(),id:t.id}
        let tr = $("<tr>");
         tr.append([
             $("<td>").html(i+1),
             $("<td>").html(el.title),
             $("<td>").html(el.body)
         ]);
         tr.append(
             $("<td>").append([
                 $("<button>").addClass("fa fa-edit btUp").on("click",() => {
                     update(el.id, el.body, el.categoryId, el.userId, el.title)
                 }),
                 $("<button>").addClass("fas fa-trash-alt").on("click",() => {
                    del(el.id);
                 })
             ])
         )
        bodyTab.append(tr);
    });

}

function update(id, body, categoryId, userId, title) {
  flag = false;

 
  $(".subb").css("display", "inline");
  $(".sub").css("display", "none");
  
  $(".tab tbody").on('click', '.btUp', function () {
   

    $('#create-catg').val(categoryId);
    $('#create-user').val(userId);
    $('#create-post').val(body);
    $('#create-title').val(title);


    $(".subb").css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)");
    $(".subb").mouseover(function () {
      $(this).css("border", "1px solid rgb(12, 235, 12)").css("color", "rgb(12, 235, 12)")
    });
    $(".subb").mouseout(function () {
      $(this).css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)")
    });
  })


  $('.subb').on('click', function(e){
    e.preventDefault();
    let categoryId = $('#create-catg').val();
    let userId = $('#create-user').val();
    let body = $('#create-post').val();
    let title = $('#create-title').val();
    if(flag===false){
        databaseConnect.collection("posts").doc(id).update({body,categoryId, userId, title}).then(res =>{
          $('#create-catg').val("");
          $('#create-user').val("");
          $('#create-post').val("");
          $('#create-title').val("");
        })
        flag = true;
    }
    $(".subb").css("display", "none");
    $(".sub").css("display", "inline");   })


}

// function update() {
//   let newCath = $('#create-catg');
//   let newUser = $('#create-user');
//   let newPost = $('#create-post');
//   let newTitle = $('#create-title');
//   $.ajax({
//     url: 'http://localhost:3000/posts/' + id,
//     method: 'PUT',
//     data: {
//       body: newPost.val(),
//       title: newTitle.val(),
//       categoryId: newCath.val(),
//       userId: newUser.val()
//     },
//     success: function (res) {
//       getCategories();
//     }
//   });
// }





function del(id) {

  databaseConnect.collection("posts")
  .doc(id).delete();
}
getPosts();