const productos = [
    { id: 1, nombre: "Helado de Vainilla", precio: 1000, img: "img/heladoVainilla.jpg" },
    { id: 2, nombre: "Helado de Chocolate", precio: 1200, img: "img/heladoChocolate.jpg" },
    { id: 3, nombre: "Helado de Frutilla", precio: 1100, img: "img/heladoFrutilla.jpg" },
    { id: 4, nombre: "Helado de Dulce de Leche", precio: 1400, img: "img/heladoDulceDeLeche.jpg" }
];

const contenedor = document.getElementById("contenedor");
const carritoLista = document.getElementById("carrito");
const verProductosBtn = document.getElementById("verProductos");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

verProductosBtn.addEventListener("click", () => {
    if (sessionStorage.getItem("productosMostrados") === "true") {
        return;
    }

    productos.forEach(producto => {
        const div = document.createElement("div");

        const imagen = document.createElement("img");
        imagen.src = producto.img;
        imagen.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const boton = document.createElement("button");
        boton.textContent = "Agregar al carrito";
        boton.addEventListener("click", () => agregarAlCarrito(producto));

        div.appendChild(imagen);
        div.appendChild(titulo);
        div.appendChild(precio);
        div.appendChild(boton);

        contenedor.appendChild(div);
    });

    sessionStorage.setItem("productosMostrados", "true");
});

function agregarAlCarrito(producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Carrito
function mostrarCarrito() {
    carritoLista.innerHTML = "";
    carrito.forEach(prod => {
        const li = document.createElement("li");
        li.textContent = `${prod.nombre} - $${prod.precio}`;
        carritoLista.appendChild(li);
    });

    //Calcular total
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    document.getElementById("totalCarrito").textContent = `Total: $${total}`;
}

// Btn vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
});

mostrarCarrito();
