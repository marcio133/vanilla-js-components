class MainPageApp {
  constructor() {
    this.myForm = document.getElementById("my-form");
    this.selectsInput = this.myForm.getElementsByTagName('select');
    this.noResultsSection = document.getElementById('no-results');
    this.hasResultsSection = document.getElementById('has-results');
    this.hasResultsButton = document.getElementById('has-results-button');

    this._initFormListeners(this.selectsInput);
    this._hide(this.hasResultsSection);
    this.hasResultsButton.addEventListener('click', this._scrollToForm.bind(this));
  }

  _initFormListeners(inputs) {
    for (let select of inputs) {
      select.addEventListener('change', () => {
        if (this._formIsValid()) {
          const values = Array.from(this.selectsInput)
            .map(element => element.value);
          this._getData(values[0], values[1], values[2]);
        }
      });
    }
  }

  _formIsValid() {
    const invalidInputs = Array.from(this.selectsInput)
      .filter( input => input.value === "");
    return invalidInputs.length ? false : true;
  }

  _getData(sunValue, waterValue, petsValue) {
    const apiUrl = 'https://front-br-challenges.web.app/api/v2/green-thumb/?sun='+sunValue+'&water='+waterValue+'&pets='+petsValue;

    fetch(apiUrl, { method: 'get' })
      .then((response) => {
        response.json().then((data) => {
          if (data.length) {
            this._show(this.hasResultsSection);
            this._hide(this.noResultsSection);
            if (window.screen.width >= 992) {
              this._renderDesktop(data)
            } else {
              this._renderPlants(data);
            }
          }
        });
      })
      .catch((err) => { 
        console.error(err);
      });
  }
  
  _renderPlants(plants) {
    const mobileSection = document.getElementById('has-results-container-mobile');
    let htmlCreated = "";
    plants.forEach(plant => {
      htmlCreated += 
      `<app-plant 
        plant=`+plant.name+`
        price=`+plant.price+`
        sun=`+plant.sun+`
        water=`+plant.water+`
        toxicity=`+plant.toxicity+`
        img=`+plant.url+`
        favorite=`+plant.staff_favorite+`>
      </app-plant>`;
    });

    mobileSection.innerHTML = htmlCreated;
  }

  _renderDesktop(plants) {
    const firstSection = document.getElementById('desktop-first-section');
    const firstPlant = plants[0];
    const firstPlantHtml = 
      `<app-plant 
          class="plant-highlight"
          plant="${firstPlant.name}"
          price="${firstPlant.price}"
          sun="${firstPlant.sun}"
          water="${firstPlant.water}"
          toxicity="${firstPlant.toxicity}"
          img="${firstPlant.url}"
          favorite="${firstPlant.staff_favorite}">
        </app-plant>`;
    firstSection.innerHTML = firstPlantHtml;

    const secondSection = document.getElementById('desktop-second-section');
    let secondHtml = '';
    if (plants.length < 2) {
      secondSection.innerHTML = secondHtml;
      return;
    }
    for (let i = 1; i < 5; i++) {
      if (plants[i]) {
        secondHtml +=
          `
          <div class="col-6">
            <app-plant 
              plant="${plants[i].name}"
              price="${plants[i].price}"
              sun="${plants[i].sun}"
              water="${plants[i].water}"
              toxicity="${plants[i].toxicity}"
              img="${plants[i].url}"
              favorite="${plants[i].staff_favorite}">
            </app-plant>
          </div>`;
      }
    }
    secondSection.innerHTML = secondHtml;

    const thirdSection = document.getElementById('desktop-third-section');
    let thirdHtml = '';
    if (plants.length < 5) {
      thirdSection.innerHTML = thirdHtml;
      return;
    }
    for (let i = 5; i < plants.length; i++) {
      if (plants[i]) {
        thirdHtml +=
          `
          <div class="col-3">
            <app-plant 
              plant="${plants[i].name}"
              price="${plants[i].price}"
              sun="${plants[i].sun}"
              water="${plants[i].water}"
              toxicity="${plants[i].toxicity}"
              img="${plants[i].url}"
              favorite="${plants[i].staff_favorite}">
            </app-plant>
          </div>`;
      }
    }
    thirdSection.innerHTML = thirdHtml;
  }

  _scrollToForm () {
    this.myForm.scrollIntoView();
  };

  _show (elem) {
    elem.style.display = 'block';
  };
  
  _hide (elem) {
    elem.style.display = 'none';
  };
}

const mainPage = new MainPageApp();
