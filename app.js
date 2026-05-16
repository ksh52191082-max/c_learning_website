const C_KEYWORDS = {
  printf: { desc: "문자열이나 변수를 출력하는 함수", syntax: 'printf("형식 문자열", 변수);', example: 'printf("Hello!\\n");' },
  scanf: { desc: "키보드에서 값을 입력받는 함수", syntax: 'scanf("형식", &변수);', example: 'scanf("%d", &num);' },
  for: { desc: "지정된 횟수만큼 반복", syntax: "for (초기화; 조건; 증감)", example: "for (int i = 0; i < 10; i++)" },
  while: { desc: "조건이 참인 동안 반복", syntax: "while (조건)", example: "while (count > 0)" },
  if: { desc: "조건에 따라 실행", syntax: "if (조건)", example: "if (x > 0)" },
  int: { desc: "정수 타입", syntax: "int 변수명;", example: "int num = 10;" },
  char: { desc: "문자 타입", syntax: "char 변수명;", example: "char c = 'A';" },
  return: { desc: "값 반환", syntax: "return 값;", example: "return 0;" },
  break: { desc: "반복문 종료", syntax: "break;", example: "break;" },
  continue: { desc: "다음 반복으로", syntax: "continue;", example: "continue;" },
  switch: { desc: "다중 분기", syntax: "switch (값)", example: "switch (x)" },
  struct: { desc: "구조체 정의", syntax: "struct 이름 {}", example: "struct Point { int x; int y; };" },
  sizeof: { desc: "크기 구하기", syntax: "sizeof(타입 또는 변수)", example: "sizeof(int)" },
  malloc: { desc: "메모리 할당", syntax: "(타입*)malloc(sizeof(타입))", example: "int* p = (int*)malloc(sizeof(int));" },
  pointer: { desc: "포인터 변수", syntax: "타입* 포인터명;", example: "int* p;" }
};

const CONCEPT_TREE = [
  { id: 'basics', title: 'C언어 기초', icon: '📖', desc: '변수, 연산자, 조건분支', status: 'learned', problems: ['1000', '1001', '1002'] },
  { id: 'io', title: '입출력', icon: '⌨️', desc: 'printf, scanf, getchar', status: 'learned', problems: ['1001', '1006', '1007'] },
  { id: 'loop', title: '반복문', icon: '🔄', desc: 'for, while, do-while', status: 'learning', problems: ['1011', '1012', '1013'] },
  { id: 'array', title: '배열', icon: '📊', desc: '1차원 배열, 다차원 배열', status: 'locked', problems: ['1010', '1014'] },
  { id: 'function', title: '함수', icon: '🔧', desc: '함수 정의, 재귀 함수', status: 'locked', problems: ['1017', '1018'] },
  { id: 'pointer', title: '포인터', icon: '🎯', desc: '포인터, 주소, 참조', status: 'locked', problems: ['1019'] },
  { id: 'structure', title: '구조체', icon: '🏗️', desc: 'struct, union', status: 'locked', problems: ['1021'] },
  { id: 'datastruct', title: '자료구조', icon: '🗃️', desc: '리스트, 스택, 큐', status: 'locked', problems: ['1021', '1022', '1023'] },
  { id: 'algorithm', title: '알고리즘', icon: '🧠', desc: '정렬, 탐색, 그래프', status: 'locked', problems: ['1019', '1020', '1028'] },
  { id: 'dp', title: '동적 프로그래밍', icon: '⚡', desc: 'DP 테이블, 피보나치', status: 'locked', problems: ['1026', '1027'] }
];

const ACHIEVEMENTS = [
  { id: 'first_code', title: '첫 코드', desc: '처음으로 코드 실행', icon: '💻', xp: 10, condition: function(stats) { return stats.totalRuns >= 1; } },
  { id: 'first_solve', title: '첫 정답', desc: '처음으로 문제 정답', icon: '🎉', xp: 30, condition: function(stats) { return stats.solved >= 1; } },
  { id: 'bronze_5', title: '브론즈 5', desc: '브론즈 문제 5개 정답', icon: '🥉', xp: 50, condition: function(stats) { return stats.bronze >= 5; } },
  { id: 'bronze_10', title: '브론즈 10', desc: '브론즈 문제 10개 정답', icon: '🥉', xp: 80, condition: function(stats) { return stats.bronze >= 10; } },
  { id: 'silver_3', title: '실버 3', desc: '실버 문제 3개 정답', icon: '🥈', xp: 100, condition: function(stats) { return stats.silver >= 3; } },
  { id: 'silver_5', title: '실버 5', desc: '실버 문제 5개 정답', icon: '🥈', xp: 150, condition: function(stats) { return stats.silver >= 5; } },
  { id: 'gold_1', title: '골드 1', desc: '골드 문제 1개 정답', icon: '🥇', xp: 200, condition: function(stats) { return stats.gold >= 1; } },
  { id: 'gold_3', title: '골드 3', desc: '골드 문제 3개 정답', icon: '🥇', xp: 300, condition: function(stats) { return stats.gold >= 3; } },
  { id: 'streak_3', title: '3일 연속', desc: '3일 연속 학습', icon: '🔥', xp: 75, condition: function(stats) { return stats.streak >= 3; } },
  { id: 'streak_7', title: '7일 연속', desc: '7일 연속 학습', icon: '🔥', xp: 150, condition: function(stats) { return stats.streak >= 7; } },
  { id: 'quiz_master', title: '퀴즈 마스터', desc: '퀴즈 10회 정답', icon: '🧙', xp: 80, condition: function(stats) { return stats.quizCorrect >= 10; } },
  { id: 'quiz_genius', title: '퀴즈 천재', desc: '퀴즈 25회 정답', icon: '🧙', xp: 150, condition: function(stats) { return stats.quizCorrect >= 25; } },
  { id: 'night_owl', title: '올빼미', desc: '심야에 코드 실행', icon: '🦉', xp: 25, condition: function(stats) { return stats.nightRuns >= 1; } },
  { id: 'early_bird', title: '얼리버드', desc: '아침에 코드 실행', icon: '🐦', xp: 25, condition: function(stats) { return stats.morningRuns >= 1; } },
  { id: 'memory_master', title: '메모리 명인', desc: '메모리 시각화 10회 사용', icon: '🧠', xp: 60, condition: function(stats) { return stats.vizUses >= 10; } },
  { id: 'solver_30', title: '문제 해결자', desc: '총 30문제 정답', icon: '🏅', xp: 300, condition: function(stats) { return stats.solved >= 30; } }
];

const QUIZ_QUESTIONS = [
  { code: 'int x = 5;\nprintf("%d", x + 3);', options: ['5', '8', '53', 'x + 3'], correct: 1 },
  { code: 'int a = 3, b = 7;\nprintf("%d", a * b);', options: ['21', '37', '10', '73'], correct: 0 },
  { code: 'for (int i = 0; i < 3; i++) {\n  printf("%d", i);\n}', options: ['012', '123', '321', '000'], correct: 0 },
  { code: "char c = 'A';\nprintf(\"%c\", c + 1);", options: ['A', 'B', '66', 'a'], correct: 1 },
  { code: 'int x = 10;\nif (x > 5)\n  printf("big");\nelse\n  printf("small");', options: ['big', 'small', 'bigsmall', '에러'], correct: 0 },
  { code: 'int arr[3] = {1, 2, 3};\nprintf("%d", arr[2]);', options: ['1', '2', '3', '0'], correct: 2 },
  { code: 'int x = 15;\nprintf("%d", x % 4);', options: ['0', '1', '2', '3'], correct: 3 },
  { code: 'printf("Hello");\nprintf("World");', options: ['HelloWorld', 'Hello World', 'WorldHello', '에러'], correct: 0 },
  { code: 'char s[] = "CStudio";\nprintf("%c", s[2]);', options: ['S', 'C', 't', 'u'], correct: 2 },
  { code: 'int x = 2;\nprintf("%d", x << 2);', options: ['4', '8', '2', '16'], correct: 1 },
  { code: 'for (int i = 1; i <= 5; i++) {\n  if (i % 2 == 0) printf("%d", i);\n}', options: ['135', '24', '12345', '246'], correct: 1 },
  { code: 'int x = 7, y = 3;\nprintf("%d", x / y);', options: ['2.33', '2', '3', '1'], correct: 1 },
  { code: 'int a = 10;\nint *p = &a;\nprintf("%d", *p);', options: ['10', '주소값', '에러', '0'], correct: 0 },
  { code: 'for (int i = 0; i < 4; i++) {\n  printf("%d ", i % 2);\n}', options: ['0 1 0 1', '0 1 2 3', '1 2 3 4', '0 0 0 0'], correct: 0 },
  { code: 'int arr[5] = {5, 3, 8, 1, 2};\nprintf("%d", arr[1]);', options: ['5', '3', '8', '1'], correct: 1 }
];

const STARTER_TEMPLATE = '// Write your code here\n';

const MOTIVATIONAL_MESSAGES = [
  { text: "와! 신기하다! 🔥", when: "any" },
  { text: "정답이다! 오늘의 첫 성공! ⭐", when: "first" },
  { text: "벌써 3개째! 대단해! 🚀", when: "streak3" },
  { text: "포인터도轻而易举! 💡", when: "pointer" },
  { text: "재귀함수 마스터! 🧙", when: "recursive" },
  { text: "자료구조 달인이 되고 있어! 🏆", when: "datastruct" },
  { text: "오늘의 학습 목표 달성! 🎯", when: "daily" },
  { text: "버그 잡았다!-debugging 프로! 🔧", when: "debug" },
  { text: "코드가 아름답다! ✨", when: "any" },
  { text: "한 줄 한 줄 성장하고 있어! 📈", when: "any" },
  { text: "이것이 코딩의 재미! 🎮", when: "any" },
  { text: "문법이 완벽해! 👏", when: "any" },
  { text: "잘하고 있어! 계속 해봐! 💪", when: "any" },
  { text: "어려운 문제도 깰 수 있어! ⚔️", when: "hard" },
  { text: "실버、等급 달성! 반박 불가! 🥈", when: "silver" },
  { text: "골드、等級授予! 빛나는 존재! 🥇", when: "gold" }
];

const LEARNING_TIPS = [
  "C언어에서 포인터는 주소값을 저장하는 변수입니다",
  "배열은 메모리에 연속으로 저장되는 데이터입니다",
  "for문은 while문과 다르게 초기화,조건,증감을 한 줄에 씁니다",
  "문자열 끝에는 항상 null 문자 '\\0'이 있습니다",
  "scanf로 문자열 입력 시 &를 쓰지 않습니다",
  "변수의作用域(scope)은 중괄호 내에서입니다",
  "재귀함수는 base case가 반드시 필요합니다",
  "포인터 크기는 시스템에 따라 4바이트 또는 8바이트입니다"
];

