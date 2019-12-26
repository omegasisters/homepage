import { Component, h } from "/homepage/web_modules/preact.js";
import sindanQuestions from "./sindanQuestions.js";

export default class SindanApp extends Component {

	state = {
		start:false,
		questionId:0,
	}

	readSindan = ()=>{
		console.log(sindanQuestions)
	}

	setStart = (start: boolean)=>{
		this.setState({start:start})
	}

	render() {
		// props === this.props
		// state === this.state

		return(
		<div className="preact__container_for_sindan">
			<div className="hero__container_for_sindan">
				<div className="hero__logo">
					<h1 className="logo">おめが診断</h1>
					<h1 className="logo-sub">あなたの好きな色は何ですか？</h1>
				</div>
			</div>
			<div className="controle-box">
				<div
				className="start-button"
				onClick={()=>this.readSindan()}
				>
					はじめる
				</div>
			</div>
		</div>);
	}
}