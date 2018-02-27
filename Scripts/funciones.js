
const config = {
    apiKey: "AIzaSyCOxRKXX0g1E_1iryvDmiSwck6oIR26DXk",
    authDomain: "sharedproyect.firebaseapp.com",
    databaseURL: "https://sharedproyect.firebaseio.com",
    projectId: "sharedproyect",
    storageBucket: "sharedproyect.appspot.com",
    messagingSenderId: "379754323405"
};
firebase.initializeApp(config);
firebase.auth().signOut();

const usuario = document.querySelector("#usuariotext");
const contraseña = document.querySelector("#passwordtext");
const botonLogin = document.querySelector("#btnlogin");
const auth = firebase.auth();
usuario.focus();
var emailsinpuntos = "";
var loginIn = false;
var tipo;
var idestudent = "";

botonLogin.addEventListener('click', e => {

    //Validar que los campos estén correctamente completos
    var CamposCompletos = ValidarCamposdeInicioDeSesion();
    if (CamposCompletos) {

        //Añadir evento de login
        var email = usuario.value;
        var pass = contraseña.value;

        //Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => alert(e.message));

    } else { }
});

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        //FormatearEmail
        emailsinpuntos = usuario.value;
        emailsinpuntos = emailsinpuntos.replace(".", "-");
        emailsinpuntos = emailsinpuntos.toLowerCase();
        iniciarSesion();
    } else {

        //Do Nothing you are in login

    }
});

function iniciarSesion() {
    var Sync = 0;
    ruta1 = 'login' + '/' + emailsinpuntos + '/' + 'tipo';
    ruta2 = 'login' + '/' + emailsinpuntos + '/' + 'idestudiante';

    firebase.database().ref(ruta1).once('value').then(function (snapshot) {
        tipo = snapshot.val();
        Sync++;
        if (Sync == 2 || tipo == "Administrador" || tipo == "Profesor") {
            DecideWhere();
        } else { }
    });

    firebase.database().ref(ruta2).once('value').then(function (snapshot) {
        idestudent = snapshot.val();
        Sync++;
        if (Sync == 2 || tipo == "Administrador" || tipo == "Profesor") {
            DecideWhere();
        } else { }
    });


}

function DecideWhere() {
    if (tipo == "Administrador") {
        location = 'Estudiantes.html';
    } else {
        location = 'Profesor.html';
    }
}

function ValidarCamposdeInicioDeSesion() {
    if (usuario.value == "") {
        usuario.focus();
        return false;
    } else {
        if (contraseña.value == "") {
            contraseña.focus();
            return false;
        } else { }
    }
    return true;
}

function CerrarSesion() {
    firebase.auth().signOut();
    location = 'index.html';
}
