/**
 * 안태주의 한자 준4급 기출 학습 & 오답 정복 클리닉 - 애플리케이션 메인 로직
 * - 제111회 가형 (정규 실전 기출 50문항 전수 학습)
 * - 제103회 가형 / 가-1형 (실전 기출 50문항 전수 학습)
 * - 제104회 (실전 기출 50문항 전수 학습)
 * - 제105회 (실전 기출 50문항 전수 학습)
 * - 제106회 (실전 기출 50문항 전수 학습)
 * - 제111회 (오답 26문항 집중 클리닉)
 */

// ==========================================
// 1. 회차별 데이터 및 전역 상태 관리 (State Management)
// ==========================================
const ROUNDS_CONFIG = {
  '111_full': {
    id: '111_full',
    title: '대한검정회 준4급 제111회 가형 실전 기출 (50문항)',
    badgePrefix: '제111회(50문항)',
    selectBadgeText: 'NEW',
    selectBadgeClass: 'round-badge new',
    allTabLabel: '전체 문제',
    confusedTabLabel: '훈음·자형 특훈',
    compoundTabLabel: '어휘·독음 특훈',
    flashcardTitle: '📖 제111회(가형) 준4급 핵심 50문항 단어장',
    getQuestions: () => (typeof QUIZ_DATA_111_FULL !== 'undefined' ? QUIZ_DATA_111_FULL : [])
  },
  '103': {
    id: '103',
    title: '대한검정회 준4급 제103회 가형 실전 기출 (50문항)',
    badgePrefix: '제103회(가)',
    selectBadgeText: 'NEW',
    selectBadgeClass: 'round-badge new',
    allTabLabel: '전체 문제',
    confusedTabLabel: '훈음·자형 특훈',
    compoundTabLabel: '어휘·독음 특훈',
    flashcardTitle: '📖 제103회(가형) 준4급 핵심 50문항 단어장',
    getQuestions: () => (typeof QUIZ_DATA_103 !== 'undefined' ? QUIZ_DATA_103 : [])
  },
  '103_1': {
    id: '103_1',
    title: '대한검정회 준4급 제103회 가-1형 실전 기출 (50문항)',
    badgePrefix: '제103회(가-1)',
    selectBadgeText: 'NEW',
    selectBadgeClass: 'round-badge new',
    allTabLabel: '전체 문제',
    confusedTabLabel: '훈음·자형 특훈',
    compoundTabLabel: '어휘·독음 특훈',
    flashcardTitle: '📖 제103회(가-1형) 준4급 핵심 50문항 단어장',
    getQuestions: () => (typeof QUIZ_DATA_103_1 !== 'undefined' ? QUIZ_DATA_103_1 : [])
  },
  '104': {
    id: '104',
    title: '대한검정회 준4급 제104회 실전 기출 (50문항)',
    badgePrefix: '제104회',
    selectBadgeText: '기출',
    selectBadgeClass: 'round-badge exam',
    allTabLabel: '전체 문제',
    confusedTabLabel: '훈음·자형 특훈',
    compoundTabLabel: '어휘·독음 특훈',
    flashcardTitle: '📖 제104회 준4급 핵심 50문항 단어장',
    getQuestions: () => (typeof QUIZ_DATA_104 !== 'undefined' ? QUIZ_DATA_104 : [])
  },
  '105': {
    id: '105',
    title: '대한검정회 준4급 제105회 실전 기출 (50문항)',
    badgePrefix: '제105회',
    selectBadgeText: '기출',
    selectBadgeClass: 'round-badge exam',
    allTabLabel: '전체 문제',
    confusedTabLabel: '훈음·자형 특훈',
    compoundTabLabel: '어휘·독음 특훈',
    flashcardTitle: '📖 제105회 준4급 핵심 50문항 단어장',
    getQuestions: () => (typeof QUIZ_DATA_105 !== 'undefined' ? QUIZ_DATA_105 : [])
  },
  '106': {
    id: '106',
    title: '대한검정회 준4급 제106회 실전 기출 (50문항)',
    badgePrefix: '제106회',
    selectBadgeText: '기출',
    selectBadgeClass: 'round-badge exam',
    allTabLabel: '전체 문제',
    confusedTabLabel: '훈음·자형 특훈',
    compoundTabLabel: '어휘·독음 특훈',
    flashcardTitle: '📖 제106회 준4급 핵심 50문항 단어장',
    getQuestions: () => (typeof QUIZ_DATA_106 !== 'undefined' ? QUIZ_DATA_106 : [])
  },
  '111': {
    id: '111',
    title: '대한검정회 준4급 제111회 오답 클리닉 (26문항)',
    badgePrefix: '제111회',
    selectBadgeText: '클리닉',
    selectBadgeClass: 'round-badge clinic',
    allTabLabel: '전체 오답',
    confusedTabLabel: '자형 혼동 특훈',
    compoundTabLabel: '어휘·독음 특훈',
    flashcardTitle: '📖 제111회 안태주 학생 전용 오답 26문항 단어장',
    getQuestions: () => (typeof QUIZ_DATA !== 'undefined' ? QUIZ_DATA : [])
  }
};

const COMPOUND_CATEGORIES = [
  '어휘 독음',
  '두음법칙',
  '다음자(多音字) 독음',
  '동음이의어',
  '어휘 의미',
  '낱말 한자 표기',
  '어휘의 짜임',
  '유의어',
  '반의어',
  '반의자(반대말)',
  '유의자(비슷한말)'
];

const state = {
  currentRound: '111_full',    // 기본 시작 회차: '111_full', '103', '103_1', '104', '105', '106', '111'
  currentMode: 'all',          // 'all', 'confused', 'compound', 'wrong_note', 'flashcards'
  activeQuestions: [],         // 현재 모드에서 풀고 있는 문제 배열
  currentIndex: 0,             // 현재 문제 인덱스
  score: 0,                    // 정답 수
  streak: 0,                   // 현재 연속 정답 수
  maxStreak: 0,                // 최고 연속 정답 수
  isAnswered: false,           // 현재 문제 제출 완료 여부
  soundEnabled: true,          // 효과음 활성화 여부
  missedInSession: [],         // 이번 세션에서 틀린 문제 목록
  sessionHistory: {},          // 현재 세션의 문항별 정오답 기록 { [number]: { selected, isCorrect } }
  reportFilter: 'all',         // 리포트 전체 문항 표 필터 ('all', 'unsolved_wrong', 'mastered', 'first_correct', 'unattempted')
  printOptions: {              // 프린트 전용 뷰(A4 요약장) 설정
    part: 'both',              // 'both'(Part 1+2 함께), 'part1'(Part 1만), 'part2'(Part 2만)
    scope: 'weak',             // 'weak'(핵심 오답·함정), 'confused'(짝꿍·자형 혼동), 'all'(전체 요약)
    maskAnswer: false          // false(훈음 표시: 보고 쓰기), true(훈음 빈칸: 외워 쓰기)
  },
  paperExamOptions: {          // 맞춤 종이 시험지 & 요점 노트 뷰 설정
    roundScope: 'current',     // 'current'(현재 회차 선택 문항만), 'all_rounds'(전 회차 선택 문항 통합)
    docType: 'exam_and_note',  // 'exam_and_note'(시험지+요점노트+정답표), 'exam_only'(시험지만), 'note_only'(요점노트만)
    numbering: 'original'      // 'original'(원래 문항 번호 유지), 'sequential'(1번부터 순번 부여)
  }
};

// ==========================================
// 2. LocalStorage 오답 노트 및 학습 데이터화(Telemetry) 관리 함수
// ==========================================
/**
 * 현재 회차의 로컬 스토리지 오답 노트 키를 반환합니다.
 */
function getWrongNoteStorageKey(roundId) {
  return `taeju_hanja_wrong_note_${roundId}`;
}

/**
 * 현재 회차의 누적 학습 텔레메트리(데이터화) 스토리지 키를 반환합니다.
 */
function getTelemetryStorageKey(roundId) {
  return `taeju_hanja_telemetry_${roundId}`;
}

/**
 * 저장된 오답 노트 기록({ [qNumber]: lastWrongOption })을 불러옵니다.
 */
function loadSavedWrongNote(roundId) {
  try {
    const raw = localStorage.getItem(getWrongNoteStorageKey(roundId));
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * 저장된 회차별 학습 텔레메트리 데이터를 불러옵니다.
 * 기존 오답 노트 기록이나 111회 종이 시험 기록과도 자연스럽게 동기화합니다.
 */
function loadRoundTelemetry(roundId) {
  try {
    const raw = localStorage.getItem(getTelemetryStorageKey(roundId));
    const telemetry = raw ? JSON.parse(raw) : {};
    const wrongMap = loadSavedWrongNote(roundId);

    // 기존 오답 노트에 저장되어 있으나 텔레메트리에 아직 없는 문항이 있다면 마이그레이션
    Object.keys(wrongMap).forEach(qNumStr => {
      const qNum = Number(qNumStr);
      if (!telemetry[qNum]) {
        telemetry[qNum] = {
          number: qNum,
          attempts: 1,
          correctCount: 0,
          wrongCount: 1,
          firstAttemptCorrect: false,
          lastIsCorrect: false,
          lastSelectedOption: wrongMap[qNum],
          wrongOptionsHistory: [wrongMap[qNum]],
          hintUsed: false,
          historyTrail: ['❌'],
          lastStudiedAt: new Date().toISOString()
        };
      }
    });

    return telemetry;
  } catch (e) {
    return {};
  }
}

/**
 * 회차별 학습 텔레메트리 데이터를 로컬 스토리지에 저장합니다.
 */
function saveRoundTelemetry(roundId, telemetry) {
  try {
    localStorage.setItem(getTelemetryStorageKey(roundId), JSON.stringify(telemetry));
  } catch (e) {
    // 스토리지 제한 시 무시
  }
}

/**
 * 학생이 문항을 풀었을 때 시도 횟수, 정오답 추이, 선택한 보기를 데이터화하여 누적 저장합니다.
 */
function recordQuestionAttempt(roundId, questionNumber, selectedOption, isCorrect) {
  const telemetry = loadRoundTelemetry(roundId);
  const existing = telemetry[questionNumber] || {
    number: questionNumber,
    attempts: 0,
    correctCount: 0,
    wrongCount: 0,
    firstAttemptCorrect: null,
    lastIsCorrect: null,
    lastSelectedOption: null,
    wrongOptionsHistory: [],
    hintUsed: false,
    historyTrail: [],
    lastStudiedAt: null
  };

  existing.attempts += 1;
  if (existing.attempts === 1 && existing.firstAttemptCorrect === null) {
    existing.firstAttemptCorrect = isCorrect;
  }

  if (isCorrect) {
    existing.correctCount += 1;
  } else {
    existing.wrongCount += 1;
    if (!existing.wrongOptionsHistory.includes(selectedOption)) {
      existing.wrongOptionsHistory.push(selectedOption);
    }
  }

  existing.lastIsCorrect = isCorrect;
  existing.lastSelectedOption = selectedOption;
  existing.historyTrail.push(isCorrect ? '⭕' : '❌');
  if (existing.historyTrail.length > 8) {
    existing.historyTrail = existing.historyTrail.slice(-8);
  }
  existing.lastStudiedAt = new Date().toISOString();

  telemetry[questionNumber] = existing;
  saveRoundTelemetry(roundId, telemetry);
}

/**
 * 학생이 특정 문항에서 '힌트 보기'를 열람했음을 학습 데이터에 기록합니다.
 */
function recordHintUsage(roundId, questionNumber) {
  const telemetry = loadRoundTelemetry(roundId);
  const existing = telemetry[questionNumber] || {
    number: questionNumber,
    attempts: 0,
    correctCount: 0,
    wrongCount: 0,
    firstAttemptCorrect: null,
    lastIsCorrect: null,
    lastSelectedOption: null,
    wrongOptionsHistory: [],
    hintUsed: false,
    historyTrail: [],
    lastStudiedAt: null
  };

  existing.hintUsed = true;
  existing.lastStudiedAt = new Date().toISOString();
  telemetry[questionNumber] = existing;
  saveRoundTelemetry(roundId, telemetry);
}

/**
 * 틀린 문항을 오답 노트에 기록하거나 정복한 문항을 갱신합니다.
 */
function saveWrongAttempt(roundId, questionNumber, selectedOption) {
  try {
    const wrongMap = loadSavedWrongNote(roundId);
    wrongMap[questionNumber] = selectedOption;
    localStorage.setItem(getWrongNoteStorageKey(roundId), JSON.stringify(wrongMap));
  } catch (e) {
    // 스토리지 제한 시 무시
  }
}

/**
 * 오답 노트 모드에서 정답을 맞혔을 때 오답 기록에서 제거합니다.
 */
function removeSolvedFromWrongNote(roundId, questionNumber) {
  try {
    const wrongMap = loadSavedWrongNote(roundId);
    if (wrongMap[questionNumber]) {
      delete wrongMap[questionNumber];
      localStorage.setItem(getWrongNoteStorageKey(roundId), JSON.stringify(wrongMap));
    }
  } catch (e) {
    // 스토리지 제한 시 무시
  }
}

// ==========================================
// 2.5. 맞춤형 종이 시험지 & 요점 노트 영구 금고 (Vault & IndexedDB 이중 백업)
// ==========================================
const PAPER_VAULT_STORAGE_KEY = 'taeju_hanja_paper_exam_vault_v1';
const PAPER_VAULT_BACKUP_KEY = 'taeju_hanja_paper_exam_vault_backup_v1';
const PAPER_IDB_NAME = 'TaejuHanjaPermanentDB';
const PAPER_IDB_STORE = 'paperVaultStore';

/**
 * 영구 보관소(Vault) 기본 구조를 생성합니다.
 */
function createDefaultPaperVault() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    selectedByRound: {
      '111_full': [],
      '103': [],
      '103_1': [],
      '104': [],
      '105': [],
      '106': [],
      '111': []
    },
    customNotes: {},     // { '103_14': '사용자가 직접 수정/추가한 나만의 한 줄 요점 메모' }
    savedExams: []       // [{ id, title, createdAt, selections: { '103': [1, 5] }, totalCount }]
  };
}

/**
 * 브라우저 영구 저장소(navigator.storage.persist) 권한을 요청하고 IndexedDB와 동기화합니다.
 */
function initPermanentPaperStorage() {
  try {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(() => {});
    }
  } catch (e) {
    // 무시
  }

  // 만약 localStorage가 비어 있는데 IndexedDB에 백업이 있다면 자동 복원
  restorePaperVaultFromIndexedDBIfNeeded();
}

/**
 * IndexedDB에 Vault 스냅샷을 비동기로 이중 백업합니다.
 */
