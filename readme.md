# ebb

Type definitions, and functions for interfacing with eggbotboards, like the axidraw.

This is work-in-progress. There are 3 different api styles in **api/**.

Feedback and opinions appreciated - mainly between api/enum vs api/overload for complex commands.

### api/enum

Using zod's discriminated unions for complex commands that have subcommands

This maps more closely to the actual command parameter names

```ts
config({parameter: SC.USE_ALT_PRG, integer: POWER.SERVO_OUT})
````

### api/overload

Using Typescript's function overloading, allows for non-object parameters

```ts
config(SC.USE_ALT_PRG, POWER.SERVO_OUT)
````

### api/bespoke

hand-written, no reusability, but definition is all local. this is more an example, and less a style