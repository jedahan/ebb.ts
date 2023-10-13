import { z } from 'zod'

const CR='\r'

/// Utils
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

/// Commands
/// From [EiBotBoard Command Set document](http://evil-mad.github.io/EggBot/ebb.html).

export const reboot = () => 'RB' + CR

/**
 * "R" — Reset
 * Execution: Immediate
 *
 * This command reinitializes the the internal state of the EBB to the default
 * power on state. This includes setting all I/O pins in their power on states,
 * stopping any ongoing timers or servo outputs, etc. It does NOT do a complete
 * reset of the EBB - this command does not cause the EBB to drop off the USB
 * and come back, it does not reinitialize the processor's internal register,
 * etc. It is simply a high level EBB-application reset. If you want to completely
 * reset the board, use the RB command.
 */
export const reset = () => 'R' + CR

/**
 * "SC" — Stepper and Servo Mode Configure
 * Command: SC,value1,value2<CR>
 * Execution: Immediate
 *
 * This command allows you to configure the motor control modes that the EBB
 * uses, including parameters of the servo or solenoid motor used for raising
 * and lowering the pen, and how the stepper motor driver signals are directed.
 *
 * For more information see: http://evil-mad.github.io/EggBot/ebb.html#SC
 */
export enum SC {
  PEN_LIFT_MECHANISM = 1,
  STEPPER_SIGNAL_CONTROL = 2,
  RC_SERVO_MIN = 4,
  RC_SERVO_MAX = 5,
  MAXIMUM_S2_CHANNELS = 8,
  S2_CHANNEL_DURATION_MS = 9,
  SERVO_RATE = 10,
  SERVO_RATE_UP = 11,
  SERVO_RATE_DOWN = 12,
  USE_ALT_PRG = 13,
}

export enum PEN_LIFT_MECHANISM { SOLENOID_OUT = 0, RC_SERVO_OUT = 1, SOLENOID_AND_RC_SERVO_OUT = 2 }
export enum STEPPER_SIGNAL_CONTROL { MICROCONTROLLER = 0, EXTERNAL = 1, DISCONNECT = 2 }
export enum POWER {OFF = 0, ON = 1}

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
 * 
 * @param parameter import SC enum to have human-readable command names
 * @param integer import PEN_LIFT_MECHANISM, STEPPER_SIGNAL_CONTROL, or POWER for some of the commands
 */
export const stepperAndServoModeConfigure = ({ parameter, integer }: StepperAndServoModeConfigureArguments) => {
  return ['SC', parameter, integer].join(',') + CR
}

const mechanisms = z.nativeEnum(PEN_LIFT_MECHANISM)
type Mechanism = z.infer<typeof mechanisms>

/// Trial 3

const positiveInteger = z.number().int().min(0).max(65535)
type PositiveInteger = z.infer<typeof positiveInteger>

const positiveNonZeroInteger = z.number().int().min(1).max(65535)
type PositiveNonZeroInteger = z.infer<typeof positiveNonZeroInteger>

const positiveNonZeroIntegerUpToSix = z.number().int().min(1).max(6).default(3)
type PositiveNonZeroIntegerUpToSix = z.infer<typeof positiveNonZeroIntegerUpToSix>

const positiveNonZeroIntegerUpToTwentyFour = z.number().int().min(1).max(24).default(8)
type PositiveNonZeroIntegerUpToTwentyFour = z.infer<typeof positiveNonZeroIntegerUpToTwentyFour>

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

/**
 * "SP" — Set Pen State
 * Command: SP,value[,duration[,portBpin]]<CR>
 *
 * This command instructs the pen to go up or down.
 *
 * When a value of 1 is used, the servo will be moved to the servo_min value
 * (as set by the "SC,4" command).
 * When a value of 0 is used, the servo will be moved to the servo_max value
 * (as set by the "SC,5" command below).
 *
 * Note that conventionally, we have used the servo_min ("SC,4") value as the
 * 'Pen up position', and the servo_max ("SC,5") value as the 'Pen down
 * position'.
 *
 * For more information see http://evil-mad.github.io/EggBot/ebb.html#SP
 */

