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




function getComments() {

    databaseConnect.collection("comments")
    .onSnapshot(snap => {
        disp(snap.docs)
    })
}

let comId = 1;

function create() {

    if (flag === true) {

       
        let newCom = $('#create-com').val();
        let uid = $('#create-userId').val();
        let poi = $('#create-postId').val();

        flag =false;
        databaseConnect.collection("comments")
        .add({
            body: newCom,
            userId: uid, 
            postId: poi
        });

        $('#create-com').val("");
        $('#create-userId').val("");
        $('#create-postId').val("");

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
             $("<td>").html(el.body),
         ]);

         tr.append(
             $("<td>").append([
                 $("<button>").addClass("fa fa-edit btUp").on("click",() => {
                     update(el.id, el.body, el.postId, el.userId)
                 }),
                 $("<button>").addClass("fas fa-trash-alt").on("click",() => {
                    del(el.id);
                 })
             ])
         )
        bodyTab.append(tr);
    });
}



function update(id, body, postId, userId) {
  
    flag = false;
    $(".tab tbody").on('click', '.btUp', function () {
        $('#create-postId').val(postId);
        $('#create-userId').val(userId);
        $('#create-com').val(body);



       
        $(".sub").html('<i class="fas fa-check"></i>').css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)");
      

        $(".sub").mouseover(function() {
            $(this).css("border", "1px solid rgb(12, 235, 12)").css("color", "rgb(12, 235, 12)")
          });

          $(".sub").mouseout(function() {
            $(this).css("border", "1px solid rgb(233, 233, 21)").css("color", "rgb(233, 233, 21)")
          });

        
    })
    
    $('.sub').on('click', function(e){
      e.preventDefault();
        let body = $('#create-com').val();
        let userId = $('#create-userId').val();
        let postId = $('#create-postId').val();
        if(flag===false){
            databaseConnect.collection("comments").doc(id).update({body,userId, postId}).then(res =>{
                $('#create-com').val("");
                $('#create-userId').val("");
                $('#create-postId').val("");

               })

      }
    })
}

function del(id){
    databaseConnect.collection("comments")
       .doc(id).delete();
}

getComments();