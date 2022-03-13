import petImg from '../images/icons/pet.svg';
import toxicImg from '../images/icons/toxic.svg';
import lowSunImg from '../images/icons/low-sun.svg';
import noSunImg from '../images/icons/no-sun.svg';
import oneDropImg from '../images/icons/1-drop.svg';
import twoDropsImg from '../images/icons/2-drops.svg';
import threeDropsImg from '../images/icons/3-drops.svg';

class PlantComponent extends HTMLElement{
  constructor(){
      super();
  }
  
  connectedCallback(){
    this.toxicityIcon = this._getToxicityIcon(this.getAttribute('toxicity'));
    this.sunIcon = this._getSunIcon(this.getAttribute('sun'));
    this.dropIcon = this._dropIcon(this.getAttribute('water'));
    this.innerHTML = this.render();
    if (this.getAttribute('favorite') === 'true') {
      this.classList = this.classList += ' staff-favorite'
    }
  }

  _getToxicityIcon(toxicity) {
    return toxicity === 'true'
      ? toxicImg
      : petImg;
  }

  _getSunIcon(sun) {
    return sun === 'no'
      ? noSunImg
      : lowSunImg;
  }

  _dropIcon(drop) {
    switch (drop) {
      case 'rarely':
        return oneDropImg;
      case 'regularly':
        return twoDropsImg;
      case 'daily':
        return threeDropsImg;
      default:
        return oneDropImg;
    }
  }

  render() {
    return `
      <div class="plant">
        <div class="plant__staff-favorite">Staff favorite</div>
        <div class="plant__image">
          <img src="${this.getAttribute('img')}" alt="${this.getAttribute('plant')}">
        </div>
        <div class="plant__info">
          <h4>${this.getAttribute('plant')}</h4>
          <div class="plant__info__details">
            <p>$${this.getAttribute('price')}</p>
            <div class="plant__info__details__icons">
              <img src="${this.toxicityIcon}" alt="Toxicity">
              <img src="${this.sunIcon}" alt="Sun">
              <img src="${this.dropIcon}" alt="Water">
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
window.customElements.define('app-plant', PlantComponent);