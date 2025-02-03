// function getData() {
//     fetch('http://localhost:3000/api/db')
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('app').innerHTML = "";
//         data.forEach(item => {
//         document.getElementById('app').innerHTML += `
//         <div id="${libro._id}">
//             <h1>${libro.name}</h1>
//             <h3>${libro.sign}</h3>
//             <button class="buttonEdit" value="${libro._id}">Editar</button>
//             <button class="buttonDelete" value="${libro._id}">Eliminar</button>
//         </div>
//         `
//       });
//       setEdit();
//       setDelete();
//     })
// }

function getData() {
    fetch('http://localhost:3000/api/db')
        .then(response => response.json())
        .then(data => {
            const appDiv = document.getElementById('app');
            appDiv.innerHTML = ""; // Limpiar contenido previo
            data.forEach(item => {
                appDiv.innerHTML += `
                <div id="${item._id}">
                    <h1>${item.name}</h1>
                    <h3>${item.sign}</h3>
                    <button class="buttonEdit" value="${item._id}">Editar</button>
                    <button class="buttonDelete" value="${item._id}">Eliminar</button>
                </div>
                `;
            });
            setEdit();
            setDelete();
        });
}

// Función para editar elementos
function setEdit() {
    var buttonEdit = document.getElementsByClassName('buttonEdit');

    for (var i = 0; i < buttonEdit.length; i++) {
        buttonEdit[i].addEventListener('click', (e) => {
            var id = e.target.value;
            var cardLibro = document.getElementById(id);
            
            // Obtener el nombre y signo del elemento a editar
            document.getElementById('nameE').value = cardLibro.getElementsByTagName('h1')[0].innerText;
            document.getElementById('signE').value = cardLibro.getElementsByTagName('h3')[0].innerText.toLowerCase(); // Usar 'signE' para el signo

            const form = document.getElementById('formLibrosE');

            // Mostrar el formulario de edición
            form.style.display = 'block';

            // Eliminar el evento anterior para evitar múltiples suscripciones
            form.removeEventListener('submit', handleSubmit);

            // Agregar un nuevo evento para manejar la actualización
            form.addEventListener('submit', handleSubmit);

            function handleSubmit(event) {
                event.preventDefault();
                var name = document.getElementById('nameE').value;
                var sign = document.getElementById('signE').value; // Obtener el valor del select

                fetch(`http://localhost:3000/api/db/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        sign: sign
                    })
                }).then(response => {
                    if (response.ok) {
                        const sucessMessage3 = document.getElementById('sucessMessage3');
                        sucessMessage3.style.display = 'block';
                        sucessMessage3.innerHTML = `
                        <h1>(❀❛ ֊ ❛„)♡</h1>
                        <h1>¡Elemento modificado!</h1>
                        `;
                        setTimeout(() => {
                            sucessMessage3.style.display = 'none';
                        }, 3000);
                        getData();

                        // Ocultar el formulario después de actualizar
                        form.style.display = 'none';
                    }
                });
            }
        });
    }
}



// Función para eliminar elementos
function setDelete() {
    var buttonDelete = document.getElementsByClassName('buttonDelete');
    for (var i = 0; i < buttonDelete.length; i++) {
        buttonDelete[i].addEventListener('click', (e) => {
            var id = e.target.value;
            fetch(`http://localhost:3000/api/db/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.ok) {
                    const sucessMessage1 = document.getElementById('sucessMessage1');
                    sucessMessage1.style.display = 'block';
                    sucessMessage1.innerHTML = `
                    <h1>(˚ ˃̣̣̥⌓˂̣̣̥ )</h1>
                    <h1>¡Elemento eliminado!</h1>
                    `;
                    setTimeout(() => {
                        sucessMessage1.style.display = 'none';
                    }, 3000);
                    getData();
                }
            });
        });
    }
}

document.getElementById('toggleDataButton').addEventListener('click', () => {
    const appDiv = document.getElementById('app');
    const toggleDataButton = document.getElementById('toggleDataButton');

    // Alternar la visibilidad del contenido
    if (appDiv.style.display === 'none') {
        appDiv.style.display = 'block'; // Mostrar la sección
        getData(); // Llamar a la función para obtener datos
        toggleDataButton.innerText = 'Ocultar Datos'; // Cambiar texto del botón
    } else {
        appDiv.style.display = 'none'; // Ocultar la sección
        toggleDataButton.innerText = 'Mostrar Datos'; // Cambiar texto del botón
    }
});


