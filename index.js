getPost = function () {
    let i=0;
    axios.get('http://localhost:3000/posts')
        .then(function (post) {
            post.data.forEach(posts => {
                axios.get('http://localhost:3000/users')
                    .then(function (user) {
                        user.data.forEach(users => {
                            if (posts.userId == users.id) { 
                                i++;
                                $("#app").append(
                                    `<div class="post"> <h3> ` + posts.title + `</h3> 
                                        <h4 class="title"> ` + users.name + `</h4>
                                        <p>` + posts.body + `</p>
                                        <h4 id="com`+i+`">  Comments  </h4>
                                        </div>`
                                )
                                axios.get('http://localhost:3000/comments')
                                    .then(function (comment) {
                                        comment.data.forEach(coms => {
                                            if (coms.postId == posts.id) {
                                                console.log("comspostid", coms.postId, "posts.id", posts.id)
                                                axios.get('http://localhost:3000/users')
                                                    .then(function (us) {
                                                        us.data.forEach(use => {
                                                            if (coms.userId == use.id) {
                                                                console.log(i);
                                                                $( `#com`+posts.id+`` ).append(
                                                                    `<h5 id="comN">` + use.name + `</h5>
                                                                    <div class="comment">
                                                                    <p> ` + coms.body + `</p>
                                                                    </div>`
                                                                )
                                                            }
                                                        })
                                                    })

                                            }
                                        })
                                    })



                            }
                        })

                    })




            });
        })
}


getPost();

$('#new-button').on('click', function () {

    $('.np').append(
        `<form>
        <div class="form1">
            <label>Title:</label>
            <input required placeholder="Enter here" id="create-input2"> </div>
        <div class="form1">
            <label>Writer:</label>
            <input required placeholder="Enter here" id="create-input3"> </div>
        <br>
        <div class="form1">
            <label>Post:</label>
            <input required placeholder="Enter here" type="text" id="create-input1">
        </div>
        <button class="addButton">
            <i class="fas fa-plus"></i>
        </button>
    </div></form>`
    )

});