function backupPaperVaultToIndexedDB(vaultData) {
  try {
    if (!window.indexedDB) return;
    const req = window.indexedDB.open(PAPER_IDB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(PAPER_IDB_STORE)) {
        db.createObjectStore(PAPER_IDB_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction(PAPER_IDB_STORE, 'readwrite');
      const store = tx.objectStore(PAPER_IDB_STORE);
      store.put({ id: 'main_vault', data: vaultData, savedAt: new Date().toISOString() });
    };
  } catch (e) {
    // IndexedDB 사용 불가 환경 무시
  }
}

/**
 * localStorage 데이터가 유실되었을 때 IndexedDB에서 자동으로 복구합니다.
 */
function restorePaperVaultFromIndexedDBIfNeeded() {
  try {
    const hasPrimary = localStorage.getItem(PAPER_VAULT_STORAGE_KEY);
    if (hasPrimary) return;
    if (!window.indexedDB) return;

    const req = window.indexedDB.open(PAPER_IDB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(PAPER_IDB_STORE)) {
        db.createObjectStore(PAPER_IDB_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(PAPER_IDB_STORE)) return;
      const tx = db.transaction(PAPER_IDB_STORE, 'readonly');
      const store = tx.objectStore(PAPER_IDB_STORE);
      const getReq = store.get('main_vault');
      getReq.onsuccess = () => {
        if (getReq.result && getReq.result.data) {
          const serialized = JSON.stringify(getReq.result.data);
          localStorage.setItem(PAPER_VAULT_STORAGE_KEY, serialized);
          localStorage.setItem(PAPER_VAULT_BACKUP_KEY, serialized);
          updateHeaderAndTabCounts();
        }
      };
    };
  } catch (e) {
    // 무시
  }
}

/**
 * 영구 보관소(Paper Vault) 데이터를 불러옵니다.
 */
function loadPaperVault() {
  try {
    const raw = localStorage.getItem(PAPER_VAULT_STORAGE_KEY) || localStorage.getItem(PAPER_VAULT_BACKUP_KEY);
    const base = createDefaultPaperVault();
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    return {
      ...base,
      ...parsed,
      selectedByRound: {
        ...base.selectedByRound,
        ...(parsed.selectedByRound || {})
      },
      customNotes: {
        ...(parsed.customNotes || {})
      },
      savedExams: Array.isArray(parsed.savedExams) ? parsed.savedExams : []
    };
  } catch (e) {
    return createDefaultPaperVault();
  }
}

/**
 * 영구 보관소(Paper Vault) 데이터를 localStorage(주/예비 키) 및 IndexedDB에 동시 저장합니다.
 */
function savePaperVault(vault) {
  try {
    vault.updatedAt = new Date().toISOString();
    // 각 회차 번호 오름차순 정렬 및 중복 제거
    Object.keys(vault.selectedByRound).forEach(rId => {
      const arr = Array.isArray(vault.selectedByRound[rId]) ? vault.selectedByRound[rId] : [];
      vault.selectedByRound[rId] = Array.from(new Set(arr.map(Number).filter(n => n > 0))).sort((a, b) => a - b);
    });
    const serialized = JSON.stringify(vault);
    localStorage.setItem(PAPER_VAULT_STORAGE_KEY, serialized);
    localStorage.setItem(PAPER_VAULT_BACKUP_KEY, serialized);
    backupPaperVaultToIndexedDB(vault);
  } catch (e) {
    // 스토리지 제한 시 무시
  }
}

/**
 * 특정 회차에서 종이 시험지용으로 선택된 문항 번호 배열을 반환합니다.
 */
function getSelectedPaperNumbers(roundId) {
  const vault = loadPaperVault();
  return vault.selectedByRound[roundId] || [];
}

/**
 * 전체 회차에 걸쳐 선택된 총 문항 수를 반환합니다.
 */
function getTotalSelectedPaperCount() {
  const vault = loadPaperVault();
  return Object.values(vault.selectedByRound).reduce(
    (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
    0
  );
}

/**
 * 특정 회차의 문항 번호를 종이 시험지 선택 목록에 토글(추가/제거)합니다.
 */
function togglePaperQuestionSelection(roundId, questionNumber, forceState = null) {
  const vault = loadPaperVault();
  const list = new Set(vault.selectedByRound[roundId] || []);
  const qNum = Number(questionNumber);

  const shouldAdd = forceState !== null ? forceState : !list.has(qNum);
  if (shouldAdd) {
    list.add(qNum);
  } else {
    list.delete(qNum);
  }

  vault.selectedByRound[roundId] = Array.from(list).sort((a, b) => a - b);
  savePaperVault(vault);
  updateHeaderAndTabCounts();
  return shouldAdd;
}

/**
 * 문항별 사용자 맞춤 요점 메모를 저장합니다.
 */
function saveCustomQuestionSummaryNote(roundId, questionNumber, noteText) {
  const vault = loadPaperVault();
  const key = `${roundId}_${questionNumber}`;
  const trimmed = (noteText || '').trim();
  if (trimmed) {
    vault.customNotes[key] = trimmed;
  } else {
    delete vault.customNotes[key];
  }
  savePaperVault(vault);
}

/**
 * 문항별 사용자 맞춤 요점 메모를 가져옵니다.
 */
function getCustomQuestionSummaryNote(roundId, questionNumber) {
  const vault = loadPaperVault();
  return vault.customNotes[`${roundId}_${questionNumber}`] || '';
}

// ==========================================
// 3. Web Audio API 사운드 합성기 (Synthesizer)
// ==========================================
let audioContext = null;

/**
 * 사용자 상호작용 시 AudioContext를 초기화합니다.
 */
function getAudioContext() {
  if (!audioContext) {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    if (AudioCtxClass) {
      audioContext = new AudioCtxClass();
    }
  }
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

/**
 * 지정된 주파수의 톤을 재생합니다.
 */
function playTone(frequency, type, duration, delay = 0) {
  if (!state.soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const startTime = ctx.currentTime + delay;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0.15, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

/**
 * 정답 효과음 (경쾌한 3화음 도-미-솔)
 */
function playSuccessSound() {
  playTone(523.25, 'sine', 0.15, 0);
  playTone(659.25, 'sine', 0.15, 0.08);
  playTone(783.99, 'sine', 0.25, 0.16);
}

/**
 * 오답 효과음 (부드러운 저음 비프)
 */
function playErrorSound() {
  playTone(220.00, 'triangle', 0.2, 0);
  playTone(196.00, 'triangle', 0.3, 0.1);
}

/**
 * 최종 완료 축하 팡파레
 */
function playFanfare() {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, index) => {
    playTone(freq, 'sine', 0.3, index * 0.12);
  });
}

// ==========================================
// 4. DOM 요소 캐싱
// ==========================================
const DOM = {
  roundSelect: document.getElementById('roundSelect'),
  roundSelectBadge: document.getElementById('roundSelectBadge'),
  examHeaderTitle: document.getElementById('examHeaderTitle'),
  tabAll: document.getElementById('tabAll'),
  tabConfused: document.getElementById('tabConfused'),
  tabCompound: document.getElementById('tabCompound'),
  tabWrongNote: document.getElementById('tabWrongNote'),
  tabFlashcard: document.getElementById('tabFlashcard'),
  tabReport: document.getElementById('tabReport'),
  tabPrintView: document.getElementById('tabPrintView'),
  tabPaperExam: document.getElementById('tabPaperExam'),
  countPaperSelected: document.getElementById('countPaperSelected'),
  tabAllLabel: document.getElementById('tabAllLabel'),
  tabConfusedLabel: document.getElementById('tabConfusedLabel'),
  tabCompoundLabel: document.getElementById('tabCompoundLabel'),
  countAll: document.getElementById('countAll'),
  countConfused: document.getElementById('countConfused'),
  countCompound: document.getElementById('countCompound'),
  countWrongNote: document.getElementById('countWrongNote'),
  streakCount: document.getElementById('streakCount'),
  soundToggle: document.getElementById('soundToggle'),
  soundIcon: document.getElementById('soundIcon'),
  quizMain: document.getElementById('quizMain'),
  flashcardsView: document.getElementById('flashcardsView'),
  flashcardsTitle: document.getElementById('flashcardsTitle'),
  reportView: document.getElementById('reportView'),
  reportRoundBadge: document.getElementById('reportRoundBadge'),
  reportTimestamp: document.getElementById('reportTimestamp'),
  reportMainTitle: document.getElementById('reportMainTitle'),
  reportSubtitle: document.getElementById('reportSubtitle'),
  reportKpiGrid: document.getElementById('reportKpiGrid'),
  reportGradeBadge: document.getElementById('reportGradeBadge'),
  reportFeedbackBody: document.getElementById('reportFeedbackBody'),
  reportCategoryTableBody: document.getElementById('reportCategoryTableBody'),
  reportWeakSection: document.getElementById('reportWeakSection'),
  reportWeakList: document.getElementById('reportWeakList'),
  reportAllQuestionsTableBody: document.getElementById('reportAllQuestionsTableBody'),
  reportTableFilters: document.getElementById('reportTableFilters'),
  btnPrintReport: document.getElementById('btnPrintReport'),
  btnDownloadMdReport: document.getElementById('btnDownloadMdReport'),
  btnDownloadJsonData: document.getElementById('btnDownloadJsonData'),
  btnResetTelemetry: document.getElementById('btnResetTelemetry'),
  btnStartWeakClinic: document.getElementById('btnStartWeakClinic'),
  openReportFromCompletionBtn: document.getElementById('openReportFromCompletionBtn'),
  btnOpenPaperExamFromReport: document.getElementById('btnOpenPaperExamFromReport'),
  btnOpenPrintViewFromReport: document.getElementById('btnOpenPrintViewFromReport'),
  printSheetView: document.getElementById('printSheetView'),
  paperExamView: document.getElementById('paperExamView'),
  paperTotalSelectedBadge: document.getElementById('paperTotalSelectedBadge'),
  btnSavePaperPreset: document.getElementById('btnSavePaperPreset'),
  btnExportPaperJson: document.getElementById('btnExportPaperJson'),
  btnImportPaperJson: document.getElementById('btnImportPaperJson'),
  btnDownloadPaperMd: document.getElementById('btnDownloadPaperMd'),
  paperJsonFileInput: document.getElementById('paperJsonFileInput'),
  paperCurrentRoundLabel: document.getElementById('paperCurrentRoundLabel'),
  paperCurrentRoundCount: document.getElementById('paperCurrentRoundCount'),
  btnPaperSelectWrong: document.getElementById('btnPaperSelectWrong'),
  btnPaperSelectConfused: document.getElementById('btnPaperSelectConfused'),
  btnPaperSelectAll: document.getElementById('btnPaperSelectAll'),
  btnPaperClearRound: document.getElementById('btnPaperClearRound'),
  paperDirectNumberInput: document.getElementById('paperDirectNumberInput'),
  btnApplyDirectNumbers: document.getElementById('btnApplyDirectNumbers'),
  paperNumGrid: document.getElementById('paperNumGrid'),
  paperPresetsBar: document.getElementById('paperPresetsBar'),
  paperPresetsList: document.getElementById('paperPresetsList'),
  paperScopeRoundGroup: document.getElementById('paperScopeRoundGroup'),
  paperDocTypeGroup: document.getElementById('paperDocTypeGroup'),
  paperNumberingGroup: document.getElementById('paperNumberingGroup'),
  btnPrintPaperExamOnly: document.getElementById('btnPrintPaperExamOnly'),
  btnPrintPaperNoteOnly: document.getElementById('btnPrintPaperNoteOnly'),
  btnPrintPaperCurrentView: document.getElementById('btnPrintPaperCurrentView'),
  paperExamA4Sheet: document.getElementById('paperExamA4Sheet'),
  quizPaperPickBtn: document.getElementById('quizPaperPickBtn'),
  printPartGroup: document.getElementById('printPartGroup'),
  printScopeGroup: document.getElementById('printScopeGroup'),
  printMaskGroup: document.getElementById('printMaskGroup'),
  btnBackToReportFromPrint: document.getElementById('btnBackToReportFromPrint'),
  btnPrintPart1Only: document.getElementById('btnPrintPart1Only'),
  btnPrintPart2Only: document.getElementById('btnPrintPart2Only'),
  btnExecutePrintSheet: document.getElementById('btnExecutePrintSheet'),
  printSheetRoundTag: document.getElementById('printSheetRoundTag'),
  printSheetModeTag: document.getElementById('printSheetModeTag'),
  printSheetTitle: document.getElementById('printSheetTitle'),
  printSheetSubtitle: document.getElementById('printSheetSubtitle'),
  printSheetDateRow: document.getElementById('printSheetDateRow'),
  printPart1Section: document.getElementById('printPart1Section'),
  printPart1Count: document.getElementById('printPart1Count'),
  printComparisonGrid: document.getElementById('printComparisonGrid'),
  printPart2Section: document.getElementById('printPart2Section'),
  printPart2Count: document.getElementById('printPart2Count'),
  printChecklistTableBody: document.getElementById('printChecklistTableBody'),
  printAnswerKeySection: document.getElementById('printAnswerKeySection'),
  printQuickAnswerKey: document.getElementById('printQuickAnswerKey'),
  completionView: document.getElementById('completionView'),
  completionTitle: document.getElementById('completionTitle'),
  completionSubtitle: document.getElementById('completionSubtitle'),
  progressStep: document.getElementById('progressStep'),
  jumpToggleBtn: document.getElementById('jumpToggleBtn'),
  questionJumpPanel: document.getElementById('questionJumpPanel'),
  jumpGrid: document.getElementById('jumpGrid'),
  scoreLive: document.getElementById('scoreLive'),
  progressBarFill: document.getElementById('progressBarFill'),
  quizCard: document.getElementById('quizCard'),
  qNumberBadge: document.getElementById('qNumberBadge'),
  qCategoryBadge: document.getElementById('qCategoryBadge'),
  qTypeBadge: document.getElementById('qTypeBadge'),
  hintTriggerBtn: document.getElementById('hintTriggerBtn'),
  hintBox: document.getElementById('hintBox'),
  hintContent: document.getElementById('hintContent'),
  hanjaChar: document.getElementById('hanjaChar'),
  hanjaPrompt: document.getElementById('hanjaPrompt'),
  previousMistakeBanner: document.getElementById('previousMistakeBanner'),
  optionsGrid: document.getElementById('optionsGrid'),
  prescriptionPanel: document.getElementById('prescriptionPanel'),
  prescriptionStatus: document.getElementById('prescriptionStatus'),
  statusIcon: document.getElementById('statusIcon'),
  statusTitle: document.getElementById('statusTitle'),
  statusSubtitle: document.getElementById('statusSubtitle'),
  rxAnalysis: document.getElementById('rxAnalysis'),
  rxComparisonWrap: document.getElementById('rxComparisonWrap'),
  comparisonCards: document.getElementById('comparisonCards'),
  prevQuestionBtn: document.getElementById('prevQuestionBtn'),
  nextQuestionBtn: document.getElementById('nextQuestionBtn'),
  flashcardsGrid: document.getElementById('flashcardsGrid'),
  finalScoreText: document.getElementById('finalScoreText'),
  finalCountText: document.getElementById('finalCountText'),
  finalCorrectCount: document.getElementById('finalCorrectCount'),
  finalWrongCount: document.getElementById('finalWrongCount'),
  finalMaxStreak: document.getElementById('finalMaxStreak'),
  retryWrongOnlyBtn: document.getElementById('retryWrongOnlyBtn'),
  restartQuizBtn: document.getElementById('restartQuizBtn'),
  confettiCanvas: document.getElementById('confettiCanvas')
};

// ==========================================
// 5. 회차 및 모드별 문제 필터링/초기화
// ==========================================
/**
 * 현재 선택된 회차의 전체 문항 배열을 가져옵니다.
 */
function getCurrentRoundDataset() {
  const cfg = ROUNDS_CONFIG[state.currentRound];
  return cfg ? cfg.getQuestions() : [];
}

/**
 * 상단 헤더와 탭의 문항 수 배지를 현재 회차에 맞게 갱신합니다.
 */
function updateHeaderAndTabCounts() {
  const cfg = ROUNDS_CONFIG[state.currentRound];
  const dataset = getCurrentRoundDataset();
  const wrongMap = loadSavedWrongNote(state.currentRound);
  const wrongNumbers = Object.keys(wrongMap).map(Number);

  DOM.examHeaderTitle.textContent = cfg.title;
  DOM.tabAllLabel.textContent = cfg.allTabLabel;
  DOM.tabConfusedLabel.textContent = cfg.confusedTabLabel;
  DOM.tabCompoundLabel.textContent = cfg.compoundTabLabel;
  DOM.flashcardsTitle.textContent = cfg.flashcardTitle;

  const confusedCount = dataset.filter(q => q.category === '자형 혼동').length;
  const compoundCount = dataset.filter(q => COMPOUND_CATEGORIES.includes(q.category)).length;
  const wrongNoteCount = dataset.filter(q => wrongNumbers.includes(q.number)).length;

  DOM.countAll.textContent = dataset.length;
  DOM.countConfused.textContent = confusedCount;
  DOM.countCompound.textContent = compoundCount;
  DOM.countWrongNote.textContent = wrongNoteCount;

  if (DOM.countPaperSelected) {
    const roundSelected = getSelectedPaperNumbers(state.currentRound).length;
    const totalSelected = getTotalSelectedPaperCount();
    DOM.countPaperSelected.textContent = roundSelected > 0 ? roundSelected : totalSelected;
  }
}

/**
 * 선택된 탭 모드에 맞춰 문제 목록을 필터링합니다.
 */
function filterQuestionsByMode(mode) {
  const dataset = getCurrentRoundDataset();

  if (mode === 'confused') {
    return dataset.filter(q => q.category === '자형 혼동');
  }
  if (mode === 'compound') {
    return dataset.filter(q => COMPOUND_CATEGORIES.includes(q.category));
  }
  if (mode === 'wrong_note') {
    const wrongMap = loadSavedWrongNote(state.currentRound);
    const wrongNumbers = Object.keys(wrongMap).map(Number);
    const filtered = dataset.filter(q => wrongNumbers.includes(q.number));
    return filtered.length > 0 ? filtered : [...dataset];
  }
  return [...dataset];
}

/**
 * 회차를 전환하고 첫 문제부터 시작합니다.
 */
function switchRound(roundId) {
  const cfg = ROUNDS_CONFIG[roundId];
  if (!cfg) return;
  state.currentRound = roundId;

  // 드롭다운 선택값 및 배지 동기화
  if (DOM.roundSelect) {
    DOM.roundSelect.value = roundId;
  }
  if (DOM.roundSelectBadge) {
    DOM.roundSelectBadge.textContent = cfg.selectBadgeText || '기출';
    DOM.roundSelectBadge.className = cfg.selectBadgeClass || 'round-badge exam';
  }

  // 만약 현재 맞춤시험지·요점노트 뷰가 열려 있다면 그대로 유지하고 해당 회차 번호판 갱신
  if (DOM.paperExamView && DOM.paperExamView.style.display === 'block') {
    updateHeaderAndTabCounts();
    renderPaperExamView();
    return;
  }

  // 탭을 기본 'all'로 리셋
  const tabs = [DOM.tabAll, DOM.tabConfused, DOM.tabCompound, DOM.tabWrongNote, DOM.tabFlashcard, DOM.tabReport, DOM.tabPrintView, DOM.tabPaperExam];
  tabs.forEach(t => {
    if (t) t.classList.remove('active');
  });
  DOM.tabAll.classList.add('active');

  updateHeaderAndTabCounts();
  initQuiz('all');
}

/**
 * 새로운 퀴즈 세션을 시작합니다.
 */
function initQuiz(mode = 'all') {
  state.currentMode = mode;
  updateHeaderAndTabCounts();

  // 오답 노트가 비어 있을 때 클릭한 경우 안내 후 전체 문제로 진행
  if (mode === 'wrong_note') {
    const wrongMap = loadSavedWrongNote(state.currentRound);
    if (Object.keys(wrongMap).length === 0) {
      alert('아직 오답 노트에 기록된 틀린 문제가 없습니다! 전체 문제를 풀면서 틀린 문제가 생기면 이곳에 자동으로 모아집니다.');
      DOM.tabWrongNote.classList.remove('active');
      DOM.tabAll.classList.add('active');
      state.currentMode = 'all';
    }
  }

  state.activeQuestions = filterQuestionsByMode(state.currentMode);
  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.maxStreak = 0;
  state.isAnswered = false;
  state.missedInSession = [];
  state.sessionHistory = {};

  // 뷰 전환
  DOM.quizMain.style.display = 'block';
  DOM.flashcardsView.style.display = 'none';
  if (DOM.reportView) DOM.reportView.style.display = 'none';
  if (DOM.printSheetView) DOM.printSheetView.style.display = 'none';
  if (DOM.paperExamView) DOM.paperExamView.style.display = 'none';
  DOM.completionView.style.display = 'none';
  DOM.questionJumpPanel.style.display = 'none';

  updateStreakDisplay();
  renderCurrentQuestion();
}

// ==========================================
// 6. 문항 렌더링 및 번호 빠른 이동 로직
// ==========================================
/**
 * 문항 번호 빠른 이동 그리드를 렌더링합니다.
 */
function renderJumpGrid() {
  DOM.jumpGrid.innerHTML = '';
  state.activeQuestions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'jump-num-btn';
    btn.textContent = `${q.number}번`;

    if (idx === state.currentIndex) {
      btn.classList.add('current');
    } else if (state.sessionHistory[q.number]) {
      btn.classList.add(
        state.sessionHistory[q.number].isCorrect ? 'answered-correct' : 'answered-wrong'
      );
    }

    btn.addEventListener('click', () => {
      state.currentIndex = idx;
      DOM.questionJumpPanel.style.display = 'none';
      renderCurrentQuestion();
    });

    DOM.jumpGrid.appendChild(btn);
  });
}

/**
 * 현재 인덱스의 문제를 화면에 표시합니다.
 */
function renderCurrentQuestion() {
  const question = state.activeQuestions[state.currentIndex];
  if (!question) {
    showCompletionScreen();
    return;
  }

  const cfg = ROUNDS_CONFIG[state.currentRound];
  state.isAnswered = false;
  DOM.quizCard.classList.remove('shake', 'correct-pulse');

  // 진행도 업데이트
  const currentNum = state.currentIndex + 1;
  const totalNum = state.activeQuestions.length;
  DOM.progressStep.textContent = `문제 ${currentNum} / ${totalNum} (#${question.number}번)`;
  DOM.scoreLive.textContent = `정답 ${state.score}개`;
  DOM.progressBarFill.style.width = `${(currentNum / totalNum) * 100}%`;

  // 메타 태그 업데이트
  DOM.qNumberBadge.textContent = `${cfg.badgePrefix} #${question.number}번`;
  DOM.qCategoryBadge.textContent = question.category || '핵심 문항';
  DOM.qTypeBadge.textContent = question.type;

  // 시험지 담기 버튼 상태 동기화
  syncQuizPaperPickButton(question.number);

  // 힌트 초기화
  DOM.hintBox.style.display = 'none';
  DOM.hintTriggerBtn.textContent = '💡 힌트 보기';
  DOM.hintContent.textContent = question.hint || '보기의 한자와 훈음을 꼼꼼히 비교해 보세요.';

  // 한자 히어로 영역
  renderHeroContent(question);

  // 이전 시험 실수 또는 안내 배너
  renderMistakeBanner(question);

  // 4지선다 보기 렌더링
  renderOptions(question);

  // 이전 문제 버튼 활성 여부
  if (DOM.prevQuestionBtn) {
    DOM.prevQuestionBtn.style.visibility = state.currentIndex > 0 ? 'visible' : 'hidden';
  }

  // 번호 이동 그리드 갱신
  renderJumpGrid();

  // 이미 이번 세션에서 풀었던 문제로 돌아온 경우 결과 복원, 아니면 숨김
  const prevHistory = state.sessionHistory[question.number];
  if (prevHistory) {
    restoreAnsweredState(question, prevHistory.selected, prevHistory.isCorrect);
  } else {
    DOM.prescriptionPanel.style.display = 'none';
  }
}

/**
 * 문제 유형에 따라 한자 히어로 영역을 알맞게 포맷팅합니다.
 */
function renderHeroContent(question) {
  if (question.hero_char && question.prompt) {
    DOM.hanjaChar.textContent = question.hero_char;
    DOM.hanjaPrompt.textContent = question.prompt;
    return;
  }

  if (question.type === '한자의 훈음') {
    DOM.hanjaChar.textContent = question.question;
    DOM.hanjaPrompt.textContent = '다음 한자의 올바른 훈(뜻)과 음(소리)을 고르시오.';
  } else if (question.type === '훈음에 맞는 한자') {
    DOM.hanjaChar.textContent = question.question;
    DOM.hanjaPrompt.textContent = '위 훈음에 알맞은 한자를 고르시오.';
  } else {
    DOM.hanjaChar.textContent = extractMainHanja(question);
    DOM.hanjaPrompt.textContent = question.question;
  }
}

/**
 * 문장형 문제에서 핵심 한자 어휘를 추출하여 상단에 강조 표시합니다.
 */
function extractMainHanja(question) {
  if (question.hero_char) {
    return question.hero_char;
  }
  const match = question.question.match(/[\u4E00-\u9FFF]+/);
  if (match) {
    return match[0];
  }
  return '漢';
}

/**
 * 회차 및 이전 오답 기록에 따라 안내 배너를 표시합니다.
 */
function renderMistakeBanner(question) {
  const wrongMap = loadSavedWrongNote(state.currentRound);
  const savedWrongOpt = wrongMap[question.number];

  // 1) 종이 시험지(111회)에서 틀린 기록이 있는 경우
  if (question.omr_marked && question.options[question.omr_marked - 1]) {
    const prevWrongOptionText = question.options[question.omr_marked - 1];
    DOM.previousMistakeBanner.className = 'previous-mistake-banner';
    DOM.previousMistakeBanner.style.display = 'flex';
    DOM.previousMistakeBanner.innerHTML = `
      <span class="warn-icon">⚠️</span>
      <span>지난 시험에서 안태주 학생이 고른 오답: <strong>${question.omr_marked}번 (${prevWrongOptionText})</strong> - 이번엔 바르게 맞춰보세요!</span>
    `;
    return;
  }

  // 2) 웹앱 학습 중 틀려서 오답 노트에 기록된 경우
  if (savedWrongOpt && question.options[savedWrongOpt - 1]) {
    const savedWrongText = question.options[savedWrongOpt - 1];
    DOM.previousMistakeBanner.className = 'previous-mistake-banner';
    DOM.previousMistakeBanner.style.display = 'flex';
    DOM.previousMistakeBanner.innerHTML = `
      <span class="warn-icon">⚠️</span>
      <span>이전 학습에서 틀렸던 문제입니다 (선택했던 답: <strong>${savedWrongOpt}번 ${savedWrongText}</strong>) - 이번엔 꼭 정복해 보세요!</span>
    `;
    return;
  }

  // 3) 신규 학습 문항 안내 배너
  const cfg = ROUNDS_CONFIG[state.currentRound];
  const roundLabel = cfg ? cfg.badgePrefix : `제${state.currentRound}회`;
  DOM.previousMistakeBanner.className = 'previous-mistake-banner info-banner';
  DOM.previousMistakeBanner.style.display = 'flex';
  DOM.previousMistakeBanner.innerHTML = `
    <span class="warn-icon">📘</span>
    <span><strong>${roundLabel} 실전 기출 #${question.number}번</strong> — 어려우면 오른쪽 위 <strong>[💡 힌트 보기]</strong>를 눌러 힌트를 확인해 보세요!</span>
  `;
}

/**
 * 4지선다 보기 버튼들을 렌더링합니다.
 */
function renderOptions(question) {
  DOM.optionsGrid.innerHTML = '';
  question.options.forEach((optText, index) => {
    const optionNumber = index + 1;
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.dataset.option = optionNumber;

    button.innerHTML = `
      <span class="option-num-badge">${optionNumber}</span>
      <span class="option-text">${optText}</span>
    `;

    button.addEventListener('click', () => handleOptionSelect(optionNumber));
    DOM.optionsGrid.appendChild(button);
  });
}

// ==========================================
// 7. 답안 판정 및 피드백 처리
// ==========================================
/**
 * 이미 풀었던 문제로 돌아왔을 때 버튼 및 처방전 상태를 복원합니다.
 */
function restoreAnsweredState(question, selectedOption, isCorrect) {
  state.isAnswered = true;
  const optionButtons = DOM.optionsGrid.querySelectorAll('.option-btn');
  optionButtons.forEach(btn => {
    btn.disabled = true;
    const btnOption = parseInt(btn.dataset.option, 10);
    if (btnOption === question.correct_answer) {
      btn.classList.add(isCorrect ? 'selected-correct' : 'highlight-correct');
    }
    if (!isCorrect && btnOption === selectedOption) {
      btn.classList.add('selected-wrong');
    }
  });
  renderPrescription(question, isCorrect, selectedOption, false);
}

/**
 * 사용자가 보기를 선택했을 때 정답을 판정하고 피드백을 제공합니다.
 */
function handleOptionSelect(selectedOption) {
  if (state.isAnswered) return;
  state.isAnswered = true;

  const question = state.activeQuestions[state.currentIndex];
  const isCorrect = (selectedOption === question.correct_answer);
  const optionButtons = DOM.optionsGrid.querySelectorAll('.option-btn');

  // 모든 보기 비활성화 및 색상 표시
  optionButtons.forEach(btn => {
    btn.disabled = true;
    const btnOption = parseInt(btn.dataset.option, 10);

    if (btnOption === question.correct_answer) {
      btn.classList.add(isCorrect ? 'selected-correct' : 'highlight-correct');
    }
    if (!isCorrect && btnOption === selectedOption) {
      btn.classList.add('selected-wrong');
    }
  });

  // 세션 기록 저장 및 영구 학습 텔레메트리(데이터화) 기록
  state.sessionHistory[question.number] = {
    selected: selectedOption,
    isCorrect: isCorrect
  };
  recordQuestionAttempt(state.currentRound, question.number, selectedOption, isCorrect);

  // 정오답 상태 반영
  if (isCorrect) {
    state.score++;
    state.streak++;
    if (state.streak > state.maxStreak) {
      state.maxStreak = state.streak;
    }
    removeSolvedFromWrongNote(state.currentRound, question.number);
    playSuccessSound();
    DOM.quizCard.classList.add('correct-pulse');

    if (state.streak >= 3 && state.streak % 3 === 0) {
      fireConfetti(30);
    }
  } else {
    state.streak = 0;
    state.missedInSession.push(question);
    saveWrongAttempt(state.currentRound, question.number, selectedOption);
    playErrorSound();
    DOM.quizCard.classList.add('shake');
  }

  updateHeaderAndTabCounts();
  updateStreakDisplay();
  renderJumpGrid();
  renderPrescription(question, isCorrect, selectedOption, true);
}

/**
 * 정오답 처방전 패널을 렌더링합니다.
 */
function renderPrescription(question, isCorrect, selectedOption, shouldScroll = true) {
  DOM.prescriptionPanel.style.display = 'block';

  if (isCorrect) {
    DOM.prescriptionStatus.className = 'prescription-header is-correct';
    DOM.statusIcon.textContent = '🎉';
    DOM.statusTitle.textContent = '정답입니다! 정확하게 알고 있네요!';
    DOM.statusSubtitle.textContent = `정답: ${question.correct_answer}번 (${question.options[question.correct_answer - 1]})`;
  } else {
    DOM.prescriptionStatus.className = 'prescription-header is-wrong';
    DOM.statusIcon.textContent = '💡';
    DOM.statusTitle.textContent = '아쉽네요! 오답 노트에 자동 저장되었습니다.';
    DOM.statusSubtitle.textContent = `태주의 선택: ${selectedOption}번 ➔ 실제 정답: ${question.correct_answer}번 (${question.options[question.correct_answer - 1]})`;
  }

  DOM.rxAnalysis.textContent = question.analysis || '글자의 형태와 부수의 쓰임을 다시 한번 비교해 보세요.';
  renderComparisonCards(question.comparison);

  if (shouldScroll) {
    DOM.prescriptionPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * 헷갈리는 짝꿍 한자 비교 카드를 표시합니다.
 */
function renderComparisonCards(comparisonList) {
  if (!comparisonList || comparisonList.length === 0) {
    DOM.rxComparisonWrap.style.display = 'none';
    return;
  }

  DOM.rxComparisonWrap.style.display = 'block';
  DOM.comparisonCards.innerHTML = '';

  comparisonList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'comp-card';
    card.innerHTML = `
      <div class="comp-char">${item.char}</div>
      <div class="comp-desc">${item.desc}</div>
    `;
    DOM.comparisonCards.appendChild(card);
  });
}

/**
 * 이전 문제로 이동합니다.
 */
function moveToPrevQuestion() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderCurrentQuestion();
  }
}

