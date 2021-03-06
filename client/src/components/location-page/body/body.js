import './body.css';
import { createDOMWithSelector } from '../../../util/createDOMWithSelector';

export default class BodyPart {
	state = [];
	constructor({ $parent, initialState, onClick }) {
		this.state = initialState;
		this.$target = createDOMWithSelector('div', '.location');
		$parent.appendChild(this.$target);

		this.$target.innerHTML = `
        <div class='location__span'>
            <span>지역은 최소 1개 이상</span>
            <br> 
            <span>최대 2개까지 설정 가능해요.</span>
        </div>
        <div class='location__btnOuter'></div>
        `;

		this.onClick = onClick;
		this.$target.addEventListener('click', (e) => {
			let idx = 0;
			if (e.target.dataset.idx) idx = e.target.dataset.idx;
			this.onClick(e, idx);
		});
		this.$Button = document.querySelector('.location__btnOuter');
		this.render();
	}

	setState(nextState) {
		this.state = nextState;
		this.render();
	}

	render() {
		let result = '';

		result += this.createMainButton();
		result += this.createNormalButton();
		result += this.createPlusButton();

		this.$Button.innerHTML = result;
	}

	createMainButton() {
		return this.state.length
			? `
            <button class='location__mainBtn'>
                <span>
                    ${this.state[0]}
                </span>
                <img class='location__cancelBtn' src="https://deal-6.s3.ap-northeast-2.amazonaws.com/storeImages/icons/cancel.svg" data-idx='0'/>
            </button>
            `
			: ``;
	}

	createNormalButton() {
		return this.state.length > 1
			? `
            <button class='location__normalBtn'>
                <span>
                    ${this.state[1]}
                </span>
                <img class='location__cancelBtn' src="https://deal-6.s3.ap-northeast-2.amazonaws.com/storeImages/icons/cancel_baemin.svg" data-idx='1'/>
            </button>
            `
			: ``;
	}
	createPlusButton() {
		return this.state.length < 2
			? `
            <button class='location__plusBtn'>
                <span class='location__plus'>
                    +
                </span>
            </button>
            `
			: ``;
	}
}
