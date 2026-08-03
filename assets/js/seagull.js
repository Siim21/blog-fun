function spawnSeagull() {
  const seagull = document.createElement('div');
  seagull.className = 'flying-seagull';
  seagull.style.top = Math.random() * 60 + 10 + '%'; // random vertical position
  document.body.appendChild(seagull);

  seagull.addEventListener('click', () => {
  const rect = seagull.getBoundingClientRect();
  seagull.style.left = rect.left + 'px';
  seagull.style.animation = 'none';

  void seagull.offsetWidth; // force reflow

  seagull.style.animation = ''; // clear the inline override so .falling's CSS animation can apply
  seagull.classList.add('falling');
  setTimeout(() => seagull.remove(), 1500);
});

  // remove it if it flies off-screen without being clicked
  seagull.addEventListener('animationend', (e) => {
    if (e.animationName === 'fly-across') seagull.remove();
  });
}

let first_seagull = true;
function scheduleNextSeagull() {
  let delay;

  if(first_seagull){
    delay = 3000; 
  } else{
    delay = Math.random() * 15000 + 30000;
  }

  first_seagull = false;

  setTimeout(() => {
    spawnSeagull();
    scheduleNextSeagull();
  }, delay);
}

scheduleNextSeagull();