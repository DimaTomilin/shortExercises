document.getElementById('submit').addEventListener('click', sendToServer);

async function sendToServer(e) {
  e.preventDefault();
  const year = parseInt(document.getElementById('year').value);
  const brand = document.getElementById('brand').value;
  const price = parseInt(document.getElementById('price').value);
  const strings = parseInt(document.getElementById('strings').value);
  const id = Math.random() * 10;
  const res = await axios.put('http://localhost:8080/create', {
    year: year,
    brand: brand,
    price: price,
    strings: strings,
    id: id,
  });
  console.log(res.data);
}