/**
 * 다음 문제로 이동합니다.
 */
function moveToNextQuestion() {
  state.currentIndex++;
  if (state.currentIndex < state.activeQuestions.length) {
    renderCurrentQuestion();
  } else {
    showCompletionScreen();
  }
}

/**
 * 연속 정답(스트릭) 표시를 갱신합니다.
 */
function updateStreakDisplay() {
  DOM.streakCount.textContent = state.streak;
}

// ==========================================
// 8. 퀴즈 완료 화면 처리
// ==========================================
/**
 * 모든 문제를 다 풀었을 때 최종 성적표를 표시합니다.
 */
function showCompletionScreen() {
  DOM.quizMain.style.display = 'none';
  DOM.flashcardsView.style.display = 'none';
  if (DOM.reportView) DOM.reportView.style.display = 'none';
  if (DOM.printSheetView) DOM.printSheetView.style.display = 'none';
  if (DOM.paperExamView) DOM.paperExamView.style.display = 'none';
  DOM.completionView.style.display = 'block';

  const cfg = ROUNDS_CONFIG[state.currentRound];
  const total = state.activeQuestions.length;
  const correct = state.score;
  const wrong = total - correct;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  DOM.completionTitle.textContent = `${cfg.badgePrefix} 학습 완료!`;
  DOM.completionSubtitle.textContent = `안태주 학생, 끝까지 집중해서 ${total}문항을 모두 풀었습니다!`;

  DOM.finalScoreText.textContent = `${percentage}%`;
  DOM.finalCountText.textContent = `${correct} / ${total} 정답`;
  DOM.finalCorrectCount.textContent = correct;
  DOM.finalWrongCount.textContent = wrong;
  DOM.finalMaxStreak.textContent = state.maxStreak;

  if (state.missedInSession.length > 0) {
    DOM.retryWrongOnlyBtn.style.display = 'inline-block';
    DOM.retryWrongOnlyBtn.textContent = `⚠️ 방금 틀린 ${state.missedInSession.length}문제만 다시 풀기`;
  } else {
    DOM.retryWrongOnlyBtn.style.display = 'none';
  }

  playFanfare();
  fireConfetti(100);
}

// ==========================================
// 9. 플래시카드 단어장 뷰 렌더링
// ==========================================
/**
 * 현재 회차의 문항들을 3D 회전 플래시카드로 렌더링합니다.
 */
function renderFlashcards() {
  DOM.quizMain.style.display = 'none';
  DOM.completionView.style.display = 'none';
  if (DOM.reportView) DOM.reportView.style.display = 'none';
  if (DOM.printSheetView) DOM.printSheetView.style.display = 'none';
  if (DOM.paperExamView) DOM.paperExamView.style.display = 'none';
  DOM.flashcardsView.style.display = 'block';

  DOM.flashcardsGrid.innerHTML = '';
  const dataset = getCurrentRoundDataset();
  const wrongMap = loadSavedWrongNote(state.currentRound);

  dataset.forEach(q => {
    const cardEl = document.createElement('div');
    cardEl.className = 'flip-card';

    const mainChar = extractMainHanja(q);
    const correctText = q.options[q.correct_answer - 1];
    let subNoteHtml = `<div class="back-mistake" style="color: #93C5FD;">유형: ${q.type}</div>`;

    if (q.omr_marked && q.options[q.omr_marked - 1]) {
      subNoteHtml = `<div class="back-mistake">태주의 이전 답: ${q.omr_marked}번 ${q.options[q.omr_marked - 1]}</div>`;
    } else if (wrongMap[q.number] && q.options[wrongMap[q.number] - 1]) {
      subNoteHtml = `<div class="back-mistake">오답 노트 기록: ${wrongMap[q.number]}번 ${q.options[wrongMap[q.number] - 1]}</div>`;
    }

    cardEl.innerHTML = `
      <div class="flip-card-inner">
        <!-- 앞면 -->
        <div class="flip-card-front">
          <span class="card-number">#${q.number}번 · ${q.type}</span>
          <div class="card-hanja">${mainChar}</div>
          <span class="card-instruction">클릭하여 정답 및 해설 확인 ➔</span>
        </div>
        <!-- 뒷면 -->
        <div class="flip-card-back">
          <div>
            <div class="back-correct-ans">정답: ${q.correct_answer}번 ${correctText}</div>
            ${subNoteHtml}
          </div>
          <p class="back-tip">${q.analysis}</p>
        </div>
      </div>
    `;

    cardEl.addEventListener('click', () => {
      cardEl.classList.toggle('is-flipped');
    });

    DOM.flashcardsGrid.appendChild(cardEl);
  });
}

// ==========================================
// 9.5. 학습 데이터 분석 및 맞춤형 피드백 리포트 엔진
// ==========================================
/**
 * 문항 번호(1~50)를 기준으로 대한검정회 준4급 8대 출제 영역 명칭을 반환합니다.
 */
function getExamSectionInfo(questionNumber) {
  if (questionNumber >= 1 && questionNumber <= 8) {
    return { id: 'sec1', name: '1. 한자의 훈음 (1~8번)', shortName: '한자의 훈음' };
  }
  if (questionNumber >= 9 && questionNumber <= 15) {
    return { id: 'sec2', name: '2. 훈음에 맞는 한자 (9~15번)', shortName: '훈음에 맞는 한자' };
  }
  if (questionNumber >= 16 && questionNumber <= 22) {
    return { id: 'sec3', name: '3. 독음·부수·자전·반의/유의자 (16~22번)', shortName: '독음·부수·자전·반의' };
  }
  if (questionNumber >= 23 && questionNumber <= 31) {
    return { id: 'sec4', name: '4. 한자어의 독음 (23~31번)', shortName: '한자어의 독음' };
  }
  if (questionNumber >= 32 && questionNumber <= 34) {
    return { id: 'sec5', name: '5. 어휘의 뜻풀이 (32~34번)', shortName: '어휘의 뜻풀이' };
  }
  if (questionNumber >= 35 && questionNumber <= 37) {
    return { id: 'sec6', name: '6. 낱말의 한자 표기 (35~37번)', shortName: '낱말 한자 표기' };
  }
  if (questionNumber >= 38 && questionNumber <= 44) {
    return { id: 'sec7', name: '7. 문맥 속 독음 및 한자 쓰기 (38~44번)', shortName: '문맥 독음·한자 쓰기' };
  }
  return { id: 'sec8', name: '8. 어휘 짜임·유의/반의어·성어 (45~50번)', shortName: '짜임·유의/반의·성어' };
}

