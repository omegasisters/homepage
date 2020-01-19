import {FunctionalComponent, h} from 'preact';

//@ts-ignore
import sindanQuestions from '../../config/sindanQuestions.js';
import {useState, useEffect} from 'preact/hooks';

interface Question {
  text: string;
  answers: Answer[];
}

interface Answer {
  text: string;
  target: SindanType;
  value: number;
}

type SindanType = 'ray' | 'rio' | 'unchan';

type SindanPoints = {[key in SindanType]: number};

const SindanApp: FunctionalComponent = () => {
  const [started, setStarted] = useState(false);
  const [questionID, setQuestionID] = useState(-1);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pointsMap, setPointsMap] = useState<SindanPoints>({
    ray: 0,
    rio: 0,
    unchan: 0,
  });

  useEffect(() => {
    if (started === true) {
      try {
        const q = sindanQuestions['questions'] as Question[];
        setQuestions(q);
        setQuestionsCount(q.length);
        readNext(q, q.length, pointsMap);
      } catch (e) {
        setStarted(false);
        alert(`設定ファイルに問題があります。 ${e}`);
      }
    }
  }, [started])

  const readNext = (
    questions: Question[],
    qCount: number,
    points: SindanPoints,
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
      const maxPointTarget = Object.keys(points).reduce((a, b) =>
        points[a as SindanType] > points[b as SindanType] ? a : b,
      );
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
      const newPointsMap = pointsMap;
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
          <div className="start-button" onClick={() => setStarted(true)}>
            はじめる
          </div>
        )}
        <div className="controle-box__buttons">
          {answers.map((ans) => {
            return (
              <div className="start-button" onClick={() => answer(ans)}>
                {ans['text']}
              </div>
            );
          })}
        </div>
      </div>

      {started == false && (
        <a href="/homepage" className="c-unchan c-unchan--fixedBottom">
          <div className="fukidashi" id="unchan_fukidashi">
            ホームページに戻る
          </div>
          <div className="c-unchan__inner">
            <div className="c-unchan__tsuno">
              <div className="c-unchan__tsuno__inner"></div>
            </div>
            <div className="c-unchan__toguro c-unchan__toguro--top"></div>
            <div className="c-unchan__toguro c-unchan__toguro--middle">
              <div className="c-unchan__eye c-unchan__eye--left">
                <div></div>
              </div>
              <div className="c-unchan__eye c-unchan__eye--right">
                <div></div>
              </div>
            </div>
            <div className="c-unchan__toguro c-unchan__toguro--bottom"></div>
            <div className="c-unchan__mouth">
              <div className="c-unchan__mouth__inner">
                <div></div>
              </div>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default SindanApp;
