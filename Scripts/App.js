
const idestudiante = document.querySelector("#idestudiante");
const nombre = document.querySelector("#NOMBRE");
const apellido = document.querySelector("#APELLIDO");
const nombretutor = document.querySelector("#nombretutor");
const telefono = document.querySelector("#tel");
const direccion = document.querySelector("#direccion");
const grado = document.querySelector("#select");
const fechanac = document.querySelector("#date");
const edad = document.querySelector("#edad");

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

const botonagregar = document.querySelector("#botonagregar");
const paginaanterior = document.querySelector("#paginaanterior");
const paginasiguiente = document.querySelector("#siguientepagina");
const labelpage = document.querySelector("#labelpage");
const rellenar = document.querySelector("#rellenar");
const nuevoestudiante = document.querySelector("#nuevoestudiante");
const btnactualizar = document.querySelector("#btnactualizar");
const idactualizar = document.querySelector("#idactualizar");
const updateparticipante = document.querySelector("#btnactualizarselec");

//Saber si se está creando o actualizando
var Actualizar = false;

var Listenerestudiantes = firebase.database().ref().child("estudiantes");
var estudiantes = new Array();

document.addEventListener('DOMContentLoaded', function () {
    if (pagina == 0) {
        paginaanterior.disabled = true;
    } else {
        paginaanterior.disabled = false;
    }

    botonagregar.disabled = false;
    updateparticipante.disabled = true;
    

    //Revisar que en la próxima página halla datos para mostrar, de lo contrario desactivar el botón de "Página siguiente"...
    if (((NuevoId - 1) - ((pagina + 1) * 5)) > 0) {
        paginasiguiente.disabled = false;
    } else {
        paginasiguiente.disabled = true;
    }

    labelpage.textContent = "-  " + (pagina + 1) + "  -"; //cargar página

    //Calcular edad
    var test = "";
    test = fechanac.value;
    test = test.substring(0, 4);
    var d = new Date();
    var n = d.getFullYear();

    var number1 = 1;
    number1 = n;
    var number2 = 2;
    number2 = test;

    var number3 = number1 - number2;

    edad.textContent = number3;

}, false);

