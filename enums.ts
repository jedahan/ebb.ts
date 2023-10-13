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