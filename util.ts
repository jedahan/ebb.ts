export const getAmountSteps = (
  x: number,
  y: number,
  targetX: number,
  targetY: number,
) => {
  // Compute steps
  // See EBB Command Set Documentation for more informations
  const lastStepsX = x + y
  const lastStepsY = x - y
  const targetStepsX = targetX + targetY
  const targetStepsY = targetX - targetY
  const amountX = Math.round(targetStepsX - lastStepsX)
  const amountY = Math.round(targetStepsY - lastStepsY)
  return { amountX, amountY }
}

export const getDuration = (
  speed: number,
  minStepsPerMillisecond: number,
  maxStepsPerMillisecond: number,
  amountX: number,
  amountY: number,
) => {
  const speedPercent = speed / 100
  const speedRange = maxStepsPerMillisecond - minStepsPerMillisecond
  const stepsPerMillisecond = minStepsPerMillisecond + speedRange * speedPercent
  const maxSteps = Math.max(Math.abs(amountX), Math.abs(amountY))
  const duration = Math.round(Math.abs(maxSteps / stepsPerMillisecond))
  return duration
}