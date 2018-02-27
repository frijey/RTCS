

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

//const email = document.querySelector("#emailregistrar");
//const contraseña = document.querySelector("#passwordregistrar");
//const rcontraseña = document.querySelector("#rpasswordregistrar");
//const idestudiante = document.querySelector("#iddelestudiante");
//const tipousuario = document.querySelector("#tipousuario");

//Fila1
const columna1f1 = document.querySelector("#columna1f1");
const columna2f1 = document.querySelector("#columna2f1");
const columna3f1 = document.querySelector("#columna3f1");
const columna4f1 = document.querySelector("#columna4f1");
const columna5f1 = document.querySelector("#columna5f1");
const columna6f1 = document.querySelector("#columna6f1");
const columna7f1 = document.querySelector("#columna7f1");
const columna8f1 = document.querySelector("#columna8f1");
const columna9f1 = document.querySelector("#columna9f1");

//Fila2
const columna1f2 = document.querySelector("#columna1f2");
const columna2f2 = document.querySelector("#columna2f2");
const columna3f2 = document.querySelector("#columna3f2");
const columna4f2 = document.querySelector("#columna4f2");
const columna5f2 = document.querySelector("#columna5f2");
const columna6f2 = document.querySelector("#columna6f2");
const columna7f2 = document.querySelector("#columna7f2");
const columna8f2 = document.querySelector("#columna8f2");
const columna9f2 = document.querySelector("#columna9f2");

//Fila3
const columna1f3 = document.querySelector("#columna1f3");
const columna2f3 = document.querySelector("#columna2f3");
const columna3f3 = document.querySelector("#columna3f3");
const columna4f3 = document.querySelector("#columna4f3");
const columna5f3 = document.querySelector("#columna5f3");
const columna6f3 = document.querySelector("#columna6f3");
const columna7f3 = document.querySelector("#columna7f3");
const columna8f3 = document.querySelector("#columna8f3");
const columna9f3 = document.querySelector("#columna9f3");

//Fila4
const columna1f4 = document.querySelector("#columna1f4");
const columna2f4 = document.querySelector("#columna2f4");
const columna3f4 = document.querySelector("#columna3f4");
const columna4f4 = document.querySelector("#columna4f4");
const columna5f4 = document.querySelector("#columna5f4");
const columna6f4 = document.querySelector("#columna6f4");
const columna7f4 = document.querySelector("#columna7f4");
const columna8f4 = document.querySelector("#columna8f4");
const columna9f4 = document.querySelector("#columna9f4");

//Fila5
const columna1f5 = document.querySelector("#columna1f5");
const columna2f5 = document.querySelector("#columna2f5");
const columna3f5 = document.querySelector("#columna3f5");
const columna4f5 = document.querySelector("#columna4f5");
const columna5f5 = document.querySelector("#columna5f5");
const columna6f5 = document.querySelector("#columna6f5");
const columna7f5 = document.querySelector("#columna7f5");
const columna8f5 = document.querySelector("#columna8f5");
const columna9f5 = document.querySelector("#columna9f5");

var pagina = 0; //Página por defecto...
var NuevoId = 1;
var Indexing = false;
var fivepage = 0;
const paginaanterior = document.querySelector("#paginaanterior");
const paginasiguiente = document.querySelector("#siguientepagina");
const labelpage = document.querySelector("#labelpage");

var firebaseChanguinref = firebase.database().ref().child("estudiantes");
var estudiantes = new Array();


document.addEventListener('DOMContentLoaded', function () {
    if (pagina == 0) {
        paginaanterior.disabled = true;
    } else {
        paginaanterior.disabled = false;
    }

    labelpage.textContent = "Página: " + (pagina + 1); //cargar página

}, false);

firebaseChanguinref.on('value', (snapshot) => {

    //Conseguir último ID
    NuevoId = snapshot.numChildren() + 1;
    estudiantes = new Array(snapshot.numChildren());

    for (var i = 1; i < NuevoId; i++) {
        estudiantes[i] = new Array(7);
        estudiantes[i][0] = snapshot.child(i).child("nombre").val();
        estudiantes[i][1] = snapshot.child(i).child("apellido").val();
        estudiantes[i][2] = snapshot.child(i).child("nombre-tutor").val();
        estudiantes[i][3] = snapshot.child(i).child("telefono").val();
        estudiantes[i][4] = snapshot.child(i).child("direccion").val();
        estudiantes[i][5] = snapshot.child(i).child("grado").val();
        estudiantes[i][6] = snapshot.child(i).child("fecha_nac").val();
    }

    RellenarTabla();

});