const PROBLEMS = [
  { id: "1000", tier: "bronze", title: "Hello World", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["출력"], readme: { stmt: ["\"Hello, World!\"를 출력한다.", "없음", "\"Hello, World!\"를 출력한다.", ["없음"], ["Hello, World!"]] }, hints: ["printf 사용", "끝에 줄바꿈 포함", "printf(\"Hello, World!\\n\");"] },
  { id: "1001", tier: "bronze", title: "A+B", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["사칙연산"], readme: { stmt: ["두 정수 A와 B를 입력받고 합을 출력한다.", "첫째 줄에 정수 A, B가 주어진다.", "A와 B의 합을 출력한다.", ["3 5"], ["8"]] }, hints: ["두 수를 더한다", "scanf로 입력받고 printf로 출력", "int a, b; scanf(\"%d %d\", &a, &b);"] },
  { id: "1002", tier: "bronze", title: "A-B", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["사칙연산"], readme: { stmt: ["두 정수 A와 B를 입력받고 차를 출력한다.", "첫째 줄에 정수 A, B가 주어진다.", "A에서 B를 뺀 값을 출력한다.", ["3 5"], ["-2"]] }, hints: ["A에서 B를 뺀다", "scanf로 입력받고 printf로 출력", "printf(\"%d\", a - b);"] },
  { id: "1003", tier: "bronze", title: "곱셈", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["사칙연산"], readme: { stmt: ["두 정수 A와 B를 입력받고 곱을 출력한다.", "첫째 줄에 정수 A, B가 주어진다.", "A와 B의 곱을 출력한다.", ["3 5"], ["15"]] }, hints: ["두 수를 곱한다", "scanf로 입력받고 printf로 출력", "printf(\"%d\", a * b);"] },
  { id: "1004", tier: "bronze", title: "사칙연산", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["사칙연산"], readme: { stmt: ["두 정수 A와 B를 입력받고 사칙연산 결과를 출력한다.", "첫째 줄에 정수 A, B가 주어진다.", "A+B, A-B, A*B, A/B를 출력한다.", ["3 5"], ["8\n-2\n15\n0"]] }, hints: ["4가지 연산 수행", "나눗셈은 정수 나눗셈", "printf \"%d\"로 각각 출력"] },
  { id: "1005", tier: "bronze", title: "나머지", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["정수 A, B, C를 입력받고 (A+B)%C를 출력한다.", "첫째 줄에 정수 A, B, C가 주어진다.", "결과를 출력한다.", ["5 8 4"], ["1"]] }, hints: ["덧셈 후 나머지 연산", "(A+B)%C", "Modulo operator: %"] },
  { id: "1006", tier: "bronze", title: "문자 출력", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["출력"], readme: { stmt: ["문자 C를 입력받아 그대로 출력한다.", "첫째 줄에 문자 C가 주어진다.", "문자 C를 출력한다.", ["A"], ["A"]] }, hints: ["문자 입력받기", "getchar() 또는 scanf", "printf \"%c\""] },
  { id: "1007", tier: "bronze", title: "문자열 출력", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["출력"], readme: { stmt: ["문자열 S를 입력받아 그대로 출력한다.", "첫째 줄에 문자열 S가 주어진다.", "문자열 S를 출력한다.", ["Hello"], ["Hello"]] }, hints: ["문자열 입력받기", "scanf 또는 gets", "printf \"%s\""] },
  { id: "1008", tier: "bronze", title: "정수 2개 입력", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["입출력"], readme: { stmt: ["정수 A, B를 입력받고 순서 바꿔 출력한다.", "첫째 줄에 정수 A, B가 주어진다.", "B A 순서로 출력한다.", ["3 5"], ["5 3"]] }, hints: ["입력값 순서 변경", "두 변수 swap", "printf \"%d %d\""] },
  { id: "1009", tier: "bronze", title: "세 수 중 최솟값", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["조건문"], readme: { stmt: ["세 정수 중 최솟값을 출력한다.", "첫째 줄에 세 정수가 주어진다.", "최솟값을 출력한다.", ["3 7 1"], ["1"]] }, hints: ["세 수 비교", "if 문 또는 ternary", "min = a < b ? a : b"] },
  { id: "1010", tier: "bronze", title: "배열 채우기", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["배열"], readme: { stmt: ["1부터 N까지의 수를 출력한다.", "첫째 줄에 정수 N이 주어진다. (1 ≤ N ≤ 100)", "1부터 N까지 공백으로 구분하여 출력한다.", ["5"], ["1 2 3 4 5"]] }, hints: ["for 루프 사용", "1부터 N까지", "printf \"%d \""] },
  { id: "1011", tier: "bronze", title: "짝수만 출력", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["반복문"], readme: { stmt: ["1부터 N까지의 짝수를 출력한다.", "첫째 줄에 정수 N이 주어진다.", "짝수를 공백으로 구분하여 출력한다.", ["8"], ["2 4 6 8"]] }, hints: ["짝수 판별", "i % 2 == 0", "for 또는 while"] },
  { id: "1012", tier: "bronze", title: "합 구하기", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["반복문"], readme: { stmt: ["1부터 N까지의 합을 출력한다.", "첫째 줄에 정수 N이 주어진다.", "합을 출력한다.", ["10"], ["55"]] }, hints: ["반복문으로 합산", "sum += i", "누적합"] },
  { id: "1013", tier: "bronze", title: "구구단", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["반복문"], readme: { stmt: ["N단을 출력한다.", "첫째 줄에 정수 N이 주어진다.", "N단을 출력한다.", ["3"], ["3 6 9 12 15 18 21 24 27"]] }, hints: ["for 루프", "i * N", "for (i=1; i<=9; i++)"] },
  { id: "1014", tier: "bronze", title: "최댓값", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["배열"], readme: { stmt: ["10개의 정수 중 최댓값을 출력한다.", "첫째 줄에 10개의 정수가 주어진다.", "최댓값을 출력한다.", ["1 2 3 4 5 6 7 8 9 10"], ["10"]] }, hints: ["배열 사용", "최댓값 찾기", "if (arr[i] > max) max = arr[i]"] },
  { id: "1015", tier: "bronze", title: "소수 판별", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["정수 N이 소수인지 판별한다.", "첫째 줄에 정수 N이 주어진다.", "소수이면 1, 아니면 0을 출력한다.", ["7"], ["1"]] }, hints: ["소수: 1과 자신만으로 나누어짐", "2부터 sqrt(N)까지 검사", "for (i=2; i*i<=N; i++)"] },
  { id: "1016", tier: "bronze", title: "윤년 판별", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["조건문"], readme: { stmt: ["연도 Y가 윤년인지 판별한다.", "첫째 줄에 연도 Y가 주어진다.", "윤년이면 1, 아니면 0을 출력한다.", ["2000"], ["1"]] }, hints: ["4로 나누어떨어지고 100으로 안 나누어떨어짐", "또는 400으로 나누어떨어짐", "if (Y % 4 == 0 && Y % 100 != 0 || Y % 400 == 0)"] },
  { id: "1017", tier: "bronze", title: "별 찍기 1", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["출력"], readme: { stmt: ["N개의 별을 출력한다.", "첫째 줄에 정수 N이 주어진다.", "N개의 별을 출력한다.", ["5"], ["*****"]] }, hints: ["for 루프", "별 문자 출력", "printf \"*\""] },
  { id: "1018", tier: "bronze", title: "별 찍기 2", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["출력"], readme: { stmt: ["N행의 별을 역삼각형으로 출력한다.", "첫째 줄에 정수 N이 주어진다.", "별을 역삼각형으로 출력한다.", ["5"], ["*****\n ****\n  ***\n   **\n    *"]] }, hints: ["for 중첩", "공백과 별 출력", "공백은 i개, 별은 N-i개"] },
  { id: "1019", tier: "bronze", title: "숫자 역순 출력", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["반복문"], readme: { stmt: ["N부터 1까지 역순으로 출력한다.", "첫째 줄에 정수 N이 주어진다.", "N부터 1까지 공백으로 구분하여 출력한다.", ["5"], ["5 4 3 2 1"]] }, hints: ["for 루프 역순", "N부터 1까지", "i-- 사용"] },
  { id: "1020", tier: "bronze", title: "짝수의 합", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["반복문"], readme: { stmt: ["1부터 N까지의 짝수의 합을 출력한다.", "첫째 줄에 정수 N이 주어진다.", "짝수의 합을 출력한다.", ["10"], ["30"]] }, hints: ["짝수만 더하기", "i % 2 == 0", "sum += i"] },
  { id: "1021", tier: "bronze", title: "팩토리얼", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["반복문"], readme: { stmt: ["N!을 구한다.", "첫째 줄에 정수 N이 주어진다. (0 ≤ N ≤ 12)", "N!을 출력한다.", ["5"], ["120"]] }, hints: ["반복문 사용", "N! = N * (N-1) * ... * 1", "long long 사용"] },
  { id: "1022", tier: "bronze", title: "최소공배수", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["두 정수 A, B의 최소공배수를 출력한다.", "첫째 줄에 정수 A, B가 주어진다.", "A와 B의 최소공배수를 출력한다.", ["4 6"], ["12"]] }, hints: ["LCM = A * B / GCD", "유클리드 호제법", "GCD 먼저 구하기"] },
  { id: "1023", tier: "bronze", title: "최대공약수", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["두 정수 A, B의 최대공약수를 출력한다.", "첫째 줄에 정수 A, B가 주어진다.", "A와 B의 최대공약수를 출력한다.", ["12 18"], ["6"]] }, hints: ["유클리드 호제법", "GCD(A, B) = GCD(B, A%B)", "while (b != 0)"] },
  { id: "1024", tier: "bronze", title: "배수의 개수", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["1부터 N까지 중 K의 배수의 개수를 출력한다.", "첫째 줄에 정수 N, K가 주어진다.", "배수의 개수를 출력한다.", ["20 5"], ["4"]] }, hints: ["배수 판별", "i % K == 0", "카운트 변수 사용"] },
  { id: "1025", tier: "bronze", title: "약수의 합", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["정수 N의 모든 약수의 합을 출력한다.", "첫째 줄에 정수 N이 주어진다.", "약수의 합을 출력한다.", ["12"], ["28"]] }, hints: ["약수 구하기", "i * i <= N", "sum += i + N/i"] },
  { id: "1026", tier: "bronze", title: "암호 해독", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["문자열"], readme: { stmt: ["암호화된 문자열을 해독한다. 각 문자는 원래 문자에서 1씩 뒤진다.", "첫째 줄에 문자열이 주어진다.", "해독된 문자열을 출력한다.", ["Uijf"], ["TighE"]] }, hints: ["문자에서 1 빼기", "문자열 순회", "문자 연산"] },
  { id: "1027", tier: "bronze", title: "대문자 변환", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["문자열"], readme: { stmt: ["소문자를 대문자로 변환한다.", "첫째 줄에 문자열이 주어진다.", "변환된 문자열을 출력한다.", ["hello"], ["HELLO"]] }, hints: ["소문자 - 32 = 대문자", "문자형 연산", "islower, toupper"] },
  { id: "1028", tier: "bronze", title: "단어 길이", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["문자열"], readme: { stmt: ["단어의 길이를 출력한다.", "첫째 줄에 단어가 주어진다.", "길이를 출력한다.", ["computer"], ["8"]] }, hints: ["문자열 길이 구하기", "strlen 또는 순회", "null 문자 제외"] },
  { id: "1029", tier: "bronze", title: "배열 원소 반전", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["배열"], readme: { stmt: ["N개의 원소를 뒤집어 출력한다.", "첫째 줄에 N, 둘째 줄에 N개의 정수", "뒤집은 순서로 출력한다.", ["5", "1 2 3 4 5"], ["5 4 3 2 1"]] }, hints: ["역순 접근", "arr[N-1-i]", "for (i = 0; i < N/2; i++)"] },
  { id: "1030", tier: "bronze", title: "두 수 비교", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["조건문"], readme: { stmt: ["두 정수 A, B를 비교한다.", "첫째 줄에 정수 A, B가 주어진다.", "A>B면 1, A<B면 -1, 같으면 0을 출력한다.", ["3 5"], ["-1"]] }, hints: ["if-else 또는 삼항연산자", "비교 결과", "printf \"%d\""] },
  { id: "1031", tier: "bronze", title: "사분면 판별", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["조건문"], readme: { stmt: ["좌표 (x, y)가 몇 사분면인지 출력한다.", "첫째 줄에 정수 x, y가 주어진다.", "사분면 번호를 출력한다. 축상은 0.", ["3 5"], ["1"]] }, hints: ["x와 y의 부호", "축 체크", "if 문 또는 switch"] },
  { id: "1032", tier: "bronze", title: "윤년 구하기", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["조건문"], readme: { stmt: ["1부터 N까지의 윤년의 개수를 출력한다.", "첫째 줄에 정수 N이 주어진다.", "윤년의 개수를 출력한다.", ["2020"], ["489"]] }, hints: ["윤년 조건", "4로 나누어떨어지고 100으로 안 나누어떨어짐", "또는 400으로 나누어떨어짐"] },
  { id: "1033", tier: "silver", title: "피보나치 수", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["재귀함수"], readme: { stmt: ["N번째 피보나치 수를 구한다.", "첫째 줄에 정수 N이 주어진다. (0 ≤ N ≤ 30)", "N번째 피보나치 수를 출력한다.", ["10"], ["55"]] }, hints: ["F(0)=0, F(1)=1", "F(n) = F(n-1) + F(n-2)", "반복문 또는 재귀"] },
  { id: "1034", tier: "silver", title: "이진 탐색", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["탐색"], readme: { stmt: ["정렬된 배열에서 target의 위치를 찾는다.", "첫째 줄에 N과 target, 둘째 줄에 N개의 정수", "target의 인덱스를 출력한다. 없으면 -1.", ["5 7", "1 3 5 7 9"], ["3"]] }, hints: ["이진 탐색 알고리즘", "left, right, mid", "while (left <= right)"] },
  { id: "1035", tier: "silver", title: "버블 정렬", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["정렬"], readme: { stmt: ["N개의 수를 버블 정렬로 정렬한다.", "첫째 줄에 N이, 둘째 줄에 N개의 정수가 주어진다.", "정렬된 결과를 출력한다.", ["5", "5 3 2 4 1"], ["1 2 3 4 5"]] }, hints: ["인접 요소 비교/교환", "i와 j 이중 루프", "if (arr[j] > arr[j+1]) swap"] },
  { id: "1036", tier: "silver", title: "선택 정렬", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["정렬"], readme: { stmt: ["N개의 수를 선택 정렬로 정렬한다.", "첫째 줄에 N이, 둘째 줄에 N개의 정수가 주어진다.", "정렬된 결과를 출력한다.", ["5", "5 3 2 4 1"], ["1 2 3 4 5"]] }, hints: ["최소값 찾기", "swap으로 맨 앞으로", "for (i = 0; i < N-1; i++)"] },
  { id: "1037", tier: "silver", title: "연결 리스트", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["자료구조"], readme: { stmt: ["연결 리스트에서 특정 값 삭제.", "첫째 줄에 N, 둘째 줄에 N개의 정수, 셋째 줄에 삭제할 값.", "삭제 후 남은 값을 출력.", ["5", "1 2 3 4 5", "3"], ["1 2 4 5"]] }, hints: ["연결 리스트 구현", "이전 노드 연결 유지", "malloc으로 노드 할당"] },
  { id: "1038", tier: "silver", title: "스택", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["자료구조"], readme: { stmt: ["스택으로 괄호 문자열 유효성 검사.", "첫째 줄에 문자열이 주어진다.", "유효하면 1, 아니면 0.", ["(())()"], ["1"]] }, hints: ["여는 괄호는 push", "닫는 괄호는 pop 후 비교", "스택 empty 검사"] },
  { id: "1039", tier: "silver", title: "큐", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["자료구조"], readme: { stmt: ["큐를 이용해 대기 순서를 출력한다.", "첫째 줄에 N이 주어진다.", "1부터 N까지 큐에서 나온 순서로 출력.", ["5"], ["1 2 3 4 5"]] }, hints: ["큐 구현", "FIFO 구조", "front, rear"] },
  { id: "1040", tier: "silver", title: "재귀로 합 구하기", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["재귀함수"], readme: { stmt: ["1부터 N까지의 합을 재귀로 구한다.", "첫째 줄에 정수 N이 주어진다.", "합을 출력한다.", ["10"], ["55"]] }, hints: ["재귀 함수", "sum(n) = n + sum(n-1)", "base case: n=0"] },
  { id: "1041", tier: "silver", title: "재귀로 거듭제곱 구하기", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["재귀함수"], readme: { stmt: ["A의 B 거듭제곱을 재귀로 구한다.", "첫째 줄에 정수 A, B가 주어진다.", "결과를 출력한다.", ["2 10"], ["1024"]] }, hints: ["재귀 함수", "pow(A, B) = A * pow(A, B-1)", "base case: B=0"] },
  { id: "1042", tier: "silver", title: "하노이 탑", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["재귀함수"], readme: { stmt: ["하노이 탑의 최소 이동 횟수를 구한다.", "첫째 줄에 원반 수가 주어진다.", "최소 이동 횟수를 출력한다.", ["3"], ["7"]] }, hints: ["하노이 공식", "2^n - 1", "재귀 패턴"] },
  { id: "1043", tier: "silver", title: "이진수 변환", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["10진수를 2진수로 변환한다.", "첫째 줄에 정수가 주어진다.", "2진수로 출력한다.", ["13"], ["1101"]] }, hints: ["2로 나누기", "나머지를 역순", "스택 또는 배열"] },
  { id: "1044", tier: "silver", title: "소수 찾기", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["수학"], readme: { stmt: ["1부터 N까지 소수의 개수를 구한다.", "첫째 줄에 정수 N이 주어진다.", "소수의 개수를 출력한다.", ["20"], ["8"]] }, hints: ["에라토스테네스의 체", "소수 판별", "배열 사용"] },
  { id: "1045", tier: "silver", title: "배열 회전", difficulty: "실버", timeLimit: "1초", memoryLimit: "128MB", tags: ["배열"], readme: { stmt: ["배열을 오른쪽으로 K번 회전한다.", "첫째 줄에 N과 K, 둘째 줄에 N개의 정수", "회전된 결과를 출력한다.", ["5 2", "1 2 3 4 5"], ["4 5 1 2 3"]] }, hints: ["K %= N", "임시 배열 사용", "역순 회전"] },
  { id: "1046", tier: "gold", title: "이진 트리 높이", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["자료구조"], readme: { stmt: ["이진 트리의 높이를 구한다.", "첫째 줄에 노드 수 N", "각 노드의 부모를 나타내는 배열이 주어진다.", ["4", "-1 0 0 1"], ["2"]] }, hints: ["재귀 또는 BFS", "루트에서最深最深까지", "자식 노드 탐색"] },
  { id: "1047", tier: "gold", title: "해시 테이블", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["자료구조"], readme: { stmt: ["해시 테이블에 키 삽입하고 탐색.", "첫째 줄에 N, 둘째 줄에 N개의 키", "키 존재 여부 1 또는 0.", ["3", "10 20 30", "20"], ["1"]] }, hints: ["hash function mod 연산", "충돌 처리", "开放寻址 또는 체이닝"] },
  { id: "1048", tier: "gold", title: "동적 프로그래밍1", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["DP"], readme: { stmt: ["N번째 피보나치를 DP로 구하기.", "첫째 줄에 N이 주어진다.", "N번째 피보나치 수를 출력.", ["10"], ["55"]] }, hints: ["DP 배열 사용", "dp[i] = dp[i-1] + dp[i-2]", "공간 최적화 가능"] },
  { id: "1049", tier: "gold", title: "동적 프로그래밍2", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["DP"], readme: { stmt: ["계단 오르기 - 한 번에 1 또는 2 계단.", "첫째 줄에 계단 수 N.", "가능한 방법의 수를 출력.", ["4"], ["5"]] }, hints: ["dp[n] = dp[n-1] + dp[n-2]", "dp[1]=1, dp[2]=2", "N번째까지 경우의 수"] },
  { id: "1050", tier: "gold", title: "배낭 문제", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["DP"], readme: { stmt: ["배낭에 넣을 수 있는 최대 가치.", "첫째 줄에 물건 수 N과 용량 K", "각 물건의 무게와 가치", "얻을 수 있는 최대 가치를 출력.", ["4 7", "6 13", "4 8", "3 6", "5 12"], ["14"]] }, hints: ["2차원 DP", "dp[i][j] = max(dp[i-1][j], dp[i-1][j-w]+v)", "0/1 배낭"] },
  { id: "1051", tier: "gold", title: "그래프 탐색", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["그래프"], readme: { stmt: ["DFS로 그래프 탐색.", "첫째 줄에 N과 M, 둘째 줄에 간선 정보.", "DFS 순서를 출력.", ["4 3", "1 2", "1 3", "1 4"], ["1 2 3 4"]] }, hints: ["인접 리스트", "재귀 또는 스택", "방문 배열"] },
  { id: "1052", tier: "gold", title: "BFS 탐색", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["그래프"], readme: { stmt: ["BFS로 그래프 탐색.", "첫째 줄에 N과 M, 둘째 줄에 간선 정보.", "BFS 순서를 출력.", ["4 3", "1 2", "1 3", "1 4"], ["1 2 3 4"]] }, hints: ["큐 사용", "FIFO", "방문 배열"] },
  { id: "1053", tier: "gold", title: "최단 경로", difficulty: "골드", timeLimit: "1초", memoryLimit: "256MB", tags: ["그래프"], readme: { stmt: ["다익스트라로 최단 경로 구하기.", "첫째 줄에 N과 시작점, 둘째 줄에 간선 정보.", "각 노드까지의 최단 거리를 출력.", ["3 1", "1 2 3", "1 3 5"], ["0 3 5"]] }, hints: ["다익스트라 알고리즘", "우선순위 큐", "거리 배열"] },
  { id: "1054", tier: "gold", title: "플로이드 와샬", difficulty: "골드", timeLimit: "1초", memoryLimit: "256MB", tags: ["그래프"], readme: { stmt: ["모든 쌍 최단 경로 구하기.", "첫째 줄에 N과 M, 둘째 줄에 간선 정보.", "최단 거리 행렬을 출력.", ["3 5", "1 2 4", "1 3 2", "2 3 6", "3 1 7"], ["0 4 2 7 0 6 5 2 0"]] }, hints: ["3중 루프", "k를 경유하는 경우 확인", "INF 초기화"] },
  { id: "1055", tier: "gold", title: "위상 정렬", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["그래프"], readme: { stmt: ["DAG의 위상 정렬을 수행한다.", "첫째 줄에 노드 수 N과 간선 수 M", "간선 정보", "위상 정렬 결과를 출력.", ["4 3", "1 2", "2 3", "3 4"], ["1 2 3 4"]] }, hints: ["진입차수", "큐 사용", "진입차수 0인 노드부터 제거"] },
  { id: "1056", tier: "gold", title: "MST 프림", difficulty: "골드", timeLimit: "1초", memoryLimit: "256MB", tags: ["그래프"], readme: { stmt: ["프림 알고리즘으로 MST 구하기.", "첫째 줄에 정점 수 N과 간선 수 M", "간선 정보 (u, v, w)", "MST의 총 가중치를 출력.", ["3 3", "1 2 1", "2 3 2", "1 3 3"], ["3"]] }, hints: ["프림 알고리즘", "우선순위 큐", "방문 배열"] },
  { id: "1057", tier: "gold", title: "LCS", difficulty: "골드", timeLimit: "1초", memoryLimit: "256MB", tags: ["DP"], readme: { stmt: ["두 문자열의 최장 공통 부분 수열 길이.", "첫째 줄에 문자열 A와 B", "LCS 길이를 출력.", ["ABCD", "AEBD"], ["3"]] }, hints: ["2차원 DP", "dp[i][j] = max(dp[i-1][j], dp[i][j-1])", "문자가 같으면 +1"] },
  { id: "1058", tier: "gold", title: "편집 거리", difficulty: "골드", timeLimit: "1초", memoryLimit: "256MB", tags: ["DP"], readme: { stmt: ["문자열 A를 B로 변환하는 최소 편집 거리.", "첫째 줄에 문자열 A와 B", "최소 편집 거리를 출력.", ["abc", "abd"], ["1"]] }, hints: ["2차원 DP", "삽입, 삭제, 치환", "dp[i][j] = min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost)"] },
  { id: "1059", tier: "gold", title: "구간 합", difficulty: "골드", timeLimit: "1초", memoryLimit: "128MB", tags: ["누적합"], readme: { stmt: ["구간 합을 구하는 문제.", "첫째 줄에 N과 Q, 둘째 줄에 N개의 수", "Q개의 쿼리 (l, r)", "각 구간 합을 출력.", ["5 3", "1 2 3 4 5", "1 3", "2 5", "4 4"], ["6", "14", "4"]] }, hints: ["prefix sum 배열", "psum[i] = psum[i-1] + arr[i]", "구간 합 = psum[r] - psum[l-1]"] },
  { id: "1060", tier: "gold", title: "세그먼트 트리", difficulty: "골드", timeLimit: "1초", memoryLimit: "256MB", tags: ["자료구조"], readme: { stmt: ["세그먼트 트리로 구간 합 구하기.", "첫째 줄에 N과 M, 둘째 줄에 N개의 수", "M개의 쿼리 (업데이트, 합)", "결과를 출력.", ["5 2", "1 2 3 4 5", "1 3 2", "2 5"], ["9", "14"]] }, hints: ["세그먼트 트리", "업데이트와 쿼리", "재귀 트리 구성"] },
  { id: "1061", tier: "bronze", title: "거꾸로 출력", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["문자열"], readme: { stmt: ["문자열을 거꾸로 출력한다.", "첫째 줄에 문자열이 주어진다.", "거꾸로 된 문자열을 출력한다.", ["Hello"], ["olleH"]] }, hints: ["문자열 길이", "역순 접근", "for (i = len-1; i >= 0; i--)"] },
  { id: "1062", tier: "bronze", title: "문자 빈도수", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["문자열"], readme: { stmt: ["문자열에서 각 문자의 빈도수를 출력한다.", "첫째 줄에 문자열이 주어진다.", "각 문자와 빈도수를 출력한다.", ["hello"], ["h:1 e:1 l:2 o:1"]] }, hints: ["배열로 카운트", "a-z는 인덱스 0-25", "카운트 배열"] },
  { id: "1063", tier: "bronze", title: "좌표 이동", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["시뮬레이션"], readme: { stmt: ["좌표 평면에서 이동 후 최종 위치를 출력한다.", "첫째 줄에 이동 명령 N", "이후 N줄에 이동 정보 (방향 거리)", "최종 좌표를 출력한다.", ["4", "U 3", "R 2", "D 1", "L 4"], ["2 -1"]] }, hints: ["방향별 좌표 변화", "dx, dy 배열", "누적 합산"] },
  { id: "1064", tier: "bronze", title: "시계 방향 회전", difficulty: "브론즈", timeLimit: "1초", memoryLimit: "128MB", tags: ["배열"], readme: { stmt: ["2x2 행렬을 시계 방향으로 90도 회전한다.", "첫째 줄에 2x2 행렬의 원소 4개", "회전된 행렬을 출력한다.", ["1 2 3 4"], ["3 1 4 2"]] }, hints: ["행렬 인덱스 계산", "새 인덱스 구하기", "회전 공식"] }
];

