const isPrime = num => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if(num % i === 0) {
      return false;
    }
  }
  return num > 1;
};

const getNextPrime = (lastNum) => {
  let num = lastNum + 1;
  while (!isPrime(num)) {
    num++;
  }
  return num;
};

let primeNum = 1;

const SOURCES_MAP = {};

setInterval(() => {
  const sourceEntries = Object.entries(SOURCES_MAP);
  if (sourceEntries.length <= 0) {
    return;
  }
  primeNum = getNextPrime(primeNum);
  sourceEntries.forEach(([, source]) => {
    source.postMessage(primeNum);
  });
}, 1000);

const startSendingNums = (source) => {
  SOURCES_MAP[source.id] = source;
};

const stopSendingNums = (source) => {
  delete SOURCES_MAP[source.id];
};

const resetSendingNums = (source) => {
  stopSendingNums(source);
  primeNum = 1;
  startSendingNums(source);
};

self.addEventListener('message', (ev) => {
  switch (ev.data) {
    case 'RECEIVE_NUMBERS':
      startSendingNums(ev.source);
      break;

    case 'STOP_RECEIVING_NUMBERS':
      stopSendingNums(ev.source);
      break;

    case 'RESET_RECEIVING_NUMBERS':
      resetSendingNums(ev.source);
      break;
  }
});
