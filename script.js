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

function renderState() {
  const modeLabel = appState.mode === 'work' ? 'Work' : 'Short Break';

  elements.app.classList.toggle('app--work', appState.mode === 'work');
  elements.app.classList.toggle('app--break', appState.mode === 'shortBreak');

  elements.mode.textContent = modeLabel;
  elements.display.textContent = formatTime(appState.timeLeft);
  elements.pomodoroCount.textContent = String(appState.completedPomodoros);
  elements.status.textContent = appState.isRunning ? 'Trabajo en curso' : 'Listo para empezar';
}

renderState();