let currentProblem = null;
let hintLevel = 0;
let userCode = '';
let stats = {
  totalRuns: 0,
  solved: 0,
  bronze: 0,
  silver: 0,
  gold: 0,
  streak: 0,
  quizCorrect: 0,
  quizTotal: 0,
  nightRuns: 0,
  morningRuns: 0,
  vizUses: 0,
  xp: 0,
  level: 1,
  achievements: [],
  solvedProblems: [],
  notes: {}
};

let vizStep = 0;
let vizInterval = null;
let currentQuizIndex = 0;

function loadStats() {
  try {
    var saved = localStorage.getItem('cstudio_stats');
    if (saved) {
      stats = JSON.parse(saved);
    }
  } catch (e) {}
  updateStatsUI();
}

function saveStats() {
  try {
    localStorage.setItem('cstudio_stats', JSON.stringify(stats));
  } catch (e) {}
}

function updateStatsUI() {
  var el = document.getElementById('stat-solved');
  if (el) el.textContent = stats.solved;
  el = document.getElementById('stat-xp');
  if (el) el.textContent = stats.xp;
  el = document.getElementById('stat-streak');
  if (el) el.textContent = stats.streak;
  el = document.getElementById('stat-achievements');
  if (el) el.textContent = stats.achievements.length;

  var levelNames = ['초보 개발자', '코딩 입문', '함수 개발자', '알고리즘 러너', '자료구조 마스터', '골드 솔버', '플래티넘', '다이아몬드', '마스터', '레전드'];
  var level = Math.floor(stats.xp / 100) + 1;
  stats.level = level;
  var levelName = levelNames[Math.min(level - 1, levelNames.length - 1)] || '레전드';
  el = document.getElementById('achievement-text');
  if (el) el.textContent = 'LV.' + level + ' ' + levelName;
  el = document.getElementById('achievement-fill');
  if (el) el.style.width = (stats.xp % 100) + '%';
}

