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

const tableContent = document.getElementById('table');

const API = 'https://rickandmortyapi.com/api/character/';
const maxPageForAPI = 1;
const apiPage = '?page=:page';
const characters = [];

const getDataRickAndMorty = async (page) => {
  try {
      const { results } = await fetchData(`${API}${apiPage.replace(':page', `${page}`)}`)
      results.map(character => {
        const table= tableGenerator(character);
        tableContent.appendChild(table);
      });
  } catch (error) {
    console.error(error);
  }
}

(function() {
  for (let i = 1; i <= maxPageForAPI; i++) {
    getDataRickAndMorty(i);
  }
})();

const requestComplete = 4;
const statusRequest = 200;



const tableGenerator = object => {
    const table = document.createElement('article');
    table.classList.add('table')
  
    table.innerHTML = `
    <table class="table">
    <tbody>
      <tr>
        <th class="col-sm-2">${object.id}</th>
        <td class="col-sm-6">${object.name}</td>
        <td class="col-sm-4"><button type="button" class="btn btn-outline-info">Ver mas</button></td>
      </tr>
    </tbody>
  </table>
                  
    `;
  
    return table;
  }