import assert from 'node:assert'
import test from 'node:test'
import { enableMotors, lowLevelMove, stepperAndServoModeConfigure } from '../api/commands'
import { EM, LM, SC, PEN_LIFT_MECHANISM, STEPPER_SIGNAL_CONTROL } from '../api/commands'
import { config, motors } from '../api/overload'

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

test('enable motors', async (t) => {
    await t.test('generates correct disable motor command', async () => {
        assert.strictEqual(
            'EM,0,0\r', 
            enableMotors({
                enable1: EM.ENABLE_1.DISABLE_MOTOR,
                enable2: EM.ENABLE_2.DISABLE_MOTOR
            })
        )
    })

    await t.test('errors on enable1 out of range', () => {
        // @ts-expect-error
        enableMotors({enable1: 6, enable2: EM.ENABLE_2.DISABLE_MOTOR})
    })

    await t.test('errors on compatible enable1 from incorrect enum', () => {
        // @ts-expect-error
        enableMotors({enable1: EM.ENABLE_2.ENABLE_MOTOR_2, enable2: EM.ENABLE_2.DISABLE_MOTOR})
    })
})

test('enable motors - wrapper', async (t) => {
    await t.test('supports setting a single motor', async () => {
        assert.strictEqual(
            'EM,1,0\r',
            motors(EM.ENABLE_1.GLOBAL_STEP_MODE_1_16)
        )
    })
})

test('low-level move', async (t) => {
    await t.test('generates correct move command with clear', async () => {
        assert.strictEqual(
            'LM,10,123,222,11,124,223,3\r',
            lowLevelMove({
                rate1: 10,
                steps1: 123,
                accel1: 222,
                rate2: 11,
                steps2: 124,
                accel2: 223,
                clear: LM.CLEAR.CLEAR_BOTH
            })
        )
    })

    await t.test('generates correct move command without clear', async () => {
        /**
         * Example 4:
         * This example will step both axis at a 1 ms/step rate, and axis 1 will step for 500 steps and axis 2 will step for 250 steps.
         * This is usually not what you want in practice; it's usually better if the moves for each axis terminate at the same time.
         * This is a "constant-rate" move without acceleration or deceleration on either axis.
         */
        assert.strictEqual(
            'LM,85899346,500,0,85899346,250,0\r',
            lowLevelMove({
                rate1: 85899346,
                steps1: 500,
                accel1: 0,
                rate2: 85899346,
                steps2: 250,
                accel2: 0,

            })
        )
    })
})