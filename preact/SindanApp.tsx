import { Component, h } from "/homepage/web_modules/preact.js";
import sindanQuestions from "./sindanQuestions.js";

interface State {
	started:boolean;
	questionID:number;
	questionText:string;
	answers: never[];
	questions: never[];
	questionsCount:number;
	pointsMap:{[key:string]:number};
}

export default class SindanApp extends Component {

	state:State = {
		started:false,
		questionID:-1,
		questionText:"",
		answers:[],
		questions:[],
		questionsCount:0,
		pointsMap:{}
	}

	readSindan = ()=>{
		console.log(sindanQuestions)
	}

	setStart = async (start: boolean)=>{
		this.setState({started:start})
		if (start === true){
			try {
				await this.setState({questions:sindanQuestions["questions"]})
				await this.setState({questionsCount:this.state.questions.length})
				this.readNext()
			} catch (e) {
				this.setState({started:false})
				alert(`設定ファイルに問題があります。 ${e}`)
			}
		}
	}

	readNext = async ()=>{
		console.log(this.state.questions)
				console.log(this.state.questionsCount)
		if (this.state.questionID+1 < this.state.questionsCount) {
			try {
				await this.setState({questionID:this.state.questionID+1})
				const question = this.state.questions[this.state.questionID]
				this.setState({questionText:question["text"]})
				this.setState({answers:question["answers"]})
			} catch(e) {
				this.setState({started:false})
				this.setState({questionID:-1})
				alert(`設定ファイルに問題があります。 ${e}`)
			}
		}
	}

	answer = (answer: any)=>{
		try {
			const target = answer["target"]
			let point = this.state.pointsMap[target]
			if (point == undefined){
				point = 0
			}
			this.setState({pointsMap: (point + answer["value"])})
			this.readNext()
		} catch(e) {
				this.setState({started:false})
				this.setState({questionId:-1})
				alert(`設定ファイルに問題があります。 ${e}`)
		}
	}

	render() {
		// props === this.props
		//state ==== this.state

		return(
		<div className="preact__container_for_sindan">
			<div className="hero__container_for_sindan">
				<div className="hero__logo_for_sindan">
					<h1 className="logo" style={this.state.started?"display:none":""}>おめが診断</h1>
					<h1 className="logo-sub" style={this.state.started?"display:none":""}>あなたにぴったりのおめがを見つけよう</h1>
					<h1 className="question-logo" style={this.state.started?"":"display:none"}>Q{this.state.questionID+1}</h1>
					<h1 className="logo-sub" style={this.state.started?"":"display:none"}>{this.state.questionText}</h1>
				</div>
			</div>
			<div className="controle-box">
				<div
				className="start-button"
				onClick={()=>this.setStart(true)}
				style={this.state.started?"display:none":""}
				>
					はじめる
				</div>
				{
					this.state.answers.map((ans)=>{
						return <div
						className="start-button"
						onClick={()=>this.answer(ans)}
						>
							{ans["text"]}
						</div>
					})
				}
			</div>
		</div>);
	}
}