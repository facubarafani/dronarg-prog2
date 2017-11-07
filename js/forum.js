/*var postTitle = document.getElementById("postitle");
var postBody = document.getElementById("postbody");
var postBtn = document.getElementById("postbtn");
var newTitle = document.getElementById("newtitle");

function submit() {
var firebaseRef = firebase.database().ref().child("User").child("post");
    var title = postTitle.value;
    var body = postBody.value;

    firebaseRef.child("titulo").set(title);
    firebaseRef.child("texto").set(body);    
    firebaseRef.on('child_added', snap =>{
        var tit = snap.child("titulo").val();
        var txt = snap.child("texto").val();
        newTitle.append(tit);
    })
}
*/
var btnPost = document.getElementById('postbtn');
var postTitle = document.getElementById('postitle');
var postBody = document.getElementById('postbody');
var newTitle = document.getElementById("newtitle");
var database = firebase.database();
var cat;

$('#choosecat').change(function () {
    cat = $(this).find("option:selected").text();
});

function submitPost() {
    var postTitle = document.getElementById('postitle').value;
    var postBody = document.getElementById('postbody').value;
    var data = {
        title: postTitle,
        body: postBody,
        url: photoUrl,
        user: name,
        category: cat
    }
    var posts = database.ref('posts');
    database.ref('posts').push(data);
    console.log(data);   
}
function actualizarDb(){
    var postsRef = firebase.database().ref('/posts/');
    //    postsRef.on('value', snapshot => {
    //        snapshot.forEach(snap => {
    //            console.log(snap.val());
    //            console.log(snap.val().title)
    //            var med = document.getElementById('colmedio');
    //            var div = document.createElement('div');
    //            var divh = document.createElement('div');
    //            var divb = document.createElement('div');
    //            div.classList = "card text-white bg-dark mb-3";
    //            divh.classList = "card-header";
    //            divb.classList = "card-body";
    //            med.append(div);
    //            div.append(divh);
    //            div.append(divb);
    //        })
    //    })

    postsRef.on('child_added', snap => {

        console.log(snap.val());
        console.log(snap.val().title)
        var med = document.getElementById('colmedio');
        var div = document.createElement('div');
        var divh = document.createElement('div');
        var divb = document.createElement('div');
        var img = document.createElement('img');
        var tit = document.createElement('h2');
        var namepost = document.createElement('p');
        var divf = document.createElement('div');
        var spanc = document.createElement('span');
        var replyb = document.createElement('button');
        var likeb = document.createElement('button');
        var spanlb = document.createElement('span');
        div.classList = "card text-white bg-dark mb-3";
        divh.classList = "card-header";
        divb.classList = "card-body";
        divf.classList = "card-footer";
        spanc.classList = "badge badge-secondary";
        replyb.classList = "btn btn-info";
        med.append(div);
        div.append(divh);
        div.append(divb);
        div.append(divf);
        img.src = snap.val().url;
        img.setAttribute("class", "postprofilepic");
        namepost.setAttribute("id", "postn");
        spanc.setAttribute("id","categorybadge");
        div.setAttribute("id","divposts");
        tit.innerHTML = snap.val().title;
        namepost.innerHTML = snap.val().user;
        //divh.innerHTML = snap.val().title;
        spanc.innerHTML = snap.val().category;
        replyb.innerHTML = "Responder";
        divh.appendChild(tit);
        divh.appendChild(namepost);
        divh.appendChild(img);
        divf.appendChild(spanc);
        divf.appendChild(replyb);
        divb.innerHTML = snap.val().body;
        $(".postprofilepic").css("display","block");
    });

}
$(document).ready(function() {
    actualizarDb();
});