const zodiacCompatibility = {
    Aries: ["Géminis", "Leo", "Sagitario"],
    Tauro: ["Cáncer", "Virgo", "Capricornio"],
    Géminis: ["Aries", "Leo", "Libra"],
    Cáncer: ["Tauro", "Virgo", "Escorpio"],
    Leo: ["Aries", "Géminis", "Sagitario"],
    Virgo: ["Tauro", "Cáncer", "Capricornio"],
    Libra: ["Géminis", "Leo", "Sagitario"],
    Escorpio: ["Cáncer", "Virgo", "Capricornio"],
    Sagitario: ["Aries", "Leo", "Libra"],
    Capricornio: ["Tauro", "Virgo", "Escorpio"],
    Acuario: ["Géminis", "Libra", "Sagitario"],
    Piscis: ["Cáncer", "Escorpio"]
};

// Función para comprobar la compatibilidad entre dos personas
function checkCompatibility(person1, person2) {
    const sign1 = person1.sign;
    const sign2 = person2.sign;

    // Verificar si el primer signo existe en el objeto de compatibilidad
    if (!zodiacCompatibility[sign1]) {
        return `${sign1} no es un signo válido.`;
    }

    // Verificar la compatibilidad
    const isCompatible = zodiacCompatibility[sign1].includes(sign2);

    if (isCompatible) {
        return `${person1.name} (${sign1}) y ${person2.name} (${sign2}) son compatibles.`;
    } else {
        return `${person1.name} (${sign1}) y ${person2.name} (${sign2}) no son compatibles.`;
    }
}

// Función para cargar los datos desde la base de datos
function getData() {
    fetch('http://localhost:3000/api/db')
        .then(response => {
            // Verificar si la respuesta es OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const nameSelect1 = document.getElementById('name1');
            const nameSelect2 = document.getElementById('name2');
            nameSelect1.innerHTML = ''; // Limpiar opciones previas
            nameSelect2.innerHTML = ''; // Limpiar opciones previas
 
            data.forEach(item => {
                const option1 = document.createElement('option');
                option1.value = item._id; // Usar ID como valor
                option1.textContent = item.name; // Mostrar nombre
                nameSelect1.appendChild(option1);
 
                const option2 = document.createElement('option');
                option2.value = item._id; // Usar ID como valor
                option2.textContent = item.name; // Mostrar nombre
                nameSelect2.appendChild(option2);
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            document.getElementById('compatibilityResult').innerText = 'Error al cargar los datos.';
        });
 }
 

// Evento para comprobar la compatibilidad al hacer clic en el botón
document.getElementById('checkCompatibilityButton').addEventListener('click', () => {
   const selectedOption1 = document.getElementById('name1').selectedOptions[0];
   const selectedOption2 = document.getElementById('name2').selectedOptions[0];

   if (!selectedOption1 || !selectedOption2) {
       document.getElementById('compatibilityResult').innerText = 'Por favor, selecciona ambos nombres.';
       return;
   }

   const name1 = selectedOption1.textContent;
   const sign1 = getSignFromDatabase(selectedOption1.value); // Obtener signo del primer nombre
   
   const name2 = selectedOption2.textContent;
   const sign2 = getSignFromDatabase(selectedOption2.value); // Obtener signo del segundo nombre

   // Crear objetos persona
   const person1 = { name: name1, sign: sign1 };
   const person2 = { name: name2, sign: sign2 };

   // Comprobar compatibilidad
   const result = checkCompatibility(person1, person2);

   // Mostrar resultado en el HTML
   document.getElementById('compatibilityResult').innerText = result;
});

// Función auxiliar para obtener el signo a partir del ID
function getSignFromDatabase(id) {
   let sign;
   fetch(`http://localhost:3000/api/db`)
       .then(response => response.json())
       .then(data => {
            console.log(data)
           sign = data.filter(signo => signo._id == id); // Asumiendo que tu API devuelve un objeto con un campo 'sign'
           return sign.sign; // Esto puede no funcionar correctamente porque fetch es asíncrono.
       })
       .catch(error => console.error("Error al obtener el signo:", error));
}

// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', () => {
   getData();
});



document.addEventListener('DOMContentLoaded', () => {
    getData();
    const form = document.getElementById('formLibros');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var sign = document.getElementById('sign').value;

        fetch('http://localhost:3000/api/db/create', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                sign: sign
            })
        }).then(response => {
            if (response.ok) {
                const sucessMessage = document.getElementById('sucessMessage');
                    sucessMessage.style.display = 'block';
                    sucessMessage.innerHTML = `
                    <h1>(˶ᵔ ᵕ ᵔ˶)</h1>
                    <h1>¡Elemento añadido!</h1>
                    `;
                    setTimeout(() => {
                    sucessMessage.style.display = 'none';
                    }, 3000);
                getData();
            }
        })
    })
})