function checkAchievements() {
  for (var i = 0; i < ACHIEVEMENTS.length; i++) {
    var ach = ACHIEVEMENTS[i];
    if (stats.achievements.indexOf(ach.id) === -1 && ach.condition(stats)) {
      stats.achievements.push(ach.id);
      stats.xp += ach.xp;
      showAchievementPopup(ach);
      saveStats();
      updateStatsUI();
    }
  }
}

function showAchievementPopup(achievement) {
  var popup = document.getElementById('achievement-popup');
  var icon = document.getElementById('achievement-popup-icon');
  var title = document.getElementById('achievement-popup-title');
  var desc = document.getElementById('achievement-popup-desc');
  var xp = document.getElementById('achievement-popup-xp');

  if (popup && icon && title && desc && xp) {
    icon.textContent = achievement.icon;
    title.textContent = achievement.title;
    desc.textContent = achievement.desc;
    xp.textContent = '+' + achievement.xp + ' XP';
    popup.hidden = false;
    popup.classList.add('is-visible');

    setTimeout(function() {
      popup.classList.remove('is-visible');
      setTimeout(function() { popup.hidden = true; }, 300);
    }, 3000);
  }
}

function showAllAchievements() {
  var popup = document.getElementById('achievement-popup');
  var icon = document.getElementById('achievement-popup-icon');
  var title = document.getElementById('achievement-popup-title');
  var desc = document.getElementById('achievement-popup-desc');
  var xp = document.getElementById('achievement-popup-xp');

  if (!popup || !icon || !title || !desc || !xp) return;

  var html = '<div class="achievement-list">';
  html += '<div class="achievement-summary">' + stats.achievements.length + '/' + ACHIEVEMENTS.length + ' 달성 | ' + stats.xp + ' XP</div>';

  for (var i = 0; i < ACHIEVEMENTS.length; i++) {
    var ach = ACHIEVEMENTS[i];
    var unlocked = stats.achievements.indexOf(ach.id) !== -1;
    html += '<div class="achievement-item ' + (unlocked ? 'is-unlocked' : 'is-locked') + '">';
    html += '<span class="achievement-item-icon">' + (unlocked ? ach.icon : '🔒') + '</span>';
    html += '<span class="achievement-item-title">' + ach.title + '</span>';
    html += '<span class="achievement-item-desc">' + ach.desc + '</span>';
    html += '<span class="achievement-item-xp">' + ach.xp + ' XP</span>';
    html += '</div>';
  }
  html += '</div>';

  icon.textContent = '🏆';
  title.textContent = '업적 목록';
  desc.innerHTML = html;
  xp.textContent = '';

  popup.hidden = false;
  popup.classList.add('is-visible');
}

