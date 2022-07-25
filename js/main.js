/**funcion Fetch (promesas) llamado a la API */
const API = 'https://rickandmortyapi.com/api/character/';

const getData = (apiURL) => {
    return fetch(apiURL)
    .then(response => response.json())
    .then(json => { 
        printData(json),
        printPagination(json.info)
        } )
    .catch( error => {console.error('Error-->: ', error)})
    }   
    
    
const printData = (data) => {
  
    let html ='';
    //accedemos al apartado de la api result//
    data.results.forEach(Object => {
       html  += `
              <table class="table">
              <tbody>
                <tr>
                  <td class="col-1 col-sm-2" >${Object.id}</td>
                  <td class="col-2 col-sm-4">${Object.name}</td>
                  <td class="col-2 col-sm-2"><button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modal${Object.id}">Ver mas</button></td>
                </tr>
              </tbody>
              </table>

              <div class="modal fade" id="modal${Object.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
              <div class="modal-content">
              <div class="modal-header">
              <h4 class="modal-title" id="staticBackdropLabel">${Object.name}</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <img src="${Object.image}" class="card-img-top" alt="">
              <p>Especie: ${Object.species}</p>
                     <p>Estatus: ${Object.status}</p>
                     <p>Genero: ${Object.gender}</p>
              </div>
              </div>
              </div>
          </div>`
    });
    //imprimimos la informacion//
    document.getElementById('tabla').innerHTML = html

}

const printPagination = (info) => {
    let prevDisable = info.prev == null ? 'disable' : ''; //para desactivar el boton de prev si es que no hay pagina previa//
    let nextDisable = info.next == null ? 'disable' : ''; //desactiva el boton de next cuando no hay mas paginas//

    let html = `<li class="page-item ${prevDisable}"><a class="page-link" onclick="getData('${info.prev}')" >
    <img src="img/flecha2.png" alt=""></a></li>`
    html += `<li class="page-item ${nextDisable}"><a class="page-link" onclick="getData('${info.next}')" >
    <img src="img/flecha1.png" alt=""></a></li>`
    document.getElementById('pagination').innerHTML = html;

}

getData(API);

let key ="biometriaAplicada"


let ls = {
    nombre: "Fatima Flores",
    nombre2: "Melary Sanchez"
  }
  
  let lsstr = JSON.stringify(ls);
  var encrypted = CryptoJS.AES.encrypt(lsstr, key);
  
  localStorage.setItem("Desarrolladoras",encrypted);
  
