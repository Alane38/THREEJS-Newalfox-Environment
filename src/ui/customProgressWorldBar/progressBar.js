const _DEBUG_ = false

let countClick = 0

const multi_step = document.getElementById('multi-step')

// Initialisation click add functions
Object.keys(multi_step.children).map((index) => {
  let stepElement = multi_step.children[index] // html element
  let stepElementStepId = stepElement.getAttribute('id') // step-1
  let stepElementId = Number(stepElementStepId.substring(5)) // 1

  if (stepElementId === 1) {
    if (_DEBUG_) {
      console.log('start init')
    }

    stepElement.addEventListener('click', () => {
      nextProgressWorldStep()
    })
  } else {
    if (_DEBUG_) {
      console.log('next continue init')
    }

    stepElement.setAttribute('value', index)

    stepElement.addEventListener('click', () => {
      setProgressWorldStep(multi_step.children[index].getAttribute('value'))
    })
  }
})

// Next step
function nextProgressWorldStep() {
  if (_DEBUG_) {
    console.log('next')
  }

  let multi_step_childrensLength = multi_step.children.length - 1 // ex: 3

  if (countClick === multi_step_childrensLength) {
    if (_DEBUG_) {
      console.log('end')
    }

    resetProgressWorldStep()
    return
  }

  countClick += 1


  Object.keys(multi_step.children).map((index) => {
    let stepElement = multi_step.children[index] // html element
    let stepElementStepId = stepElement.getAttribute('id') // step-1
    let stepElementId = Number(stepElementStepId.substring(5)) // 1

    if (index == countClick) {
      let actual_step_element = document.getElementById('step-' + stepElementId)
      let ancien_step_element = document.getElementById('step-' + (stepElementId - 1))

      ancien_step_element.classList.remove('is-active')
      ancien_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)'
      ancien_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)'
      actual_step_element.classList.add('is-active')
    }
  })

  if (_DEBUG_) {
    console.log(countClick)
  }
}

// Reset to default steps
function resetProgressWorldStep() {
  countClick = 0

  Object.keys(multi_step.children).map((index) => {
    let stepElement = multi_step.children[index] // html element
    let stepElementStepId = stepElement.getAttribute('id') // step-1
    let stepElementId = Number(stepElementStepId.substring(5)) // 1

    let actual_step_element = document.getElementById('step-' + stepElementId)
    let ancien_step_element = document.getElementById('step-' + (stepElementId - 1))

    if (stepElementId == 1) {
      actual_step_element.classList.add('is-active')
    } else {
      actual_step_element.classList.remove('is-active')
      ancien_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(0%)'
      ancien_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(0%)'
    }
  })

  if (_DEBUG_) {
    console.log('reset')
  }

  if (_DEBUG_) {
    console.log(countClick)
  }
}

// Set custom step
function setProgressWorldStep(step) {
  countClick = Number(step)

  Object.keys(multi_step.children).map((index) => {
    let stepElement = multi_step.children[index] // html element
    let stepElementStepId = stepElement.getAttribute('id') // step-1
    let stepElementId = Number(stepElementStepId.substring(5)) // 1

    let actual_step_element = document.getElementById('step-' + stepElementId)
    let ancien_step_element = document.getElementById('step-' + (stepElementId - 1))

    // TODO: A FIX ICI (Cliquer sur le dernier step pour voir l'erreur)
    if (index <= countClick) {
      actual_step_element.classList.remove('is-active')
      actual_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)'
      actual_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)'
    } else {
      ancien_step_element.classList.add('is-active')
      ancien_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(0%)'
      ancien_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(0%)'
    }
  })

  if (_DEBUG_) {
    console.log(countClick)
  }
}

// Get the max step (length)
function getMaxStep() {
  return multi_step.children.length
}

export { setProgressWorldStep, getMaxStep, resetProgressWorldStep }