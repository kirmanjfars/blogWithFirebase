
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

  function getPost() {
    databaseConnect.collection("posts")
     .onSnapshot(snap => {
        let n=1;

         snap.docs.forEach(post =>{
             let cpost = {...post.data()};
             let pUserId = cpost.userId;

             console.log(pUserId);

             databaseConnect.collection("users")
             .onSnapshot(snap => {
                 let c = 1;
             snap.docs.forEach(user =>{
            
                while(c==pUserId){
                    let userI = {...user.data()};
                     $("#app").append(
                        `<div class="post "> <h3> ` + cpost.title + `</h3> 
                            <h4 class="title"> ` + userI.username + `</h4>
                            <p>` + cpost.body + `</p>
                            <h4 id="com">  Comments  </h4>
                            </div>`
                    )
                    databaseConnect.collection("comments").onSnapshot(snap =>{
                        snap.docs.forEach(comment =>{
                            
                             let cComment = {...comment.data()}
                             console.log(cComment.postId, n)
                               if(cComment.postId == n){
                                $(`#com`).append(
                                    `<div class="comment">
                                    <p> ` + cComment.body + `</p>
                                    </div>`
                                )
                             
                               }
                            })
                    })
                    break;
                }
                c++;
            }
            ) })

           

        
         })
     })
}

getPost();



   

const txtEmail = document.getElementById('email');
const txtPass = document.getElementById('password');
const txtUser = document.getElementById('username');
const btnlogin = document.getElementById('logIn');
const btnlogOut = document.getElementById('logOut');
const btnSignUp = document.getElementById('signUp');

$("button#signUp").on("click", e =>{
    const txtEmail = document.getElementById('email');
    const txtPass = document.getElementById('password');
    const txtUser = document.getElementById('username');

        e.preventDefault();
        const email = txtEmail.value;
        const pass = txtPass.value;
        const txtName = txtUser.value;
        const auth = firebase.auth();
        let userObject = {
            email: email,
            password:pass, 
            username: txtName
        }
        const databaseConnect = firebase.firestore();
        databaseConnect.settings({timestampsInSnapshots: true});
     auth.createUserWithEmailAndPassword(email, pass)
      .then(res => {
          databaseConnect.collection("users")
           .add(userObject);
      }).catch(e=> alert("the email is used before"));

      $(".logForm").css({"display":"none"});
      $(".myApp").css({"display":"inline"});
      $("form.logForm input").value = "";

    })

$("#sign").on("click", function(){
    $("button#logIn").css({"display":"none"})
    $("button#sign").addClass("mt")
    $(".si").css("display", "flex")
})

$("button#logIn").on("click", e => {
    const auth = firebase.auth();
    const txtEmail = document.getElementById('email').value;
    const txtPass = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(txtEmail,txtPass) 
      .then(res => {
          $(".logForm").css({"display":"none"});
          $(".myApp").css({"display":"inline"});
            $("form.logForm input").value = "";
      })
})

async function logOut()
{
   await firebase.auth().signOut(); 
   $(".logForm").css({"display":"flex"});
   $(".myApp").css({"display":"none"});  
}