function runCode(code, input) {
  try {
    var result = [];
    var inputs = input.split(' ').map(function(s) { return parseInt(s); }).filter(function(n) { return !isNaN(n); });
    var inputIdx = 0;
    var vars = {};
    var lines = code.split('\n');

    function getVar(name) {
      if (vars[name] !== undefined) return vars[name];
      return 0;
    }

    function setVar(name, val) { vars[name] = val; }

    function printf(fmt) {
      var out = fmt;
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < args.length; i++) {
        out = out.replace('%d', args[i]);
        out = out.replace('%s', args[i]);
        out = out.replace('%c', String.fromCharCode(args[i]));
      }
      result.push(out);
    }

    function scanf(fmt, ptr) {
      if (inputIdx < inputs.length) {
        if (ptr && ptr.charAt(0) === '&') {
          setVar(ptr.slice(1), inputs[inputIdx++]);
        }
      }
    }

    function evalExpr(expr) {
      expr = expr.trim();
      if (expr.indexOf('+') !== -1 && expr.indexOf('++') === -1) {
        var parts = expr.split('+');
        return evalExpr(parts[0]) + evalExpr(parts[1]);
      }
      if (expr.indexOf('-') !== -1 && expr.indexOf(' ') !== -1) {
        var parts = expr.split('-');
        return evalExpr(parts[0]) - evalExpr(parts[1]);
      }
      if (expr.indexOf('*') !== -1) {
        var parts = expr.split('*');
        return evalExpr(parts[0]) * evalExpr(parts[1]);
      }
      if (expr.indexOf('/') !== -1) {
        var parts = expr.split('/');
        return Math.floor(evalExpr(parts[0]) / evalExpr(parts[1]));
      }
      if (expr.indexOf('%') !== -1) {
        var parts = expr.split('%');
        return evalExpr(parts[0]) % evalExpr(parts[1]);
      }
      if (/^\d+$/.test(expr)) return parseInt(expr);
      return getVar(expr);
    }

    function executeLine(line) {
      line = line.trim();
      if (!line || line.indexOf('//') === 0) return;

      if (line.indexOf('int ') === 0 && line.indexOf('=') !== -1) {
        var match = line.match(/int\s+(\w+)\s*=\s*(.+);/);
        if (match) setVar(match[1], evalExpr(match[2]));
      } else if (line.indexOf('int ') === 0 && line.indexOf(';') !== -1) {
        var match = line.match(/int\s+(\w+);/);
        if (match) setVar(match[1], 0);
      } else if (line.indexOf('char ') === 0 && line.indexOf('=') !== -1) {
        var match = line.match(/char\s+(\w+)\s*=\s*'(.)';/);
        if (match) setVar(match[1], match[2].charCodeAt(0));
      } else if (line.indexOf('printf') === 0) {
        var match = line.match(/printf\s*\(\s*"?([^"]*)"?\s*(,\s*([^,]+))?\s*\)\s*;/);
        if (match) {
          var fmt = match[1].replace(/\\n/g, '\n');
          var arg = match[4] ? evalExpr(match[4]) : 0;
          printf(fmt, arg);
        }
      } else if (line.indexOf('scanf') === 0) {
        var match = line.match(/scanf\s*\(\s*"%d"\s*,\s*(&\w+)\s*\)\s*;/);
        if (match) scanf('%d', match[1]);
      }
    }

    for (var j = 0; j < lines.length; j++) {
      executeLine(lines[j]);
    }
    return result.join('\n').trim();
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

function compareOutputs(expected, actual) {
  var exp = expected.trim().split('\n').map(function(s) { return s.trim(); });
  var act = actual.trim().split('\n').map(function(s) { return s.trim(); });
  if (exp.length !== act.length) return false;
  for (var i = 0; i < exp.length; i++) {
    if (exp[i] !== act[i]) return false;
  }
  return true;
}

function formatExpected(expected) {
  if (Array.isArray(expected)) {
    return expected.join('\n');
  }
  return String(expected || '');
}

function postJson(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(function(response) {
    if (!response.ok) throw new Error('Network error: ' + response.status);
    return response.json();
  });
}

function showRunResult(result) {
  var outputEl = document.getElementById('output');
  if (!outputEl) return;
  if (result.status === 'compile-error') {
    outputEl.textContent = result.stderr || result.stdout || '컴파일 오류가 발생했습니다.';
    outputEl.classList.add('is-error');
    outputEl.classList.remove('is-mock');
  } else if (result.status === 'runtime-error') {
    outputEl.textContent = result.stderr || '실행 중 오류가 발생했습니다.';
    outputEl.classList.add('is-error');
    outputEl.classList.remove('is-mock');
  } else {
    outputEl.textContent = result.stdout || '출력 없음';
    outputEl.classList.remove('is-error');
    outputEl.classList.add('is-mock');
  }
}

function runCodeHandler() {
  if (!currentProblem) return;
  var code = document.getElementById('code-input') ? document.getElementById('code-input').value : '';
  var expected = formatExpected(currentProblem.readme.stmt[4]);
  var input = Array.isArray(currentProblem.readme.stmt[3]) ? currentProblem.readme.stmt[3].join(' ') : String(currentProblem.readme.stmt[3] || '');

  postJson('/api/run', { code: code, stdin: input }).then(function(result) {
    if (result.status === 'compile-error' || result.status === 'runtime-error') {
      showRunResult(result);
    } else {
      showRunResult(result);
      if (compareOutputs(expected, result.stdout || '')) {
        markSolved();
      }
    }
  }).catch(function() {
    var output = runCode(code, input);
    var outputEl = document.getElementById('output');
    if (outputEl) {
      outputEl.textContent = output;
      outputEl.classList.remove('is-placeholder');
      if (output.indexOf('Error:') === 0) {
        outputEl.classList.add('is-error');
      } else {
        outputEl.classList.add('is-mock');
      }
    }
    if (compareOutputs(expected, output)) {
      markSolved();
    }
  }).finally(function() {
    stats.totalRuns++;
    var hour = new Date().getHours();
    if (hour >= 22 || hour < 5) stats.nightRuns++;
    if (hour >= 5 && hour < 9) stats.morningRuns++;

    checkAchievements();
    saveStats();
  });
}

function showProblem(id) {
  var problem = null;
  for (var i = 0; i < PROBLEMS.length; i++) {
    if (PROBLEMS[i].id === id) {
      problem = PROBLEMS[i];
      break;
    }
  }
  if (!problem) return;
  currentProblem = problem;
  hintLevel = 0;

  var saved = localStorage.getItem('code_' + id);
  userCode = saved || STARTER_TEMPLATE;

  document.getElementById('problem-title').textContent = problem.id + '. ' + problem.title;
  document.getElementById('problem-meta').textContent = problem.id + '번';

  var readmeBody = document.getElementById('readme-body');
  if (readmeBody) {
    readmeBody.innerHTML = '<p class="stmt-heading">문제</p><p>' + problem.readme.stmt[0] + '</p>' +
      '<p class="stmt-heading">입력</p><p>' + problem.readme.stmt[1] + '</p>' +
      '<p class="stmt-heading">출력</p><p>' + problem.readme.stmt[2] + '</p>';
    if (problem.readme.stmt[3]) {
      readmeBody.innerHTML += '<p class="stmt-heading">입출력 예</p><pre><code>입력: ' + problem.readme.stmt[3] + '\n출력: ' + problem.readme.stmt[4] + '</code></pre>';
    }
  }

  var tagsEl = document.getElementById('problem-tags');
  if (tagsEl) {
    var tagsHtml = '';
    for (var t = 0; t < problem.tags.length; t++) {
      tagsHtml += '<span class="tag">' + problem.tags[t] + '</span>';
    }
    tagsEl.innerHTML = tagsHtml;
  }

  var shareLink = document.getElementById('lesson-share-link');
  if (shareLink) shareLink.href = '#' + id;

  var codeInput = document.getElementById('code-input');
  if (codeInput) {
    codeInput.value = userCode;
    updateLineNumbers();
  }

  var hintText = document.getElementById('hint-text-display');
  if (hintText) hintText.textContent = '힌트가 여기에 표시됩니다';

  var outputEl = document.getElementById('output');
  if (outputEl) outputEl.textContent = '백엔드 연결 후 여기에 결과가 나옵니다.';

  loadNotes(id);
}

function updateLineNumbers() {
  var codeInput = document.getElementById('code-input');
  var lineGutter = document.getElementById('line-gutter');
  if (!codeInput || !lineGutter) return;

  var lines = codeInput.value.split('\n');
  var nums = [];
  for (var i = 0; i < lines.length; i++) {
    nums.push(i + 1);
  }
  lineGutter.textContent = nums.join('\n');
}

function saveCode() {
  if (!currentProblem) return;
  var codeInput = document.getElementById('code-input');
  if (!codeInput) return;

  userCode = codeInput.value;
  localStorage.setItem('code_' + currentProblem.id, userCode);

  var indicator = document.getElementById('save-indicator');
  if (indicator) {
    indicator.textContent = '저장됨';
    indicator.classList.add('is-saving');
    setTimeout(function() {
      indicator.textContent = '저장됨';
      indicator.classList.remove('is-saving');
    }, 1500);
  }
}

function runCodeHandler() {
  if (!currentProblem) return;
  var code = document.getElementById('code-input') ? document.getElementById('code-input').value : '';
  var output = runCode(code, '');
  var outputEl = document.getElementById('output');

  if (outputEl) {
    outputEl.textContent = output;
    outputEl.classList.remove('is-placeholder');
    if (output.indexOf('Error:') === 0) {
      outputEl.classList.add('is-error');
    } else {
      outputEl.classList.add('is-mock');
    }
  }

  stats.totalRuns++;
  var hour = new Date().getHours();
  if (hour >= 22 || hour < 5) stats.nightRuns++;
  if (hour >= 5 && hour < 9) stats.morningRuns++;

  checkAchievements();
  saveStats();

  var expected = currentProblem.readme.stmt[4];
  if (compareOutputs(expected, output)) {
    markSolved();
  }
}

function showEncouragingMessage() {
  var msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
  var popup = document.getElementById('achievement-popup');
  var icon = document.getElementById('achievement-popup-icon');
  var title = document.getElementById('achievement-popup-title');
  var desc = document.getElementById('achievement-popup-desc');
  var xp = document.getElementById('achievement-popup-xp');

  if (popup && icon && title && desc && xp) {
    icon.textContent = '🎉';
    title.textContent = '오늘의 격려';
    desc.textContent = msg.text;
    xp.textContent = '';
    popup.hidden = false;
    popup.classList.add('is-visible');

    setTimeout(function() {
      popup.classList.remove('is-visible');
      setTimeout(function() { popup.hidden = true; }, 300);
    }, 2500);
  }
}

function showLearningTip() {
  var tip = LEARNING_TIPS[Math.floor(Math.random() * LEARNING_TIPS.length)];
  var toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = '💡 ' + tip;
    toast.className = 'toast is-tip';
    toast.hidden = false;
    setTimeout(function() { toast.hidden = true; }, 4000);
  }
}

