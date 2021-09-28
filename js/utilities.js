function setLightMode(){
    let elementsBG = document.querySelectorAll('.bg-dark');
    let elementsText = document.querySelectorAll('.text-white, .link-light');
    let elementSelect = document.querySelector('.border-select-dark');
    if(elementSelect){
      elementSelect.classList.toggle('border-select-dark',false);
      elementSelect.classList.toggle('border-select-light',true);
    }
    elementsBG.forEach(element => {
      element.classList.toggle('bg-dark',false);
      element.classList.toggle('bg-light',true);
      });
    elementsText.forEach(element=>{
      element.classList.toggle('link-light',false);
      element.classList.toggle('text-white',false);
      element.classList.toggle('text-dark',true);
      element.classList.toggle('link-dark',true);
    });
}

function setDarkMode(){
  let elementsBG = document.querySelectorAll('.bg-light');
  let elementsText = document.querySelectorAll('.text-dark, .link-dark');
  let elementSelect = document.querySelector('.border-select-light');
  if(elementSelect){
    elementSelect.classList.toggle('border-select-light',false);
    elementSelect.classList.toggle('border-select-dark',true);
  }
  elementsBG.forEach(element => {
    element.classList.toggle('bg-light',false);
    element.classList.toggle('bg-dark',true);
    });
  elementsText.forEach(element=>{
    element.classList.toggle('text-dark',false);
    element.classList.toggle('link-dark',false);
    element.classList.toggle('link-light',true);
    element.classList.toggle('text-white',true);
  });
}