/**
 * 개별 문항과 누적 텔레메트리 기록을 결합하여 문항의 현재 학습 상태(status)를 판별합니다.
 * - 'first_correct': 첫 시도에 바로 정답 & 현재도 정답
 * - 'mastered': 과거 오답(웹 오답 또는 111회 종이시험 오답)이 있었으나 현재 정답으로 정복 완료
 * - 'unsolved_wrong': 현재 마지막 시도가 오답이거나, 111회 종이시험 오답 후 아직 웹에서 정복하지 못함
 * - 'unattempted': 아직 풀이 이력이 없음
 */
function classifyQuestionLearningStatus(question, rec) {
  const hasPaperMistake = Boolean(question.omr_marked);

  if (!rec || rec.attempts === 0) {
    if (hasPaperMistake) {
      return {
        statusKey: 'unsolved_wrong',
        statusLabel: '종이시험 오답 (미정복)',
        badgeClass: 'status-wrong',
        isAttemptedInWeb: false,
        isCurrentlyCorrect: false,
        hadMistakeBefore: true,
        selectedOption: question.omr_marked,
        trailText: '📝종이오답',
        hintUsed: Boolean(rec && rec.hintUsed)
      };
    }
    return {
      statusKey: 'unattempted',
      statusLabel: '미풀이',
      badgeClass: 'status-unattempted',
      isAttemptedInWeb: false,
      isCurrentlyCorrect: false,
      hadMistakeBefore: false,
      selectedOption: null,
      trailText: '-',
      hintUsed: Boolean(rec && rec.hintUsed)
    };
  }

  const hadWebMistake = rec.wrongCount > 0;
  const hadAnyMistake = hadWebMistake || hasPaperMistake;
  const trailPrefix = hasPaperMistake ? '📝❌➔' : '';
  const trailText = `${trailPrefix}${rec.historyTrail.join('➔')}`;

  if (rec.lastIsCorrect) {
    if (hadAnyMistake) {
      return {
        statusKey: 'mastered',
        statusLabel: '오답 정복 완료',
        badgeClass: 'status-mastered',
        isAttemptedInWeb: true,
        isCurrentlyCorrect: true,
        hadMistakeBefore: true,
        selectedOption: rec.lastSelectedOption,
        trailText,
        hintUsed: Boolean(rec.hintUsed)
      };
    }
    return {
      statusKey: 'first_correct',
      statusLabel: '한 번에 정답',
      badgeClass: 'status-correct',
      isAttemptedInWeb: true,
      isCurrentlyCorrect: true,
      hadMistakeBefore: false,
      selectedOption: rec.lastSelectedOption,
      trailText,
      hintUsed: Boolean(rec.hintUsed)
    };
  }

  return {
    statusKey: 'unsolved_wrong',
    statusLabel: '집중 복습 필요 (오답)',
    badgeClass: 'status-wrong',
    isAttemptedInWeb: true,
    isCurrentlyCorrect: false,
    hadMistakeBefore: true,
    selectedOption: rec.lastSelectedOption || question.omr_marked,
    trailText,
    hintUsed: Boolean(rec.hintUsed)
  };
}

/**
 * 현재 회차의 전체 문항과 로컬 스토리지 텔레메트리를 결합하여 종합 리포트 데이터를 생성합니다.
 */