function markSolved() {
  if (!currentProblem) return;
  if (stats.solvedProblems.indexOf(currentProblem.id) === -1) {
    stats.solvedProblems.push(currentProblem.id);
    stats.solved++;
    stats.xp += 10;

    if (currentProblem.tier === 'bronze') stats.bronze++;
    else if (currentProblem.tier === 'silver') stats.silver++;
    else if (currentProblem.tier === 'gold') stats.gold++;

    saveStats();
    updateStatsUI();
    checkAchievements();
    showToast('정답! +10 XP', 'ok');

    if (stats.solved % 3 === 0 || stats.solved === 1) {
      setTimeout(function() { showEncouragingMessage(); }, 500);
    }
    if (Math.random() < 0.3) {
      setTimeout(function() { showLearningTip(); }, 3000);
    }
  }
}

function showHint() {
  if (!currentProblem) return;
  var panel = document.getElementById('hint-panel');
  if (panel) {
    panel.hidden = false;
    panel.classList.remove('is-hidden');
  }

  if (hintLevel < currentProblem.hints.length) {
    hintLevel++;
    var hintText = document.getElementById('hint-text-display');
    var hintBadge = document.getElementById('hint-level-badge');
    if (hintText) hintText.textContent = '[' + hintLevel + '/' + currentProblem.hints.length + '] ' + currentProblem.hints[hintLevel - 1];
    if (hintBadge) hintBadge.textContent = hintLevel + '단계';
  }
}

function resetCode() {
  if (!currentProblem) return;
  var codeInput = document.getElementById('code-input');
  if (codeInput) {
    codeInput.value = STARTER_TEMPLATE;
    userCode = STARTER_TEMPLATE;
    localStorage.removeItem('code_' + currentProblem.id);
    updateLineNumbers();
  }
  var outputEl = document.getElementById('output');
  if (outputEl) {
    outputEl.textContent = '백엔드 연결 후 여기에 결과가 나옵니다.';
    outputEl.classList.remove('is-error', 'is-mock');
  }
}

function showToast(message, type) {
  var toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.className = 'toast';
    if (type) toast.classList.add('is-' + type);
    toast.hidden = false;
    setTimeout(function() { toast.hidden = true; }, 2500);
  }
}

function startQuiz() {
  currentQuizIndex = Math.floor(Math.random() * QUIZ_QUESTIONS.length);
  showQuizQuestion();
  var panel = document.getElementById('quiz-panel');
  if (panel) panel.hidden = false;
}

function showQuizQuestion() {
  var q = QUIZ_QUESTIONS[currentQuizIndex];
  var codeEl = document.getElementById('quiz-code');
  var optionsEl = document.getElementById('quiz-options');
  var resultEl = document.getElementById('quiz-result');

  if (codeEl) codeEl.textContent = q.code;
  if (resultEl) {
    resultEl.textContent = '';
    resultEl.className = 'quiz-result';
  }

  if (optionsEl) {
    var html = '';
    for (var i = 0; i < q.options.length; i++) {
      html += '<div class="quiz-option" data-index="' + i + '"><div class="quiz-option-radio"></div><span>' + q.options[i] + '</span></div>';
    }
    optionsEl.innerHTML = html;

    var options = optionsEl.querySelectorAll('.quiz-option');
    for (var j = 0; j < options.length; j++) {
      options[j].addEventListener('click', (function(idx) {
        return function() { checkQuizAnswer(idx); };
      })(j));
    }
  }
}

function checkQuizAnswer(selected) {
  var q = QUIZ_QUESTIONS[currentQuizIndex];
  var resultEl = document.getElementById('quiz-result');
  var optionsEl = document.querySelectorAll('.quiz-option');

  for (var i = 0; i < optionsEl.length; i++) {
    optionsEl[i].classList.remove('is-selected');
    if (i === q.correct) optionsEl[i].classList.add('is-correct');
    else if (i === selected && selected !== q.correct) optionsEl[i].classList.add('is-wrong');
  }

  if (selected === q.correct) {
    if (resultEl) {
      resultEl.textContent = '정답! 🎉';
      resultEl.classList.add('is-correct');
    }
    stats.quizCorrect++;
    stats.xp += 5;
  } else {
    if (resultEl) {
      resultEl.textContent = '오답...';
      resultEl.classList.add('is-wrong');
    }
  }
  stats.quizTotal++;
  checkAchievements();
  saveStats();
  updateStatsUI();
}

function nextQuiz() {
  currentQuizIndex = (currentQuizIndex + 1) % QUIZ_QUESTIONS.length;
  showQuizQuestion();
}

function showConceptTree() {
  var modal = document.getElementById('concept-modal');
  var tree = document.getElementById('concept-tree');
  if (!modal || !tree) return;

  var html = '';
  for (var i = 0; i < CONCEPT_TREE.length; i++) {
    var node = CONCEPT_TREE[i];
    var statusText = node.status === 'learned' ? '완료' : node.status === 'learning' ? '학습중' : '잠김';
    var statusClass = node.status === 'learned' ? 'is-learned' : node.status === 'learning' ? 'is-learning' : 'is-locked';
    html += '<div class="concept-node"><div class="concept-node-icon">' + node.icon + '</div><div class="concept-node-info"><div class="concept-node-title">' + node.title + '</div><div class="concept-node-desc">' + node.desc + '</div></div><span class="concept-node-status ' + statusClass + '">' + statusText + '</span></div>';
  }
  tree.innerHTML = html;

  modal.hidden = false;
}

function showNotes() {
  var panel = document.getElementById('notes-panel');
  if (panel) panel.hidden = false;
  loadNotes(currentProblem ? currentProblem.id : null);
}

function loadNotes(problemId) {
  if (!problemId) return;
  var textarea = document.getElementById('notes-textarea');
  if (textarea) {
    textarea.value = stats.notes[problemId] || '';
  }
}

function saveNotes() {
  if (!currentProblem) return;
  var textarea = document.getElementById('notes-textarea');
  if (textarea) {
    stats.notes[currentProblem.id] = textarea.value;
    saveStats();
    showToast('메모를 저장했습니다');
  }
}

function initVizPanel() {
  var panel = document.getElementById('viz-panel');
  if (panel) {
    panel.hidden = false;
    panel.classList.remove('is-hidden');
  }
  stats.vizUses++;
  checkAchievements();
  saveStats();
}

function renderVizStep(step, code, vars) {
  var watchesEl = document.getElementById('viz-watches-list');
  var memoryEl = document.getElementById('viz-memory-view');
  var stackEl = document.getElementById('viz-callstack');
  var outputEl = document.getElementById('viz-output');
  var codeViewEl = document.getElementById('viz-code-view');
  var stepCountEl = document.getElementById('viz-step-count');

  if (stepCountEl) stepCountEl.textContent = '줄 ' + (step + 1) + '/' + code.split('\n').length;

  if (watchesEl) {
    var varsHtml = '';
    var entries = Object.keys(vars);
    for (var i = 0; i < entries.length; i++) {
      varsHtml += '<div class="watch-item ' + (step > 0 ? 'is-changed' : '') + '"><span class="watch-name">' + entries[i] + '</span><span class="watch-type">int</span><span class="watch-value">' + vars[entries[i]] + '</span></div>';
    }
    if (!varsHtml) varsHtml = '<div class="watch-item"><span class="watch-name">-</span></div>';
    watchesEl.innerHTML = varsHtml;
  }

  if (memoryEl) {
    var memHtml = '';
    var keys = Object.keys(vars);
    for (var i = 0; i < keys.length; i++) {
      memHtml += '<div class="mem-block"><div class="mem-block-header"><span class="mem-block-name">' + keys[i] + '</span><span class="mem-block-addr">0x' + (0x1000 + i * 4).toString(16) + '</span></div><div class="mem-cells"><div class="mem-cell is-active"><span class="mem-index">0</span>' + vars[keys[i]] + '</div></div></div>';
    }
    if (!memHtml) memHtml = '<div class="mem-block"><div class="mem-block-header"><span class="mem-block-name">-</span></div></div>';
    memoryEl.innerHTML = memHtml;
  }

  if (stackEl) {
    var locals = '';
    var kvs = Object.keys(vars);
    for (var i = 0; i < kvs.length; i++) {
      locals += (locals ? ', ' : '') + kvs[i] + '=' + vars[kvs[i]];
    }
    if (!locals) locals = '없음';
    stackEl.innerHTML = '<div class="stack-frame is-active"><span class="stack-frame-name">main()</span><span class="stack-frame-locals">' + locals + '</span></div>';
  }

  if (outputEl) {
    var output = runCode(code, '');
    outputEl.textContent = output || '출력 없음';
  }

  if (codeViewEl) {
    var lines = code.split('\n');
    var codeHtml = '';
    for (var i = 0; i < lines.length; i++) {
      var cls = i === step ? 'is-current' : i < step ? 'is-executed' : 'is-next';
      codeHtml += '<span class="viz-code-line ' + cls + '">' + (lines[i] || ' ') + '</span>';
    }
    codeViewEl.innerHTML = codeHtml;
  }
}

function startVizDebug() {
  if (!currentProblem) return;
  var code = document.getElementById('code-input') ? document.getElementById('code-input').value : '';
  var vars = {};
  var lines = code.split('\n');
  vizStep = 0;

  initVizPanel();

  if (vizInterval) clearInterval(vizInterval);
  vizInterval = setInterval(function() {
    if (vizStep < lines.length) {
      var line = lines[vizStep].trim();
      if (line.indexOf('int ') === 0 && line.indexOf('=') !== -1) {
        var match = line.match(/int\s+(\w+)\s*=\s*(.+);/);
        if (match) vars[match[1]] = eval(evalExpr(match[2]));
      }
      renderVizStep(vizStep, code, vars);
      vizStep++;
    } else {
      clearInterval(vizInterval);
    }
  }, 800);
}

