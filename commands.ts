import { CR } from './enums'

/**
 * [Version](http://evil-mad.github.io/EggBot/ebb.html#V)
 * print out the version string of the firmware currently running on the EBB
 */
export const version = () => 'V' + CR

/**
 * [Reset](http://evil-mad.github.io/EggBot/ebb.html#R)
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
 * [Reboot](http://evil-mad.github.io/EggBot/ebb.html#RB)
 * 
 * This command causes the EBB to drop off the USB, then completely reboot as if just plugged in.
 * Useful after a name change with the ST command. There is no output after the command executes. 
 */
export const reboot = () => 'RB' + CR
