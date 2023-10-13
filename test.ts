import assert from 'node:assert'
import test from 'node:test'
import { PEN_LIFT_MECHANISM, SC, stepperAndServoModeConfigure } from './commands'

test('stepperAndServoModeConfigure', (t) => {
    t.test('pen lift', (t) => {
        
        assert.strictEqual(
            'SC,1,1\r', 
            stepperAndServoModeConfigure({
                parameter: SC.PEN_LIFT_MECHANISM,
                integer: PEN_LIFT_MECHANISM.RC_SERVO_OUT
            })
        )

        /// @ts-expect-error
        stepperAndServoModeConfigure({parameter: SC.PEN_LIFT_MECHANISM, integer: 4})
    })
})