function stepVizDebug() {
  if (!currentProblem) return;
  var code = document.getElementById('code-input') ? document.getElementById('code-input').value : '';
  var vars = {};
  var lines = code.split('\n');

  initVizPanel();

  if (vizStep < lines.length) {
    var line = lines[vizStep].trim();
    if (line.indexOf('int ') === 0 && line.indexOf('=') !== -1) {
      var match = line.match(/int\s+(\w+)\s*=\s*(.+);/);
      if (match) vars[match[1]] = eval(evalExpr(match[2]));
    }
    renderVizStep(vizStep, code, vars);
    vizStep++;
  }
}

function resetVizDebug() {
  vizStep = 0;
  if (!currentProblem) return;
  var code = document.getElementById('code-input') ? document.getElementById('code-input').value : '';
  renderVizStep(0, code, {});
}

function evalExpr(expr) {
  expr = expr.trim();
  if (expr.indexOf('+') !== -1 && expr.indexOf('++') === -1) {
    var parts = expr.split('+');
    return evalExpr(parts[0]) + evalExpr(parts[1]);
  }
  if (expr.indexOf('-') !== -1 && expr.indexOf(' ') !== -1) {
    var parts = expr.split('-');
    return evalExpr(parts[0]) - evalExpr(parts[1]);
  }
  if (expr.indexOf('*') !== -1) {
    var parts = expr.split('*');
    return evalExpr(parts[0]) * evalExpr(parts[1]);
  }
  if (/^\d+$/.test(expr)) return parseInt(expr);
  return 0;
}

function populateProblemList() {
  var list = document.getElementById('problem-list');
  if (!list) return;

  var html = '';
  for (var i = 0; i < PROBLEMS.length; i++) {
    var p = PROBLEMS[i];
    html += '<li><a class="lesson-btn lesson-btn-link tier-' + p.tier + '" href="#' + p.id + '" data-problem-id="' + p.id + '"><span>' + p.id + '. ' + p.title + '</span><span class="sub">' + p.difficulty + '</span></a></li>';
  }
  list.innerHTML = html;

  var countLabel = document.getElementById('problem-count-label');
  if (countLabel) countLabel.textContent = '(' + PROBLEMS.length + ')';
}

function populateHomeGrid() {
  var grid = document.getElementById('home-all-problems');
  if (!grid) return;

  var html = '';
  for (var i = 0; i < PROBLEMS.length; i++) {
    var p = PROBLEMS[i];
    var badge = stats.solvedProblems.indexOf(p.id) !== -1 ? '<span class="home-card-badge">✓ 푼 문제</span>' : '';
    html += '<a class="home-card tier-' + p.tier + '" href="#' + p.id + '">' + badge + '<div class="home-card-no">#' + p.id + '</div><div class="home-card-title">' + p.title + '</div><div class="home-card-meta">' + p.difficulty + '</div></a>';
  }
  grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  loadStats();
  populateProblemList();
  populateHomeGrid();

  var hash = window.location.hash.slice(1);
  var found = false;
  for (var i = 0; i < PROBLEMS.length; i++) {
    if (PROBLEMS[i].id === hash) {
      found = true;
      break;
    }
  }
  if (hash && found) {
    showProblem(hash);
  } else {
    var viewHome = document.getElementById('view-home');
    var viewProblem = document.getElementById('view-problem');
    if (viewHome) viewHome.classList.remove('is-hidden');
    if (viewProblem) viewProblem.setAttribute('hidden', '');
  }

  var btn = document.getElementById('btn-start');
  if (btn) btn.addEventListener('click', function() { window.location.hash = '#1000'; showProblem('1000'); });

  var btnCont = document.getElementById('btn-continue');
  if (btnCont) btnCont.addEventListener('click', function(e) { e.preventDefault(); window.location.hash = '#1000'; showProblem('1000'); });

  document.addEventListener('click', function(e) {
    var problemLink = e.target.closest('[data-problem-id]');
    if (problemLink) {
      e.preventDefault();
      var id = problemLink.getAttribute('data-problem-id');
      window.location.hash = '#' + id;
      showProblem(id);
    }
  });

  window.addEventListener('hashchange', function() {
    var h = window.location.hash.slice(1);
    var found = false;
    for (var i = 0; i < PROBLEMS.length; i++) {
      if (PROBLEMS[i].id === h) {
        found = true;
        break;
      }
    }
    if (h && found) {
      var viewHome = document.getElementById('view-home');
      var viewProblem = document.getElementById('view-problem');
      if (viewHome) { viewHome.classList.add('is-hidden'); viewHome.setAttribute('hidden', ''); }
      if (viewProblem) { viewProblem.classList.remove('is-hidden'); viewProblem.removeAttribute('hidden'); }
      showProblem(h);
    } else {
      var viewHome = document.getElementById('view-home');
      var viewProblem = document.getElementById('view-problem');
      if (viewHome) { viewHome.classList.remove('is-hidden'); viewHome.removeAttribute('hidden'); }
      if (viewProblem) { viewProblem.classList.add('is-hidden'); viewProblem.setAttribute('hidden', ''); }
    }
  });

  var codeInput = document.getElementById('code-input');
  if (codeInput) {
    codeInput.addEventListener('input', function() { updateLineNumbers(); saveCode(); });
    codeInput.addEventListener('scroll', function() {
      var lineGutter = document.getElementById('line-gutter');
      if (lineGutter) lineGutter.scrollTop = codeInput.scrollTop;
    });
  }

  var btnRun = document.getElementById('btn-run');
  if (btnRun) btnRun.addEventListener('click', runCodeHandler);

  var btnSubmit = document.getElementById('btn-submit');
  if (btnSubmit) btnSubmit.addEventListener('click', function() { runCodeHandler(); });

  var btnHint = document.getElementById('btn-hint');
  if (btnHint) btnHint.addEventListener('click', showHint);

  var hintClose = document.getElementById('hint-close');
  if (hintClose) hintClose.addEventListener('click', function() { var panel = document.getElementById('hint-panel'); if (panel) panel.setAttribute('hidden', ''); });

  var btnNextHint = document.getElementById('btn-next-hint');
  if (btnNextHint) btnNextHint.addEventListener('click', showHint);

  var btnReset = document.getElementById('btn-reset');
  if (btnReset) btnReset.addEventListener('click', resetCode);

  var btnMarkSolved = document.getElementById('btn-mark-solved');
  if (btnMarkSolved) btnMarkSolved.addEventListener('click', markSolved);

  var btnCopyCode = document.getElementById('btn-copy-code');
  if (btnCopyCode) btnCopyCode.addEventListener('click', function() {
    var code = document.getElementById('code-input') ? document.getElementById('code-input').value : '';
    navigator.clipboard.writeText(code).then(function() { showToast('코드를 클립보드에 복사했습니다'); });
  });

  var btnBookmark = document.getElementById('btn-bookmark');
  if (btnBookmark) btnBookmark.addEventListener('click', function(e) { e.target.classList.toggle('is-active'); showToast('북마크가 토글되었습니다'); });

  var btnShortcuts = document.getElementById('btn-shortcuts');
  if (btnShortcuts) btnShortcuts.addEventListener('click', function() {
    var backdrop = document.getElementById('modal-backdrop');
    if (backdrop) { backdrop.classList.remove('is-hidden'); backdrop.removeAttribute('hidden'); }
  });

  var modalClose = document.getElementById('modal-close');
  if (modalClose) modalClose.addEventListener('click', function() {
    var backdrop = document.getElementById('modal-backdrop');
    if (backdrop) { backdrop.classList.add('is-hidden'); backdrop.setAttribute('hidden', ''); }
  });

  var backdrop = document.getElementById('modal-backdrop');
  if (backdrop) backdrop.addEventListener('click', function(e) {
    if (e.target === e.currentTarget) { e.currentTarget.classList.add('is-hidden'); e.currentTarget.setAttribute('hidden', ''); }
  });

  var btnTheme = document.getElementById('btn-theme');
  if (btnTheme) btnTheme.addEventListener('click', function() {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    var btn = document.getElementById('btn-theme');
    if (btn) btn.textContent = current === 'dark' ? '라이트 모드' : '다크 모드';
  });

  var btnFontUp = document.getElementById('btn-font-up');
  if (btnFontUp) btnFontUp.addEventListener('click', function() {
    var code = document.getElementById('code-input');
    if (code) { var size = parseInt(getComputedStyle(code).fontSize) + 1; code.style.fontSize = Math.min(size, 20) + 'px'; }
  });

  var btnFontDown = document.getElementById('btn-font-down');
  if (btnFontDown) btnFontDown.addEventListener('click', function() {
    var code = document.getElementById('code-input');
    if (code) { var size = parseInt(getComputedStyle(code).fontSize) - 1; code.style.fontSize = Math.max(size, 10) + 'px'; }
  });

  var btnVizToggle = document.getElementById('btn-viz-toggle');
  if (btnVizToggle) btnVizToggle.addEventListener('click', function() { initVizPanel(); });

  var btnVizPlay = document.getElementById('btn-viz-play');
  if (btnVizPlay) btnVizPlay.addEventListener('click', startVizDebug);

  var btnVizStep = document.getElementById('btn-viz-step');
  if (btnVizStep) btnVizStep.addEventListener('click', stepVizDebug);

  var btnVizReset = document.getElementById('btn-viz-reset');
  if (btnVizReset) btnVizReset.addEventListener('click', resetVizDebug);

  var btnClearOutput = document.getElementById('btn-clear-output');
  if (btnClearOutput) btnClearOutput.addEventListener('click', function() {
    var output = document.getElementById('output');
    if (output) { output.textContent = '백엔드 연결 후 여기에 결과가 나옵니다.'; output.classList.remove('is-error', 'is-mock'); output.classList.add('is-placeholder'); }
  });

  var btnCollapseAll = document.getElementById('btn-collapse-all');
  if (btnCollapseAll) btnCollapseAll.addEventListener('click', function() {
    var readme = document.getElementById('readme-body');
    if (readme) readme.classList.toggle('samples-collapsed');
  });

  var btnConceptTree = document.getElementById('btn-concept-tree');
  if (btnConceptTree) btnConceptTree.addEventListener('click', showConceptTree);

  var conceptModalClose = document.getElementById('concept-modal-close');
  if (conceptModalClose) conceptModalClose.addEventListener('click', function() { var modal = document.getElementById('concept-modal'); if (modal) modal.setAttribute('hidden', ''); });

  var btnQuiz = document.getElementById('btn-quiz');
  if (btnQuiz) btnQuiz.addEventListener('click', startQuiz);

  var quizNext = document.getElementById('quiz-next');
  if (quizNext) quizNext.addEventListener('click', nextQuiz);

  var btnNotes = document.getElementById('btn-notes');
  if (btnNotes) btnNotes.addEventListener('click', showNotes);

  var notesClose = document.getElementById('notes-close');
  if (notesClose) notesClose.addEventListener('click', function() { var panel = document.getElementById('notes-panel'); if (panel) panel.setAttribute('hidden', ''); });

  var notesSave = document.getElementById('notes-save');
  if (notesSave) notesSave.addEventListener('click', saveNotes);

  var achievementPopupClose = document.getElementById('achievement-popup-close');
  if (achievementPopupClose) achievementPopupClose.addEventListener('click', function() { var popup = document.getElementById('achievement-popup'); if (popup) popup.setAttribute('hidden', ''); });

  var btnAchievement = document.getElementById('btn-achievement');
  if (btnAchievement) btnAchievement.addEventListener('click', function() {
    showAllAchievements();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var el = document.getElementById('modal-backdrop'); if (el) el.setAttribute('hidden', '');
      el = document.getElementById('hint-panel'); if (el) el.setAttribute('hidden', '');
      el = document.getElementById('quiz-panel'); if (el) el.setAttribute('hidden', '');
      el = document.getElementById('concept-modal'); if (el) el.setAttribute('hidden', '');
      el = document.getElementById('notes-panel'); if (el) el.setAttribute('hidden', '');
      el = document.getElementById('achievement-popup'); if (el) el.setAttribute('hidden', '');
    }
    if (e.key === '?' && !e.target.closest('input, textarea')) {
      var backdrop = document.getElementById('modal-backdrop');
      if (backdrop) backdrop.classList.toggle('is-hidden');
    }
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); runCodeHandler(); }
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); saveCode(); showToast('저장했습니다'); }
  });

  var siteLink = document.getElementById('site-entry-link');
  if (siteLink) siteLink.textContent = window.location.href;

  initGrandFeatures();
});

