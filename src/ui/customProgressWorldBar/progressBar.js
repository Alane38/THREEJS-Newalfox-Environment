let step = 'step1'

const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');

function next() {
  if (step === 'step1') {
    step = 'step2';
    step1.classList.remove('is-active');
    step1.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)';
    step1.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)';
    step2.classList.add('is-active');
  } else if (step === 'step2') {
    step = 'step3';
    step2.classList.remove('is-active');
    step2.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)';
    step2.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)';
    step3.classList.add('is-active');
  } else if (step === 'step3') {
    step = 'step4';
    step3.classList.remove('is-active');
    step3.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)';
    step4.classList.add('is-active');
  } else if (step === 'step4') {
    step = 'complete';
    step4.classList.remove('is-active');
  }
  console.log("Launched");
}
