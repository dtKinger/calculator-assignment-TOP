# Calculator in Vanilla JS by @dtKinger

[Final Project](https://www.theodinproject.com/lessons/foundations-calculator) of the Fundamentals course for [The Odin Project](https://theodinproject.com).

**[Use the Calculator here](https://dtkinger.github.io/calculator-assignment-TOP/)**. It's an older model, be gentle with it and don't forget to **turn it on!**

## Supported features:
### Keyboard Presses:
* **Delete, Backspace** | Make a correction to input, or edit result value.
* **Return, Enter, =** | Equate two most recent values.
* **+, -, \*, /** | Plus, minus, multiply, divide
* **All numkeys**
* **Decimal key** | Can only be entered once per screen.
* **Values <= 1 billion.** | Throws an error when display would exceed 999,999,999 and loads most recent value from memory.
* **Handles edge cases like dividing by 0**.

### Clicks and Taps
Everything supported in Keyboard Presses as well as:
* **Power button** | Turn on to use, off to clear memory and save battery.
* **x<sup>2</sup>** | Squares the current value.
* **&radic;, Square root** | Find the square root of current value.

## Unsupported things:
* **Highlight operators on keypresses**

## Known issues:
* **Having two or more values in memory then clicking multiple operators after another might produce unexpected results.**