/* ================================================
   GRAND EDITION — Daily challenge, streak heatmap,
   pomodoro, random problem, scroll-to-top, reveals.
   ================================================ */

function pickRandomProblem() {
  var p = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
  if (!p) return;
  window.location.hash = '#' + p.id;
  showToast('🎲 랜덤 문제: ' + p.id + '. ' + p.title, 'ok');
}

function getTodayKey() {
  var d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}

function getDailyChallenge() {
  var d = new Date();
  var seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  var idx = seed % PROBLEMS.length;
  return PROBLEMS[idx];
}

function renderDailyChallenge() {
  var p = getDailyChallenge();
  if (!p) return;
  var noEl = document.getElementById('today-card-no');
  var titleEl = document.getElementById('today-card-title');
  var tierEl = document.getElementById('today-card-tier');
  var tagsEl = document.getElementById('today-card-tags');
  var card = document.getElementById('today-card');
  if (noEl) noEl.textContent = '#' + p.id;
  if (titleEl) titleEl.textContent = p.title;
  if (tierEl) tierEl.textContent = p.difficulty;
  if (tagsEl) tagsEl.textContent = (p.tags || []).join(' · ');
  if (card) card.setAttribute('href', '#' + p.id);
}

function recordActivity() {
  if (!stats.activityLog) stats.activityLog = {};
  var key = getTodayKey();
  stats.activityLog[key] = (stats.activityLog[key] || 0) + 1;
  saveStats();
}

function computeStreaks() {
  if (!stats.activityLog) stats.activityLog = {};
  var keys = Object.keys(stats.activityLog).sort();
  var active = keys.length;
  if (active === 0) return { current: 0, longest: 0, active: 0 };

  var current = 0, longest = 0, run = 0;
  var prev = null;

  for (var i = 0; i < keys.length; i++) {
    var parts = keys[i].split('-').map(Number);
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    if (prev) {
      var diff = Math.round((d - prev) / 86400000);
      if (diff === 1) run++;
      else run = 1;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
    prev = d;
  }

  var today = new Date();
  today.setHours(0,0,0,0);
  var lastParts = keys[keys.length - 1].split('-').map(Number);
  var lastDate = new Date(lastParts[0], lastParts[1] - 1, lastParts[2]);
  var dayDiff = Math.round((today - lastDate) / 86400000);
  if (dayDiff <= 1) current = run; else current = 0;

  return { current: current, longest: longest, active: active };
}

function renderHeatmap() {
  var grid = document.getElementById('streak-heatmap');
  if (!grid) return;
  if (!stats.activityLog) stats.activityLog = {};

  var weeks = 26;
  var totalDays = weeks * 7;
  var today = new Date();
  today.setHours(0,0,0,0);

  var dayOfWeek = today.getDay();
  var startOffset = totalDays - 1 - dayOfWeek;
  var html = '';
  for (var i = 0; i < totalDays; i++) {
    var d = new Date(today);
    d.setDate(today.getDate() - (totalDays - 1 - i));
    var key = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    var count = stats.activityLog[key] || 0;
    var level = 0;
    if (count >= 1) level = 1;
    if (count >= 3) level = 2;
    if (count >= 6) level = 3;
    if (count >= 10) level = 4;
    var label = key + ' · ' + count + '회';
    html += '<span class="heatmap-cell ' + (level ? 'l' + level : '') + '" title="' + label + '"></span>';
  }
  grid.innerHTML = html;

  var s = computeStreaks();
  var cur = document.getElementById('streak-current');
  var lon = document.getElementById('streak-longest');
  var act = document.getElementById('streak-active');
  if (cur) cur.textContent = s.current;
  if (lon) lon.textContent = s.longest;
  if (act) act.textContent = s.active;

  stats.streak = Math.max(stats.streak || 0, s.current);
}

/* ----- Pomodoro ----- */
var pomo = { mins: 25, secs: 0, running: false, interval: null, total: 25 * 60, mode: '집중 시간' };

function pomoUpdateDisplay() {
  var disp = document.getElementById('pomodoro-display');
  var mode = document.getElementById('pomodoro-mode');
  var progress = document.getElementById('pomodoro-progress');
  if (disp) disp.textContent = String(pomo.mins).padStart(2, '0') + ':' + String(pomo.secs).padStart(2, '0');
  if (mode) mode.textContent = pomo.mode;
  if (progress) {
    var remaining = pomo.mins * 60 + pomo.secs;
    var ratio = pomo.total > 0 ? remaining / pomo.total : 0;
    progress.style.strokeDashoffset = (283 * (1 - ratio)).toString();
  }
}

function pomoToggle() {
  var btn = document.getElementById('pomodoro-toggle');
  if (pomo.running) {
    clearInterval(pomo.interval);
    pomo.running = false;
    if (btn) btn.textContent = '시작';
    return;
  }
  pomo.running = true;
  if (btn) btn.textContent = '일시정지';
  pomo.interval = setInterval(function() {
    if (pomo.secs === 0) {
      if (pomo.mins === 0) {
        clearInterval(pomo.interval);
        pomo.running = false;
        showToast('⏰ 뽀모도로 완료! 잠시 쉬어요', 'ok');
        if (btn) btn.textContent = '시작';
        return;
      }
      pomo.mins--;
      pomo.secs = 59;
    } else {
      pomo.secs--;
    }
    pomoUpdateDisplay();
  }, 1000);
}

function pomoReset(mins) {
  clearInterval(pomo.interval);
  pomo.running = false;
  pomo.mins = mins || 25;
  pomo.secs = 0;
  pomo.total = pomo.mins * 60;
  pomo.mode = mins === 5 ? '휴식 시간' : '집중 시간';
  var btn = document.getElementById('pomodoro-toggle');
  if (btn) btn.textContent = '시작';
  pomoUpdateDisplay();
}

/* ----- Init grand features ----- */
function initGrandFeatures() {
  renderDailyChallenge();
  renderHeatmap();
  pomoUpdateDisplay();

  // Top nav scroll state
  var topnav = document.getElementById('topnav');
  var scrollTop = document.getElementById('scroll-top');
  window.addEventListener('scroll', function() {
    var y = window.scrollY;
    if (topnav) topnav.classList.toggle('is-scrolled', y > 8);
    if (scrollTop) {
      if (y > 400) scrollTop.removeAttribute('hidden');
      else scrollTop.setAttribute('hidden', '');
    }
  }, { passive: true });

  // Also watch the home view's internal scroll (since .view-home has its own scroll)
  var viewHome = document.getElementById('view-home');
  if (viewHome) {
    viewHome.addEventListener('scroll', function() {
      var y = viewHome.scrollTop;
      if (topnav) topnav.classList.toggle('is-scrolled', y > 8);
      if (scrollTop) {
        if (y > 400) scrollTop.removeAttribute('hidden');
        else scrollTop.setAttribute('hidden', '');
      }
    }, { passive: true });
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', function() {
      if (viewHome) viewHome.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Reveal-on-scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('is-revealed'); });
  }

  // Random problem
  var btnRandom = document.getElementById('btn-random');
  if (btnRandom) btnRandom.addEventListener('click', pickRandomProblem);
  var btnRandomSidebar = document.getElementById('btn-random-sidebar');
  if (btnRandomSidebar) btnRandomSidebar.addEventListener('click', pickRandomProblem);

  // Topnav start
  var btnTopnavStart = document.getElementById('btn-topnav-start');
  if (btnTopnavStart) btnTopnavStart.addEventListener('click', function() {
    window.location.hash = '#1000';
  });

  // CTA banner button
  var btnCtaBanner = document.getElementById('btn-cta-banner-start');
  if (btnCtaBanner) btnCtaBanner.addEventListener('click', function() {
    window.location.hash = '#1000';
  });

  // Pomodoro
  var btnPomo = document.getElementById('btn-pomodoro');
  var pomoPanel = document.getElementById('pomodoro-panel');
  var pomoClose = document.getElementById('pomodoro-close');
  var pomoToggleBtn = document.getElementById('pomodoro-toggle');
  var pomoResetBtn = document.getElementById('pomodoro-reset');
  if (btnPomo && pomoPanel) {
    btnPomo.addEventListener('click', function() {
      pomoPanel.hidden = !pomoPanel.hidden;
    });
  }
  if (pomoClose && pomoPanel) {
    pomoClose.addEventListener('click', function() { pomoPanel.hidden = true; });
  }
  if (pomoToggleBtn) pomoToggleBtn.addEventListener('click', pomoToggle);
  if (pomoResetBtn) pomoResetBtn.addEventListener('click', function() { pomoReset(pomo.total / 60); });

  document.querySelectorAll('.pomodoro-preset').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.pomodoro-preset').forEach(function(b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      pomoReset(parseInt(btn.getAttribute('data-min'), 10));
    });
  });

  // Hook into existing run handler to log activity + refresh heatmap
  var btnRunOrig = document.getElementById('btn-run');
  if (btnRunOrig) {
    btnRunOrig.addEventListener('click', function() {
      recordActivity();
      renderHeatmap();
    });
  }
}