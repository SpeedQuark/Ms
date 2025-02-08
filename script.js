document.addEventListener("DOMContentLoaded", () => {
    const cantidadInput = document.getElementById("cantidad");
    const tiempoInput = document.getElementById("tiempo");
    const iniciarBtn = document.getElementById("iniciar");
    const numerosDiv = document.getElementById("numeros");
    const respuestaDiv = document.getElementById("respuesta");
    const inputRespuesta = document.getElementById("input-respuesta");
    const comprobarBtn = document.getElementById("comprobar");
    const resultadoDiv = document.getElementById("resultado");

    let numerosAleatorios = [];

    // Función para generar números aleatorios
    function generarNumerosAleatorios(cantidad) {
        return Array.from({ length: cantidad }, () => Math.floor(Math.random() * 10));
    }

    // Función para mostrar los números
    function mostrarNumeros(numeros, tiempo) {
        numerosDiv.textContent = numeros.join(" ");
        setTimeout(() => {
            numerosDiv.textContent = "";
            respuestaDiv.classList.remove("oculto");
        }, tiempo * 1000);
    }

    // Iniciar el juego
    iniciarBtn.addEventListener("click", () => {
        const cantidad = parseInt(cantidadInput.value);
        const tiempo = parseInt(tiempoInput.value);

        if (cantidad <= 0 || tiempo <= 0) {
            alert("Por favor, introduce valores válidos.");
            return;
        }

        numerosAleatorios = generarNumerosAleatorios(cantidad);
        respuestaDiv.classList.add("oculto");
        resultadoDiv.textContent = "";
        inputRespuesta.value = "";

        mostrarNumeros(numerosAleatorios, tiempo);
    });

    // Comprobar la respuesta
    comprobarBtn.addEventListener("click", () => {
        const respuestaUsuario = inputRespuesta.value
            .split(" ")
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num));

        if (respuestaUsuario.length !== numerosAleatorios.length) {
            resultadoDiv.textContent = "La cantidad de números no coincide.";
            return;
        }

        if (respuestaUsuario.every((num, index) => num === numerosAleatorios[index])) {
            resultadoDiv.textContent = "¡Correcto! Has memorizado los números correctamente.";
        } else {
            resultadoDiv.textContent = `Incorrecto. La secuencia correcta era: ${numerosAleatorios.join(" ")}`;
        }
    });
});
