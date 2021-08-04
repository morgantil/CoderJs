class Producto {

    constructor(titulo, cantidad, precio) {
        this.titulo = titulo;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

cargarCarrito();
//METODO PARA ACCEDER A LA API
var libros;
var numero = 1;

function loadDoc(url) {

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            libros = this;
            libros = JSON.parse(libros.responseText);


            for (libro of libros) {

                crearCard(libro, numero);
                numero++;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

let jsonPropio = "./js/libros.json";
loadDoc(jsonPropio);







function crearCard(libro, numero) {

    //CREACION DE PRODUCTOS

    let imagen = libro.imagen;
    let nombre = libro.titulo;
    let valor = libro.precio;

    let card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', 'tamcard');
    let etiquetaImagen = document.createElement('img');
    etiquetaImagen.setAttribute('class', 'card-img-top');
    etiquetaImagen.setAttribute('id', 'tamimg');
    etiquetaImagen.classList.add('img-responsive');
    etiquetaImagen.src = imagen; //ASIGNO LA IMAGEN
    let body = document.createElement('div');
    body.classList.add('card-body');
    card.setAttribute('id', 'tamcard');
    let titulo = document.createElement('h4');
    titulo.setAttribute('class', 'card-title');
    titulo.setAttribute('id', `titulo${numero}`);
    titulo.innerText = nombre;
    let precio = document.createElement('button');
    precio.setAttribute('class', 'btn btn-dark');
    precio.setAttribute("id", `precio${numero}`)
    precio.innerText = valor;
    let botonAgregar = document.createElement('button');
    botonAgregar.setAttribute("id", `${numero}`);
    botonAgregar.setAttribute('class', 'btn btn-info');
    botonAgregar.setAttribute('onclick', `sumar(${numero})`);
    botonAgregar.innerText = "Agregar";
    let textoPrecio = document.createElement('label');
    textoPrecio.setAttribute("class", "labelPrecio");
    let cantidad = document.createElement('input');
    cantidad.setAttribute("class", "inputCantidad")
    cantidad.setAttribute("type", "number");
    cantidad.setAttribute("id", `cantidad${numero}`)
    cantidad.innerText = '$';
    cantidad.value = 0;
    cantidad.readOnly;

    card.appendChild(etiquetaImagen);
    card.appendChild(body);
    body.appendChild(titulo);
    body.appendChild(precio);
    body.appendChild(botonAgregar);
    body.appendChild(textoPrecio);
    body.appendChild(cantidad);

    let contenedor = document.getElementsByClassName('row');

    contenedor[0].appendChild(card);

    //FUNCIONALIDAD DEL BOTON AGREGAR

    botonAgregar.addEventListener("click", () => {
        var tablabody = document.getElementById("productosCarrito");
        tablabody.html = "";

        let id = botonAgregar.id;

        let obtenerCantidad = document.getElementById(`cantidad${id}`).value;
    });
}

function sumar(numero) {

    let titulo = document.getElementById(`titulo${numero}`).innerHTML;
    let precio = parseInt(document.getElementById(`precio${numero}`).innerHTML);
    let cantidad = parseInt(document.getElementById(`cantidad${numero}`).value);

    if (cantidad < 1) {
        alert("LA CANTIDAD DEBE SER MAYOR A 0");
        return;
    }

    var carritoJson = JSON.parse(localStorage.getItem("carrito")) || [];


    let producto = new Producto(titulo, cantidad, precio);

    var existe = false;
    var productoExistente;

    for (var productoCarrito of carritoJson) {

        if (productoCarrito.titulo == producto.titulo) {

            existe = true;
            productoExistente = productoCarrito;
            break;
        }
    }

    if (!existe) {
        carritoJson.push(producto);
    } else {
        productoExistente.cantidad += producto.cantidad;
    }

    reflejarCantidadesTotalEnElDom(carritoJson);

    localStorage.setItem("carrito", JSON.stringify(carritoJson));

}

function reflejarCantidadesTotalEnElDom(carrito) {
    const { cantidad, precio } = calcularTotales(carrito);
    document.getElementById('cantidadCarrito').value = cantidad;
    document.getElementById('totalCompra').value = precio;
}

function calcularTotales(carrito) {
    let cantidad = 0;
    let precio = 0;
    for (const producto of carrito) {
        cantidad += producto.cantidad;
        precio += producto.precio;
    }
    return { cantidad, precio };
}

function parcearACarrito2(carrito) {
    for (const pos of carrito) {
        parcearAProducto2(pos.titulo, pos.cantidad, pos.precio);
    }
}

function parcearAProducto2(titulo, cantidad, precio) {

    var tablabody = document.getElementById("productosCarrito");

    let prod = new Producto(titulo, cantidad, precio);

    let row = document.createElement("tr");
    row.innerHTML = '<th scope="row" class="titulo">' + prod.titulo + '</td> <td class="precio">' + prod.cantidad + '</td> <td class="precio">' + prod.precio;
    tablabody.appendChild(row);
}

let cant;
cant = localStorage.length;

function cargarCarrito() {
    var tablabody = document.getElementById("productosCarrito");

    tablabody.innerHTML = "";
    let contenidoGuardado = localStorage.getItem("carrito");

    let carritoJson = JSON.parse(contenidoGuardado) || [];

    reflejarCantidadesTotalEnElDom(carritoJson);

    parcearACarrito2(carritoJson);
}

function vaciarCarrito() {
    var tablabody = document.getElementById("table");
    tablabody.html = "";
    localStorage.clear();
    location.reload();
}

function comprar() {
    alert("Compra Realizada con Exito");
    var tablabody = document.getElementById("table");
    tablabody.html = "";
    localStorage.clear();
    location.reload();
}