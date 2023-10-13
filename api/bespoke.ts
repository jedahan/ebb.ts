import { z } from "zod"

const nonNull = (e: any): e is Exclude<typeof e, null> => e !== null

const SetPenStateArguments = z.object({
  value: z.enum(['RAISE', 'LOWER']),
  duration: z.number().positive().int().min(1).max(65535).optional(),
  portBpin: z.number().positive().int().min(1).max(7).optional(),
})
type SetPenStateArguments = z.infer<typeof SetPenStateArguments>

/**
 * [Set Pen State](http://evil-mad.github.io/EggBot/ebb.html#SP)
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
 */
export const setPenState = ({ value, duration, portBpin }: SetPenStateArguments) =>
  ['SP', value == 'RAISE' ? 0 : 1, duration, portBpin].filter(nonNull).join(',') + CR