function buildFeedbackReportData(roundId) {
  const cfg = ROUNDS_CONFIG[roundId];
  const dataset = cfg ? cfg.getQuestions() : [];
  const telemetry = loadRoundTelemetry(roundId);

  const items = [];
  const sectionMap = {};
  const categoryErrorCounts = {};

  let webAttemptedCount = 0;
  let evaluatedCount = 0; // 웹 풀이 문항 또는 111회 종이시험 기준 평가 문항
  let currentCorrectCount = 0;
  let firstCorrectCount = 0;
  let masteredCount = 0;
  let unsolvedWrongCount = 0;
  let unattemptedCount = 0;
  let hintUsedCount = 0;
  let totalAttemptsSum = 0;

  dataset.forEach(q => {
    const rec = telemetry[q.number] || null;
    const statusInfo = classifyQuestionLearningStatus(q, rec);
    const secInfo = getExamSectionInfo(q.number);

    if (statusInfo.isAttemptedInWeb) {
      webAttemptedCount += 1;
      totalAttemptsSum += rec.attempts;
    }
    if (statusInfo.hintUsed) {
      hintUsedCount += 1;
    }

    if (statusInfo.statusKey === 'first_correct') {
      firstCorrectCount += 1;
      currentCorrectCount += 1;
      evaluatedCount += 1;
    } else if (statusInfo.statusKey === 'mastered') {
      masteredCount += 1;
      currentCorrectCount += 1;
      evaluatedCount += 1;
    } else if (statusInfo.statusKey === 'unsolved_wrong') {
      unsolvedWrongCount += 1;
      evaluatedCount += 1;
      const catKey = q.category || q.type || '기타';
      categoryErrorCounts[catKey] = (categoryErrorCounts[catKey] || 0) + 1;
    } else {
      unattemptedCount += 1;
    }

    // 영역별 집계 초기화 및 누적
    if (!sectionMap[secInfo.id]) {
      sectionMap[secInfo.id] = {
        id: secInfo.id,
        name: secInfo.name,
        shortName: secInfo.shortName,
        total: 0,
        evaluated: 0,
        correct: 0,
        wrong: 0
      };
    }
    sectionMap[secInfo.id].total += 1;
    if (statusInfo.statusKey !== 'unattempted') {
      sectionMap[secInfo.id].evaluated += 1;
      if (statusInfo.isCurrentlyCorrect) {
        sectionMap[secInfo.id].correct += 1;
      } else {
        sectionMap[secInfo.id].wrong += 1;
      }
    }

    items.push({
      question: q,
      telemetry: rec,
      statusInfo,
      secInfo
    });
  });

  const totalQuestions = dataset.length;
  const accuracyRate = evaluatedCount > 0 ? Math.round((currentCorrectCount / evaluatedCount) * 100) : 0;
  const completionRate = totalQuestions > 0 ? Math.round((webAttemptedCount / totalQuestions) * 100) : 0;

  // 취약 문항 리스트 (미해결 오답 우선, 그다음 오답 후 정복 문항 또는 힌트 사용 문항)
  const weakItems = items.filter(
    item => item.statusInfo.statusKey === 'unsolved_wrong' || item.statusInfo.statusKey === 'mastered'
  ).sort((a, b) => {
    if (a.statusInfo.statusKey === b.statusInfo.statusKey) {
      return a.question.number - b.question.number;
    }
    return a.statusInfo.statusKey === 'unsolved_wrong' ? -1 : 1;
  });

  const sectionList = Object.values(sectionMap).map(sec => {
    const rate = sec.evaluated > 0 ? Math.round((sec.correct / sec.evaluated) * 100) : null;
    return { ...sec, rate };
  });

  // 오답 빈도가 높은 카테고리 순 정렬
  const sortedWeakCategories = Object.entries(categoryErrorCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  return {
    roundId,
    roundTitle: cfg ? cfg.title : '',
    badgePrefix: cfg ? cfg.badgePrefix : '',
    generatedAt: new Date().toLocaleString('ko-KR'),
    totalQuestions,
    webAttemptedCount,
    evaluatedCount,
    currentCorrectCount,
    firstCorrectCount,
    masteredCount,
    unsolvedWrongCount,
    unattemptedCount,
    hintUsedCount,
    totalAttemptsSum,
    accuracyRate,
    completionRate,
    items,
    weakItems,
    sectionList,
    sortedWeakCategories
  };
}

/**
 * 리포트 데이터를 분석하여 AI 선생님의 종합 진단 등급과 맞춤형 피드백 처방전을 생성합니다.
 */
function generateTeacherPrescription(report) {
  // 아직 한 문제도 풀지 않은 경우 (106회 초기 상태)
  if (report.evaluatedCount === 0) {
    return {
      gradeText: '학습 시작 전 (진단 대기)',
      gradeClass: 'grade-neutral',
      headline: '안태주 학생, 아직 이 회차의 문제 풀이 기록이 없습니다! 첫 문제를 풀면 실시간 데이터 분석이 시작됩니다.',
      strengthText: '상단 탭에서 [전체 문제] 또는 [훈음·자형 특훈]을 선택해 문제를 풀어보세요. 정답·오답·힌트 활용 이력이 자동으로 기록됩니다.',
      weaknessText: '문제를 풀다가 틀리거나 헷갈리는 한자가 나오면, 이 리포트에서 어떤 유형(자형 혼동, 두음법칙, 동음이의어 등)이 취약한지 자동으로 정밀 진단해 줍니다.',
      actionSteps: [
        '1단계: 먼저 아는 문제를 중심으로 1번부터 차근차근 풀어보세요.',
        '2단계: 모르는 문제는 찍지 말고 [💡 힌트 보기]를 눌러 부수와 뜻 단서를 추리해 보세요.',
        '3단계: 풀이를 마친 뒤 다시 [📊 리포트] 버튼을 눌러 나의 약점 처방전을 확인하세요!'
      ]
    };
  }

  // 종합 등급 판정
  let gradeText = '';
  let gradeClass = '';
  if (report.accuracyRate >= 85) {
    gradeText = '🏆 최우수 (준4급 합격 안정권)';
    gradeClass = 'grade-excellent';
  } else if (report.accuracyRate >= 70) {
    gradeText = '✅ 우수 (합격권 진입 · 약점 보완)';
    gradeClass = 'grade-good';
  } else if (report.accuracyRate >= 50) {
    gradeText = '⚡ 보완 필요 (집중 클리닉 권장)';
    gradeClass = 'grade-warn';
  } else {
    gradeText = '🚨 집중 처방 필요 (오답 정복 필수)';
    gradeClass = 'grade-danger';
  }

  // 강점 영역 추출
  const strongSections = report.sectionList
    .filter(s => s.evaluated > 0 && s.rate >= 75)
    .map(s => `${s.shortName}(${s.rate}%)`);

  let strengthText = '';
  if (strongSections.length > 0) {
    strengthText = `평가된 문항 중 <strong>${strongSections.join(', ')}</strong> 영역에서 매우 높은 정답률을 보이고 있습니다! `;
    if (report.masteredCount > 0) {
      strengthText += `특히 이전에 틀렸던 오답 중 <strong>${report.masteredCount}문항을 재도전하여 완벽하게 내 것으로 정복(❌➔⭕)</strong>한 점이 아주 훌륭합니다.`;
    } else {
      strengthText += `기본 한자 변별력과 집중력이 탄탄하게 잡혀 있습니다.`;
    }
  } else if (report.masteredCount > 0) {
    strengthText = `틀렸던 문항을 포기하지 않고 다시 풀어 <strong>총 ${report.masteredCount}개의 오답을 스스로 정복(❌➔⭕)</strong>해 내고 있습니다! 꾸준히 정복 문항 수를 늘려가면 성적이 빠르게 수직 상승합니다.`;
  } else {
    strengthText = `현재까지 <strong>총 ${report.webAttemptedCount}문항(시도 ${report.totalAttemptsSum}회)</strong>을 학습하며 오답 데이터를 차곡차곡 쌓아가고 있습니다. 틀린 문제를 발견한 것 자체가 합격으로 가는 첫걸음입니다!`;
  }

  // 취약 원인 및 대표 오답 한자 추출
  const unsolvedItems = report.items.filter(it => it.statusInfo.statusKey === 'unsolved_wrong');
  const sampleWrongChars = unsolvedItems
    .slice(0, 6)
    .map(it => `#${it.question.number}번(${extractMainHanja(it.question)})`)
    .join(', ');

  let weaknessText = '';
  if (unsolvedItems.length === 0) {
    weaknessText = `현재 풀이한 모든 문항을 100% 정복하여 미해결 오답이 하나도 없습니다! 완벽한 상태입니다.`;
  } else {
    const topWeakCats = report.sortedWeakCategories
      .slice(0, 3)
      .map(c => `<strong>${c.name}(${c.count}문항)</strong>`)
      .join(', ');
    weaknessText = `현재 집중 복습이 필요한 미해결 문항은 <strong>총 ${unsolvedItems.length}문항</strong>이며, 주요 오답 원인은 ${topWeakCats}에 집중되어 있습니다. 대표 주의 문항인 <strong>${sampleWrongChars}</strong>의 짝꿍 한자 비교 표를 꼭 다시 확인하세요.`;
  }

  // 맞춤형 3단계 처방 액션 플랜
  const actionSteps = [];
  if (unsolvedItems.length > 0) {
    actionSteps.push(
      `<strong>[1순위 · 미해결 오답 타파]</strong> 아래의 <strong>[⚡ 취약 문항만 즉시 특훈하기]</strong> 버튼을 눌러 아직 남아 있는 <strong>${unsolvedItems.length}개의 오답</strong>을 모두 초록색(🟢 오답 정복 완료)으로 바꿔 보세요.`
    );
  } else if (report.unattemptedCount > 0) {
    actionSteps.push(
      `<strong>[1순위 · 미풀이 문항 완주]</strong> 아직 풀지 않은 <strong>${report.unattemptedCount}문항</strong>이 남아 있습니다. 전체 50문항 완주를 목표로 이어서 풀어보세요.`
    );
  } else {
    actionSteps.push(
      `<strong>[1순위 · 실전 감각 유지]</strong> 모든 문제를 완벽히 정복했습니다! 시험 직전 [단어장 📖] 탭에서 카드를 빠르게 넘기며 최종 점검하세요.`
    );
  }

  const hasConfusedWeakness = report.sortedWeakCategories.some(c => c.name === '자형 혼동');
  if (hasConfusedWeakness) {
    actionSteps.push(
      `<strong>[2순위 · 모양 유사 한자 비교]</strong> 부수 한 획 차이로 뜻이 달라지는 한자(예: 陽/場, 賣/買, 考/孝, 士/土, 材/才)에서 실수가 잦습니다. 문제를 풀 때 왼쪽·아래쪽 부수를 먼저 동그라미 치듯 확인하는 습관을 길러보세요.`
    );
  } else {
    actionSteps.push(
      `<strong>[2순위 · 복합 한자어 독음 & 뜻 연결]</strong> 두 글자가 합쳐진 한자어는 앞 글자와 뒷 글자의 훈음을 각각 떠올려 이어 붙이면 동음이의어나 뜻풀이 함정에 속지 않습니다.`
    );
  }

  if (report.hintUsedCount > 0) {
    actionSteps.push(
      `<strong>[3순위 · 힌트 없이 자력 풀이]</strong> 힌트를 참고했던 <strong>${report.hintUsedCount}문항</strong>은 다음번 풀이 때 힌트를 열지 않고 스스로 부수와 음을 떠올려 맞혀 보세요.`
    );
  } else {
    actionSteps.push(
      `<strong>[3순위 · 오답 리포트 인쇄 복습]</strong> 우측 상단의 <strong>[🖨️ 인쇄 / PDF 저장]</strong> 버튼을 눌러 취약 문항 리스트를 종이로 출력해 시험장 가기 전 체크리스트로 활용하세요.`
    );
  }

  const headline = report.roundId === '111'
    ? `제111회 기존 시험지 오답 26문항 중 현재 ${report.currentCorrectCount}문항(${report.accuracyRate}%)을 완벽히 정복했습니다!`
    : `${report.badgePrefix} 평가된 ${report.evaluatedCount}문항 중 ${report.currentCorrectCount}문항 정답 (정답률 ${report.accuracyRate}% · 진도율 ${report.completionRate}%)`;

  return {
    gradeText,
    gradeClass,
    headline,
    strengthText,
    weaknessText,
    actionSteps
  };
}

/**
 * 영역별 정답률에 따른 별점 및 평가 문구를 반환합니다.
 */
function getSectionRatingBadge(rate, evaluated) {
  if (evaluated === 0 || rate === null) {
    return '<span class="sec-rating dim">미풀이</span>';
  }
  if (rate >= 85) {
    return '<span class="sec-rating excellent">⭐⭐⭐⭐⭐ 최우수</span>';
  }
  if (rate >= 70) {
    return '<span class="sec-rating good">⭐⭐⭐⭐ 우수</span>';
  }
  if (rate >= 50) {
    return '<span class="sec-rating warn">⭐⭐⭐ 보통</span>';
  }
  return '<span class="sec-rating danger">⭐⭐ 집중보완</span>';
}

/**
 * 상단 '📊 리포트' 탭 또는 완료 화면에서 리포트 뷰를 렌더링합니다.
 */
function renderReportView() {
  DOM.quizMain.style.display = 'none';
  DOM.flashcardsView.style.display = 'none';
  DOM.completionView.style.display = 'none';
  if (DOM.printSheetView) DOM.printSheetView.style.display = 'none';
  if (DOM.paperExamView) DOM.paperExamView.style.display = 'none';
  DOM.reportView.style.display = 'block';

  // 상단 탭 활성화 표시 동기화
  const tabs = [DOM.tabAll, DOM.tabConfused, DOM.tabCompound, DOM.tabWrongNote, DOM.tabFlashcard, DOM.tabReport, DOM.tabPrintView, DOM.tabPaperExam];
  tabs.forEach(t => {
    if (t) t.classList.remove('active');
  });
  if (DOM.tabReport) DOM.tabReport.classList.add('active');

  const report = buildFeedbackReportData(state.currentRound);
  const prescription = generateTeacherPrescription(report);

  // 1. 헤더 메타 업데이트
  DOM.reportRoundBadge.textContent = `${report.badgePrefix} 학습 데이터 분석`;
  DOM.reportTimestamp.textContent = `생성 일시: ${report.generatedAt}`;
  DOM.reportMainTitle.textContent = `📊 안태주 학생 ${report.badgePrefix} 학습 데이터 & 피드백 리포트`;

  // 2. KPI 4종 카드 렌더링
  renderReportKpiCards(report);

  // 3. 선생님 종합 피드백 처방전 렌더링
  DOM.reportGradeBadge.textContent = prescription.gradeText;
  DOM.reportGradeBadge.className = `report-status-pill ${prescription.gradeClass}`;
  DOM.reportFeedbackBody.innerHTML = `
    <div class="feedback-headline">${prescription.headline}</div>
    <div class="feedback-grid">
      <div class="feedback-box strength">
        <div class="fb-box-title">🌟 칭찬할 강점 & 성장 포인트</div>
        <p>${prescription.strengthText}</p>
      </div>
      <div class="feedback-box weakness">
        <div class="fb-box-title">🔍 집중 보완이 필요한 취약 패턴</div>
        <p>${prescription.weaknessText}</p>
      </div>
    </div>
    <div class="feedback-action-plan">
      <div class="fb-box-title">📋 안태주 학생 맞춤형 3단계 학습 처방</div>
      <ul class="fb-action-list">
        ${prescription.actionSteps.map(step => `<li>${step}</li>`).join('')}
      </ul>
    </div>
  `;

  // 4. 영역별 성취도 표 렌더링
  renderReportCategoryTable(report);

  // 5. 취약 문항 상세 분석 리스트 렌더링
  renderReportWeakList(report);

  // 6. 전체 문항 학습 데이터 일람표 렌더링
  renderReportAllQuestionsTable(report, state.reportFilter);
}

/**
 * 리포트 상단 핵심 학습 지표(KPI 4개 카드)를 렌더링합니다.
 */
function renderReportKpiCards(report) {
  const scoreColorClass = report.accuracyRate >= 70 ? 'emerald' : report.accuracyRate >= 50 ? 'amber' : 'rose';
  const passJudgeText = report.evaluatedCount === 0
    ? '문제 풀이 후 자동 산출'
    : report.accuracyRate >= 70
      ? '준4급 합격 기준(70%) 통과!'
      : `합격선(70%)까지 +${70 - report.accuracyRate}% 필요`;

  DOM.reportKpiGrid.innerHTML = `
    <div class="report-kpi-card">
      <span class="kpi-label">현재 정복 정답률</span>
      <div class="kpi-value ${scoreColorClass}">${report.accuracyRate}<small>%</small></div>
      <span class="kpi-sub">${passJudgeText}</span>
    </div>
    <div class="report-kpi-card">
      <span class="kpi-label">웹 학습 진행률</span>
      <div class="kpi-value indigo">${report.webAttemptedCount} <small>/ ${report.totalQuestions}문항</small></div>
      <span class="kpi-sub">진도율 ${report.completionRate}% (총 ${report.totalAttemptsSum}회 시도)</span>
    </div>
    <div class="report-kpi-card">
      <span class="kpi-label">오답 정복 현황 (❌➔⭕)</span>
      <div class="kpi-value emerald">${report.masteredCount}<small>문항 정복</small></div>
      <span class="kpi-sub">미해결 오답: <strong style="color: #FDA4AF;">${report.unsolvedWrongCount}문항</strong></span>
    </div>
    <div class="report-kpi-card">
      <span class="kpi-label">자기주도 힌트 활용</span>
      <div class="kpi-value cyan">${report.hintUsedCount}<small>문항 열람</small></div>
      <span class="kpi-sub">첫 시도 바로 정답: ${report.firstCorrectCount}문항</span>
    </div>
  `;
}

/**
 * 8대 출제 영역별 성취도 테이블 및 가로 막대 그래프를 렌더링합니다.
 */
function renderReportCategoryTable(report) {
  DOM.reportCategoryTableBody.innerHTML = report.sectionList.map(sec => {
    const rateVal = sec.rate !== null ? sec.rate : 0;
    const barClass = rateVal >= 75 ? 'bar-emerald' : rateVal >= 50 ? 'bar-amber' : 'bar-rose';
    const rateDisplay = sec.rate !== null ? `${sec.rate}%` : '-';

    return `
      <tr>
        <td class="font-bold">${sec.name}</td>
        <td class="text-center">${sec.total}문항</td>
        <td class="text-center">${sec.evaluated} / ${sec.total}</td>
        <td class="text-center">
          <span class="text-emerald">⭕ ${sec.correct}</span> ·
          <span class="text-rose">❌ ${sec.wrong}</span>
        </td>
        <td>
          <div class="report-bar-wrap">
            <div class="report-bar-track">
              <div class="report-bar-fill ${barClass}" style="width: ${rateVal}%;"></div>
            </div>
            <span class="report-bar-label">${rateDisplay}</span>
          </div>
        </td>
        <td class="text-center">${getSectionRatingBadge(sec.rate, sec.evaluated)}</td>
      </tr>
    `;
  }).join('');
}

/**
 * 집중 보완이 필요한 취약/오답 문항 상세 카드를 렌더링합니다.
 */
function renderReportWeakList(report) {
  if (report.weakItems.length === 0) {
    DOM.btnStartWeakClinic.style.display = 'none';
    DOM.reportWeakList.innerHTML = `
      <div class="report-empty-box">
        🎉 현재 기록된 오답이나 취약 문항이 없습니다! 문제를 더 풀거나 새로운 회차에 도전해 보세요.
      </div>
    `;
    return;
  }

  DOM.btnStartWeakClinic.style.display = 'inline-flex';
  const unsolvedCount = report.weakItems.filter(i => i.statusInfo.statusKey === 'unsolved_wrong').length;
  DOM.btnStartWeakClinic.textContent = unsolvedCount > 0
    ? `⚡ 미해결 오답 ${unsolvedCount}문항 즉시 특훈하기`
    : `⚡ 오답 이력 ${report.weakItems.length}문항 복습 특훈하기`;

  DOM.reportWeakList.innerHTML = report.weakItems.map(item => {
    const q = item.question;
    const st = item.statusInfo;
    const heroChar = extractMainHanja(q);
    const correctOptText = q.options[q.correct_answer - 1];
    const wrongOptNum = st.selectedOption || q.omr_marked;
    const wrongOptText = (wrongOptNum && q.options[wrongOptNum - 1])
      ? `${wrongOptNum}번 (${q.options[wrongOptNum - 1]})`
      : '기록 없음';

    const compHtml = (q.comparison && q.comparison.length > 0)
      ? `<div class="weak-comp-pills">
          ${q.comparison.map(c => `<span class="weak-comp-pill"><strong>${c.char}</strong> ${c.desc}</span>`).join('')}
        </div>`
      : '';

    return `
      <div class="weak-item-card ${st.statusKey === 'unsolved_wrong' ? 'is-unsolved' : 'is-mastered'}">
        <div class="weak-item-top">
          <div class="weak-item-meta">
            <span class="weak-q-num">#${q.number}번</span>
            <span class="weak-q-cat">${q.category || q.type}</span>
            <span class="report-mini-badge ${st.badgeClass}">${st.statusLabel}</span>
            <span class="weak-trail">이력: ${st.trailText}</span>
          </div>
          <button class="weak-jump-btn no-print" data-qnum="${q.number}">
            이 문제 바로 풀기 ➔
          </button>
        </div>
        <div class="weak-item-body">
          <div class="weak-hanja-box">${heroChar}</div>
          <div class="weak-detail-col">
            <div class="weak-q-prompt">${q.prompt || q.question}</div>
            <div class="weak-ans-compare">
              <span class="ans-wrong">선택했던 답: <strong>${wrongOptText}</strong></span>
              <span class="ans-arrow">➔</span>
              <span class="ans-correct">실제 정답: <strong>${q.correct_answer}번 (${correctOptText})</strong></span>
            </div>
            <p class="weak-analysis">💡 <strong>핵심 처방:</strong> ${q.analysis}</p>
            ${compHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 개별 문항 바로 풀기 버튼 이벤트 연결
  DOM.reportWeakList.querySelectorAll('.weak-jump-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetNum = parseInt(btn.dataset.qnum, 10);
      jumpToQuestionFromReport(targetNum);
    });
  });
}

/**
 * 전체 문항 학습 데이터 일람표를 필터에 맞춰 렌더링합니다.
 */
function renderReportAllQuestionsTable(report, filterKey = 'all') {
  state.reportFilter = filterKey;

  // 필터 버튼 활성 상태 갱신
  if (DOM.reportTableFilters) {
    DOM.reportTableFilters.querySelectorAll('.filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterKey);
    });
  }

  const filteredItems = filterKey === 'all'
    ? report.items
    : report.items.filter(item => item.statusInfo.statusKey === filterKey);

  if (filteredItems.length === 0) {
    DOM.reportAllQuestionsTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center" style="padding: 28px; color: #94A3B8;">
          선택한 조건에 해당하는 문항이 없습니다.
        </td>
      </tr>
    `;
    return;
  }

  DOM.reportAllQuestionsTableBody.innerHTML = filteredItems.map(item => {
    const q = item.question;
    const st = item.statusInfo;
    const heroChar = extractMainHanja(q);
    const correctText = `${q.correct_answer}번 (${q.options[q.correct_answer - 1]})`;
    const selectedText = (st.selectedOption && q.options[st.selectedOption - 1])
      ? `${st.selectedOption}번 (${q.options[st.selectedOption - 1]})`
      : '-';

    const ansCellHtml = st.statusKey === 'unattempted'
      ? `<span class="text-dim">미풀이 (정답: ${correctText})</span>`
      : st.isCurrentlyCorrect
        ? `<span class="text-emerald">⭕ ${correctText}</span>`
        : `<span class="text-rose">❌ 선택: ${selectedText}</span><br><small class="text-emerald">➔ 정답: ${correctText}</small>`;

    return `
      <tr>
        <td class="text-center font-bold">#${q.number}</td>
        <td>
          <div>${q.type}</div>
          <small class="text-dim">${q.category || ''}</small>
        </td>
        <td>
          <span class="table-hanja-badge">${heroChar}</span>
        </td>
        <td class="text-center">
          <span class="report-mini-badge ${st.badgeClass}">${st.statusLabel}</span>
        </td>
        <td class="text-center font-mono">${st.trailText}</td>
        <td>${ansCellHtml}</td>
        <td class="text-center">${st.hintUsed ? '💡 열람' : '-'}</td>
      </tr>
    `;
  }).join('');
}

/**
 * 리포트에서 특정 문항 번호를 클릭했을 때 해당 문항 풀이 화면으로 즉시 이동합니다.
 */
function jumpToQuestionFromReport(questionNumber) {
  const tabs = [DOM.tabAll, DOM.tabConfused, DOM.tabCompound, DOM.tabWrongNote, DOM.tabFlashcard, DOM.tabReport, DOM.tabPrintView];
  tabs.forEach(t => {
    if (t) t.classList.remove('active');
  });
  DOM.tabAll.classList.add('active');

  initQuiz('all');
  const idx = state.activeQuestions.findIndex(q => q.number === questionNumber);
  if (idx !== -1) {
    state.currentIndex = idx;
    renderCurrentQuestion();
  }
}

/**
 * 리포트의 '취약 문항만 즉시 특훈하기' 버튼 클릭 시 미해결 오답(또는 오답 이력 문항)만으로 특훈 세션을 시작합니다.
 */
function startWeakQuestionsClinic() {
  const report = buildFeedbackReportData(state.currentRound);
  const unsolved = report.weakItems
    .filter(i => i.statusInfo.statusKey === 'unsolved_wrong')
    .map(i => i.question);
  const targetQuestions = unsolved.length > 0
    ? unsolved
    : report.weakItems.map(i => i.question);

  if (targetQuestions.length === 0) {
    alert('현재 복습할 취약 문항이 없습니다!');
    return;
  }

  const tabs = [DOM.tabAll, DOM.tabConfused, DOM.tabCompound, DOM.tabWrongNote, DOM.tabFlashcard, DOM.tabReport, DOM.tabPrintView];
  tabs.forEach(t => {
    if (t) t.classList.remove('active');
  });
  DOM.tabWrongNote.classList.add('active');

  state.currentMode = 'wrong_note';
  state.activeQuestions = targetQuestions;
  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.maxStreak = 0;
  state.isAnswered = false;
  state.missedInSession = [];
  state.sessionHistory = {};

  DOM.reportView.style.display = 'none';
  if (DOM.printSheetView) DOM.printSheetView.style.display = 'none';
  DOM.flashcardsView.style.display = 'none';
  DOM.completionView.style.display = 'none';
  DOM.quizMain.style.display = 'block';

  updateStreakDisplay();
  renderCurrentQuestion();
}

/**
 * 마크다운(.md) 형식의 상세 피드백 리포트 문서를 동적으로 생성하여 파일로 다운로드합니다.
 */
function downloadMarkdownReport() {
  const report = buildFeedbackReportData(state.currentRound);
  const prescription = generateTeacherPrescription(report);
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const lines = [
    `# 📊 안태주 학생 ${report.badgePrefix} 학습 데이터 & 맞춤형 피드백 리포트`,
    ``,
    `- **학생명**: 안태주 (대한검정회 준4급 대비)`,
    `- **대상 회차**: ${report.roundTitle}`,
    `- **리포트 생성 일시**: ${report.generatedAt}`,
    `- **종합 진단 등급**: **${prescription.gradeText.replace(/<[^>]*>/g, '')}**`,
    ``,
    `---`,
    ``,
    `## 📌 1. 핵심 학습 데이터 요약 (KPI)`,
    `- **현재 정복 정답률**: **${report.accuracyRate}%** (평가 문항 ${report.evaluatedCount}개 중 ${report.currentCorrectCount}개 정답)`,
    `- **웹 학습 진행률**: **${report.completionRate}%** (${report.webAttemptedCount} / ${report.totalQuestions}문항 풀이 · 총 ${report.totalAttemptsSum}회 시도)`,
    `- **오답 정복 현황**: 첫 시도 정답 **${report.firstCorrectCount}문항** | 오답 후 재도전 정복(❌➔⭕) **${report.masteredCount}문항** | 미해결 오답 **${report.unsolvedWrongCount}문항**`,
    `- **자기주도 힌트 열람**: ${report.hintUsedCount}문항`,
    ``,
    `---`,
    ``,
    `## 🩺 2. AI 선생님의 종합 진단 & 맞춤 처방전`,
    `> **${prescription.headline.replace(/<[^>]*>/g, '')}**`,
    ``,
    `- **🌟 강점 및 성장 포인트**: ${prescription.strengthText.replace(/<[^>]*>/g, '')}`,
    `- **🔍 취약 패턴 분석**: ${prescription.weaknessText.replace(/<[^>]*>/g, '')}`,
    ``,
    `### 📋 3단계 맞춤 학습 액션 플랜`,
    ...prescription.actionSteps.map((s, idx) => `${idx + 1}. ${s.replace(/<[^>]*>/g, '')}`),
    ``,
    `---`,
    ``,
    `## 📈 3. 출제 영역별 성취도 분석`,
    ``,
    `| 출제 영역 | 문항 수 | 풀이 완료 | 정답 / 오답 | 정답률 |`,
    `| :--- | :---: | :---: | :---: | :---: |`,
    ...report.sectionList.map(sec => {
      const rateStr = sec.rate !== null ? `${sec.rate}%` : '미풀이';
      return `| **${sec.name}** | ${sec.total} | ${sec.evaluated} | ⭕${sec.correct} / ❌${sec.wrong} | **${rateStr}** |`;
    }),
    ``,
    `---`,
    ``,
    `## 🎯 4. 집중 보완이 필요한 오답·취약 문항 상세 처방 (${report.weakItems.length}문항)`,
    ``
  ];

  if (report.weakItems.length === 0) {
    lines.push(`- 현재 기록된 오답 또는 취약 문항이 없습니다.`);
  } else {
    report.weakItems.forEach(item => {
      const q = item.question;
      const st = item.statusInfo;
      const correctOpt = `${q.correct_answer}번 (${q.options[q.correct_answer - 1]})`;
      const wrongNum = st.selectedOption || q.omr_marked;
      const wrongOpt = (wrongNum && q.options[wrongNum - 1])
        ? `${wrongNum}번 (${q.options[wrongNum - 1]})`
        : '기록 없음';

      lines.push(`### [#${q.number}번] ${q.type} — ${extractMainHanja(q)} (${st.statusLabel})`);
      lines.push(`- **시도 추이**: ${st.trailText}`);
      lines.push(`- **태주의 선택**: ${wrongOpt} ➔ **실제 정답**: **${correctOpt}**`);
      lines.push(`- **핵심 해설**: ${q.analysis}`);
      lines.push(``);
    });
  }

  lines.push(`---`);
  lines.push(``);
  lines.push(`## 📋 5. 전체 문항 학습 데이터 일람표`);
  lines.push(``);
  lines.push(`| 번호 | 유형 | 제시 한자 | 학습 상태 | 시도 추이 | 정답 | 힌트 |`);
  lines.push(`| :---: | :--- | :---: | :---: | :---: | :--- | :---: |`);
  report.items.forEach(item => {
    const q = item.question;
    const st = item.statusInfo;
    const correctOpt = `${q.correct_answer}번(${q.options[q.correct_answer - 1]})`;
    lines.push(
      `| **#${q.number}** | ${q.type} | **${extractMainHanja(q)}** | ${st.statusLabel} | ${st.trailText} | ${correctOpt} | ${st.hintUsed ? '💡' : '-'} |`
    );
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `안태주_${report.badgePrefix}_학습피드백리포트_${dateStr}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 누적된 학습 텔레메트리 데이터를 JSON 파일로 다운로드합니다.
 */
function downloadJsonTelemetry() {
  const report = buildFeedbackReportData(state.currentRound);
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const exportPayload = {
    student: '안태주',
    roundId: report.roundId,
    roundTitle: report.roundTitle,
    exportedAt: new Date().toISOString(),
    summary: {
      totalQuestions: report.totalQuestions,
      webAttemptedCount: report.webAttemptedCount,
      evaluatedCount: report.evaluatedCount,
      currentCorrectCount: report.currentCorrectCount,
      firstCorrectCount: report.firstCorrectCount,
      masteredCount: report.masteredCount,
      unsolvedWrongCount: report.unsolvedWrongCount,
      accuracyRate: report.accuracyRate,
      completionRate: report.completionRate,
      hintUsedCount: report.hintUsedCount
    },
    sectionStats: report.sectionList,
    telemetryByQuestion: loadRoundTelemetry(state.currentRound)
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `안태주_${report.badgePrefix}_학습데이터_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 현재 회차의 누적 학습 기록 및 오답 노트를 초기화합니다.
 */
function resetRoundLearningData() {
  const cfg = ROUNDS_CONFIG[state.currentRound];
  const confirmed = confirm(
    `정말로 [${cfg.badgePrefix}]의 누적 학습 데이터와 오답 노트 기록을 모두 초기화하시겠습니까?\n(초기화 후에는 처음 상태로 되돌아갑니다.)`
  );
  if (!confirmed) return;

  try {
    localStorage.removeItem(getTelemetryStorageKey(state.currentRound));
    localStorage.removeItem(getWrongNoteStorageKey(state.currentRound));
  } catch (e) {
    // 무시
  }

  state.sessionHistory = {};
  state.missedInSession = [];
  state.score = 0;
  state.streak = 0;
  updateHeaderAndTabCounts();
  renderReportView();
}

// ==========================================
// 9.6. 시험장·책상용 프린트 전용 뷰 (A4 짝꿍 한자 & 핵심 오답 요약장)
// ==========================================
/**
 * 선택된 수록 범위(scope)에 따라 프린트 시트에 출력할 대상 문항들을 반환합니다.
 */
function getPrintSheetTargetItems(report, scope) {
  if (scope === 'all') {
    return {
      items: report.items,
      scopeDescription: `회차 전체 문항 (${report.items.length}문항 수록)`
    };
  }

  if (scope === 'confused') {
    const confusedItems = report.items.filter(
      it => it.question.category === '자형 혼동' ||
        it.question.category === '두음법칙' ||
        it.question.category === '다음자(多音字) 독음' ||
        it.question.category === '동음이의어'
    );
    return {
      items: confusedItems.length > 0 ? confusedItems : report.items,
      scopeDescription: `헷갈리는 자형 혼동·두음법칙·다음자·동음이의어 집중 선별 (${confusedItems.length}문항)`
    };
  }

  // 기본 'weak': 오답 또는 오답 후 정복 문항 우선 추출
  if (report.weakItems.length > 0) {
    return {
      items: report.weakItems,
      scopeDescription: `안태주 학생 맞춤 핵심 오답·취약 문항 집중 수록 (${report.weakItems.length}문항)`
    };
  }

  // 아직 풀이 전이라 오답 기록이 없을 경우: 시험장 단골 함정(자형 혼동·다음자·두음법칙·동음이의어) 자동 추천
  const fallbackTrapItems = report.items.filter(
    it => it.question.category === '자형 혼동' ||
      it.question.category === '다음자(多音字) 독음' ||
      it.question.category === '두음법칙' ||
      it.question.category === '동음이의어'
  );

  return {
    items: fallbackTrapItems.length > 0 ? fallbackTrapItems : report.items.slice(0, 20),
    scopeDescription: `시험장 최다 빈출 함정 & 짝꿍 한자 핵심 선별 (${fallbackTrapItems.length}문항 · 문제 풀이 시 내 오답으로 자동 전환)`
  };
}

/**
 * 문항 객체에서 3번 따라 쓰기 훈련에 사용할 표준 한자(targetHanja)와 훈음/독음(targetHuneum)을 추출합니다.
 */
function extractTargetHanjaAndHuneum(question) {
  const correctOpt = question.options[question.correct_answer - 1] || '';
  const comp0 = (question.comparison && question.comparison.length > 0)
    ? question.comparison[0]
    : null;

  // 1) '한자의 훈음' 유형: 문제는 한자, 정답 보기는 훈음
  if (question.type === '한자의 훈음') {
    return {
      targetHanja: question.hero_char || question.question,
      targetHuneum: correctOpt,
      subDetail: comp0 ? comp0.desc : ''
    };
  }

  // 2) '훈음에 맞는 한자' 유형: 문제는 훈음, 정답 보기는 한자
  if (question.type === '훈음에 맞는 한자') {
    return {
      targetHanja: correctOpt,
      targetHuneum: question.question,
      subDetail: comp0 ? comp0.desc : ''
    };
  }

  // 3) 그 외 유형: comparison[0]에 핵심 한자와 훈음/독음이 정리되어 있으므로 우선 활용
  if (comp0 && /[\u4E00-\u9FFF]/.test(comp0.char)) {
    const cleanChar = comp0.char.split('/')[0].split('↔')[0].trim();
    const parenIdx = comp0.desc.indexOf('(');
    const mainReading = parenIdx !== -1 ? comp0.desc.slice(0, parenIdx).trim() : comp0.desc;
    const subNote = parenIdx !== -1 ? comp0.desc.slice(parenIdx).trim() : '';
    return {
      targetHanja: cleanChar,
      targetHuneum: mainReading,
      subDetail: subNote
    };
  }

  // 4) 기본 폴백
  return {
    targetHanja: extractMainHanja(question),
    targetHuneum: correctOpt,
    subDetail: ''
  };
}

/**
 * 시험장·책상용 A4 프린트 전용 뷰를 화면에 렌더링합니다.
 */
function renderPrintSheetView() {
  DOM.quizMain.style.display = 'none';
  DOM.flashcardsView.style.display = 'none';
  DOM.completionView.style.display = 'none';
  if (DOM.reportView) DOM.reportView.style.display = 'none';
  if (DOM.paperExamView) DOM.paperExamView.style.display = 'none';
  if (DOM.printSheetView) DOM.printSheetView.style.display = 'block';

  // 상단 탭 활성화 동기화
  const tabs = [DOM.tabAll, DOM.tabConfused, DOM.tabCompound, DOM.tabWrongNote, DOM.tabFlashcard, DOM.tabReport, DOM.tabPrintView, DOM.tabPaperExam];
  tabs.forEach(t => {
    if (t) t.classList.remove('active');
  });
  if (DOM.tabPrintView) DOM.tabPrintView.classList.add('active');

  // 옵션 버튼 활성 상태 동기화
  if (DOM.printPartGroup) {
    DOM.printPartGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.part === state.printOptions.part);
    });
  }
  if (DOM.printScopeGroup) {
    DOM.printScopeGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scope === state.printOptions.scope);
    });
  }
  if (DOM.printMaskGroup) {
    DOM.printMaskGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.classList.toggle('active', String(state.printOptions.maskAnswer) === btn.dataset.mask);
    });
  }

  const report = buildFeedbackReportData(state.currentRound);
  const { items: targetItems, scopeDescription } = getPrintSheetTargetItems(report, state.printOptions.scope);
  const maskAnswer = state.printOptions.maskAnswer;
  const partOption = state.printOptions.part || 'both';

  // Part 1 / Part 2 표시 여부 및 페이지 나눔 제어
  const showPart1 = (partOption === 'both' || partOption === 'part1');
  const showPart2 = (partOption === 'both' || partOption === 'part2');

  if (DOM.printPart1Section) {
    DOM.printPart1Section.style.display = showPart1 ? 'block' : 'none';
  }
  if (DOM.printPart2Section) {
    DOM.printPart2Section.style.display = showPart2 ? 'block' : 'none';
    DOM.printPart2Section.classList.toggle('print-page-break-before', partOption === 'both');
  }

  // 시트 헤더 업데이트
  const partBadgeText = partOption === 'part1'
    ? '🔍 PART 1. 짝꿍 한자 비교표'
    : partOption === 'part2'
      ? (maskAnswer ? '✍️ PART 2. 한자·훈음 3번 외워 쓰기장' : '✍️ PART 2. 한자·훈음 3번 따라 쓰기장')
      : '📑 PART 1+2 통합 요약 & 3번 쓰기장';

  DOM.printSheetRoundTag.textContent = report.roundTitle;
  DOM.printSheetModeTag.textContent = partBadgeText;
  DOM.printSheetTitle.textContent = partOption === 'part1'
    ? `안태주 학생 ${report.badgePrefix} 헷갈리는 짝꿍 한자 집중 비교표`
    : partOption === 'part2'
      ? `안태주 학생 ${report.badgePrefix} 핵심 한자·훈음 3번 쓰기 연습장`
      : `안태주 학생 ${report.badgePrefix} 짝꿍 한자 비교 & 3번 쓰기 훈련장`;
  DOM.printSheetSubtitle.textContent = scopeDescription;
  DOM.printSheetDateRow.innerHTML = `<strong>출력일:</strong> ${new Date().toISOString().slice(0, 10)}`;

  // PART 1: 짝꿍 한자 비교 그리드 렌더링
  if (showPart1) {
    renderPrintComparisonSection(targetItems);
  }

  // PART 2: 한자·훈음 3번 쓰기 연습장 렌더링
  if (showPart2) {
    renderPrintChecklistSection(targetItems, maskAnswer);
  }

  // PART 3: 빈칸 모드이고 Part 2가 표시될 때 빠른 정답 확인표 렌더링
  renderPrintAnswerKeySection(targetItems, maskAnswer && showPart2);
}

