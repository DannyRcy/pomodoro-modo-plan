const WORK_DURATION = 25 * 60;
const SHORT_BREAK_DURATION = 5 * 60;
const DEFAULT_MODE = 'work';

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
  timerId: null
};

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function getModeDuration(mode) {
  return mode === 'work' ? WORK_DURATION : SHORT_BREAK_DURATION;
}

function clearTimerInterval() {
  if (appState.timerId !== null) {
    clearInterval(appState.timerId);
    appState.timerId = null;
  }
}

function renderState() {
  const modeLabel = appState.mode === 'work' ? 'Work' : 'Short Break';
  const statusMessage = appState.isRunning
    ? appState.mode === 'work'
      ? 'Trabajo en curso'
      : 'Descanso corto'
    : 'Listo para empezar';

  elements.app.classList.toggle('app--work', appState.mode === 'work');
  elements.app.classList.toggle('app--break', appState.mode === 'shortBreak');

  elements.mode.textContent = modeLabel;
  elements.display.textContent = formatTime(appState.timeLeft);
  elements.pomodoroCount.textContent = String(appState.completedPomodoros);
  elements.status.textContent = statusMessage;
}

function startTimer() {
  if (appState.isRunning) {
    return;
  }

  appState.isRunning = true;
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
  clearTimerInterval();
  appState.timeLeft = getModeDuration(appState.mode);
  renderState();
}

function switchMode(nextMode) {
  appState.mode = nextMode;
  appState.isRunning = false;
  appState.timeLeft = getModeDuration(nextMode);
  clearTimerInterval();
  renderState();
}

function completeCycle() {
  clearTimerInterval();
  appState.isRunning = false;

  const nextMode = appState.mode === 'work' ? 'shortBreak' : 'work';
  switchMode(nextMode);

  if (nextMode === 'work') {
    appState.timeLeft = getModeDuration('work');
  } else {
    appState.timeLeft = getModeDuration('shortBreak');
  }

  startTimer();
}

renderState();
