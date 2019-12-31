import {h, FunctionalComponent} from 'preact';
//@ts-ignore
import sindanQuestions from '../config/sindanQuestions.js';
import {useState} from 'preact/hooks';

interface Question {
  text: string;
  answers: Answer[];
}

interface Answer {
  text: string;
  target: string;
  value: number;
}

const SindanApp: FunctionalComponent = () => {
  const [started, setStarted] = useState(false);
  const [questionID, setQuestionID] = useState(-1);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers]: [Answer[], any] = useState([]);
  const [questions, setQuestions]: [Question[], any] = useState([]);
  const [pointsMap, setPointsMap]: [{[key: string]: number}, any] = useState({
    ray: 0,
    rio: 0,
    unchan: 0,
  });

  const startSindan = async (start: boolean) => {
    setStarted(start);
    if (start === true) {
      try {
        const q: Question[] = sindanQuestions['questions'];
        setQuestions(q);
        setQuestionsCount(q.length);
        readNext(q, q.length, pointsMap);
      } catch (e) {
        setStarted(false);
        alert(`設定ファイルに問題があります。 ${e}`);
      }
    }
  };

  const readNext = (
    questions: Question[],
    qCount: number,
    points: {[key: string]: number},
  ) => {
    if (questionID + 1 < qCount) {
      try {
        setQuestionID(questionID + 1);
        const question = questions[questionID + 1];
        setQuestionText(question['text']);
        setAnswers(question['answers']);
      } catch (e) {
        setStarted(false);
        setQuestionID(-1);
        alert(`設定ファイルに問題があります。 ${e}`);
      }
    } else {
      let maxPointTarget = '';
      let maxPoint = 0;
      for (let target in points) {
        try {
          const point = points[target];
          if (point >= maxPoint) {
            maxPoint = point;
            maxPointTarget = target;
          }
        } catch (e) {
          console.error(`pointsMap is broken ${e}`);
        }
      }
      try {
        const resultPages: {[key: string]: string} =
          sindanQuestions.resultPages;
        const resultPage = resultPages[maxPointTarget];
        if (resultPage) {
          window.location.href = './' + resultPage;
        }
      } catch (e) {
        console.error(`can not find result page ${e}`);
      }
    }
  };

  const answer = (answer: Answer) => {
    try {
      const target = answer['target'];
      let newPointsMap = pointsMap;
      let point = newPointsMap[target];
      if (!point) {
        point = 0;
      }
      newPointsMap[target] = point + answer['value'];
      setPointsMap(newPointsMap);
      readNext(questions, questionsCount, newPointsMap);
    } catch (e) {
      setStarted(false);
      setQuestionID(-1);
      alert(`設定ファイルに問題があります。 ${e}`);
    }
  };

  return (
    <div className="preact__container_for_sindan">
      <div className="hero__container_for_sindan">
        <div className="hero__logo_for_sindan">
          {started == false && (
            <div>
              <h1 className="logo">おめが診断</h1>
              <h1 className="logo-sub">あなたはどのおめが？</h1>
            </div>
          )}
          {started && (
            <div>
              <h1 className="question-logo">Q{questionID + 1}</h1>
              <h1 className="question-text">{questionText}</h1>
            </div>
          )}
        </div>
      </div>
      <div className="controle-box">
        {started == false && (
          <div className="start-button" onClick={() => startSindan(true)}>
            はじめる
          </div>
        )}
        {answers.map((ans) => {
          return (
            <div className="start-button" onClick={() => answer(ans)}>
              {ans['text']}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SindanApp;