Listenerestudiantes.on('value', (snapshot) => {


    //Conseguir último ID
    NuevoId = snapshot.numChildren() + 1;
    console.log(NuevoId);
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

botonagregar.addEventListener("click", function () {

    var RevisarCampos = RevisarCamposRellenos();

    if (RevisarCampos) {

        const textToSave = nombre.value + " " + apellido.value;
        console.log("Guardando nuevo usuario...");

        const IDAdder = NuevoId;

        //Código para agregar estudiante
        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("nombre").set(nombre.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("apellido").set(apellido.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("nombre-tutor").set(nombretutor.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("telefono").set(telefono.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("direccion").set(direccion.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("grado").set(grado.value);

        var firebaseref = firebase.database().ref();
        firebaseref.child("estudiantes").child(IDAdder).child("fecha_nac").set(fechanac.value);

        idestudiante.value = IDAdder;

        //Calcular edad
        edad.textContent = CalcularEdad(fechanac.value.substring(0, 4));

        NuevoEstudiante();
    } else {
        alert("Rellene todos los campos antes de Guardar");
    }
})

paginaanterior.addEventListener("click", function () {
    //Reducir una página
    pagina--;
    //Si la pagina es la 1, desabilitar el boton de pagina anterior
    if (pagina == 0) {
        paginaanterior.disabled = true;
    } else {
    }

    labelpage.textContent = "-  " + (pagina + 1) + "  -";

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

    labelpage.textContent = "-  " + (pagina + 1) + "  -";

    RellenarTabla();

    //Revisar que en la próxima página halla datos para mostrar, de lo contrario desactivar el botón de "Página siguiente"...
    if (((NuevoId - 1) - ((pagina + 1) * 5)) > 0) {
        paginasiguiente.disabled = false;
    } else {
        paginasiguiente.disabled = true;
    }

})


rellenar.addEventListener("click", function () {

    ////Rellenar Tabla
    RellenarTabla();

    //Revisar que en la próxima página halla datos para mostrar, de lo contrario desactivar el botón de "Página siguiente"...
    if (((NuevoId - 1) - ((pagina + 1) * 5)) > 0) {
        paginasiguiente.disabled = false;
    } else {
        paginasiguiente.disabled = true;
    }

})

updateparticipante.addEventListener("click", function () {

    var RevisarCampos = RevisarCamposRellenos();

    if (RevisarCampos) {

        const IDAdder = idestudiante.value;

        //Código para agregar estudiante
        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("nombre").set(nombre.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("apellido").set(apellido.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("nombre-tutor").set(nombretutor.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("telefono").set(telefono.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("direccion").set(direccion.value);

        var firebaseRef = firebase.database().ref();
        firebaseRef.child("estudiantes").child(IDAdder).child("grado").set(grado.value);

        var firebaseref = firebase.database().ref();
        firebaseref.child("estudiantes").child(IDAdder).child("fecha_nac").set(fechanac.value);
        NuevoEstudiante();
    } else {
        alert("Rellene todos los campos antes de Guardar");
    }
})


nuevoestudiante.addEventListener("click", function () {
    NuevoEstudiante();
})

function NuevoEstudiante() {
    //Nuevo Estudiante
    Actualizar = false;

    idestudiante.value = "Nuevo";
    nombre.value = "";
    apellido.value = "";
    nombretutor.value = "";
    telefono.value = "";
    direccion.value = "";
    date.value = "2000-01-01";
    edad.value = "X";

    //Calcular edad
    var test = "";
    test = fechanac.value;
    test = test.substring(0, 4);
    var d = new Date();
    var n = d.getFullYear();

    var number1 = 1;
    number1 = n;
    var number2 = 2;
    number2 = test;

    var number3 = number1 - number2;

    edad.textContent = number3;
    botonagregar.disabled = false;
    updateparticipante.disabled = true;

    nombre.focus();
    nombre.select();
}

function ActualizarEstudiante() {

    //Actualizar
    //Revisar que halla escrito un ID
    if (idactualizar.value == "") {
        alert("Escriba un ID para actualizar");
        idactualizar.focus();
        return;
    } else {
        //Revisar si el id existe
        try {
            if ((estudiantes.length - 1) < idactualizar.value || idactualizar.value < 1) {
                alert("Este ID no existe");
                idactualizar.focus();
                return;
            } else {
                //continue...
            }
        } catch (e) {
            alert("Escriba un ID válido para actualizar");
            idactualizar.focus();
            return;
        }
    }


    Actualizar = true;
    botonagregar.disabled = true;
    updateparticipante.disabled = false;

    idestudiante.value = idactualizar.value;

    nombre.value = estudiantes[idactualizar.value][0];
    apellido.value = estudiantes[idactualizar.value][1];;
    nombretutor.value = estudiantes[idactualizar.value][2];;
    telefono.value = estudiantes[idactualizar.value][3];;
    direccion.value = estudiantes[idactualizar.value][4];;
    grado.value = estudiantes[idactualizar.value][5];;
    date.value = estudiantes[idactualizar.value][6];;

    //Calcular edad
    var test = "";
    test = fechanac.value;
    test = test.substring(0, 4);
    var d = new Date();
    var n = d.getFullYear();
    var number1 = 1;
    number1 = n;
    var number2 = 2;
    number2 = test;
    var number3 = number1 - number2;

    edad.value = number3;

    nombre.focus();


}


btnactualizar.addEventListener("click", function () {
    ActualizarEstudiante();
})

function RellenarTabla() {

    console.log("Aqui");
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

                window['columna' + (k + 1) + 'f' + normalcounter].textContent = estudiantes[i + fivepage][k];
            }
            if (window['columna1f' + normalcounter].textContent != "") {
                window['columna7f' + normalcounter].textContent = (i + fivepage);
                window['columna8f' + normalcounter].textContent = estudiantes[i + fivepage][6];
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

function RevisarCamposRellenos() {
    if (nombre.value != "" && apellido.value != "" && nombretutor.value != "" && direccion.value != "" &&
        telefono.value != "" && edad.value != "") {
        return true;
    } else {
        return false;
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
