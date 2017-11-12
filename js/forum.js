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
var ta;
var postReply = document.getElementById('replytext');

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
function submitReply(key){
    console.log(key)
    postReply = document.getElementById('replytext').value;
    console.log(postReply)
    var data1 = {
        reply: postReply,
        url: photoUrl,
        user: name
    }
    var replies = firebase.database().ref(`/posts/${key}/replies`);
    replies.push(data1);
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
        console.log(snap.val().replies);
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
        div.setAttribute("id", snap.key);
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

        $(replyb).click(function rp(){
            var divr = document.createElement('div');
            ta = document.createElement('textarea');
            var btnr = document.createElement('button');
            var btnc = document.createElement('button');
            var labelr = document.createElement('label');
            labelr.innerHTML = "Escribe tu respuesta:";
            btnr.innerHTML = "Enviar Respuesta";
            btnc.innerHTML = "Cancelar"
            btnr.classList = "btn btn-info";
            btnc.classList = "btn btn-danger";
            divr.classList = "form-group";
            ta.classList = "form-control";
            ta.setAttribute('row','3');
            btnr.setAttribute('id','botonr');
            btnc.setAttribute('id','botonc');
            btnr.setAttribute('onclick',`submitReply('${snap.key}')`)
            ta.setAttribute('id','replytext');
            labelr.setAttribute('for','replytext');
            labelr.setAttribute('for','labelr');
            divr.append(labelr);
            divr.append(ta);
            div.appendChild(divr);
            div.appendChild(btnc);
            div.appendChild(btnr);
            $(replyb).remove();
            $(btnc).click(function(){
                $(divr).remove();
                $(btnc).remove();
                $(btnr).remove();
                divf.appendChild(replyb);
                $(replyb).click(rp);
            })
        })
        let replies = firebase.database().ref(`/posts/${snap.key}/replies`);
        replies.on("child_added", s => {
            console.log(s.val().reply)
            //divf.append(s.val().reply);
            var divrp = document.createElement('div');
            var divrh = document.createElement('div');
            var divrb = document.createElement('div');
            var rn = document.createElement('p');
            var ri = document.createElement('img');
            ri.setAttribute('id','ri');
            rn.setAttribute('id','rn');
            divrp.setAttribute('id','replydiv');
            divrp.setAttribute('style','max-width: 75rem')
            divrp.classList = "card bg-light mb-3";
            divrh.classList = "card-header";
            divrb.classList = "card-body";
            ri.src = (s.val().url);
            med.append(divrp);
            divrp.append(divrh);
            divrp.append(divrb);
            rn.innerHTML = (s.val().user)+" dice: ";
            divrh.appendChild(ri);
            divrh.appendChild(rn);
            divrb.innerHTML = (s.val().reply);
        })

    });
}

$('#chk1').change(function() {
    var body = document.getElementById('bodynewpost');
    var form1 = document.createElement('form');
    var divi = document.createElement('div');
    var label = document.createElement('label');
    var input = document.createElement('input');
    divi.classList = "form-group";
    input.classList = "form-control-file";
    label.setAttribute("for","File")
    input.setAttribute("type","file");
    input.setAttribute("id","File");
    form1.setAttribute("id","formxd")
    if ($('input#chk1').is(':checked')) {
        $('input#Checkbox1').addClass('checked');
        body.append(form1);
        form1.append(divi);
        divi.append(label);
        divi.append(input);
    }else{
        $('input#chk1').removeClass('checked');
        $('#formxd').remove();
    }
});


$(document).ready(function() {
    actualizarDb();
});