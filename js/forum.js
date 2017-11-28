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
var x;
var storageService = firebase.storage();
var selectedFile;
var downloadURL;

$('#choosecat').change(function () {
    cat = $(this).find("option:selected").text();
});
function submitReply(key){
    postReply = document.getElementById('replytext').value;
    var data1 = {
        reply: postReply,
        url: photoUrl,
        user: name
    }
    var replies = firebase.database().ref(`/posts/${key}/replies`);
    replies.push(data1);
    $(divr).remove();
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
        var replydivv = document.createElement('div');
        var showReply = document.createElement('button');
        var imagex = document.createElement('img');
        var x = snap.child("replies").numChildren();
        div.classList = "card text-white bg-dark mb-3";
        divh.classList = "card-header";
        divb.classList = "card-body";
        divf.classList = "card-footer";
        spanc.classList = "badge badge-secondary";
        replyb.classList = "btn btn-info";
        showReply.classList = "btn btn-info";
        med.append(div);
        div.append(divh);
        div.append(divb);
        div.append(divf);
        med.append(replydivv);
        img.src = snap.val().url;
        imagex.src = snap.val().imageurl;
        showReply.setAttribute("id","showreplies");
        img.setAttribute("class", "postprofilepic");
        namepost.setAttribute("id", "postn");
        spanc.setAttribute("id","categorybadge");
        div.setAttribute("id", snap.key);
        imagex.setAttribute('id',"fotopostt");
        //        imagex.setAttribute('onclick','resizeImg(this)');
        tit.innerHTML = snap.val().title;
        namepost.innerHTML = snap.val().user;
        //divh.innerHTML = snap.val().title;
        spanc.innerHTML = snap.val().category;
        replyb.innerHTML = "Responder";
        showReply.innerHTML = "Mostrar Comentarios("+x+")";
        divh.appendChild(tit);
        divh.appendChild(namepost);
        divh.appendChild(img);
        divf.appendChild(spanc);
        divf.appendChild(replyb);
        divf.appendChild(showReply);
        divb.innerHTML = snap.val().body;
        divb.append(imagex);
        $(".postprofilepic").css("display","block");
        if ( snap.val().imageurl != undefined){
            $(imagex).css('display','block');
        }

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
                divf.insertBefore(replyb, divf.firstChild);
                $(replyb).click(rp);
            })
            $(btnr).click(function(){
                $(divr).remove();
                $(btnc).remove();
                $(btnr).remove();
                divf.insertBefore(replyb, divf.firstChild);
                $(replyb).click(rp);
            });
        })


        let replies = firebase.database().ref(`/posts/${snap.key}/replies/`);
        replies.on("child_added", s => {
            //divf.append(s.val().reply);
            var x = snap.child('replies').numChildren();
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
            replydivv.append(divrp);
            divrp.append(divrh);
            divrp.append(divrb);
            rn.innerHTML = (s.val().user)+" dice: ";
            divrh.appendChild(ri);
            divrh.appendChild(rn);
            divrb.innerHTML = (s.val().reply);
            $(showReply).click(function xd(){
                $(divrp).css('display','block');
                showReply.innerHTML = "Ocultar Comentarios("+x+")";
                $(showReply).click(function(){
                    $(divrp).css('display','none');
                    showReply.innerHTML = "Mostrar Comentarios("+x+")";
                    $(showReply).click(xd);
                })
            })
        })
        $(function() {
            $('img').on('click', function() {
                $('.enlargeImageModalSource').attr('src', $(this).attr('src'));
                $('#enlargeImageModal').modal('show');
            });
        });
        
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
    input.setAttribute("id","filexd");
    form1.setAttribute("id","formxd")
    if ($('input#chk1').is(':checked')) {
        $('input#Checkbox1').addClass('checked');
        body.append(form1);
        form1.append(divi);
        divi.append(label);
        divi.append(input);
        $('#filexd').on("change", function(event) {
            selectedFile = event.target.files[0];
        });
    }else{
        $('input#chk1').removeClass('checked');
        $('#formxd').remove();
    }
});
function uploadImage() {
    var postTitle = document.getElementById('postitle').value;
    var postBody = document.getElementById('postbody').value;
    if (selectedFile == undefined){
        var data = {
            title: postTitle,
            body: postBody,
            url: photoUrl,
            user: name,
            category: cat,
        }
        var posts = database.ref('posts');
        database.ref('posts').push(data);
        $('#modalpostt').modal('hide');
    }else{
        var filename = selectedFile.name;
        var storageRef = firebase.storage().ref('/imagenes/' + filename);
        var uploadTask = storageRef.put(selectedFile);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            // Handle unsuccessful uploads
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot.downloadURL;
            //submitPost();
            if (downloadURL =! null){
                var postTitle = document.getElementById('postitle').value;
                var postBody = document.getElementById('postbody').value;
                var data = {
                    title: postTitle,
                    body: postBody,
                    url: photoUrl,
                    user: name,
                    category: cat,
                    imageurl: uploadTask.snapshot.downloadURL
                }
                var posts = database.ref('posts');
                database.ref('posts').push(data);
                $('#modalpostt').modal('hide');
            }else{
                var data = {
                    title: postTitle,
                    body: postBody,
                    url: photoUrl,
                    user: name,
                    category: cat,
                }
                var posts = database.ref('posts');
                database.ref('posts').push(data);
                $('#modalpostt').modal('hide');
            }

        });
    }
}
$(document).ready(function() {
    actualizarDb();
});