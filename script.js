const WORK_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const DEFAULT_MODE = 'work';
const TRANSITION_DELAY_MS = 800;

const elements = {
  app: document.getElementById('app'),
  mode: document.getElementById('timer-mode'),
  display: document.getElementById('timer-display'),
  startBtn: document.getElementById('start-btn'),
  pauseBtn: document.getElementById('pause-btn'),
  resetBtn: document.getElementById('reset-btn'),
  status: document.getElementById('timer-status'),
  pomodoroCount: document.getElementById('pomodoro-count')
};

const appState = {
  mode: DEFAULT_MODE,
  isRunning: false,
  timeLeft: WORK_DURATION,
  completedPomodoros: 0,
  timerId: null,
  isCycleComplete: false,
  audioContext: null
};

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getModeDuration(mode) {
  return mode === 'work' ? WORK_DURATION : SHORT_BREAK_DURATION;
}

function updateTabTitle() {
  const modePrefix = appState.mode === 'work' ? 'Work' : 'Break';
  const timeText = formatTime(appState.timeLeft);

  if (appState.isCycleComplete) {
    document.title = '¡Tiempo!';
    return;
  }

  document.title = `${modePrefix} - ${timeText}`;
}

function clearTimerInterval() {
  if (appState.timerId !== null) {
    clearInterval(appState.timerId);
    appState.timerId = null;
  }
}

function renderState() {
  const modeLabel = appState.mode === 'work' ? 'Work' : 'Short Break';
  let statusMessage = 'Listo para empezar';

  if (appState.isCycleComplete) {
    statusMessage = 'Ciclo completado';
  } else if (appState.isRunning) {
    statusMessage = appState.mode === 'work' ? 'Trabajo en curso' : 'Descanso corto';
  }

  elements.app.classList.toggle('app--work', appState.mode === 'work');
  elements.app.classList.toggle('app--break', appState.mode === 'shortBreak');
  elements.app.classList.toggle('app--cycle-finished', appState.isCycleComplete);

  elements.mode.textContent = modeLabel;
  elements.display.textContent = formatTime(appState.timeLeft);
  elements.pomodoroCount.textContent = String(appState.completedPomodoros);
  elements.status.textContent = statusMessage;
  updateTabTitle();
}

function playCompletionTone() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  try {
    if (!appState.audioContext) {
      appState.audioContext = new AudioContextClass();
    }

    const oscillator = appState.audioContext.createOscillator();
    const gainNode = appState.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, appState.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(660, appState.audioContext.currentTime + 0.18);

    gainNode.gain.setValueAtTime(0.0001, appState.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.08, appState.audioContext.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, appState.audioContext.currentTime + 0.35);

    oscillator.connect(gainNode);
    gainNode.connect(appState.audioContext.destination);

    oscillator.start();
    oscillator.stop(appState.audioContext.currentTime + 0.35);
  } catch (error) {
    console.warn('No se pudo reproducir la notificación sonora:', error);
  }
}

function startTimer() {
  if (appState.isRunning) {
    return;
  }

  appState.isRunning = true;
  appState.isCycleComplete = false;
  renderState();

  appState.timerId = setInterval(() => {
    if (!appState.isRunning) {
      return;
    }

    appState.timeLeft -= 1;

    if (appState.timeLeft <= 0) {
      appState.timeLeft = 0;
      completeCycle();
      return;
    }

    renderState();
  }, 1000);
}

function pauseTimer() {
  if (!appState.isRunning) {
    return;
  }

  appState.isRunning = false;
  clearTimerInterval();
  renderState();
}

function resetTimer() {
  appState.isRunning = false;
  appState.isCycleComplete = false;
  clearTimerInterval();
  appState.timeLeft = getModeDuration(appState.mode);
  renderState();
}

function switchMode(nextMode) {
  appState.mode = nextMode;
  appState.isRunning = false;
  appState.isCycleComplete = false;
  appState.timeLeft = getModeDuration(nextMode);
  clearTimerInterval();
  renderState();
}

function completeCycle() {
  clearTimerInterval();
  appState.isRunning = false;

  if (appState.mode === 'work') {
    appState.completedPomodoros += 1;
  }

  appState.isCycleComplete = true;
  playCompletionTone();
  renderState();

  const nextMode = appState.mode === 'work' ? 'shortBreak' : 'work';

  window.setTimeout(() => {
    switchMode(nextMode);
    startTimer();
  }, TRANSITION_DELAY_MS);
}

function bindControlEvents() {
  elements.startBtn.addEventListener('click', function () {
    if (!appState.isRunning) {
      startTimer();
    }
  });

  elements.pauseBtn.addEventListener('click', function () {
    pauseTimer();
  });

  elements.resetBtn.addEventListener('click', function () {
    resetTimer();
  });
}

bindControlEvents();
renderState();
