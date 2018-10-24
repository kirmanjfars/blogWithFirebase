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



function getCategories() {

   databaseConnect.collection("categories")
       .onSnapshot(snap => {
           disp(snap.docs)
       })
}


function create() {
    if (flag === true) {
     
        let nameT = $('#create-cat').val();
        flag =false;
        databaseConnect.collection("categories")
        .add({
            name: nameT
        })
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
             $("<td>").html(el.name),
            
         ]);

         tr.append(
             $("<td>").append([
                 $("<button>").addClass("fa fa-edit btUp").on("click",() => {
                     update(el.id, el.name)
                 }),
                 $("<button>").addClass("fas fa-trash-alt").on("click",() => {
                    del(el.id);
                 })
             ])
         )
        bodyTab.append(tr);
    });

}

function update(id, name) {
    flag = false;
    $(".tab tbody").on('click', '.btUp', function () {
        $('#create-cat').val(name);

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
        let name = $('#create-cat').val();
        if(flag===false){
            databaseConnect.collection("categories").doc(id).update({name}).then(res =>{
                $('#create-cat').val("");
                flag=true;
        })
    }
    $(".sub").html('<i class="fas fa-plus"></i>')
    })
}

function del(id){
    databaseConnect.collection("categories")
       .doc(id).delete();
}

getCategories();