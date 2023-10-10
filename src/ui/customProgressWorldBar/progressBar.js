let countClick = 0

const multi_step = document.getElementById('multi-step')

function nextProgressWorldStep() {
  countClick += 1

  let multi_step_childrensLength = multi_step.children.length // ex: 4

  Object.keys(multi_step.children).map((index) => {
    let stepElement = multi_step.children[index] // html element
    let stepElementStepId = stepElement.getAttribute('id') // step-1
    let stepElementId = Number(stepElementStepId.substring(5)) // 1

    if (index == countClick) {
      let actual_step_element = document.getElementById('step-' + stepElementId)
      let ancien_step_element = document.getElementById('step-' + (stepElementId - 1))

      if (countClick === 1) {
        console.log('debut') // step => 1
        ancien_step_element.classList.remove('is-active')
        ancien_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)'
        ancien_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)'
        actual_step_element.classList.add('is-active')
        // return
      } else {
        if (stepElementId !== multi_step_childrensLength) {
          ancien_step_element.classList.remove('is-active')
          ancien_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)'
          ancien_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)'
          actual_step_element.classList.add('is-active')
          // return
        } else {
          ancien_step_element.classList.remove('is-active')
          actual_step_element.classList.add('is-active')
          console.log('fin')
          // return
        }
      }
    }

    // console.log(stepElementId)
  })
  // console.log('Launched')
  // if (step === 'step1') {
  //   step = 'step2'
  //   step1.classList.remove('is-active')
  //   step1.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)'
  //   step1.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)'
  //   step2.classList.add('is-active')
  // } else if (step === 'step4') {
  //   step = 'complete'
  //   step4.classList.remove('is-active')
  // }
}

// function nextProgressWorldStep() {
//   if (step === 'step1') {
//     step = 'step2';
//     step1.classList.remove('is-active');
//     step1.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)';
//     step1.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)';
//     step2.classList.add('is-active');
//   } else if (step === 'step2') {
//     step = 'step3';
//     step2.classList.remove('is-active');
//     step2.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)';
//     step2.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)';
//     step3.classList.add('is-active');
//   } else if (step === 'step3') {
//     step = 'step4';
//     step3.classList.remove('is-active');
//     step3.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)';
//     step4.classList.add('is-active');
//   } else if (step === 'step4') {
//     step = 'complete';
//     step4.classList.remove('is-active');
//   }
//   console.log("Launched");
// }
