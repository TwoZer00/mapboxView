let modal = (new bootstrap.Modal(document.getElementById('exampleModal')));
let diseases = ["HIV/AIDS","MUCORMYCOSIS","YELLOW FEVER","EBOLA","LHF","CHOLERA","MERS","COVID-19","NDM-1/CRE"];
let collapse = new bootstrap.Collapse(document.getElementById('collapseInformation'));
getLocation();
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,error);
  } else { 
      alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  modal.show();
  console.log(position);
  clientLocation = [position.coords.longitude,position.coords.latitude];
  map.setCenter(clientLocation); 
  map.zoomTo(5,{
    duration:2000
  });
}

function error(){
  console.log('a',modal.hide());
}

function setDiseases(data){
  let selectDiseases = document.getElementById('diseases');
  diseases.sort();
  diseases.forEach(element => {
    let option = document.createElement('option');
    option.textContent = element;
    option.value = element;
    if(!data.includes(element)){
      option.disabled = true;
    }
    selectDiseases.appendChild(option);
  });
}

function getCompleteName(element){
  switch (element) {
    case 'COVID-19':
      return diseases[7];
      break;
    case 'EBOLA':
      return diseases[3];
      break;
    default:
      return(element);
      break;
  }
}

function setInformation(data){
  let informationParentContainer = document.getElementById('information');
  let selectDiseases = document.getElementById('diseases');
  let headerTitle = document.querySelector('#header');
  let infContainer = document.getElementById('infContainer');
  let newsContainer = document.getElementById('newsContainer');
  informationParentContainer.querySelector('.card-title').textContent = data.title;
  informationParentContainer.querySelectorAll('.card-text')[0].innerHTML = data.description;
  headerTitle.textContent = data.title;
  loadTotalCasesByDisease(selectDiseases.value).then((data)=>{
    infContainer.innerHTML = `<span class="bi bi-person-fill ${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'text-white':'text-dark'}">${data[0].cases}</span>`;
  });
  // getNews(selectDiseases.value).then((data)=>{
  //   (data.articles).forEach(element=>{
  //     newsContainer.textContent+=element.title+' - ';
  //   });
  //   console.log(data.articles);
  // });
  collapse.hide();
}
document.getElementById('collapseInformation').addEventListener('show.bs.collapse',()=>{
  document.getElementById('collapseContainer').classList.toggle('rounded-top',false);
  document.getElementById('collapseContainer').classList.toggle('rounded',true);
});
document.getElementById('collapseInformation').addEventListener('hide.bs.collapse',()=>{
  document.getElementById('collapseContainer').classList.toggle('rounded',false);
  document.getElementById('collapseContainer').classList.toggle('rounded-top',true);
});