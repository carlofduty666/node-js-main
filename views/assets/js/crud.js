function getData() {
    fetch('http://localhost:3000/api/db')
    .then(response => response.json())
    .then(data => {
        document.getElementById('app').innerHTML = "";
        data.forEach(libro => {
        document.getElementById('app').innerHTML += `
        <div id="${libro._id}">
            <h1>${libro.name}</h1>
            <h3>${libro.sign}</h3>
            <button class="buttonEdit" value="${libro._id}">Editar</button>
            <button class="buttonDelete" value="${libro._id}">Eliminar</button>
        </div>
        `
      });
      setEdit();
      setDelete();
    })
}

function setEdit() {
    var buttonEdit = document.getElementsByClassName('buttonEdit');
        
        for (var i = 0; i < buttonEdit.length; i++) {
            buttonEdit[i].addEventListener('click', (e) => {
                var id = e.target.value;
                var cardLibro = document.getElementById(id)
                
                document.getElementById('nameE').value = cardLibro.getElementsByTagName('h1')[0].innerText;
                document.getElementById('authorE').value = cardLibro.getElementsByTagName('h3')[0].innerText;
                const form = document.getElementById('formLibrosE');


                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    var name = document.getElementById('nameE').value;
                    var sign = document.getElementById('authorE').value;

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
                            alert('Libro editado correctamente');
                            getData();
                        }
                    })
            
            })
        }
)}}

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
                        <h1>(∩˃o˂∩)♡'</h1>
                        <h1>¡Elemento eliminado!</h1>
                        `;
                        setTimeout(() => {
                        sucessMessage1.style.display = 'none';
                    }, 3000);
                        getData();
                    }
                })
                
            
            })
        }
}

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