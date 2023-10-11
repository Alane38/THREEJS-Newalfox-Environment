const _DEBUG_ = false

let stepUsed = 0

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
      SetProgressWorldStep(multi_step.children[index].getAttribute('value'))
    })
  }
})

// Next step
function nextProgressWorldStep() {
  if (_DEBUG_) {
    console.log('next')
  }

  let multi_step_childrensLength = multi_step.children.length - 1 // ex: 3

  if (stepUsed === multi_step_childrensLength) {
    if (_DEBUG_) {
      console.log('end')
    }

    ResetProgressWorldStep()
    return
  }

  stepUsed += 1

  Object.keys(multi_step.children).map((index) => {
    let stepElement = multi_step.children[index] // html element
    let stepElementStepId = stepElement.getAttribute('id') // step-1
    let stepElementId = Number(stepElementStepId.substring(5)) // 1

    if (index == stepUsed) {
      let actual_step_element = document.getElementById('step-' + stepElementId)
      let ancien_step_element = document.getElementById('step-' + (stepElementId - 1))

      ancien_step_element.classList.remove('is-active')
      ancien_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)'
      ancien_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)'
      actual_step_element.classList.add('is-active')
    }
  })

  if (_DEBUG_) {
    console.log(stepUsed)
  }
}

// Reset to default steps
function ResetProgressWorldStep() {
  stepUsed = 0

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
    console.log(stepUsed)
  }
}

// Set custom step
function SetProgressWorldStep(step) {
  stepUsed = Number(step)

  Object.keys(multi_step.children).map((index) => {
    let stepElement = multi_step.children[index] // html element
    let stepElementStepId = stepElement.getAttribute('id') // step-1
    let stepElementId = Number(stepElementStepId.substring(5)) // 1

    let actual_step_element = document.getElementById('step-' + stepElementId)
    let ancien_step_element = document.getElementById('step-' + (stepElementId - 1))

    // TODO: A FIX ICI (Cliquer sur le dernier step pour voir l'erreur)
    if (index <= stepUsed) {
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
    console.log(stepUsed)
  }
}

// Get progress world step
function GetProgressWorldStep() {
  return stepUsed
}

// Get the max step (length)
function GetMaxStep() {
  return multi_step.children.length
}

// Get step data with position cube/platform world
function SetStepDatasWithPlatformHeight(maxStep, platformHeight, cubePositionZ) {
  const actualStep = GetProgressWorldStep()
  const calculStepDistance = platformHeight / GetMaxStep()
  const stepDatas = []
  // let lastPositionZ = 0

  let stepDistanceValue = 0

  // boucle ajoutant la distance à l'étape selon la taille de la plateforme
  for (let step = 1; step <= maxStep; step++) {
    if (stepDistanceValue === 0) {
      stepDatas.push({
        stepValue: step,
        distance: calculStepDistance
      })
      stepDistanceValue = calculStepDistance
    } else {
      stepDatas.push({
        stepValue: step,
        distance: stepDistanceValue += calculStepDistance
      })
      stepDistanceValue += calculStepDistance
    }
  }

  stepDatas.forEach((element) => {
    const data = element

    if (Number(cubePositionZ) == data.distance || Number(cubePositionZ) >= data.distance) {
      console.log('distance atteinte: ' + data.distance)
      SetProgressWorldStep(data.stepValue)
    }

    // vérifier si l'étape ou l'on est, est = à l'étape du foreach
    if (actualStep == data.stepValue) {
      console.log(actualStep)
    }
  })

  // console.log(stepDatas)
}

export { SetProgressWorldStep, GetMaxStep, ResetProgressWorldStep, SetStepDatasWithPlatformHeight, GetProgressWorldStep }
