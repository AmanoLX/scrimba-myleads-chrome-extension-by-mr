let myLeads = [];
const inputBtn = document.querySelector('#input-btn');
const tabBtn = document.querySelector('#tab-btn');
const deleteBtn = document.querySelector('#delete-btn');
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-el');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

const render = (leads) => {
  let listItems = '';
  leads.forEach((lead) => {
    listItems += `<li><a href="https://${lead}" target='_blank'>${lead}</a></li>`;
  });
  ulEl.innerHTML = listItems;
};

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  console.log(myLeads);
  render(myLeads);
}

inputBtn.addEventListener('click', () => {
  let lead = inputEl.value;
  myLeads.push(lead);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  render(myLeads);
});

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener('dblclick', () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
