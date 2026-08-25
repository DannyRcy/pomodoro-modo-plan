const elements = {
  mode: document.getElementById('timer-mode'),
  display: document.getElementById('timer-display'),
  startBtn: document.getElementById('start-btn'),
  pauseBtn: document.getElementById('pause-btn'),
  resetBtn: document.getElementById('reset-btn'),
  status: document.getElementById('timer-status'),
  pomodoroCount: document.getElementById('pomodoro-count')
};

const appState = {
  mode: 'work',
  isRunning: false,
  timeLeft: 25 * 60,
  completedPomodoros: 0
};

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderInitialState() {
  elements.mode.textContent = appState.mode === 'work' ? 'Work' : 'Short Break';
  elements.display.textContent = formatTime(appState.timeLeft);
  elements.pomodoroCount.textContent = String(appState.completedPomodoros);
  elements.status.textContent = 'Listo para empezar';
}

renderInitialState();
