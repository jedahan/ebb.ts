import assert from 'node:assert'
import test from 'node:test'
import { enableMotors, stepperAndServoModeConfigure } from '../api/enum'
import { config, motors } from '../api/overload'
import { EM, ENABLE_1, ENABLE_2, PEN_LIFT_MECHANISM, SC, STEPPER_SIGNAL_CONTROL } from '../enums'

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
        enableMotors({enable1: 6, enable2: ENABLE_2.DISABLE_MOTOR})
    })

    await t.test('errors on compatible enable1 from incorrect enum', () => {
        // @ts-expect-error
        enableMotors({enable1: ENABLE_2.ENABLE_MOTOR_2, enable2: ENABLE_2.DISABLE_MOTOR})
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