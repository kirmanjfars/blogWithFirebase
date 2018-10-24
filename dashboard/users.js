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

function getUsers() {
      databaseConnect.collection("users")
       .onSnapshot(snap => {
           disp(snap.docs)
       })
}


function create() {

    if (flag === true) {

       
        let usernameT = $('#create-user').val();
        let emailT = $('#create-email').val();
        flag =false;
           databaseConnect.collection("users")
            .add({
                email:emailT,
                username:usernameT
            });
             $('#create-user').val("");
             $('#create-email').val("");
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
             $("<td>").html(el.username),
             $("<td>").html(el.email)
         ]);
         tr.append(
             $("<td>").append([
                 $("<button>").addClass("fa fa-edit btUp").on("click",() => {
                     update(el.id, el.username, el.email)
                 }),
                 $("<button>").addClass("fas fa-trash-alt").on("click",() => {
                    del(el.id);
                 })
             ])
         )
        bodyTab.append(tr);
    });
}

function update(id,name, email) {
    flag = false;
    
    $(".tab tbody").on('click', '.btUp', function () {
        $('#create-user').val(name);
        $('#create-email').val(email);
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
        let username = $('#create-user').val();
        let email = $('#create-email').val();
        if(flag===false){
            databaseConnect.collection("users").doc(id).update({email,username}).then(res =>{
             $('#create-user').val("");
             $('#create-email').val("");
            })
        }
        $(".sub").html('<i class="fas fa-plus"></i>')
       
    })
}

function del(id){
      databaseConnect.collection("users")
       .doc(id).delete();
}

getUsers();