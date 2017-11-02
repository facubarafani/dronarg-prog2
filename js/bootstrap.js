$(document).ready(function () { 
    var top = $('#colizquierda').offset().top - parseFloat($('#colizquierda').css('marginTop').replace(/auto/, 0));
    $(window).scroll(function (event) {
        var y = $(this).scrollTop();
        //if y > top, it means that if we scroll down any more, parts of our element will be outside the viewport
        //so we move the element down so that it remains in view.
        if (y >= top) {
           var difference = y - top;
           $('#colizquierda').css("top",difference);
       }
   });
});
$(document).ready(function () { 
    var top = $('#colderecha').offset().top - parseFloat($('#colderecha').css('marginTop').replace(/auto/, 0));
    $(window).scroll(function (event) {
        var y = $(this).scrollTop();
        //if y > top, it means that if we scroll down any more, parts of our element will be outside the viewport
        //so we move the element down so that it remains in view.
        if (y >= top) {
           var difference = y - top;
           $('#colderecha').css("top",difference);
       }
   });
});
            window.fbAsyncInit = function() {
                FB.init ({
                    appId      : '2044624762432582',
                    xfbml      : true,
                    version    : 'v2.6'
                });
            };

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            } (document, 'script', 'facebook-jssdk'));

            var provider = new firebase.auth.FacebookAuthProvider();

            function facebookSignin() {
                firebase.auth().signInWithPopup(provider)

                    .then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;
                    var displayName = user.displayName;
                    console.log(token)
                    console.log(user)
                    console.log(displayName);
                    if (user != null) {
                        name = user.displayName;
                        email = user.email;
                        photoUrl = user.photoURL;
                        emailVerified = user.emailVerified;
                        uid = user.uid;
                        document.getElementById("nombre").innerHTML= name;
                        console.log(photoUrl);
                        document.getElementById("foto").src= photoUrl;
                        document.getElementById("boton1").innerHTML = "Cerrar Sesion";
                        document.getElementById("boton1").onclick= function(){ facebookSignout(); };
                        $("#foto").css("display","block");
                        $("#boton").addClass("disabled")
                        $('#myModal1').modal('show');
                    }
                }).catch(function(error) {
                    console.log(error.code);
                    console.log(error.message);
                    $('#myModal1').modal('show');
                });

            }
            function facebookSignout() {
                firebase.auth().signOut()

                    .then(function() {
                    $("#foto").css("display","none");
                    document.getElementById("boton1").innerHTML = "Iniciar con Facebook";
                    console.log('Signout successful!')
                    $("#boton1").addClass("disabled")
                }, function(error) {
                    console.log('Signout failed')
                });
            }
            var provider1 = new firebase.auth.GoogleAuthProvider();

            function googleSignin() {
                firebase.auth()

                    .signInWithPopup(provider1).then(function(result) {
                    var token = result.credential.accessToken;
                    var user = result.user;


                    console.log(token)
                    console.log(user)
                    if (user != null) {
                        name = user.displayName;
                        email = user.email;
                        photoUrl = user.photoURL;
                        emailVerified = user.emailVerified;
                        uid = user.uid;
                        name = user.displayName;
                        email = user.email;
                        photoUrl = user.photoURL;
                        emailVerified = user.emailVerified;
                        document.getElementById("nombre").innerHTML= name;
                        console.log(photoUrl);
                        document.getElementById("foto").src= photoUrl;
                        document.getElementById("boton").innerHTML = "Cerrar Sesion";
                        document.getElementById("boton").onclick= function(){ googleSignout(); };
                        $("#foto").css("display","block");
                        $("#boton1").addClass("disabled")
                        $('#myModal1').modal('show');
                    }

                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(error.code)
                    console.log(error.message)
                    $('#myModal2').modal('show');
                });

            }

            function googleSignout() {
                firebase.auth().signOut()

                    .then(function() {
                    console.log('Signout Succesfull')
                    document.getElementById("boton").innerHTML = "Iniciar con Google";
                    document.getElementById("boton").onclick= function(){ googleSignin(); };
                    document.getElementById("foto").innerHTML= null;
                    document.getElementById("nombre").innerHTML= null;
                    $("#foto").css("display","none");
                    $("#boton1").removeClass("disabled")
                }, function(error) {
                    console.log('Signout Failed')  
                });
            }


            function createWithEmailAndPassword(){
                var email;
                var password;
                email = document.getElementById("user").value;
                password = document.getElementById("pass").value;
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                    console.log(error.code);
                    console.log(error.message);
                });
                console.log(email);
                console.log(password);
            }
            function signInWithEmailAndPassword(){   
                var email;
                var password;
                email = document.getElementById("usr").value;
                password = document.getElementById("pwd").value;
                $('#myModal1').modal('show');
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                    console.log(error.code);
                    console.log(error.message);
                    $("#blogin").addClass("disabled")
                    $("#blogout").removeClass("disabled")
                    $('#myModal2').modal('show');
                });
            }
            function emailsignOut(){
                firebase.auth().signOut().then(function() {
                    console.log("Logged out!")
                    $("#blogout").addClass("disabled")
                }, function(error) {
                    console.log(error.code);
                    console.log(error.message);
                });
            }
            function printCategorias(){
                var ref = firebase.database().ref("/Categorias");
                ref.once('value', function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();
                        
                    });
                });
            }
