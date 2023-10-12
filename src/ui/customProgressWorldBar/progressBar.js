import { camera, cube, platform } from '../../builder'

const _DEBUG_ = false

const stepDatas = []

let stepUsed = 0

const next_step_button = document.getElementById('next_step_button')
const multi_step = document.getElementById('multi-step')

const multi_step_childrensLength = multi_step.children.length - 1

// Initialisation click add functions
next_step_button.addEventListener('click', () => {
  nextProgressWorldStep()
})

Object.keys(multi_step.children).map((index) => {
  let stepElement = multi_step.children[index] // html element
  let stepElementStepId = stepElement.getAttribute('id') // step-1
  let stepElementId = Number(stepElementStepId.substring(5)) // 1

  if (_DEBUG_) {
    console.log('next continue init')
  }

  stepElement.setAttribute('value', stepElementId)

  stepElement.addEventListener('click', () => {
    SetProgressWorldStep(stepElement.getAttribute('value'))
  })
})

// Set data on stepDatas with the platform height
const calculStepDistance = platform.getPlatformGeometryHeight() / multi_step_childrensLength

let stepDistanceValue = 0

// boucle ajoutant la distance à l'étape selon la taille de la plateforme
for (let step = 0; step <= multi_step_childrensLength; step++) {
  if (stepDistanceValue === 0) {
    stepDatas.push({
      stepValue: step,
      distance: 0.5
    })
    stepDistanceValue = calculStepDistance
  } else {
    stepDatas.push({
      stepValue: step,
      distance: (stepDistanceValue += calculStepDistance)
    })
    stepDistanceValue += calculStepDistance
  }
}

// Next step
function nextProgressWorldStep() {
  if (_DEBUG_) {
    console.log('next')
  }

  if (stepUsed === multi_step_childrensLength) {
    if (_DEBUG_) {
      console.log('end')
    }

    ResetProgressWorldStep()
    return
  }

  stepUsed += 1

  SetProgressWorldStep(stepUsed)

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

    if (stepElementId == 0) {
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

  SetProgressWorldStep(stepUsed)

  if (_DEBUG_) {
    console.log(stepUsed)
  }
}

// Get cube positionZ distance with step
function getCubePositionZDistanceStep(step) {
  let result

  stepDatas.forEach((element) => {
    const data = element

    if (_DEBUG_) {
      console.log(data)
    }

    if (Number(data.stepValue) == Number(step)) {
      if (_DEBUG_) {
        console.log(step)
        console.log(data.stepValue)
        console.log(data.distance)
      }

      result = data.distance
    }
  })

  if (result) {
    return result
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
      if (actual_step_element.querySelector('.progress-bar__bar')) {
        actual_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(100%)'
        actual_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(100%)'
      }
    } else {
      ancien_step_element.classList.add('is-active')
      ancien_step_element.querySelector('.progress-bar__bar').style.transform = 'translateY(0%)'
      ancien_step_element.querySelector('.progress-bar__bar').style.webkitTransform = 'translateY(0%)'
    }
  })

  // Set positionZ of cube on the world
  const newCubePositionZ = getCubePositionZDistanceStep(step)
  // if (newCubePositionZ == cube.getMeshPositionZ) {
    cube.setMeshPositions(0, 0, newCubePositionZ + 1)
    console.log(newCubePositionZ + 1);
    camera.lookAt(cube.mesh.position)
  // }

  if (_DEBUG_) {
    console.log(cube.getMeshPositionZ())
    console.log(stepUsed)
  }
}

// Get step data with position cube/platform world
function SetStepDatasWithCheckCubePosition(cubePositionZ) {
  stepDatas.forEach((element) => {
    const data = element

    if (Number(cubePositionZ) == data.distance || Number(cubePositionZ) >= data.distance) {
      if (_DEBUG_) {
        console.log('distance atteinte: ' + data.distance)
      }

      SetProgressWorldStep(data.stepValue)
    }

    if (_DEBUG_) {
      // vérifier si l'étape ou l'on est, est = à l'étape du foreach
      if (stepUsed == data.stepValue) {
        console.log(stepUsed)
      }
    }
  })

  // console.log(stepDatas)
}

export { SetStepDatasWithCheckCubePosition }
