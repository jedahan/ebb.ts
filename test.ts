import assert from 'node:assert'
import test from 'node:test'
import { config, PEN_LIFT_MECHANISM, SC, stepperAndServoModeConfigure, STEPPER_SIGNAL_CONTROL } from './commands'

test('discriminatedUnion - pen lift', async (t) => {
    await t.test('generates the correct command', async () => {
        assert.strictEqual(
            'SC,1,1\r', 
            stepperAndServoModeConfigure({
                parameter: SC.PEN_LIFT_MECHANISM,
                integer: PEN_LIFT_MECHANISM.RC_SERVO_OUT
            })
        )
    })

    await t.test('errors on incorrect integer', () => {
        // @ts-expect-error
        stepperAndServoModeConfigure({parameter: SC.PEN_LIFT_MECHANISM, integer: 4})
    })

    await t.test('errors on compatible integer from incorrect enum', () => {
        // @ts-expect-error
        stepperAndServoModeConfigure({parameter: SC.PEN_LIFT_MECHANISM, integer: STEPPER_SIGNAL_CONTROL.DISCONNECT})
    })
})

test('overload - pen lift', async (t) => {
    await t.test('generates the correct command', () => {
        assert.strictEqual(
            'SC,1,1\r', 
            config(SC.PEN_LIFT_MECHANISM, PEN_LIFT_MECHANISM.RC_SERVO_OUT)
        )
    })

    await t.test('errors on incorrect integer', () => {
        // @ts-expect-error
        config(SC.PEN_LIFT_MECHANISM, 4)
    })
    
    await t.test('errors on compatible integer from incorrect enum', () => {
        // @ts-expect-error
        config(SC.PEN_LIFT_MECHANISM, STEPPER_SIGNAL_CONTROL.DISCONNECT)
    })
})