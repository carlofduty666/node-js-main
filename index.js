const http = require('http'); // modulo que permite crear un servidor
const path = require('path'); // modulo que permite trabajar con rutas
const fs = require('fs'); // modulo que permite leer archivos

const { connectDB } = require('./db/db.js');

const { createData, readData, deleteData, updateData } = require('./models/libros.js');


function readFiles(response, filePath, mimeType = 'text/html', codigoHTTP = 200) {
  fs.readFile(filePath, (error, content) => { // lee el archivo y lo muestra en el navegador
    if (!error) {
      response.writeHead(codigoHTTP, {'Content-Type': mimeType})
      response.end(content);
    } else {
      const filePath = path.join(__dirname, '/views/http-screens/500.html')
      readFiles(response, filePath, codigoHTTP = 500);
    }
  });
}

const server = http.createServer(function(request, response) {
   // console.log(`Requested URL: ${request.url}`);
  if (request.url === '/') {
    const filePath = path.join(__dirname, '/views/home.html') // ruta de la carpeta views y el archivo home.html
    readFiles(response, filePath);
  }

  else if (request.url.match(/.(js)$/)) {
    const filePath = path.join( __dirname, `/views/assets/js/${request.url}`);
      readFiles(response, filePath, mimeType = 'text/javascript');
  }

  else if (request.url.match(/.(html)$/)) {
      const filePath = path.join(__dirname, `/views/${request.url}`);
        readFiles(response, filePath, mimeType = 'text/html');
  }

  else if (request.url.match(/.(css)$/)) {
      const filePath = path.join(__dirname, `/views/assets/css/${request.url}`);
      readFiles(response, filePath, mimeType = "text/css");
  } 

  else if (request.url.match(/.(jpg)$/)) {
      const filePath = path.join(__dirname, `/views/assets/img/${request.url}`);
      readFiles(response, filePath, mimeType = "image/jpg");
  }

  else if (request.method === 'GET' && request.url === '/api/db') { // ruta para obtener todos los libros
    readData().then(libros => {
      console.log(libros);
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(libros));

    });

  } 
  
  else if (request.method === 'POST' && request.url === '/api/db/create') { // ruta para crear un libro
      let body = ""; // variable que almacena los datos del formulario
      request.on('data', datos => { body += datos.toString() }); // se ejecuta cuando se envia el formulario y se almacena en la variable body
      request.on('end', () => {
        const libro = JSON.parse(body); // se convierte el body en un objeto
        createData(libro).then((id) => { // se crea el libro y se devuelve el id
          response.writeHead(201, {'Content-Type': 'application/json'});
          response.end(JSON.stringify({id: id}))
        })
        .catch(error => {
          console.log(error)
        })
     });
  }

  else if (request.method === 'PUT' && request.url.startsWith('/api/db/update')) {
    const bookId = request.url.split('/').pop(); // split separa la url en un array y pop elimina el ultimo elemento del array
    let body = "";
    request.on('data', datos => { body += datos.toString() });
    request.on('end', () => {
      const libroActualizado = JSON.parse(body);
      updateData(bookId, libroActualizado).then((modifiedCount) => { // se actualiza el libro y se devuelve el numero de libros modificados
        if (modifiedCount === 1) {
          response.writeHead(200, {'Content-Type': 'application/json'});
          response.end(JSON.stringify({message: 'Libro actualizado'}))
        }
      })
      .catch(error => {
        console.log(error)
      })
   });
}

else if (request.method === 'DELETE' && request.url.startsWith('/api/db/delete')) {
  const bookId = request.url.split('/').pop();
  deleteData(bookId).then((deletedCount => {
    if (deletedCount === 1) {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({message: 'Libro eliminado'}))
    }
  }))
}

  else {
    const filePath = path.join(__dirname, '/views/http-screens/404.html');
    readFiles(response, filePath, codigoHTTP = 404);
  }

});

  connectDB().then( () => {
  server.listen(3000, () => {
    // readData().then((data) => {
    //   console.log(data)
    //   });
    });
    
    console.log('Servidor escuchando en el puerto: http://localhost:3000')
  });

