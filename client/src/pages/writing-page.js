import NavigationBar from '../components/base/navigation-bar/navigation-bar';
import Body from '../components/writing-page/body/body';
import Footer from '../components/writing-page/footer/footer';
import { navigateTo } from '../router';
// import { api } from '../api/api';

const mode = '글쓰기';

export default class WritingPage {
	state = {
		user: '', // pk값을 들고있을지, 이름을 들고 있을지 고민입니다.
		seller: '',
		price: '',
		title: '',
		content: '',
		status: 0,
		location: '인창동', // 기본적으로 유저의 메인동네를 갖고 있어야한다.
		category: '',
		imgPath: [],
		createdAt: '',
		chatCount: 0,
		wishCount: 0,
		visitCount: 0,
		haveAllValue: false,
	};

	// haveAllValue : 모든 값이 있어야 Navbar doneIcon 활성화 가능!
	constructor($parent) {
		this.haveHistoryState();

		this.navigationBar = new NavigationBar({
			$parent,
			initialState: [mode, this.state.haveAllValue],
			onClick: () => {
				if (history.state) {
					// api.update('/', this.state)
					// 	.then(() => {
					navigateTo('/detail', this.state);
					// })
					// .catch((e) => {
					// 	alert(e.message);
					// });
				} else {
					// api.post('/', this.state)
					// 	.then(() => {
					navigateTo('/detail', this.state);
					// })
					// .catch((e) => {
					// 	alert(e.message);
					// });
				}
				// state에 userid 추가하고 (추가안해도 인자로 받아서 괜찮을듯) haveAllValue를 빼면 될듯!
				// 게시물 post 요청 (this.state)
				// navigateTo('/detail',this.state) PK 추가해야할듯!
			},
		});
		this.body = new Body({
			$parent,
			initialState: this.state,
			refreshState: (nextState) => {
				this.setState(nextState);
			}, // 부모의 State 업데이트
		});
		this.footer = new Footer({
			$parent,
			initialState: this.state.location,
		});

		// history.state ? '' : this.initiallizeData();
	}

	// initiallizeData() {
	// 메인동네 + 유저네임 / + 셀러네임(same)

	// 	api.get('/')
	// 		.then((res) => {
	// 			this.state.location = res.data.MainLocation;
	// 			this.state.user = res.data.id;
	// 			this.state.seller = res.data.id;
	// 			this.setState();
	// 		})
	// 		.catch(() => {
	// 			navigateTo('/notlogin');
	// 		});
	// }

	setState(nextState) {
		this.state = nextState;
		this.navigationBar.setState(this.state.haveAllValue);
		this.body.setState(nextState);
	}

	haveHistoryState() {
		if (history.state) {
			let tempState = history.state;
			tempState.haveAllValue = true;
			this.state = tempState;
		}
	}
}
