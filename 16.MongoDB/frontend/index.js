async function getCityList() {
  const response = await axios.get('http://localhost:3030/api/cities');
  createCityList(response.data);
}

function createCityList(cityList) {
  try {
    for (const city of cityList) {
      const cityOption = document.createElement('option');
      cityOption.setAttribute('value', city);
      cityOption.innerHTML = city;
      document.getElementById('city-select').append(cityOption);
    }
  } catch (error) {
    showingAlert(error.response.status, error.response.statusText);
  }
}

getCityList();

document.getElementById('search').addEventListener('click', searchAgents);

async function searchAgents() {
  try {
    const city = document.getElementById('city-select').value;
    const response = await axios.get(
      `http://localhost:3030/api/agents?city=${city}`
    );
    const agents = response.data;
    document.getElementById('list-of-agents').innerHTML = '';
    createAgentList(agents);
  } catch (error) {
    showingAlert(error.response.status, error.response.statusText);
  }
}

function randomTen(num) {
  let allNumbers = [];
  for (let i = 0; i < 10; i++) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (num + 1));
    } while (allNumbers.includes(randomNumber));
    allNumbers.push(randomNumber);
  }
  return allNumbers;
}

// function createAgentElement(){
//   const agentElement = document.createElement("div");
//   agentElement.classList.add("agent")
// }

//Generit function to creating elements
function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  let el = document.createElement(tagName);
  //Adding children
  for (const child of children) {
    el.append(child);
  }
  //Adding classes
  for (const cls of classes) {
    el.classList.add(cls);
  }
  //Adding attributes
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr]);
  }
  //Adding events
  for (const event in eventListeners) {
    el.addEventListener(event, eventListeners[event]);
  }
  return el;
}

function createAgentElement(agent) {
  const name = createElement('div', [`${agent.name}`]);
  const city = createElement(
    'div',
    [`${agent.city}`],
    ['city'],
    {},
    { dblclick: dblclickUpdateCity }
  );
  const licenseNumber = createElement('div', [`${agent.license_id}`]);
  localStorage.setItem(agent.name, agent._id);
  const agentInformation = createElement(
    'div',
    [name, city, licenseNumber],
    ['agent']
  );
  agentInformation.dataset.agentId = agent._id;
  document.getElementById('list-of-agents').append(agentInformation);
}

function createHeaderOfList() {
  const name = createElement('div', [`Name:`]);
  const city = createElement('div', [`City:`]);
  const licenseNumber = createElement('div', [`Number of license:`]);
  const agentInformation = createElement(
    'div',
    [name, city, licenseNumber],
    ['agent']
  );
  document.getElementById('list-of-agents').append(agentInformation);
}

function createAgentList(agentsList) {
  createHeaderOfList();
  if (agentsList.length < 10) {
    for (let i = 0; i < agentsList.length; i++) {
      createAgentElement(agentsList[i]);
    }
  } else {
    const randomIndexes = randomTen(agentsList.length);
    for (const index of randomIndexes) {
      createAgentElement(agentsList[index]);
    }
  }
}

async function dblclickUpdateCity(event) {
  event.preventDefault();

  const targetElement = event.target;
  await makingEditable(targetElement);
}

async function makingEditable(element) {
  element.setAttribute('contenteditable', 'true'); //Making text editable
  await updatingDB(element);
}

async function updatingDB(element) {
  const id = element.parentElement.dataset.agentId;
  element.addEventListener('blur', async () => {
    //Handler moment of click on other element
    try {
      const newCity = element.innerText;
      const response = await axios.put(
        `http://localhost:3030/api/agent/${id}/edit/${newCity}`
      );
      element.setAttribute('contenteditable', 'false');
      console.log(element);
      console.log(element.parentElement);
      console.log(element.parentElement);
      document
        .getElementById('list-of-agents')
        .removeChild(element.parentElement);
    } catch (error) {
      element.setAttribute('contenteditable', 'false');
      showingAlert(error.response.status, error.response.statusText);
      return;
    }
  });
}

function showingAlert(status, message) {
  const object = document.getElementById('alert');
  object.classList.remove(object.classList.item(1));
  if (status < 300) {
    object.classList.add('success');
    object.querySelector(
      'div'
    ).innerHTML = `<strong>Success!<strong> ${message}`;
  } else {
    object.querySelector(
      'div'
    ).innerHTML = `<strong>Error!<strong> ${status} ${message}`;
  }
  object.style.display = 'block';
  object.style.opacity = '1';
}

const closeButtons = document.getElementsByClassName('closebtn');

//Adding functionality to close alerts messages
for (const button of closeButtons) {
  button.onclick = function () {
    const div = this.parentElement;
    div.style.opacity = '0';
    setTimeout(function () {
      div.style.display = 'none';
    }, 600);
  };
}
