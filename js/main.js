const fetchData = (api_url) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', api_url, true);
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        (xhttp.status === 200)
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error('Test Error', api_url))
      }
    }
    xhttp.send();
  });
}



const API = 'https://rickandmortyapi.com/api/character/';
const maxPageForAPI = 1;
const apiPage = '?page=:page';


const getDataRickAndMorty = async (page) => {
  try {
    const { results } = await fetchData(`${API}${apiPage.replace(':page', `${page}`)}`)
    results.map(character => {
      const table = tableGenerator(character);
      tableContent.appendChild(table);
    });
  } catch (error) {
    console.error(error);
  }
}

(function () {
  for (let i = 1; i <= maxPageForAPI; i++) {
    getDataRickAndMorty(i);
  }
})();


const tableContent = document.getElementById('table');

const tableGenerator = object => {
  const table = document.createElement('article');
  table.classList.add('table')

  table.innerHTML = `
    <table class="table">
    <tbody>
      <tr>
        <th class="col-sm-2" >${object.id}</th>
        <td class="col-sm-6">${object.name}</td>
        <td class="col-sm-4"><button type="button" class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#modal${object.id}">Ver mas</button></td>
      </tr>
    </tbody>
  </table>

<!-- Modal -->
<div class="modal fade" id="modal${object.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title" id="staticBackdropLabel">${object.name}</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <img class="rounded mx-auto d-block" src="${object.image}">
        <p>Especie: ${object.species}</p>
        <p>Estatus: ${object.status}</p>
        <p>Genero: ${object.gender}</p>
      </div>
    </div>
  </div>
</div>
                  
    `;

  return table;
}