/**
 * 특정 파트('part1' 또는 'part2')만 즉시 선택하여 인쇄 대화상자를 호출합니다.
 */
function printSpecificPart(targetPart) {
  state.printOptions.part = targetPart;
  renderPrintSheetView();
  setTimeout(() => {
    window.print();
  }, 80);
}

/**
 * 프린트 시트 PART 1: 헷갈리는 짝꿍 한자 비교 카드를 렌더링합니다.
 */
function renderPrintComparisonSection(targetItems) {
  const compItems = targetItems.filter(
    it => it.question.comparison && it.question.comparison.length > 0
  );

  DOM.printPart1Count.textContent = `총 ${compItems.length}개 핵심 비교 그룹`;

  if (compItems.length === 0) {
    DOM.printComparisonGrid.innerHTML = `
      <div class="sheet-empty-msg">해당 범위에 등록된 짝꿍 비교 한자가 없습니다.</div>
    `;
    return;
  }

  DOM.printComparisonGrid.innerHTML = compItems.map(item => {
    const q = item.question;
    const heroChar = extractMainHanja(q);
    const pairsHtml = q.comparison.map((c, idx) => `
      <div class="sheet-comp-pair ${idx === 0 ? 'is-primary-pair' : ''}">
        <span class="sheet-pair-char">${c.char}</span>
        <span class="sheet-pair-desc">${c.desc}</span>
      </div>
    `).join('');

    return `
      <div class="sheet-comp-card">
        <div class="sheet-comp-card-head">
          <span class="sheet-comp-qnum">#${q.number}번 · ${q.category || q.type}</span>
          <span class="sheet-comp-hero">핵심: <strong>${heroChar}</strong></span>
        </div>
        <div class="sheet-comp-pairs-list">
          ${pairsHtml}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 프린트 시트 PART 2: 번호·유형 및 오답함정을 제거하고, 한자와 훈음을 3번 직접 따라 쓸 수 있는 연습 표를 렌더링합니다.
 */
function renderPrintChecklistSection(targetItems, maskAnswer) {
  DOM.printPart2Count.textContent = `총 ${targetItems.length}개 핵심 한자 (1회는 흐린 글씨를 따라 쓰고, 2·3회는 직접 써보세요!)`;

  // 2회·3회 쓰기 칸: 내부 표 테두리와 밑줄 없이 '한자', '훈음' 안내 라벨만 표시
  const blankWriteCellHtml = `
    <td class="col-write">
      <div class="write-practice-box">
        <div class="write-hanja-slot">
          <span class="write-guide-label">한자</span>
        </div>
        <div class="write-huneum-slot">
          <span class="write-guide-label">훈음</span>
        </div>
      </div>
    </td>
  `;

  DOM.printChecklistTableBody.innerHTML = targetItems.map(item => {
    const q = item.question;
    const { targetHanja, targetHuneum, subDetail } = extractTargetHanjaAndHuneum(q);

    const huneumDisplayHtml = maskAnswer
      ? `<div class="sheet-model-huneum is-masked">훈음 [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</div>`
      : `<div class="sheet-model-huneum">${targetHuneum}</div>
         ${subDetail ? `<div class="sheet-model-sub">${subDetail}</div>` : ''}`;

    // 1회 쓰기 칸: 연필로 덧대어 따라 쓸 수 있도록 흐린 회색(Trace) 한자·훈음 제공
    const traceWriteCellHtml = `
      <td class="col-write is-trace-col">
        <div class="write-practice-box">
          <div class="write-hanja-slot">
            <span class="write-guide-label">한자</span>
            <span class="write-trace-hanja">${targetHanja}</span>
          </div>
          <div class="write-huneum-slot">
            <span class="write-guide-label">훈음</span>
            ${maskAnswer ? '' : `<span class="write-trace-huneum">${targetHuneum}</span>`}
          </div>
        </div>
      </td>
    `;

    return `
      <tr class="row-write-main">
        <td class="col-model">
          <div class="sheet-big-hanja">${targetHanja}</div>
          ${huneumDisplayHtml}
        </td>
        ${traceWriteCellHtml}
        ${blankWriteCellHtml}
        ${blankWriteCellHtml}
      </tr>
      <tr class="row-write-tip">
        <td colspan="4" class="col-tip-bottom">
          <span class="tip-bottom-badge">핵심 암기 포인트</span>
          <span class="tip-bottom-text">${q.analysis}</span>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * 프린트 시트 PART 3: 빈칸(외워 쓰기) 모드일 때 하단 본보기 훈음 정답표를 렌더링합니다.
 */
function renderPrintAnswerKeySection(targetItems, shouldShow) {
  if (!shouldShow) {
    DOM.printAnswerKeySection.style.display = 'none';
    return;
  }

  DOM.printAnswerKeySection.style.display = 'block';
  DOM.printQuickAnswerKey.innerHTML = targetItems.map(item => {
    const q = item.question;
    const { targetHanja, targetHuneum } = extractTargetHanjaAndHuneum(q);
    return `
      <span class="sheet-key-item">
        <strong>${targetHanja}</strong>: ${targetHuneum}
      </span>
    `;
  }).join('');
}

// ==========================================
// 9.7. 맞춤형 종이 시험지 & 핵심 요점 노트 생성기 (영구 데이터화)
// ==========================================
const CIRCLED_NUMS = ['①', '②', '③', '④'];

/**
 * 퀴즈 풀이 화면 상단의 '📝 시험지 담기' 버튼 상태를 현재 문항에 맞게 동기화합니다.
 */
function syncQuizPaperPickButton(questionNumber) {
  if (!DOM.quizPaperPickBtn) return;
  const selectedNums = getSelectedPaperNumbers(state.currentRound);
  const isPicked = selectedNums.includes(Number(questionNumber));
  DOM.quizPaperPickBtn.classList.toggle('is-picked', isPicked);
  DOM.quizPaperPickBtn.innerHTML = isPicked
    ? '✅ 시험지 수록됨'
    : '📝 시험지 담기';
}

/**
 * 실제 대한검정회 준4급 종이 시험지 스타일로 문항 질문문과 제시 한자를 포맷팅합니다.
 */
function formatPaperQuestionStem(question) {
  const qText = question.question || '';
  const hero = question.hero_char || '';

  if (question.type === '한자의 훈음') {
    return {
      instruction: '다음 한자의 훈(뜻)과 음(소리)으로 바른 것은?',
      focusBox: qText || hero,
      isBigHanjaBox: true
    };
  }

  if (question.type === '훈음에 맞는 한자') {
    return {
      instruction: '다음 훈음에 알맞은 한자를 고르시오.',
      focusBox: qText || hero,
      isBigHanjaBox: false
    };
  }

  if (question.type === '어휘의 독음') {
    return {
      instruction: '다음 한자 어휘의 독음으로 바른 것은?',
      focusBox: qText || hero,
      isBigHanjaBox: true
    };
  }

  if (question.type === '어휘의 뜻') {
    return {
      instruction: `다음 한자 어휘의 뜻으로 알맞은 것은?`,
      focusBox: qText || hero,
      isBigHanjaBox: true
    };
  }

  // 문장 속 어휘 독음이나 한자 표기 등 일반 문항
  return {
    instruction: qText,
    focusBox: (hero && !qText.includes(hero) && hero.length <= 6) ? hero : '',
    isBigHanjaBox: false
  };
}

/**
 * 개별 문항을 간략하게 정리한 요점 노트 데이터 구조(Key Point Summary Data)로 변환합니다.
 */
function buildConciseSummaryNoteData(roundId, question) {
  const cfg = ROUNDS_CONFIG[roundId];
  const { targetHanja, targetHuneum, subDetail } = extractTargetHanjaAndHuneum(question);
  const correctOptText = question.options[question.correct_answer - 1] || '';
  const customMemo = getCustomQuestionSummaryNote(roundId, question.number);

  // 핵심 한 줄 요약 생성 (가장 중요한 첫 문장 추출 또는 압축)
  const rawAnalysis = question.analysis || '';
  const concisePoint = rawAnalysis
    .split(/(?<=[.!?])\s+/)
    .slice(0, 2)
    .join(' ');

  const comparisonPairs = Array.isArray(question.comparison)
    ? question.comparison.map(c => ({ char: c.char, desc: c.desc }))
    : [];

  return {
    id: `${roundId}_${question.number}`,
    roundId,
    roundBadge: cfg ? cfg.badgePrefix : `제${roundId}회`,
    number: question.number,
    type: question.type,
    category: question.category || question.type,
    heroHanja: extractMainHanja(question),
    targetHanja,
    targetHuneum,
    subDetail,
    questionText: question.question,
    options: question.options,
    correctAnswerIndex: question.correct_answer,
    correctAnswerCircled: CIRCLED_NUMS[question.correct_answer - 1] || `${question.correct_answer}번`,
    correctOptionText: correctOptText,
    concisePoint,
    fullAnalysis: rawAnalysis,
    comparisonPairs,
    customMemo
  };
}

/**
 * 현재 설정된 회차 범위(roundScope)에 따라 선택된 문항 목록을 가져옵니다.
 * 만약 아직 아무 번호도 선택하지 않았다면, 현재 회차의 오답 기록 문항을 기본 안내용으로 자동 점검합니다.
 */
function getTargetPaperExamItems() {
  const vault = loadPaperVault();
  const roundScope = state.paperExamOptions.roundScope || 'current';
  const targetRoundIds = roundScope === 'all_rounds'
    ? Object.keys(ROUNDS_CONFIG)
    : [state.currentRound];

  const result = [];
  targetRoundIds.forEach(rId => {
    const cfg = ROUNDS_CONFIG[rId];
    if (!cfg) return;
    const dataset = cfg.getQuestions();
    const selectedNums = vault.selectedByRound[rId] || [];
    selectedNums.forEach(num => {
      const q = dataset.find(item => item.number === Number(num));
      if (q) {
        result.push({
          roundId: rId,
          roundBadge: cfg.badgePrefix,
          roundTitle: cfg.title,
          question: q,
          summary: buildConciseSummaryNoteData(rId, q)
        });
      }
    });
  });

  return result;
}

/**
 * 상단 '📝 맞춤시험지·요점노트' 뷰를 화면에 렌더링합니다.
 */
function renderPaperExamView() {
  DOM.quizMain.style.display = 'none';
  DOM.flashcardsView.style.display = 'none';
  DOM.completionView.style.display = 'none';
  if (DOM.reportView) DOM.reportView.style.display = 'none';
  if (DOM.printSheetView) DOM.printSheetView.style.display = 'none';
  if (DOM.paperExamView) DOM.paperExamView.style.display = 'block';

  // 상단 탭 활성화 표시
  const tabs = [DOM.tabAll, DOM.tabConfused, DOM.tabCompound, DOM.tabWrongNote, DOM.tabFlashcard, DOM.tabReport, DOM.tabPrintView, DOM.tabPaperExam];
  tabs.forEach(t => {
    if (t) t.classList.remove('active');
  });
  if (DOM.tabPaperExam) DOM.tabPaperExam.classList.add('active');

  // 만약 현재 회차에 선택된 문항이 0개인데 오답 기록이 존재한다면, 첫 진입 시 오답 문항을 자동 선택해 주어 편의성 향상
  const currentSelected = getSelectedPaperNumbers(state.currentRound);
  const totalSelected = getTotalSelectedPaperCount();
  if (currentSelected.length === 0 && totalSelected === 0) {
    autoSelectWrongQuestionsForCurrentRound(true);
  }

  updateHeaderAndTabCounts();
  renderPaperNumberSelectorGrid();
  renderPaperSavedPresetsBar();
  syncPaperOptionPills();
  renderPaperExamA4Document();
}

/**
 * 옵션 필 버튼들의 활성화 상태를 동기화합니다.
 */
function syncPaperOptionPills() {
  if (DOM.paperScopeRoundGroup) {
    DOM.paperScopeRoundGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.roundscope === state.paperExamOptions.roundScope);
    });
  }
  if (DOM.paperDocTypeGroup) {
    DOM.paperDocTypeGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.doctype === state.paperExamOptions.docType);
    });
  }
  if (DOM.paperNumberingGroup) {
    DOM.paperNumberingGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.numbering === state.paperExamOptions.numbering);
    });
  }
}