const SetPenStateArguments = z.object({
  value: z.enum(['RAISE', 'LOWER']),
  duration: z.number().positive().int().min(1).max(65535).optional(),
  portBpin: z.number().positive().int().min(1).max(7).optional(),
})

type SetPenStateArguments = z.infer<typeof SetPenStateArguments>

const nonNull = (e: any): e is Exclude<typeof e, null> => e !== null
/**
 * 
 * @param value 'RAISE' or 'LOWER' the pen
 * @param duration (optional) delay in milliseconds
 * @param portBpin (optional) between 0 and 7
 */
export const setPenState = ({ value, duration, portBpin }: SetPenStateArguments) =>
  ['SP', value == 'RAISE' ? 0 : 1, duration, portBpin].filter(nonNull).join(',') + CR

/**
 * "QM" — Query Motor
 *  Use this command to see what the EBB is currently doing. It will return the current state of the 'motion system' and each motor's current state.
 *
 *  CommandStatus is nonzero if any "motion commands" are presently executing, and zero otherwise.
 *  Motor1Status is 1 if motor 1 is currently moving, and 0 if it is idle.
 *  Motor2Status is 1 if motor 2 is currently moving, and 0 if it is idle.
 */
export const queryMotor = () => 'QM' + CR

/**
 * "QG" — Query General
 * This command reads the status of eight bits of information, and returns them as a bit
 * field expressed as a single hexadecimal byte.
 *
 * Bit 7: RB5 — Status of GPIO pin RB5
 * This bit is 1 when GPIO pin RB5 is high, and 0 when it is low. RB5 does not have
 * to be set to an input to be read. The QG command will read the state even if it is
 * an output. If the pin is in use as an RC servo output, the bit will be toggling and
 * that will be reflected in the response byte. Pin RB5 can be used for various useful
 * purposes as desired, for example as a home switch input or output to control a tool
 * head.
 *
 * Bit 6: RB2 — Status of GPIO pin RB2
 * This bit is 1 when GPIO pin RB2 is high, and 0 when it is low. Its properties are
 * otherwise the same as the RB5 bit.
 *
 * Bit 5: PRG — PRG Button Pressed
 * This bit will be 1 if the PRG button has been pushed since the last QG or QB query.
 * Otherwise it will be 0.
 *
 * Bit 4: PEN — Pen is down
 * This bit is 1 when the pen is down, and 0 when the pen is up. The pen status is given
 * by the position of the pen-lift servo output, which can be controlled with the SP command
 * and can be read with the QP query. Note that this is the commanded state of the pen,
 * and that it does physically take time to lift from or lower to the page.
 *
 * Bit 3: CMD — Command Executing
 * This bit will be 1 when a command is being executed, and 0 otherwise. The command may
 * be a command that causes motion (like a motor move command) or any other command listed
 * in this document as 'Execution: Added to FIFO motion queue'.
 *
 * Bit 2: MTR1 — Motor 1 moving
 * This bit is 1 when Motor 1 is in motion and 0 when it is idle.
 *
 * Bit 1: MTR2 — Motor 2 moving
 * This bit is 1 when Motor 2 is in motion and 0 when it is idle.
 *
 * Bit 0: FIFO — FIFO motion queue not empty
 * This bit will be 1 when a command is executing and a second command is awaiting execution
 * in the 1-deep "FIFO" motion queue. It is 0 otherwise. The CMD bit will always be 1 when
 * the FIFO bit is 1; if the FIFO is full, then a command is currently executing. Additional
 * information about the motion queue can be found in the description of the QM query.
 */
enum GeneralInfo {
    Fifo = 0,      // Fifo motion queue not empty
    Mtr2 = 1 << 0, // Motor 2 moving
    Mtr1 = 1 << 1, // Motor 1 moving
    Cmd = 1 << 2,  // Command executing
    Pen = 1 << 3,  // Pen is down
    Prg = 1 << 4,  // Prg button pressed
    Rb2 = 1 << 5,  // Status of GPIO pin RB2
    Rb5 = 1 << 6,  // Status of GPIO pin RB5
}

type GeneralQuery = 'QG\r'
export const generalQuery = (): GeneralQuery => 'QG\r'

/** Version Query - print out the version string of the firmware currently running on the EBB */
export const version = () => 'V' + CR