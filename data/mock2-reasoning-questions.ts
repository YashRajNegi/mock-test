export const reasoningQuestionsMock2 = [
  // Section A: Linear Seating Arrangement (Q1–5)
  {
    id: 1,
    section: "Linear Seating Arrangement",
    directions:
      "Six colleagues A, B, C, D, E and F sit in a row facing north. C sits third to the left of D. A sits to the immediate right of D. B sits at one of the ends. E sits immediate left of F.",
    question: "Who sits at the left end?",
    options: [
      { key: "A", text: "A" },
      { key: "B", text: "B" },
      { key: "C", text: "C" },
      { key: "D", text: "E" },
    ],
    answer: "B",
  },
  {
    id: 2,
    section: "Linear Seating Arrangement",
    question: "Who is exactly between A and C?",
    options: [
      { key: "A", text: "B" },
      { key: "B", text: "E" },
      { key: "C", text: "F" },
      { key: "D", text: "D" },
    ],
    answer: "D",
  },
  {
    id: 3,
    section: "Linear Seating Arrangement",
    question: "Which of the following pairs sits together?",
    options: [
      { key: "A", text: "B–C" },
      { key: "B", text: "D–F" },
      { key: "C", text: "A–E" },
      { key: "D", text: "C–E" },
    ],
    answer: "C",
  },
  {
    id: 4,
    section: "Linear Seating Arrangement",
    question: "Who sits second from the right end?",
    options: [
      { key: "A", text: "D" },
      { key: "B", text: "F" },
      { key: "C", text: "A" },
      { key: "D", text: "C" },
    ],
    answer: "A",
  },
  {
    id: 5,
    section: "Linear Seating Arrangement",
    question:
      "If a new person G is added to the right of B (facing north) with no other change, who is now second from the left?",
    options: [
      { key: "A", text: "B" },
      { key: "B", text: "C" },
      { key: "C", text: "D" },
      { key: "D", text: "E" },
    ],
    answer: "A",
  },
  // Section B: Circular Seating Arrangement (Q6–10)
  {
    id: 6,
    section: "Circular Seating Arrangement",
    directions:
      "Eight friends P, Q, R, S, T, U, V, W sit around a circular table facing center. P sits opposite R. Q sits second to the left of P. S sits between Q and T. U sits opposite V. W sits to the immediate right of V.",
    question: "Who sits opposite Q?",
    options: [
      { key: "A", text: "R" },
      { key: "B", text: "S" },
      { key: "C", text: "T" },
      { key: "D", text: "U" },
    ],
    answer: "C",
  },
  {
    id: 7,
    section: "Circular Seating Arrangement",
    question: "Who sits to the immediate left of P?",
    options: [
      { key: "A", text: "Q" },
      { key: "B", text: "S" },
      { key: "C", text: "T" },
      { key: "D", text: "W" },
    ],
    answer: "D",
  },
  {
    id: 8,
    section: "Circular Seating Arrangement",
    question: "How many persons are between R and U (clockwise)?",
    options: [
      { key: "A", text: "Two" },
      { key: "B", text: "Three" },
      { key: "C", text: "Four" },
      { key: "D", text: "One" },
    ],
    answer: "A",
  },
  {
    id: 9,
    section: "Circular Seating Arrangement",
    question: "Which of the following is true?",
    options: [
      { key: "A", text: "S sits opposite W" },
      { key: "B", text: "T sits to the immediate right of Q" },
      { key: "C", text: "V sits between P and R" },
      { key: "D", text: "U sits second to the left of P" },
    ],
    answer: "B",
  },
  {
    id: 10,
    section: "Circular Seating Arrangement",
    question:
      "If all persons move two positions clockwise, who will sit opposite P?",
    options: [
      { key: "A", text: "Q" },
      { key: "B", text: "R" },
      { key: "C", text: "S" },
      { key: "D", text: "T" },
    ],
    answer: "D",
  },
  // Section C: Blood Relations (Q11–15)
  {
    id: 11,
    section: "Blood Relations",
    directions:
      "A + B means A is the brother of B; A – B means A is the sister of B; A × B means A is the father of B; A ÷ B means A is the mother of B.",
    question: "If P + Q × R – S, then how is P related to S?",
    options: [
      { key: "A", text: "Brother" },
      { key: "B", text: "Uncle" },
      { key: "C", text: "Father" },
      { key: "D", text: "Cousin" },
    ],
    answer: "B",
  },
  {
    id: 12,
    section: "Blood Relations",
    question: "If M ÷ N + O × P, then how is M related to P?",
    options: [
      { key: "A", text: "Mother" },
      { key: "B", text: "Grandmother" },
      { key: "C", text: "Aunt" },
      { key: "D", text: "Sister" },
    ],
    answer: "B",
  },
  {
    id: 13,
    section: "Blood Relations",
    question: "If X + Y – Z × W, then how is X related to W?",
    options: [
      { key: "A", text: "Uncle" },
      { key: "B", text: "Brother" },
      { key: "C", text: "Father" },
      { key: "D", text: "Cousin" },
    ],
    answer: "A",
  },
  {
    id: 14,
    section: "Blood Relations",
    question: "If A × B + C – D, then how is A related to D?",
    options: [
      { key: "A", text: "Father" },
      { key: "B", text: "Grandfather" },
      { key: "C", text: "Uncle" },
      { key: "D", text: "Brother" },
    ],
    answer: "A",
  },
  {
    id: 15,
    section: "Blood Relations",
    question: "If P ÷ Q × R + S, then how is P related to S?",
    options: [
      { key: "A", text: "Mother" },
      { key: "B", text: "Grandmother" },
      { key: "C", text: "Aunt" },
      { key: "D", text: "Sister" },
    ],
    answer: "B",
  },
  // Section D: Direction Sense (Q16–20)
  {
    id: 16,
    section: "Direction Sense",
    directions:
      "A person starts from point A, walks 10 m north, then 15 m east, then 8 m south, then 12 m west, and finally 5 m north to reach point B.",
    question: "What is the shortest distance between A and B?",
    options: [
      { key: "A", text: "10 m" },
      { key: "B", text: "12 m" },
      { key: "C", text: "15 m" },
      { key: "D", text: "18 m" },
    ],
    answer: "A",
  },
  {
    id: 17,
    section: "Direction Sense",
    question: "In which direction is point B from point A?",
    options: [
      { key: "A", text: "North-east" },
      { key: "B", text: "North-west" },
      { key: "C", text: "South-east" },
      { key: "D", text: "South-west" },
    ],
    answer: "A",
  },
  {
    id: 18,
    section: "Direction Sense",
    question:
      "If the person walks 5 m more north from B, how far will he be from A?",
    options: [
      { key: "A", text: "15 m" },
      { key: "B", text: "12 m" },
      { key: "C", text: "18 m" },
      { key: "D", text: "20 m" },
    ],
    answer: "A",
  },
  {
    id: 19,
    section: "Direction Sense",
    question: "What is the total distance covered by the person?",
    options: [
      { key: "A", text: "50 m" },
      { key: "B", text: "45 m" },
      { key: "C", text: "55 m" },
      { key: "D", text: "60 m" },
    ],
    answer: "A",
  },
  {
    id: 20,
    section: "Direction Sense",
    question:
      "If the person wants to return to A in a straight line, in which direction should he walk?",
    options: [
      { key: "A", text: "North-east" },
      { key: "B", text: "South-west" },
      { key: "C", text: "North-west" },
      { key: "D", text: "South-east" },
    ],
    answer: "B",
  },
  // Section E: Coding-Decoding (Q21–25)
  {
    id: 21,
    section: "Coding-Decoding",
    directions:
      "In a certain code, 'COMPUTER' is written as 'DNPQVUFS' and 'SOFTWARE' is written as 'TPGUXBSF'.",
    question: "How is 'HARDWARE' written in that code?",
    options: [
      { key: "A", text: "IBSEXBSF" },
      { key: "B", text: "IBSEXBRF" },
      { key: "C", text: "IBSEXBSG" },
      { key: "D", text: "IBSEXBRG" },
    ],
    answer: "A",
  },
  {
    id: 22,
    section: "Coding-Decoding",
    question: "How is 'NETWORK' written in that code?",
    options: [
      { key: "A", text: "OFUXPSL" },
      { key: "B", text: "OFUXPSM" },
      { key: "C", text: "OFUXPRL" },
      { key: "D", text: "OFUXPRM" },
    ],
    answer: "A",
  },
  {
    id: 23,
    section: "Coding-Decoding",
    question:
      "If 'DATABASE' is written as 'EBUBCTF', what is the code for 'SYSTEM'?",
    options: [
      { key: "A", text: "TZTFUN" },
      { key: "B", text: "TZTFUM" },
      { key: "C", text: "TZSFUN" },
      { key: "D", text: "TZSFUM" },
    ],
    answer: "A",
  },
  {
    id: 24,
    section: "Coding-Decoding",
    question:
      "If 'PROGRAM' is written as 'QSPHSBN', what is the code for 'ALGORITHM'?",
    options: [
      { key: "A", text: "BMHPSJUI" },
      { key: "B", text: "BMHPSJUJ" },
      { key: "C", text: "BMHPSJUI" },
      { key: "D", text: "BMHPSJUJ" },
    ],
    answer: "A",
  },
  {
    id: 25,
    section: "Coding-Decoding",
    question:
      "If 'INTERFACE' is written as 'JOUFSGBDF', what is the code for 'PROTOCOL'?",
    options: [
      { key: "A", text: "QSPUPDPM" },
      { key: "B", text: "QSPUPDPL" },
      { key: "C", text: "QSPUPDPM" },
      { key: "D", text: "QSPUPDPL" },
    ],
    answer: "A",
  },
  // Section F: Syllogism (Q26–30)
  {
    id: 26,
    section: "Syllogism",
    directions:
      "Statements: All programmers are developers. Some developers are testers. No testers are managers.",
    question:
      "Conclusions: I. Some programmers are testers. II. No developers are managers.",
    options: [
      { key: "A", text: "Only I follows" },
      { key: "B", text: "Only II follows" },
      { key: "C", text: "Both I and II follow" },
      { key: "D", text: "Neither I nor II follows" },
    ],
    answer: "D",
  },
  {
    id: 27,
    section: "Syllogism",
    question:
      "Statements: All engineers are professionals. Some professionals are consultants. All consultants are experts. Conclusions: I. Some engineers are experts. II. All experts are professionals.",
    options: [
      { key: "A", text: "Only I follows" },
      { key: "B", text: "Only II follows" },
      { key: "C", text: "Both I and II follow" },
      { key: "D", text: "Neither I nor II follows" },
    ],
    answer: "D",
  },
  {
    id: 28,
    section: "Syllogism",
    question:
      "Statements: No students are employees. All employees are workers. Some workers are students. Conclusions: I. Some workers are not employees. II. No students are workers.",
    options: [
      { key: "A", text: "Only I follows" },
      { key: "B", text: "Only II follows" },
      { key: "C", text: "Both I and II follow" },
      { key: "D", text: "Neither I nor II follows" },
    ],
    answer: "A",
  },
  {
    id: 29,
    section: "Syllogism",
    question:
      "Statements: All leaders are managers. Some managers are supervisors. No supervisors are assistants. Conclusions: I. Some leaders are supervisors. II. No managers are assistants.",
    options: [
      { key: "A", text: "Only I follows" },
      { key: "B", text: "Only II follows" },
      { key: "C", text: "Both I and II follow" },
      { key: "D", text: "Neither I nor II follows" },
    ],
    answer: "D",
  },
  {
    id: 30,
    section: "Syllogism",
    question:
      "Statements: Some analysts are researchers. All researchers are scientists. No scientists are technicians. Conclusions: I. Some analysts are scientists. II. No researchers are technicians.",
    options: [
      { key: "A", text: "Only I follows" },
      { key: "B", text: "Only II follows" },
      { key: "C", text: "Both I and II follow" },
      { key: "D", text: "Neither I nor II follows" },
    ],
    answer: "C",
  },
  // Section G: Inequality (Q31–35)
  {
    id: 31,
    section: "Inequality",
    directions: "In each question, choose the correct answer.",
    question: "P > Q = R ≥ S < T. Which of the following is true?",
    options: [
      { key: "A", text: "P > S" },
      { key: "B", text: "T > R" },
      { key: "C", text: "Q = S" },
      { key: "D", text: "P < T" },
    ],
    answer: "A",
  },
  {
    id: 32,
    section: "Inequality",
    question: "A ≥ B = C > D ≥ E. Which of the following is false?",
    options: [
      { key: "A", text: "C > D" },
      { key: "B", text: "B ≥ D" },
      { key: "C", text: "A > E" },
      { key: "D", text: "D > A" },
    ],
    answer: "D",
  },
  {
    id: 33,
    section: "Inequality",
    question: "M < N ≤ O = P < Q. What is the relation between N and P?",
    options: [
      { key: "A", text: "N < P" },
      { key: "B", text: "N = P" },
      { key: "C", text: "N > P" },
      { key: "D", text: "Cannot be determined" },
    ],
    answer: "B",
  },
  {
    id: 34,
    section: "Inequality",
    question: "W ≥ X > Y = Z. Which of the following is true?",
    options: [
      { key: "A", text: "X = Z" },
      { key: "B", text: "W > Y" },
      { key: "C", text: "W < Z" },
      { key: "D", text: "Y > X" },
    ],
    answer: "B",
  },
  {
    id: 35,
    section: "Inequality",
    question: "L = M ≥ N > O = P. What is the relation between M and P?",
    options: [
      { key: "A", text: "M < P" },
      { key: "B", text: "M = P" },
      { key: "C", text: "M > P" },
      { key: "D", text: "Cannot be determined" },
    ],
    answer: "C",
  },
  // Section H: Order & Ranking (Q36–40)
  {
    id: 36,
    section: "Order & Ranking",
    question:
      "In a row of 40 students, Ramesh is 12th from the left. What is his position from the right?",
    options: [
      { key: "A", text: "28th" },
      { key: "B", text: "29th" },
      { key: "C", text: "30th" },
      { key: "D", text: "31st" },
    ],
    answer: "B",
  },
  {
    id: 37,
    section: "Order & Ranking",
    question:
      "In a class of 50 students, Priya is 15th from the top and 20th from the bottom. How many students are there between Priya and the student who is 5th from the top?",
    options: [
      { key: "A", text: "9" },
      { key: "B", text: "10" },
      { key: "C", text: "11" },
      { key: "D", text: "12" },
    ],
    answer: "A",
  },
  {
    id: 38,
    section: "Order & Ranking",
    question:
      "In a queue, A is 8th from the front and B is 12th from the back. If there are 25 people in the queue, how many people are between A and B?",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "8" },
    ],
    answer: "A",
  },
  {
    id: 39,
    section: "Order & Ranking",
    question:
      "In a row of 30 people, X is 10th from the left and Y is 15th from the right. How many people are between X and Y?",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "8" },
    ],
    answer: "A",
  },
  {
    id: 40,
    section: "Order & Ranking",
    question:
      "In a class of 60 students, Rahul is 20th from the top. What is his rank from the bottom?",
    options: [
      { key: "A", text: "40th" },
      { key: "B", text: "41st" },
      { key: "C", text: "42nd" },
      { key: "D", text: "43rd" },
    ],
    answer: "B",
  },
  // Section I: Puzzle (Q41–45)
  {
    id: 41,
    section: "Puzzle",
    directions:
      "Seven boxes A, B, C, D, E, F, and G are stacked one above another. Box G is at the top. Box D is immediately above box F. Box B is placed immediately below C. Only one box is between B and D. Box A is just below E.",
    question: "Which box is at the bottom?",
    options: [
      { key: "A", text: "F" },
      { key: "B", text: "C" },
      { key: "C", text: "A" },
      { key: "D", text: "B" },
    ],
    answer: "A",
  },
  {
    id: 42,
    section: "Puzzle",
    question: "Which box is just above F?",
    options: [
      { key: "A", text: "D" },
      { key: "B", text: "B" },
      { key: "C", text: "G" },
      { key: "D", text: "E" },
    ],
    answer: "A",
  },
  {
    id: 43,
    section: "Puzzle",
    question: "How many boxes are between E and G?",
    options: [
      { key: "A", text: "Three" },
      { key: "B", text: "Two" },
      { key: "C", text: "Four" },
      { key: "D", text: "One" },
    ],
    answer: "A",
  },
  {
    id: 44,
    section: "Puzzle",
    question: "Which of the following is correct?",
    options: [
      { key: "A", text: "G is just below F" },
      { key: "B", text: "A is immediately below E" },
      { key: "C", text: "C is just above G" },
      { key: "D", text: "B is at the top" },
    ],
    answer: "B",
  },
  {
    id: 45,
    section: "Puzzle",
    question: "Which box is placed just below C?",
    options: [
      { key: "A", text: "B" },
      { key: "B", text: "D" },
      { key: "C", text: "F" },
      { key: "D", text: "A" },
    ],
    answer: "A",
  },
  // Section J: Input-Output (Q46–50)
  {
    id: 46,
    section: "Input-Output",
    directions:
      "Study the following input and output carefully and answer the questions.",
    question: "Input: 45 67 23 89 12 34 56 78. Step I: 12 45 67 23 89 34 56 78. Step II: 12 23 45 67 89 34 56 78. Step III: 12 23 34 45 67 89 56 78. Step IV: 12 23 34 45 56 67 89 78. Step V: 12 23 34 45 56 67 78 89. What is the position of 67 in Step III?",
    options: [
      { key: "A", text: "4th" },
      { key: "B", text: "5th" },
      { key: "C", text: "6th" },
      { key: "D", text: "7th" },
    ],
    answer: "B",
  },
  {
    id: 47,
    section: "Input-Output",
    question: "Which number is at the 3rd position in Step II?",
    options: [
      { key: "A", text: "45" },
      { key: "B", text: "67" },
      { key: "C", text: "23" },
      { key: "D", text: "89" },
    ],
    answer: "A",
  },
  {
    id: 48,
    section: "Input-Output",
    question: "How many steps are required to complete the arrangement?",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "5" },
      { key: "C", text: "6" },
      { key: "D", text: "7" },
    ],
    answer: "B",
  },
  {
    id: 49,
    section: "Input-Output",
    question: "Which number moves the most from its original position?",
    options: [
      { key: "A", text: "12" },
      { key: "B", text: "23" },
      { key: "C", text: "34" },
      { key: "D", text: "56" },
    ],
    answer: "A",
  },
  {
    id: 50,
    section: "Input-Output",
    question:
      "What is the difference between the first and last numbers in the final arrangement?",
    options: [
      { key: "A", text: "77" },
      { key: "B", text: "67" },
      { key: "C", text: "57" },
      { key: "D", text: "47" },
    ],
    answer: "A",
  },
];
 