/**
 * 1번~50번 문항 선택 그리드 및 상태 배지를 렌더링합니다.
 */
function renderPaperNumberSelectorGrid() {
  const cfg = ROUNDS_CONFIG[state.currentRound];
  const dataset = getCurrentRoundDataset();
  const selectedNums = getSelectedPaperNumbers(state.currentRound);
  const totalSelected = getTotalSelectedPaperCount();
  const wrongMap = loadSavedWrongNote(state.currentRound);
  const telemetry = loadRoundTelemetry(state.currentRound);

  if (DOM.paperCurrentRoundLabel) {
    DOM.paperCurrentRoundLabel.textContent = `${cfg.badgePrefix} 문항 번호 선택 (클릭하여 시험지에 추가/제외)`;
  }
  if (DOM.paperCurrentRoundCount) {
    DOM.paperCurrentRoundCount.textContent = `현재 회차 ${selectedNums.length}문항 선택됨`;
  }
  if (DOM.paperTotalSelectedBadge) {
    DOM.paperTotalSelectedBadge.textContent = `전 회차 총 ${totalSelected}문항 영구 저장됨`;
  }

  if (!DOM.paperNumGrid) return;
  DOM.paperNumGrid.innerHTML = '';

  dataset.forEach(q => {
    const isSelected = selectedNums.includes(q.number);
    const rec = telemetry[q.number];
    const hasWrongRecord = Boolean(wrongMap[q.number]) || Boolean(q.omr_marked) || Boolean(rec && rec.wrongCount > 0);
    const mainHanja = extractMainHanja(q);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'paper-num-chip';
    if (isSelected) btn.classList.add('is-selected');
    if (hasWrongRecord) btn.classList.add('has-wrong-record');

    btn.innerHTML = `
      <span class="chip-num">${q.number}번</span>
      <span class="chip-hanja">${mainHanja}</span>
    `;
    btn.title = `#${q.number}번 [${q.type}] ${mainHanja} — 클릭하여 종이 시험지 선택/해제`;

    btn.addEventListener('click', () => {
      togglePaperQuestionSelection(state.currentRound, q.number);
      renderPaperNumberSelectorGrid();
      renderPaperExamA4Document();
    });

    DOM.paperNumGrid.appendChild(btn);
  });
}

/**
 * 영구 보관함에 저장된 시험지 프리셋 목록을 렌더링합니다.
 */
function renderPaperSavedPresetsBar() {
  if (!DOM.paperPresetsList) return;
  const vault = loadPaperVault();
  const presets = vault.savedExams || [];

  if (presets.length === 0) {
    DOM.paperPresetsList.innerHTML = `
      <span class="preset-empty-hint">아직 저장된 시험지 세트가 없습니다. 문항을 선택한 뒤 상단의 <strong>[📌 선택 세트 보관함에 저장]</strong>을 누르면 언제든 불러올 수 있습니다.</span>
    `;
    return;
  }

  DOM.paperPresetsList.innerHTML = presets.map(preset => `
    <div class="preset-item-pill">
      <button type="button" class="preset-load-btn" data-id="${preset.id}" title="클릭하면 이 시험지 문항 구성을 불러옵니다">
        📋 <strong>${preset.title}</strong> <small>(${preset.totalCount}문항 · ${preset.dateLabel})</small>
      </button>
      <button type="button" class="preset-del-btn" data-id="${preset.id}" title="이 보관 세트 삭제">✕</button>
    </div>
  `).join('');

  DOM.paperPresetsList.querySelectorAll('.preset-load-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      loadPaperExamPresetById(btn.dataset.id);
    });
  });

  DOM.paperPresetsList.querySelectorAll('.preset-del-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      deletePaperExamPresetById(btn.dataset.id);
    });
  });
}

/**
 * 현재 선택된 문항 구성을 이름을 붙여 영구 보관함에 저장합니다.
 */
function saveCurrentPaperExamPreset() {
  const vault = loadPaperVault();
  const totalCount = getTotalSelectedPaperCount();
  if (totalCount === 0) {
    alert('먼저 시험지에 포함할 문항 번호를 1개 이상 선택해 주세요!');
    return;
  }

  const cfg = ROUNDS_CONFIG[state.currentRound];
  const defaultName = `${cfg.badgePrefix} 오답 재시험 (${new Date().toISOString().slice(5, 10)})`;
  const title = prompt('영구 보관함에 저장할 시험지·요점노트 세트 이름을 입력하세요:', defaultName);
  if (!title) return;

  const newPreset = {
    id: `exam_${Date.now()}`,
    title: title.trim(),
    dateLabel: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
    roundId: state.currentRound,
    roundScope: state.paperExamOptions.roundScope,
    selections: JSON.parse(JSON.stringify(vault.selectedByRound)),
    totalCount
  };

  vault.savedExams.unshift(newPreset);
  savePaperVault(vault);
  renderPaperSavedPresetsBar();
}

/**
 * 보관함에 저장된 프리셋을 불러옵니다.
 */
function loadPaperExamPresetById(presetId) {
  const vault = loadPaperVault();
  const target = (vault.savedExams || []).find(p => p.id === presetId);
  if (!target) return;

  vault.selectedByRound = JSON.parse(JSON.stringify(target.selections || {}));
  savePaperVault(vault);

  if (target.roundId && ROUNDS_CONFIG[target.roundId]) {
    state.currentRound = target.roundId;
    if (DOM.roundSelect) DOM.roundSelect.value = target.roundId;
  }
  if (target.roundScope) {
    state.paperExamOptions.roundScope = target.roundScope;
  }

  updateHeaderAndTabCounts();
  renderPaperNumberSelectorGrid();
  syncPaperOptionPills();
  renderPaperExamA4Document();
}

/**
 * 보관함에 저장된 프리셋을 삭제합니다.
 */
function deletePaperExamPresetById(presetId) {
  const vault = loadPaperVault();
  const target = (vault.savedExams || []).find(p => p.id === presetId);
  if (!target) return;
  if (!confirm(`[${target.title}] 보관 세트를 삭제하시겠습니까?`)) return;

  vault.savedExams = vault.savedExams.filter(p => p.id !== presetId);
  savePaperVault(vault);
  renderPaperSavedPresetsBar();
}

/**
 * 현재 회차에서 오답 기록이 있는 문항들을 자동으로 선택합니다.
 */
function autoSelectWrongQuestionsForCurrentRound(silentIfEmpty = false) {
  const dataset = getCurrentRoundDataset();
  const wrongMap = loadSavedWrongNote(state.currentRound);
  const telemetry = loadRoundTelemetry(state.currentRound);

  const wrongNums = [];
  dataset.forEach(q => {
    const rec = telemetry[q.number];
    if (wrongMap[q.number] || q.omr_marked || (rec && rec.wrongCount > 0)) {
      wrongNums.push(q.number);
    }
  });

  if (wrongNums.length === 0) {
    if (!silentIfEmpty) {
      alert('현재 회차에 기록된 웹 오답 문항이 없습니다. 종이 시험지에서 틀린 번호를 아래 번호판에서 직접 클릭하거나 입력해 주세요!');
    }
    return;
  }

  const vault = loadPaperVault();
  const merged = new Set([...(vault.selectedByRound[state.currentRound] || []), ...wrongNums]);
  vault.selectedByRound[state.currentRound] = Array.from(merged).sort((a, b) => a - b);
  savePaperVault(vault);
  updateHeaderAndTabCounts();
  renderPaperNumberSelectorGrid();
  renderPaperExamA4Document();
}

/**
 * 현재 회차의 자형 혼동·두음법칙·다음자·동음이의어 함정 문항들을 자동 선택합니다.
 */
function selectConfusedQuestionsForCurrentRound() {
  const dataset = getCurrentRoundDataset();
  const trapNums = dataset
    .filter(q =>
      q.category === '자형 혼동' ||
      q.category === '두음법칙' ||
      q.category === '다음자(多音字) 독음' ||
      q.category === '동음이의어'
    )
    .map(q => q.number);

  const vault = loadPaperVault();
  const merged = new Set([...(vault.selectedByRound[state.currentRound] || []), ...trapNums]);
  vault.selectedByRound[state.currentRound] = Array.from(merged).sort((a, b) => a - b);
  savePaperVault(vault);
  updateHeaderAndTabCounts();
  renderPaperNumberSelectorGrid();
  renderPaperExamA4Document();
}

/**
 * 사용자가 텍스트 입력창에 입력한 문항 번호 문자열(예: "1, 4, 7-10, 22")을 파싱하여 현재 회차에 적용합니다.
 */
function applyDirectNumberInputToPaperExam() {
  if (!DOM.paperDirectNumberInput) return;
  const raw = DOM.paperDirectNumberInput.value.trim();
  if (!raw) {
    alert('선택할 문항 번호를 입력해 주세요. (예: 2, 5, 11-15, 24)');
    return;
  }

  const dataset = getCurrentRoundDataset();
  const validSet = new Set(dataset.map(q => q.number));
  const picked = new Set(getSelectedPaperNumbers(state.currentRound));

  const tokens = raw.split(/[\s,;]+/).filter(Boolean);
  tokens.forEach(token => {
    if (token.includes('-') || token.includes('~')) {
      const parts = token.split(/[-~]/).map(n => parseInt(n, 10));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        const start = Math.min(parts[0], parts[1]);
        const end = Math.max(parts[0], parts[1]);
        for (let i = start; i <= end; i++) {
          if (validSet.has(i)) picked.add(i);
        }
      }
    } else {
      const num = parseInt(token, 10);
      if (!isNaN(num) && validSet.has(num)) {
        picked.add(num);
      }
    }
  });

  const vault = loadPaperVault();
  vault.selectedByRound[state.currentRound] = Array.from(picked).sort((a, b) => a - b);
  savePaperVault(vault);
  DOM.paperDirectNumberInput.value = '';
  updateHeaderAndTabCounts();
  renderPaperNumberSelectorGrid();
  renderPaperExamA4Document();
}

/**
 * 실제 A4 종이 시험지(2단 다단 레이아웃) + 간략 요점 정리 노트 + 빠른 정답표를 렌더링합니다.
 */
