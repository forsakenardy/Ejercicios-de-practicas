function fibonacci(n) {

    if (n <= 0) {
        return []; //si el valor de n es igual o inferior a 0 el array estara vacio
    }
     else if (n === 1) {
        return [0];
    }

    let valoresIniciales = [0, 1]; //estos son mis valores de referencia iniciales para la funcion de fibonacci

    // aqui utilizo un for loop para manejar los valores desde 2 a n siendo 2 el minimo valor de valoresIniciales.Lenght
    for (let i = 2; i < n; i++) {
        valoresIniciales.push(valoresIniciales[i - 1] + valoresIniciales[i - 2]);
    } //sumamos los 2 ultimos valores del array y lo agregamos como un nuevo valor hasta i = n

    return valoresIniciales;
}

function is_palindrome(texto) {
    // aqui convierto la cadena en minusculas para realizar la comparacion de sus valores
    let lowerCase = texto.toLowerCase();
    
    // Comparamos la cadena con su reverso primeramente dividiendo con split los valores de la cadena en un array,
    // utilizo reverse para invertir los valores de principio y fin y join para volverlos a juntar en un solo texto
    return lowerCase === lowerCase.split('').reverse().join('');
}
