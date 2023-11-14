/**
 * [Stepper and Servo Mode Configure](http://evil-mad.github.io/EggBot/ebb.html#SC)
 *
 * This command allows you to configure the motor control modes that the EBB
 * uses, including parameters of the servo or solenoid motor used for raising
 * and lowering the pen, and how the stepper motor driver signals are directed.
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

export enum PEN_LIFT_MECHANISM {
  SOLENOID_OUT = 0,
  RC_SERVO_OUT = 1,
  SOLENOID_AND_RC_SERVO_OUT = 2,
}
export enum STEPPER_SIGNAL_CONTROL {
  MICROCONTROLLER = 0,
  EXTERNAL = 1,
  DISCONNECT = 2,
}
export enum POWER {
  OFF = 0,
  ON = 1,
}

/** Because only Enable1 can set the global step mode, Enable2 simply enables or disables axis 2, and can not change the previously set step mode on its own.  */
export enum ENABLE_1 {
  /** Disable motor 1 */
  DISABLE_MOTOR = 0,
  /** Enable motor 1, set global step mode to 1/16 step mode (default step mode upon reset) */
  GLOBAL_STEP_MODE_1_16 = 1,
  /** Enable motor 1, set global step mode to 1/8 step mode */
  GLOBAL_STEP_MODE_1_8 = 2,
  /** Enable motor 1, set global step mode to 1/4 step mode */
  GLOBAL_STEP_MODE_1_4 = 3,
  /** Enable motor 1, set global step mode to 1/2 step mode */
  GLOBAL_STEP_MODE_1_2 = 4,
  /** Enable motor 1, set global step mode to full step mode */
  GLOBAL_STEP_MODE_FULL = 5,
}

/** Because only Enable1 can set the global step mode, Enable2 simply enables or disables axis 2, and can not change the previously set step mode on its own.  */
export enum ENABLE_2 {
  /** Disable motor 2 */
  DISABLE_MOTOR = 0,
  /** Enable motor 2 (at whatever the previously set global step mode is) */
  ENABLE_MOTOR = 1,
  /** Enable motor 2 (at whatever the previously set global step mode is) */
  ENABLE_MOTOR_2 = 2,
  /** Enable motor 2 (at whatever the previously set global step mode is) */
  ENABLE_MOTOR_3 = 3,
  /** Enable motor 2 (at whatever the previously set global step mode is) */
  ENABLE_MOTOR_4 = 4,
  /** Enable motor 2 (at whatever the previously set global step mode is) */
  ENABLE_MOTOR_5 = 5,
}

/**
 * [Enable Motors](http://evil-mad.github.io/EggBot/ebb.html#EM)
 *
 * For each stepper motor (Enable1 for motor1 and Enable2 for motor2), an integer in the range of 0 through 5, inclusive.
 * An Enable value of 0 will disable that motor (making it freewheel), while a nonzero value will enable that motor.
 * This command is also used to set the step resolution of the stepper motors.
 */
export const EM = {
  ENABLE_1,
  ENABLE_2,
} as const

export enum CLEAR {
  DISABLED = 0,
  CLEAR_1 = 1,
  CLEAR_2 = 2,
  CLEAR_BOTH = 3,
}

/**
 * [Low-level Move, Step-Limited](http://evil-mad.github.io/EggBot/ebb.html#LM)
 *
 * This low-level command causes one or both motors to move for a given number of steps,
 * and allows the option of applying a constant acceleration to one or both motors during their movement.
 * The motion terminates for each axis when the required number of steps have been made,
 * and the command is complete when the both motors have reached their targets.
 *
 * This command, as compared to the similar LT command, allows you to specify an exact step position,
 * but is more difficult to use since the moves for the two axes may complete at different times.
 *
 * This is a low-latency command where the input values are parsed and passed directly into motion control FIFO of the EBB.
 * No time is lost doing any math operations or limit checking, so maximum command throughput can be achieved.
 * (See GitHub issue #73 for more information about the motivation for this command.)
 *
 * While individual movement commands may be as short as a single step,
 * there are practical limits to the rate at which commands can be issued, as discussed under Performance. 
 */
export const LM = {
  CLEAR: CLEAR,
} as const

export const CR = "\r"
