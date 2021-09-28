const apiURL = 'https://damp-ravine-40090.herokuapp.com/api/diseases';
const wikiApiURL ='https://en.wikipedia.org/api/rest_v1/page/summary/';
const newsApiURL = `https://gnews.io/api/v4/search?token=a9aaf353b0951622bab9755945f51916&sortby=relevance&max=5&lang=${(navigator.language || navigator.userLanguage)? (navigator.language || navigator.userLanguage).substring(0,2):'en'}`;

loadDiseases();
//getNews('\"COVID-19\"')
//loadTotalCasesByDisease();
//loadCasesByDisease('COVID_19');

let temp;

async function loadDiseases(){
    let data = await (await fetch(`${apiURL}/`)).json();
    setDiseases(data);
    console.log(data);
}
async function loadTotalCasesByDiseases(){
    let data = await (await fetch(`${apiURL}/all`)).json();
    console.log(data);
}
async function loadTotalCasesByDisease(disease){
    let data = await (await fetch(`${apiURL}/report/${disease}`)).json();
    return data;
    console.log(data);
}
async function loadCasesByDisease(disease){
    modal.show();
    let data = await (await fetch(`${apiURL}/${disease}`)).json();
    temp = data;
    console.log(data);
    getSummary(disease.toLowerCase());
    if(map.getSource('cases')){
        map.getSource('cases').setData(temp);
    }
    else{
        addNewSource(temp);
    }
    modal.hide();
}

async function getSummary(disease){
    console.log('a')
    let data = await (await fetch(`${wikiApiURL}${disease}`)).json();
    setInformation(data);
    console.log(data);
}

async function getNews(disease){
    let data = await (await fetch(`${newsApiURL}&q="${disease}"`)).json();
    return data;
    console.log(data);
}