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
      "Luke 1:1-2:40",
      "Matthew", "Matt", "Luke"
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
  },
  {
    id: "q14",
    type: "multiple-choice",
    question: "The Jewish leader who features prominently in the Christmas Story is ___.",
    options: ["Herod", "Pilate", "Caesar", "Pharaoh", "Caiaphas"],
    correctAnswer: "Herod"
  },
  {
    id: "q15",
    type: "multiple-choice",
    question: "Who visited the Christ child first?",
    options: ["Shepherds", "Village rabbis", "Wise men", "Scribes and Pharisees", "Sadducees"],
    correctAnswer: "Shepherds"
  },
  {
    id: "q16",
    type: "checkbox",
    question: "The wise men presented gifts to Jesus of ___. (Select all that apply)",
    options: ["Gold", "Silver", "Bronze", "Precious gems", "Myrrh"],
    correctAnswers: ["Gold", "Myrrh"]
  },
  {
    id: "q17",
    type: "multiple-choice",
    question: "The reason Joseph and Mary traveled south from their home was to ___.",
    options: ["Register for a census", "See relatives", "Find work", "Evade the Law", "None of the above"],
    correctAnswer: "Register for a census"
  },
  {
    id: "q18",
    type: "multiple-choice",
    question: "Mary gave birth to Jesus in ___.",
    options: ["Bethlehem", "Nazareth", "Jerusalem", "Shiloh", "Beersheba"],
    correctAnswer: "Bethlehem"
  },
  {
    id: "q19",
    type: "checkbox",
    question: "After giving birth to Jesus, Mary laid Him in a ___. (Select all that apply)",
    options: ["Feed trough", "Manger", "Bed", "Crib", "None of the above"],
    correctAnswers: ["Feed trough", "Manger"]
  },
  {
    id: "q20",
    type: "multiple-choice",
    question: "The shepherds went to see Jesus in Bethlehem because they ___.",
    options: ["Followed a star", "Discovered a prophecy", "Heard an angel", "Got news from a fellow shepherd", "None of the above"],
    correctAnswer: "Followed a star"
  },
  {
    id: "q21",
    type: "checkbox",
    question: "What was told the shepherds about the baby Jesus? (Select all that apply)",
    options: [
      "He will be in a manger",
      "He will be wrapped in cloths",
      "He will not cry",
      "He will be in an inn",
      "He will be answering wise men's questions"
    ],
    correctAnswers: ["He will be in a manger", "He will be wrapped in cloths"]
  },
  {
    id: "q22",
    type: "multiple-choice",
    question: "When the shepherds arrived at the place of Jesus’ birth, they told what they had seen and heard to ___.",
    options: ["Everyone around", "Joseph", "Mary", "Jesus", "Herod"],
    correctAnswer: "Everyone around"
  },
  {
    id: "q23",
    type: "multiple-choice",
    question: "Whom did Herod consult to learn the birthplace of the new king?",
    options: ["Scripture experts", "Fortune tellers", "Palace staffers", "Map makers", "Census directors"],
    correctAnswer: "Scripture experts"
  },
  {
    id: "q24",
    type: "multiple-choice",
    question: "Joseph was warned to flee to what country because Jesus’ life was in danger?",
    options: ["Egypt", "Jordan", "Lebanon", "Persia", "Babylon"],
    correctAnswer: "Egypt"
  },
  {
    id: "q25",
    type: "multiple-choice",
    question: "Joseph and his young family remained beyond the borders of Israel for approximately a ___.",
    options: ["Scripture doesn't say", "Week", "Month", "Year", "Decade"],
    correctAnswer: "Scripture doesn't say"
  },
  {
    id: "q26",
    type: "multiple-choice",
    question: "Joseph and his family returned to Israel because ___.",
    options: [
      "King Herod had died",
      "Pilate changed domestic policy",
      "Foreign taxes were too high",
      "Life abroad was too difficult",
      "They were persecuted as foreigners in the land where they had fled"
    ],
    correctAnswer: "King Herod had died"
  },
  {
    id: "q27",
    type: "true-false",
    question: "The Christmas Story says Jesus was circumcised at the Temple when He was eight days old.",
    correctAnswer: "False"
  },
  {
    id: "q28",
    type: "multiple-choice",
    question: "What type of sacrifice did Joseph and Mary offer when they presented Jesus at the Temple?",
    options: ["Bird", "Grain", "Sheep", "Goat", "Bull"],
    correctAnswer: "Bird"
  },
  {
    id: "q29",
    type: "multiple-choice",
    question: "Who took Jesus in his arms and prophesied over Him at the Temple?",
    options: ["Simeon", "Paul", "John the Baptist", "Agabus", "Philip"],
    correctAnswer: "Simeon"
  },
  {
    id: "q30",
    type: "multiple-choice",
    question: "Who spoke words of blessing and thanksgiving about Jesus to Joseph and Mary at the Temple?",
    options: ["Anna", "Reuben", "Rachel", "Asher", "Phanuel"],
    correctAnswer: "Anna"
  },
  {
    id: "q31",
    type: "multiple-choice",
    question: "How many journeys transpire in the Christmas Story?",
    options: ["Four", "One", "Two", "Three", "Five"],
    correctAnswer: "Four"
  },
  {
    id: "q32",
    type: "multiple-choice",
    question: "How many countries are explicitly mentioned in the Christmas Story?",
    options: ["Two", "One", "Three", "Four", "Five"],
    correctAnswer: "Two"
  },
  {
    id: "q33",
    type: "multiple-choice",
    question: "How old was Jesus at the time of the wise men’s visit?",
    options: ["Scripture doesn't say", "Newborn", "Six months", "One year", "Two years"],
    correctAnswer: "Scripture doesn't say"
  },
  {
    id: "q34",
    type: "multiple-choice",
    question: "After seeing Jesus, Scripture implies the wise men ___.",
    options: ["Left the same night", "Departed the following week", "Remained in Israel permanently", "Stayed for about a month", "None of the above"],
    correctAnswer: "Left the same night"
  },
  {
    id: "q35",
    type: "multiple-choice",
    question: "How many babies does the Christmas Story say were slaughtered?",
    options: ["Scripture doesn't say", "Hundreds", "About a thousand", "Thousands", "Millions"],
    correctAnswer: "Scripture doesn't say"
  },
  {
    id: "q36",
    type: "multiple-choice",
    question: "The slaughter of babies in the Christmas Story was foretold by ___.",
    options: ["Jeremiah", "Moses", "Ezekiel", "Isaiah", "Malachi"],
    correctAnswer: "Jeremiah"
  },
  {
    id: "q37",
    type: "multiple-choice",
    question: "Joseph feared for his family when he returned to Israel because of ___.",
    options: ["King Archelaus", "Governor Pilate", "King Herod", "Caesar Augustus", "High Priest Caiaphas"],
    correctAnswer: "King Archelaus"
  },
  {
    id: "q38",
    type: "multiple-choice",
    question: "The Christmas Story ends in what town/city?",
    options: ["Nazareth", "Bethlehem", "Jerusalem", "Tel Aviv", "Hebron"],
    correctAnswer: "Nazareth"
  }
];
