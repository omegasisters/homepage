var sindanQuestions = {
  questions: [
    {
      text: '何色が好きですか？',
      answers: [
        {
          text: '赤',
          target: 'ray',
          value: 1,
        },
        {
          text: '青',
          target: 'rio',
          value: 1,
        },
        {
          text: 'ピンク',
          target: 'unchan',
          value: 1,
        },
      ],
    },
    {
      text: 'うんちを漏らしたことはありますか？',
      answers: [
        {
          text: 'はい',
          target: 'ray',
          value: 2,
        },
        {
          text: 'いいえ',
          target: 'none',
          value: 0,
        },
      ],
    },
    {
      text: '好きなものはどれですか？',
      answers: [
        {
          text: 'VRゴーグル',
          target: 'ray',
          value: 2,
        },
        {
          text: '水',
          target: 'unchan',
          value: 2,
        },
        {
          text: 'マネーーー！！！',
          target: 'rio',
          value: 2,
        },
        {
          text: 'ハンバーガー',
          target: 'none',
          value: 0,
        },
      ],
    },
    {
      text:
        '墓地にはEXデッキから直接送られた「PSYフレームロード・Ω」が存在します。どうしますか？',
      answers: [
        {
          text: '死者蘇生を発動',
          target: 'rio',
          value: 1,
        },
        {
          text: 'リビングデッドの呼び声を発動',
          target: 'unchan',
          value: 1,
        },
        {
          text: 'カードを売ってマネーにする',
          target: 'rio',
          value: 2,
        },
        {
          text: '何もせずターンエンド',
          target: 'ray',
          value: 2,
        },
      ],
    },
    {
      text: '「プルリク」ってなんの略？',
      answers: [
        {
          text: 'プルデンシャル・リクルーティング',
          target: 'unchan',
          value: 1,
        },
        {
          text: 'プルリクエスト',
          target: 'ray',
          value: 1,
        },
        {
          text: 'プルリクって言わないで！！',
          target: 'rio',
          value: 1,
        },
      ],
    },
  ],
  resultPages: {
    ray: 'sindan_ray.html',
    rio: 'sindan_rio.html',
    unchan: 'sindan_unchan.html',
  },
};

/* 追加質問例
  {
    text:"ここに質問文を書く",
    answers:[
      //ここから下が回答の選択肢
      {
        text:"選択肢1に入る文章",
        target:"誰のポイントに影響するか(rayまたはrioまたはunchan)",
        value:この回答でtargetに何ポイント入るか
      },
      {
        text:"うんち",
        target:"rio",
        value:1
      },
      ・・・
    ]
  }
*/

export default sindanQuestions;
