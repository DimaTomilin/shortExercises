async function getCityList() {
  const response = await axios.get('http://localhost:3030/api/cities');
  createCityList(response.data);
}
getCityList();

function createCityList(cityList) {
  for (const city of cityList) {
    const cityOption = document.createElement('option');
    cityOption.setAttribute('value', city);
    cityOption.innerHTML = city;
    document.getElementById('city-select').append(cityOption);
  }
}
