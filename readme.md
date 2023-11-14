# ebb

Type definitions, and functions for interfacing with eggbotboards, like the axidraw.

## api/commands

Maps function names and parameter values as close to the original documentation as possible

```ts
reset()
reboot()
version()
stepperAndServoModeConfigure({parameter: SC.USE_ALT_PRG, integer: POWER.SERVO_OUT})
enableMotors({ enable1: EM.ENABLE_1.ENABLE_STEP_MODE_FULL })
lowLevelMove({
    rate1: 10,
    steps1: 123,
    accel1: 222,
    rate2: 11,
    steps2: 124,
    accel2: 223,
    clear: LM.CLEAR.CLEAR_BOTH
})
````

## api/wrapper

Higher level api that is easier to use

```ts
reset()
reboot()
version()
config(SC.USE_ALT_PRG, POWER.SERVO_OUT)
config(SC.PEN_LIFT_MECHANISM, PEN_LIFT_MECHANISM.RC_SERVO_OUT)
motors(EM.ENABLE_1.GLOBAL_STEP_MODE_1_16)
````

## todo

- [ ] A — Analog value get
- [ ] AC — Analog Configure
- [ ] BL — enter BootLoader
- [ ] C — Configure
- [ ] CN — Clear Node count
- [ ] CK — Check Input
- [ ] CU — Configure User Options
- [ ] CS — Clear Step position
- [x] EM — Enable Motors
- [ ] ES — E Stop
- [ ] HM — Home or Absolute Move
- [ ] I — Input
- [x] LM — Low-level Move
- [ ] LT — Low-level Move, Time Limited
- [ ] MR — Memory Read
- [ ] MW — Memory Write
- [ ] ND — Node count Decrement
- [ ] NI — Node count Increment
- [ ] O — Output
- [ ] PC — Pulse Configure
- [ ] PD — Pin Direction
- [ ] PG — Pulse Go
- [ ] PI — Pin Input
- [ ] PO — Pin Output
- [ ] QB — Query Button
- [ ] QC — Query Current
- [ ] QE — Query motor Enables and microstep resolutions
- [ ] QG — Query General
- [ ] QL — Query Layer
- [ ] QM — Query Motors
- [ ] QN — Query Node count
- [ ] QP — Query Pen
- [ ] QR — Query RC Servo power state
- [ ] QS — Query Step position
- [ ] QT — Query EBB nickname Tag
- [x] RB — Reboot
- [x] R — Reset
- [ ] S2 — General RC Servo Output
- [x] SC — Stepper and servo mode Configure
- [ ] SE — Set Engraver
- [ ] SL — Set Layer
- [ ] SM — Stepper Move
- [ ] SN — Set Node count
- [ ] SP — Set Pen State
- [ ] SR — Set RC Servo power timeout
- [ ] ST — Set EBB nickname Tag
- [ ] T — Timed Digital/Analog Read
- [ ] TP — Toggle Pen
- [x] V — Version Query
- [ ] XM — Stepper Move, for Mixed-axis Geometries
