// Question bank for the Christmas Story quiz/survey.
// Add more questions to QUESTION_BANK any time — the page always shows
// STATIC_QUESTION first, then picks 4 random ones from this array.
//
// Types:
//   "scale"          -> single choice, not graded (used for the static question)
//   "short-text"     -> free text input, graded against acceptedAnswers (case/space-insensitive)
//   "multiple-choice"-> single choice from options, graded against correctAnswer
//   "true-false"     -> same as multiple-choice with options ["True","False"]
//   "checkbox"       -> multiple choice from options, graded against correctAnswers (set match)

const STATIC_QUESTION = {
  id: "static-1",
  type: "scale",
  question: "How would you rate your knowledge of the Bible?",
  options: ["Strong", "Fairly strong", "Average", "Fairly weak", "Weak"]
};

const QUESTION_BANK = [
  {
    id: "q2",
    type: "short-text",
    question: "Where in the Bible do we find the story of Jesus’ birth?",
    acceptedAnswers: [
      "Matthew 1-2", "Matt 1-2", "Matt. 1-2",
      "Matthew 1 and 2", "Matt 1 and 2", "Matt. 1 and 2",
      "Matthew 1 & 2", "Matt 1 & 2", "Matt. 1 & 2",
      "Matthew 2", "Matt 2", "Matt. 2",
      "Luke 1-2", "Lk 1-2", "Lk. 1-2",
      "Luke 1 and 2", "Lk 1 and 2", "Lk. 1 and 2",
      "Luke 1 & 2", "Lk 1 & 2", "Lk. 1 & 2",
      "Matthew 2 and Luke 1-2", "Matt 2 and Lk 1-2",
      "Matthew 1:18-2:23", "Matt 1:18-2:23", "Matt. 1:18-2:23",
      "Luke 1:1-2:40"
    ]
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "Where did Joseph and Mary live at the outset of the Nativity story?",
    options: ["Nazareth", "Jerusalem", "Sepphoris", "Capernaum", "None of the above"],
    correctAnswer: "Nazareth"
  },
  {
    id: "q4",
    type: "multiple-choice",
    question: "Where did Joseph and Mary intend to go upon departing their home?",
    options: ["Bethlehem", "Hebron", "Joppa", "Bethel", "Jerusalem"],
    correctAnswer: "Bethlehem"
  },
  {
    id: "q5",
    type: "multiple-choice",
    question: "What did Mary ride when she and Joseph made their first journey?",
    options: ["Scripture doesn't say", "Horse", "Camel", "Donkey", "Cart"],
    correctAnswer: "Scripture doesn't say"
  },
  {
    id: "q6",
    type: "true-false",
    question: "Joseph wanted to call off the wedding (to Mary) because he learned she came from the wrong family line.",
    correctAnswer: "False"
  },
  {
    id: "q7",
    type: "multiple-choice",
    question: "Joseph’s hometown was known as the “City of ___.”",
    options: ["David", "Abraham", "Jacob", "Moses", "None of the above"],
    correctAnswer: "David"
  },
  {
    id: "q8",
    type: "multiple-choice",
    question: "The Bible suggests the wise men traveled from the ___.",
    options: ["east", "north", "south", "west", "None of the above"],
    correctAnswer: "east"
  },
  {
    id: "q9",
    type: "multiple-choice",
    question: "The Bible indicates the wise men’s first place of arrival was ___.",
    options: ["Jerusalem", "Bethlehem", "Bethsaida", "Nazareth", "Caesarea Philippi"],
    correctAnswer: "Jerusalem"
  },
  {
    id: "q10",
    type: "multiple-choice",
    question: "The wise men arrived at their destination by following a ___.",
    options: ["star", "map", "report", "guide", "angel"],
    correctAnswer: "star"
  },
  {
    id: "q11",
    type: "true-false",
    question: "The Christmas Story says there were three wise men.",
    correctAnswer: "False"
  },
  {
    id: "q12",
    type: "true-false",
    question: "The wise men are described in the Bible as kings.",
    correctAnswer: "False"
  },
  {
    id: "q13",
    type: "checkbox",
    question: "The wise men declared they had come to ___. (Select all that apply)",
    options: [
      "Find the King of the Jews",
      "Worship the King of the Jews",
      "Make Jesus King of the Jews",
      "Depose the King of the Jews",
      "Serve the King of the Jews"
    ],
    correctAnswers: ["Find the King of the Jews", "Worship the King of the Jews"]
  }
];
