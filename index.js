const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.getRegistration('sw.js');

      if (!reg) {
        await navigator.serviceWorker.register('sw.js');
        window.location.reload();
      }

      const targetEl = document.getElementById('num');
      const reloadBtn = document.getElementById('reload-btn');

      navigator.serviceWorker.addEventListener('message', (ev) => {
        const num = ev.data;
        targetEl.innerText = `Current num is ${num}`;
      });

      reg.active.postMessage('RECEIVE_NUMBERS');

      window.addEventListener('beforeunload', () => {
        reg.active.postMessage('STOP_RECEIVING_NUMBERS');
      });

      reloadBtn.addEventListener('click', () => {
        reg.active.postMessage('RESET_RECEIVING_NUMBERS');
      });
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();
