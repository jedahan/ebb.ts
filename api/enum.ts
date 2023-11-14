import { z } from "zod"
import { SC, PEN_LIFT_MECHANISM, STEPPER_SIGNAL_CONTROL, POWER, CR, EM, CLEAR, LM } from "../enums"

const SC_VALUES = z.discriminatedUnion("parameter", [
  z.object({ parameter: z.literal(SC.PEN_LIFT_MECHANISM), integer: z.nativeEnum(PEN_LIFT_MECHANISM) }),
  z.object({ parameter: z.literal(SC.STEPPER_SIGNAL_CONTROL), integer: z.nativeEnum(STEPPER_SIGNAL_CONTROL) }),
  z.object({ parameter: z.literal(SC.RC_SERVO_MIN), integer: z.number().int().min(1).max(65535).default(12000)
    .describe('Set the minimum value for the RC servo output position, in units of 83.3 ns intervals. This sets the "Pen Up" position.')}),
  z.object({ parameter: z.literal(SC.RC_SERVO_MAX), integer: z.number().int().min(1).max(65535).default(16000)
    .describe('Set the maximum value for the RC servo output position, in units of 83.3 ns intervals. This sets the "Pen Down" position.')}),
  z.object({ parameter: z.literal(SC.MAXIMUM_S2_CHANNELS), integer: z.number().int().min(1).max(24).default(8)
    .describe('Sets the number of RC servo PWM channels, each of S2_channel_duration_ms before cycling back to channel 1 for S2 command.')}),
  z.object({ parameter: z.literal(SC.S2_CHANNEL_DURATION_MS), integer: z.number().int().min(1).max(6).default(3)
    .describe('Set the number of milliseconds before firing the next enabled channel for the S2 command.')}),
  z.object({ parameter: z.literal(SC.SERVO_RATE), integer: z.number().int().min(0).max(65535)
    .describe('Set rate of change of the servo position, for both raising and lowering movements. Same units as rate parameter in S2 command.')}),
  z.object({ parameter: z.literal(SC.SERVO_RATE_UP), integer: z.number().int().min(0).max(65535)
    .describe('Set the rate of change of the servo when going up. Same units as rate parameter in S2 command.')}),
  z.object({ parameter: z.literal(SC.SERVO_RATE_DOWN), integer: z.number().int().min(0).max(65535)
    .describe('Set the rate of change of the servo when going down. Same units as rate parameter in S2 command.')}),
  z.object({ parameter: z.literal(SC.USE_ALT_PRG), integer: z.nativeEnum(POWER) })
    .describe('turns on (1) or off (0) alternate pause button function on RB0. On by default. For EBB v1.1 boards, it uses RB2 instead. See the description of QB for more information.'),
])

type StepperAndServoModeConfigureArguments = z.infer<typeof SC_VALUES>

/**
 * @param parameter import SC enum to have human-readable command names
 * @param integer import PEN_LIFT_MECHANISM, STEPPER_SIGNAL_CONTROL, or POWER for some of the commands
 */
export const stepperAndServoModeConfigure = ({ parameter, integer }: StepperAndServoModeConfigureArguments) => {
  return ['SC', parameter, integer].join(',') + CR
}

const EM_VALUES = z.object({
  enable1: z.nativeEnum(EM.ENABLE_1).default(EM.ENABLE_1.DISABLE_MOTOR),
  enable2: z.nativeEnum(EM.ENABLE_2).default(EM.ENABLE_2.DISABLE_MOTOR)
})

type EnableMotorsArguments = z.infer<typeof EM_VALUES>

/**
 * @param enable1 disable power to motor 1, or set the global stepping resolution
 * @param enable2 disable/enable power to motor 2 - will use same resolution as enable1
 */
export const enableMotors = ({enable1, enable2}: EnableMotorsArguments) => {
  return ['EM', enable1, enable2].join(',') + CR
}

const MAX_VALUE_31_BITS = 2147483647
const RATE = z.number().int().min(0).max(MAX_VALUE_31_BITS)
const STEPS = z.number().int().min(-MAX_VALUE_31_BITS).max(MAX_VALUE_31_BITS)
const ACCEL = z.number().int().min(-MAX_VALUE_31_BITS).max(MAX_VALUE_31_BITS)

const LM_VALUES = z.object({
  rate1: RATE,
  steps1: STEPS,
  accel1: ACCEL,
  rate2: RATE, 
  steps2: STEPS,
  accel2: ACCEL,
  clear: z.nativeEnum(LM.CLEAR).optional()
})

type LowLevelMoveArguments = z.infer<typeof LM_VALUES>

export const lowLevelMove = ({rate1, steps1, accel1, rate2, steps2, accel2, clear}: LowLevelMoveArguments) => {
  return ['LM', rate1, steps1, accel1, rate2, steps2, accel2].join(',') + (clear ? `,${clear}` : '') + CR
}