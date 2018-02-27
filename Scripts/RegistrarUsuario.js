

// Initialize Firebase

var config = {
    apiKey: "AIzaSyCOxRKXX0g1E_1iryvDmiSwck6oIR26DXk",
    authDomain: "sharedproyect.firebaseapp.com",
    databaseURL: "https://sharedproyect.firebaseio.com",
    projectId: "sharedproyect",
    storageBucket: "sharedproyect.appspot.com",
    messagingSenderId: "379754323405"
};
firebase.initializeApp(config);

const email = document.querySelector("#emailregistrar");
const contraseña = document.querySelector("#passwordregistrar");
const rcontraseña = document.querySelector("#rpasswordregistrar");
const idestudiante = document.querySelector("#iddelestudiante");
const tipousuario = document.querySelector("#tipousuario");
const Registrar = document.querySelector("#Registrar");

var firebaseRef = firebase.database().ref();
const auth = firebase.auth();
var PadreoHijo = false;

var login = new Array();


Registrar.addEventListener("click", function () {

    var RevisarCampos = REvisarCamposLogin();

    if (RevisarCampos) {

        //Código para agregar estudiante
        var emailsinpuntos = email.value;
        emailsinpuntos = emailsinpuntos.replace(".", "-");
        emailsinpuntos = emailsinpuntos.toLowerCase();
        var pass = contraseña.value;

        //Guardar referencia al tipo de usuario...
        firebaseRef.child("login").child(emailsinpuntos);
        firebaseRef.child("login").child(emailsinpuntos).child("tipo").set(tipousuario.value);

        //Si es padre o estudiante guardar referencia del estudiante....
        if (PadreoHijo) {
            firebaseRef.child("login").child(emailsinpuntos).child("idestudiante").set(idestudiante.value);
        }

        //Registrar al estudiante dentro del Authentication
        const promise = auth.createUserWithEmailAndPassword(email.value, pass);
        promise.catch(e => console.log(e.message));

        alert("Se agregó exitosamente el usuario: " + email.value);
        NuevoLogin();

    } else {
        if (contraseña.value != rcontraseña.value) {
            alert("Las contraseñas no coinciden");
        } else {
            alert("Rellene todos los campos antes de Guardar");
        }

    }
})

function CambioElSelect() {
    if (tipousuario.value == "Padre" || tipousuario.value == "Estudiante") {
        idestudiante.type = 'text';
        PadreoHijo = true;
    } else {
        idestudiante.type = 'hidden';
        PadreoHijo = false;
    }
}

function NuevoLogin() {
    email.value = "";
    contraseña.value = "";
    rcontraseña.value = "";
    idestudiante.value = "";
    email.focus();
}

function REvisarCamposLogin() {
    if (email.value == "" || contraseña.value == "" || rcontraseña.value == "") {
        return false;
    } else {
        if (tipousuario.value == "Padre" || tipousuario.value == "Estudiante") {
            if (idestudiante.value == "") {
                return false;
            } else {
                if (contraseña.value != rcontraseña.value) {
                    return false;
                } else { return true;}
                return true;
            }
        } else {
            if (contraseña.value != rcontraseña.value) {
                return false;
            } else { return true;}
            return true;
        }
        if (contraseña.value != rcontraseña.value) {
            return false;
        } else { return true;}

    }

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            //Do Nothing you still loged in...
        } else {
            CerrarSesion();
        }
    });

    function CerrarSesion() {
        location = 'index.html';
    }

}
