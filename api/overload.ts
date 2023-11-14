import { z } from "zod"
import { PEN_LIFT_MECHANISM, SC, STEPPER_SIGNAL_CONTROL, POWER, ENABLE_1, ENABLE_2 } from "../enums"
import { enableMotors, stepperAndServoModeConfigure } from "./enum"

const mechanisms = z.nativeEnum(PEN_LIFT_MECHANISM)
type Mechanism = z.infer<typeof mechanisms>

const positiveInteger = z.number().int().min(0).max(65535)
type PositiveInteger = z.infer<typeof positiveInteger>

const positiveNonZeroInteger = z.number().int().min(1).max(65535)
type PositiveNonZeroInteger = z.infer<typeof positiveNonZeroInteger>

const positiveNonZeroIntegerUpToSix = z.number().int().min(1).max(6).default(3)
type PositiveNonZeroIntegerUpToSix = z.infer<typeof positiveNonZeroIntegerUpToSix>

const positiveNonZeroIntegerUpToTwentyFour = z.number().int().min(1).max(24).default(8)
type PositiveNonZeroIntegerUpToTwentyFour = z.infer<typeof positiveNonZeroIntegerUpToTwentyFour>

/// overload style - see ebb SC command for more info
export function config(parameter: SC.PEN_LIFT_MECHANISM, integer: PEN_LIFT_MECHANISM): void;
export function config(parameter: SC.STEPPER_SIGNAL_CONTROL, integer: STEPPER_SIGNAL_CONTROL): void;
export function config(parameter: SC.SERVO_RATE, integer: PositiveInteger): void;
export function config(parameter: SC.RC_SERVO_MIN, integer: PositiveNonZeroInteger): void;
export function config(parameter: SC.RC_SERVO_MAX, integer: PositiveNonZeroInteger): void;
export function config(parameter: SC.MAXIMUM_S2_CHANNELS, integer: PositiveNonZeroIntegerUpToSix): void;
export function config(parameter: SC.S2_CHANNEL_DURATION_MS, integer: PositiveNonZeroIntegerUpToTwentyFour): void;
export function config(parameter: SC.SERVO_RATE, integer: PositiveInteger): void;
export function config(parameter: SC.SERVO_RATE_UP, integer: PositiveInteger): void;
export function config(parameter: SC.SERVO_RATE_DOWN, integer: PositiveInteger): void;
export function config(parameter: SC.USE_ALT_PRG, integer: POWER ): void;
export function config(parameter: SC, integer: PEN_LIFT_MECHANISM | STEPPER_SIGNAL_CONTROL | PositiveInteger) {
  return stepperAndServoModeConfigure({parameter, integer})
}

/// set power and step resolution for one or both motors - see EM command for more info
export function motors(enable1: ENABLE_1, enable2: ENABLE_2 = ENABLE_2.DISABLE_MOTOR) {
  return enableMotors({enable1, enable2})
}