function RellenarTabla() {

    //Asignar en base a la página
    fivepage = pagina * 5;

    //Vaciar Columnas
    for (var i = 1; i < 6; i++) {
        for (var k = 1; k < 10; k++) {
            window['columna' + k + 'f' + i].textContent = "";
        }
    }

    var normalcounter = 1;
    for (var i = 1; i < 6; i++) {
        if ((estudiantes.length - 1) >= (i + fivepage)) {
            for (var k = 0; k < 7; k++) {

                window['columna' + (k + 2) + 'f' + normalcounter].textContent = estudiantes[i + fivepage][k];
            }
            if (window['columna2f' + normalcounter].textContent != "") {
                window['columna1f' + normalcounter].textContent = (i + fivepage);
                window['columna9f' + normalcounter].textContent = CalcularEdad(estudiantes[i + fivepage][6].substring(0, 4))
            } else {
            }
        } else {
        }
        //para ir sumando las filas...
        normalcounter++;
    }

    //Revisar que en la próxima página halla datos para mostrar, de lo contrario desactivar el botón de "Página siguiente"...
    if (((NuevoId - 1) - ((pagina + 1) * 5)) > 0) {
        paginasiguiente.disabled = false;
    } else {
        paginasiguiente.disabled = true;
    }

}

function CalcularEdad(FechaNac) {
    var edad = 1;
    var d = new Date();
    var n = d.getFullYear();
    var number1 = 1;
    number1 = n;
    var number2 = 2;
    number2 = FechaNac;
    var edad = number1 - FechaNac;

    return edad;
}

paginaanterior.addEventListener("click", function () {
    //Reducir una página
    pagina--;
    //Si la pagina es la 1, desabilitar el boton de pagina anterior
    if (pagina == 0) {
        paginaanterior.disabled = true;
    } else {
    }

    labelpage.textContent = "Página: " + (pagina + 1); //cargar página

    RellenarTabla();

    //Revisar que en la próxima página halla datos para mostrar, de lo contrario desactivar el botón de "Página siguiente"...
    if (((NuevoId - 1) - ((pagina + 1) * 5)) > 0) {
        paginasiguiente.disabled = false;
    } else {
        paginasiguiente.disabled = true;
    }
})



paginasiguiente.addEventListener("click", function () {
    //Reducir una página
    pagina++;
    //Si la pagina es la 1, desabilitar el boton de pagina anterior
    if (pagina > 0) {
        paginaanterior.disabled = false;
    } else {
    }

    labelpage.textContent = "Página: " + (pagina + 1); //cargar página

    RellenarTabla();

    //Revisar que en la próxima página halla datos para mostrar, de lo contrario desactivar el botón de "Página siguiente"...
    if (((NuevoId - 1) - ((pagina + 1) * 5)) > 0) {
        paginasiguiente.disabled = false;
    } else {
        paginasiguiente.disabled = true;
    }

})

//var firebaseRef = firebase.database().ref();
//const auth = firebase.auth();
//var PadreoHijo = false;

//var login = new Array();


//Registrar.addEventListener("click", function () {

//    var RevisarCampos = REvisarCamposLogin();

//    if (RevisarCampos) {

//        //Código para agregar estudiante
//        var emailsinpuntos = email.value;
//        emailsinpuntos = emailsinpuntos.replace(".", "-");
//        emailsinpuntos = emailsinpuntos.toLowerCase();
//        var pass = contraseña.value;

//        //Guardar referencia al tipo de usuario...
//        firebaseRef.child("login").child(emailsinpuntos);
//        firebaseRef.child("login").child(emailsinpuntos).child("tipo").set(tipousuario.value);

//        //Si es padre o estudiante guardar referencia del estudiante....
//        if (PadreoHijo) {
//            firebaseRef.child("login").child(emailsinpuntos).child("idestudiante").set(idestudiante.value);
//        }

//        //Registrar al estudiante dentro del Authentication
//        const promise = auth.createUserWithEmailAndPassword(email.value, pass);
//        promise.catch(e => console.log(e.message));

//        alert("Se agregó exitosamente el usuario: " + email.value);
//        NuevoLogin();

//    } else {
//        if (contraseña.value != rcontraseña.value) {
//            alert("Las contraseñas no coinciden");
//        } else {
//            alert("Rellene todos los campos antes de Guardar");
//        }

//    }
//})

//function CambioElSelect() {
//    if (tipousuario.value == "Padre" || tipousuario.value == "Estudiante") {
//        idestudiante.type = 'text';
//        PadreoHijo = true;
//    } else {
//        idestudiante.type = 'hidden';
//        PadreoHijo = false;
//    }
//}

//function NuevoLogin() {
//    email.value = "";
//    contraseña.value = "";
//    rcontraseña.value = "";
//    idestudiante.value = "";
//    email.focus();
//}

//function REvisarCamposLogin() {
//    if (email.value == "" || contraseña.value == "" || rcontraseña.value == "") {
//        return false;
//    } else {
//        if (tipousuario.value == "Padre" || tipousuario.value == "Estudiante") {
//            if (idestudiante.value == "") {
//                return false;
//            } else {
//                if (contraseña.value != rcontraseña.value) {
//                    return false;
//                } else { return true;}
//                return true;
//            }
//        } else {
//            if (contraseña.value != rcontraseña.value) {
//                return false;
//            } else { return true;}
//            return true;
//        }
//        if (contraseña.value != rcontraseña.value) {
//            return false;
//        } else { return true;}

//    }

//    firebase.auth().onAuthStateChanged(firebaseUser => {
//        if (firebaseUser) {
//            //Do Nothing you still loged in...
//        } else {
//            CerrarSesion();
//        }
//    });

//    function CerrarSesion() {
//        location = 'index.html';
//    }

//}
