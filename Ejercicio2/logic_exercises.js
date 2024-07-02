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

function prime_numbers(n) {
    if (n < 2) {
        return [];
    }

    // creamos un array de base con boolean con un lenght de 0 a n y valor true 
    let isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false; // los valores primos comienzan a partir del 2

    // esta ya la habia hecho antes, los valores i son los numeros por los cuales podrian ser divisibles los numeros hasta n
    // todos los valores de i** no son primos al igual que los valores de i** + i 
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    // este es el array de numeros primos
    let primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }

    return primes;
}