function renderPaperExamA4Document() {
  if (!DOM.paperExamA4Sheet) return;
  const items = getTargetPaperExamItems();
  const cfg = ROUNDS_CONFIG[state.currentRound];
  const docType = state.paperExamOptions.docType || 'exam_and_note';
  const numbering = state.paperExamOptions.numbering || 'original';
  const roundScope = state.paperExamOptions.roundScope || 'current';
  const todayStr = new Date().toISOString().slice(0, 10);

  if (items.length === 0) {
    DOM.paperExamA4Sheet.innerHTML = `
      <div class="paper-empty-state">
        <div class="paper-empty-icon">📝</div>
        <h3>종이 시험지 & 요점 노트로 만들 문항 번호를 선택해 주세요!</h3>
        <p>위의 <strong>1번 ~ 50번 번호 버튼</strong> 중 틀렸거나 다시 시험 치고 싶은 번호를 클릭하면,<br>이곳에 실제 <strong>대한검정회 준4급 종이 시험지</strong>와 <strong>간략 요점 노트</strong>가 즉시 생성됩니다.</p>
      </div>
    `;
    return;
  }

  const showExam = (docType === 'exam_and_note' || docType === 'exam_only');
  const showNote = (docType === 'exam_and_note' || docType === 'note_only');

  const headerScopeTitle = roundScope === 'all_rounds'
    ? `전 회차 통합 오답 재시험 (${items.length}문항)`
    : `${cfg.badgePrefix} 맞춤형 오답 재시험 (${items.length}문항)`;

  // 1) 실전 종이 시험지 영역 (2단 컬럼)
  const examQuestionsHtml = items.map((item, idx) => {
    const q = item.question;
    const displayNum = numbering === 'sequential' ? `${idx + 1}` : `${q.number}`;
    const subOriginTag = (numbering === 'sequential' || roundScope === 'all_rounds')
      ? `<span class="pq-origin-tag">(${item.roundBadge} #${q.number}번)</span>`
      : '';

    const stem = formatPaperQuestionStem(q);
    const focusBoxHtml = stem.focusBox
      ? `<div class="pq-focus-box ${stem.isBigHanjaBox ? 'is-big-hanja' : ''}">${stem.focusBox}</div>`
      : '';

    // 보기 길이에 따라 1줄(4열) 또는 2줄(2열) 또는 4줄(1열) 자동 배치
    const maxOptLen = Math.max(...q.options.map(o => (o || '').length));
    const optGridClass = maxOptLen <= 4
      ? 'pq-options-grid cols-4'
      : maxOptLen <= 10
        ? 'pq-options-grid cols-2'
        : 'pq-options-grid cols-1';

    const optionsHtml = q.options.map((opt, oIdx) => `
      <div class="pq-option-item">
        <span class="pq-opt-circle">${CIRCLED_NUMS[oIdx]}</span>
        <span class="pq-opt-text">${opt}</span>
      </div>
    `).join('');

    return `
      <div class="paper-question-item">
        <div class="pq-stem-line">
          <span class="pq-num">${displayNum}.</span>
          <span class="pq-instruction">${stem.instruction}</span>
          ${subOriginTag}
        </div>
        ${focusBoxHtml}
        <div class="${optGridClass}">
          ${optionsHtml}
        </div>
      </div>
    `;
  }).join('');

  const examSectionHtml = showExam ? `
    <div class="paper-doc-section paper-exam-section">
      <header class="paper-exam-banner">
        <div class="pe-banner-left">
          <div class="pe-org-line">대한검정회 국가공인 한자급수자격검정 대비 · 실전 재시험지</div>
          <h1 class="pe-main-title">준4급 ${headerScopeTitle}</h1>
        </div>
        <table class="pe-Examinee-table">
          <tr>
            <th>응시급수</th>
            <td><strong>준 4 급</strong></td>
            <th>성 명</th>
            <td><strong>안 태 주</strong></td>
          </tr>
          <tr>
            <th>시험일자</th>
            <td>${todayStr}</td>
            <th>점 수</th>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / ${items.length}개 ( &nbsp;&nbsp;&nbsp;&nbsp; 점)</td>
          </tr>
        </table>
      </header>

      <div class="paper-exam-two-col">
        ${examQuestionsHtml}
      </div>
    </div>
  ` : '';

  // 2) 간략 요점 정리 노트 영역 (빨간 동그라미 핵심 요소만 유지 + 한 페이지 최대 수록 + 수기 메모 빈칸)
  const noteRowsHtml = items.map(item => {
    const s = item.summary;

    return `
      <tr class="pn-row">
        <td class="pn-col-num">
          <span class="pn-check-only">☐</span>
        </td>
        <td class="pn-col-target">
          <div class="pn-big-hanja">${s.targetHanja}</div>
          <div class="pn-huneum">${s.targetHuneum}</div>
        </td>
        <td class="pn-col-summary">
          <div class="pn-core-point">
            <span class="pn-point-tag">핵심요점</span>
            <span>${s.concisePoint}</span>
          </div>
          <div class="pn-custom-memo-row">
            <span class="pn-memo-label">✏️ 나의 암기 메모:</span>
            <span class="pn-memo-blank-line"></span>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  const noteSectionHtml = showNote ? `
    <div class="paper-doc-section paper-note-section ${showExam ? 'print-page-break-before' : ''}">
      <div class="sheet-sec-header">
        <h2>💡 핵심 요점 정리 노트 (${items.length}문항 맞춤형 압축 요약 · 영구 데이터 보관)</h2>
        <span class="sheet-sec-count">핵심 요점을 읽고 나만의 암기 메모를 직접 손으로 적어보세요!</span>
      </div>
      <table class="paper-note-table">
        <colgroup>
          <col style="width: 6%;">
          <col style="width: 16%;">
          <col style="width: 78%;">
        </colgroup>
        <thead>
          <tr>
            <th>확인</th>
            <th>핵심 한자</th>
            <th>선생님 한 줄 핵심 요점</th>
          </tr>
        </thead>
        <tbody>
          ${noteRowsHtml}
        </tbody>
      </table>
    </div>
  ` : '';

  // 3) 하단 채점용 빠른 정답표
  const answerKeyHtml = showExam ? `
    <div class="paper-doc-section paper-answer-strip">
      <div class="sheet-sec-header">
        <h2>✂️ 종이 시험지 채점용 빠른 정답표 (절취선 따라 접어두고 채점하세요)</h2>
        <span class="sheet-sec-count">총 ${items.length}문항</span>
      </div>
      <div class="paper-ans-grid">
        ${items.map((item, idx) => {
          const q = item.question;
          const label = numbering === 'sequential'
            ? `${idx + 1}번(#${q.number})`
            : `${item.roundBadge} #${q.number}번`;
          return `
            <div class="paper-ans-cell">
              <span class="pa-num">${label}</span>
              <strong class="pa-val">${CIRCLED_NUMS[q.correct_answer - 1]} ${q.options[q.correct_answer - 1]}</strong>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  ` : '';

  DOM.paperExamA4Sheet.innerHTML = `
    ${examSectionHtml}
    ${noteSectionHtml}
    ${answerKeyHtml}
  `;

  // 사용자 한 줄 메모 입력 시 즉시 영구 저장소에 반영
  DOM.paperExamA4Sheet.querySelectorAll('.pn-memo-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const rId = e.target.dataset.round;
      const qNum = Number(e.target.dataset.qnum);
      saveCustomQuestionSummaryNote(rId, qNum, e.target.value);
    });
  });
}

/**
 * 특정 문서 모드('exam_only' 또는 'note_only')로 전환 후 즉시 인쇄 대화상자를 호출합니다.
 */
function printPaperSpecificDocType(targetDocType) {
  state.paperExamOptions.docType = targetDocType;
  syncPaperOptionPills();
  renderPaperExamA4Document();
  setTimeout(() => {
    window.print();
  }, 80);
}

/**
 * 선택된 모든 회차의 종이 시험지 및 요점 정리 노트 데이터를 JSON 파일로 내보내어 영구 백업합니다.
 */
function exportPaperVaultJsonFile() {
  const vault = loadPaperVault();
  const allRoundsSummaryData = [];

  Object.keys(ROUNDS_CONFIG).forEach(rId => {
    const cfg = ROUNDS_CONFIG[rId];
    const dataset = cfg.getQuestions();
    const nums = vault.selectedByRound[rId] || [];
    nums.forEach(num => {
      const q = dataset.find(item => item.number === Number(num));
      if (q) {
        allRoundsSummaryData.push(buildConciseSummaryNoteData(rId, q));
      }
    });
  });

  const payload = {
    dataType: 'TAEJU_HANJA_PERMANENT_PAPER_EXAM_AND_SUMMARY_VAULT',
    exportedAt: new Date().toISOString(),
    student: '안태주',
    vault,
    structuredSummaryNotes: allRoundsSummaryData
  };

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `안태주_맞춤시험지_요점노트_영구데이터_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * JSON 백업 파일로부터 종이 시험지 & 요점 노트 영구 데이터를 불러와 복원합니다.
 */
function importPaperVaultJsonFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      const incomingVault = parsed.vault || parsed;
      if (!incomingVault || !incomingVault.selectedByRound) {
        alert('유효한 맞춤 시험지·요점노트 데이터 파일이 아닙니다.');
        return;
      }

      const currentVault = loadPaperVault();
      // 기존 선택 번호와 병합하여 데이터가 지워지지 않도록 보호
      Object.keys(incomingVault.selectedByRound).forEach(rId => {
        const merged = new Set([
          ...(currentVault.selectedByRound[rId] || []),
          ...(incomingVault.selectedByRound[rId] || [])
        ]);
        currentVault.selectedByRound[rId] = Array.from(merged).sort((a, b) => a - b);
      });

      currentVault.customNotes = {
        ...currentVault.customNotes,
        ...(incomingVault.customNotes || {})
      };

      const existingIds = new Set((currentVault.savedExams || []).map(x => x.id));
      (incomingVault.savedExams || []).forEach(exam => {
        if (!existingIds.has(exam.id)) {
          currentVault.savedExams.push(exam);
        }
      });

      savePaperVault(currentVault);
      updateHeaderAndTabCounts();
      renderPaperExamView();
      alert('맞춤 시험지 및 요점 노트 데이터가 성공적으로 복원·병합되었습니다!');
    } catch (err) {
      alert('JSON 파일을 읽는 중 오류가 발생했습니다.');
    }
  };
  reader.readAsText(file, 'utf-8');
}

/**
 * 선택된 문항들의 실전 시험지와 요점 정리 노트를 마크다운(.md) 문서로 다운로드합니다.
 */
function downloadPaperExamAndSummaryMarkdown() {
  const items = getTargetPaperExamItems();
  if (items.length === 0) {
    alert('먼저 시험지 및 요점 노트로 만들 문항 번호를 선택해 주세요!');
    return;
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const lines = [
    `# 📝 안태주 학생 맞춤형 종이 재시험지 & 핵심 요점 정리 노트`,
    ``,
    `- **생성 일자**: ${dateStr}`,
    `- **수록 문항 수**: 총 ${items.length}문항`,
    ``,
    `---`,
    ``,
    `## PART 1. 실전 종이 시험지`,
    ``
  ];

  items.forEach((item, idx) => {
    const q = item.question;
    const s = item.summary;
    const stem = formatPaperQuestionStem(q);
    lines.push(`### ${idx + 1}. [${s.roundBadge} #${q.number}번] ${stem.instruction}`);
    if (stem.focusBox) {
      lines.push(`> **【 ${stem.focusBox} 】**`);
    }
    lines.push(
      q.options.map((opt, oIdx) => `${CIRCLED_NUMS[oIdx]} ${opt}`).join('   ')
    );
    lines.push(``);
  });

  lines.push(`---`);
  lines.push(``);
  lines.push(`## PART 2. 간략 요점 정리 노트 (핵심 데이터)`);
  lines.push(``);
  lines.push(`| 회차·번호 | 핵심 한자 | 훈음 / 정답 | 핵심 요점 정리 | 짝꿍 비교 한자 | 나의 메모 |`);
  lines.push(`| :---: | :---: | :--- | :--- | :--- | :--- |`);

  items.forEach(item => {
    const s = item.summary;
    const pairsText = s.comparisonPairs.map(p => `${p.char}(${p.desc})`).join(' / ');
    lines.push(
      `| **${s.roundBadge} #${s.number}번** | **${s.targetHanja}** | ${s.targetHuneum} (${s.correctAnswerCircled} ${s.correctOptionText}) | ${s.concisePoint} | ${pairsText} | ${s.customMemo || '-'} |`
    );
  });

  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`## PART 3. 채점용 정답표`);
  lines.push(``);
  lines.push(
    items.map((item, idx) => `- **${idx + 1}번 (${item.roundBadge} #${item.question.number}번)**: ${item.summary.correctAnswerCircled} ${item.summary.correctOptionText}`).join('\n')
  );

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `안태주_맞춤종이시험지_요점노트_${dateStr.replace(/-/g, '')}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==========================================
// 10. 캔버스 컨페티 파티클 시스템
// ==========================================
function fireConfetti(amount = 50) {
  const canvas = DOM.confettiCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#F43F5E', '#FFFFFF'];

  for (let i = 0; i < amount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4;
      p.alpha -= 0.015;
      p.rotation += p.vRot;

      if (p.alpha > 0) {
        activeCount++;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

// ==========================================
// 11. 이벤트 리스너 등록
// ==========================================
function attachEventListeners() {
  // 회차 전환 드롭다운 이벤트
  if (DOM.roundSelect) {
    DOM.roundSelect.addEventListener('change', (e) => {
      switchRound(e.target.value);
    });
  }

  // 탭 전환 이벤트
  const tabs = [DOM.tabAll, DOM.tabConfused, DOM.tabCompound, DOM.tabWrongNote, DOM.tabFlashcard, DOM.tabReport, DOM.tabPrintView, DOM.tabPaperExam].filter(Boolean);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.dataset.mode;
      if (mode === 'flashcards') {
        renderFlashcards();
      } else if (mode === 'report') {
        renderReportView();
      } else if (mode === 'print_view') {
        renderPrintSheetView();
      } else if (mode === 'paper_exam') {
        renderPaperExamView();
      } else {
        initQuiz(mode);
      }
    });
  });

  // 맞춤 종이 시험지 & 요점 노트 컨트롤 이벤트 연결
  if (DOM.btnOpenPaperExamFromReport) {
    DOM.btnOpenPaperExamFromReport.addEventListener('click', renderPaperExamView);
  }
  if (DOM.quizPaperPickBtn) {
    DOM.quizPaperPickBtn.addEventListener('click', () => {
      const currentQ = state.activeQuestions[state.currentIndex];
      if (!currentQ) return;
      togglePaperQuestionSelection(state.currentRound, currentQ.number);
      syncQuizPaperPickButton(currentQ.number);
    });
  }
  if (DOM.btnPaperSelectWrong) {
    DOM.btnPaperSelectWrong.addEventListener('click', () => autoSelectWrongQuestionsForCurrentRound(false));
  }
  if (DOM.btnPaperSelectConfused) {
    DOM.btnPaperSelectConfused.addEventListener('click', selectConfusedQuestionsForCurrentRound);
  }
  if (DOM.btnPaperSelectAll) {
    DOM.btnPaperSelectAll.addEventListener('click', () => {
      const dataset = getCurrentRoundDataset();
      const vault = loadPaperVault();
      vault.selectedByRound[state.currentRound] = dataset.map(q => q.number);
      savePaperVault(vault);
      updateHeaderAndTabCounts();
      renderPaperNumberSelectorGrid();
      renderPaperExamA4Document();
    });
  }
  if (DOM.btnPaperClearRound) {
    DOM.btnPaperClearRound.addEventListener('click', () => {
      const vault = loadPaperVault();
      vault.selectedByRound[state.currentRound] = [];
      savePaperVault(vault);
      updateHeaderAndTabCounts();
      renderPaperNumberSelectorGrid();
      renderPaperExamA4Document();
    });
  }
  if (DOM.btnApplyDirectNumbers) {
    DOM.btnApplyDirectNumbers.addEventListener('click', applyDirectNumberInputToPaperExam);
  }
  if (DOM.paperDirectNumberInput) {
    DOM.paperDirectNumberInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyDirectNumberInputToPaperExam();
      }
    });
  }
  if (DOM.btnSavePaperPreset) {
    DOM.btnSavePaperPreset.addEventListener('click', saveCurrentPaperExamPreset);
  }
  if (DOM.btnExportPaperJson) {
    DOM.btnExportPaperJson.addEventListener('click', exportPaperVaultJsonFile);
  }
  if (DOM.btnImportPaperJson && DOM.paperJsonFileInput) {
    DOM.btnImportPaperJson.addEventListener('click', () => DOM.paperJsonFileInput.click());
    DOM.paperJsonFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        importPaperVaultJsonFile(file);
        e.target.value = '';
      }
    });
  }
  if (DOM.btnDownloadPaperMd) {
    DOM.btnDownloadPaperMd.addEventListener('click', downloadPaperExamAndSummaryMarkdown);
  }
  if (DOM.paperScopeRoundGroup) {
    DOM.paperScopeRoundGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.paperExamOptions.roundScope = btn.dataset.roundscope;
        syncPaperOptionPills();
        renderPaperExamA4Document();
      });
    });
  }
  if (DOM.paperDocTypeGroup) {
    DOM.paperDocTypeGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.paperExamOptions.docType = btn.dataset.doctype;
        syncPaperOptionPills();
        renderPaperExamA4Document();
      });
    });
  }
  if (DOM.paperNumberingGroup) {
    DOM.paperNumberingGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.paperExamOptions.numbering = btn.dataset.numbering;
        syncPaperOptionPills();
        renderPaperExamA4Document();
      });
    });
  }
  if (DOM.btnPrintPaperExamOnly) {
    DOM.btnPrintPaperExamOnly.addEventListener('click', () => printPaperSpecificDocType('exam_only'));
  }
  if (DOM.btnPrintPaperNoteOnly) {
    DOM.btnPrintPaperNoteOnly.addEventListener('click', () => printPaperSpecificDocType('note_only'));
  }
  if (DOM.btnPrintPaperCurrentView) {
    DOM.btnPrintPaperCurrentView.addEventListener('click', () => window.print());
  }

  // 프린트 전용 뷰(A4 요약장) 컨트롤 이벤트 연결
  if (DOM.btnOpenPrintViewFromReport) {
    DOM.btnOpenPrintViewFromReport.addEventListener('click', renderPrintSheetView);
  }
  if (DOM.btnBackToReportFromPrint) {
    DOM.btnBackToReportFromPrint.addEventListener('click', renderReportView);
  }
  if (DOM.btnPrintPart1Only) {
    DOM.btnPrintPart1Only.addEventListener('click', () => printSpecificPart('part1'));
  }
  if (DOM.btnPrintPart2Only) {
    DOM.btnPrintPart2Only.addEventListener('click', () => printSpecificPart('part2'));
  }
  if (DOM.btnExecutePrintSheet) {
    DOM.btnExecutePrintSheet.addEventListener('click', () => window.print());
  }
  if (DOM.printPartGroup) {
    DOM.printPartGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.printOptions.part = btn.dataset.part;
        renderPrintSheetView();
      });
    });
  }
  if (DOM.printScopeGroup) {
    DOM.printScopeGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.printOptions.scope = btn.dataset.scope;
        renderPrintSheetView();
      });
    });
  }
  if (DOM.printMaskGroup) {
    DOM.printMaskGroup.querySelectorAll('.print-opt-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.printOptions.maskAnswer = (btn.dataset.mask === 'true');
        renderPrintSheetView();
      });
    });
  }

  // 리포트 액션 버튼들 이벤트 연결
  if (DOM.btnPrintReport) {
    DOM.btnPrintReport.addEventListener('click', () => window.print());
  }
  if (DOM.btnDownloadMdReport) {
    DOM.btnDownloadMdReport.addEventListener('click', downloadMarkdownReport);
  }
  if (DOM.btnDownloadJsonData) {
    DOM.btnDownloadJsonData.addEventListener('click', downloadJsonTelemetry);
  }
  if (DOM.btnResetTelemetry) {
    DOM.btnResetTelemetry.addEventListener('click', resetRoundLearningData);
  }
  if (DOM.btnStartWeakClinic) {
    DOM.btnStartWeakClinic.addEventListener('click', startWeakQuestionsClinic);
  }
  if (DOM.openReportFromCompletionBtn) {
    DOM.openReportFromCompletionBtn.addEventListener('click', renderReportView);
  }
  if (DOM.reportTableFilters) {
    DOM.reportTableFilters.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const filterKey = btn.dataset.filter;
        const report = buildFeedbackReportData(state.currentRound);
        renderReportAllQuestionsTable(report, filterKey);
      });
    });
  }

  // 번호 이동 패널 토글
  DOM.jumpToggleBtn.addEventListener('click', () => {
    const isHidden = DOM.questionJumpPanel.style.display === 'none';
    DOM.questionJumpPanel.style.display = isHidden ? 'block' : 'none';
  });

  // 힌트 토글 (열람 시 학습 텔레메트리에 기록)
  DOM.hintTriggerBtn.addEventListener('click', () => {
    const isHidden = DOM.hintBox.style.display === 'none';
    DOM.hintBox.style.display = isHidden ? 'flex' : 'none';
    DOM.hintTriggerBtn.textContent = isHidden ? '🙈 힌트 닫기' : '💡 힌트 보기';

    if (isHidden) {
      const currentQuestion = state.activeQuestions[state.currentIndex];
      if (currentQuestion) {
        recordHintUsage(state.currentRound, currentQuestion.number);
      }
    }
  });

  // 이전/다음 문제 버튼
  if (DOM.prevQuestionBtn) {
    DOM.prevQuestionBtn.addEventListener('click', moveToPrevQuestion);
  }
  DOM.nextQuestionBtn.addEventListener('click', moveToNextQuestion);

  // 사운드 토글
  DOM.soundToggle.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    DOM.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
  });

  // 다시 풀기 버튼들
  DOM.restartQuizBtn.addEventListener('click', () => {
    initQuiz(state.currentMode);
  });

  DOM.retryWrongOnlyBtn.addEventListener('click', () => {
    state.activeQuestions = [...state.missedInSession];
    state.currentIndex = 0;
    state.score = 0;
    state.missedInSession = [];
    state.sessionHistory = {};
    state.streak = 0;
    DOM.quizMain.style.display = 'block';
    DOM.completionView.style.display = 'none';
    renderCurrentQuestion();
  });

  // 키보드 단축키 지원 (1, 2, 3, 4, Enter, Space)
  window.addEventListener('keydown', (e) => {
    if (DOM.quizMain.style.display === 'none') return;

    if (!state.isAnswered) {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const selected = parseInt(e.key, 10);
        handleOptionSelect(selected);
      }
    } else {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        moveToNextQuestion();
      }
    }
  });

  // 윈도우 리사이즈 시 캔버스 크기 조정
  window.addEventListener('resize', () => {
    if (DOM.confettiCanvas) {
      DOM.confettiCanvas.width = window.innerWidth;
      DOM.confettiCanvas.height = window.innerHeight;
    }
  });
}

// ==========================================
// 12. 앱 기동 (Entry Point)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initPermanentPaperStorage();
  attachEventListeners();
  switchRound('111_full');
});
