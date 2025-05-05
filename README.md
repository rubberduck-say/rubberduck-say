# Ducksay

`ducksay` is a simple CLI tool that prints an adorable rubber duck (🦆) with a speech bubble, similar to `cowsay`, but with a friendly rubber duck! The idea behind this tool comes from **rubber duck debugging**, a technique where explaining your code to a rubber duck helps you understand and solve problems. `ducksay` brings that same spirit of debugging to the command line, offering you a virtual rubber duck to assist with your coding challenges.

![rubberduck](https://upload.wikimedia.org/wikipedia/commons/d/d5/Rubber_duck_assisting_with_debugging.jpg)

## Why a Rubber Duck?

In the world of programming, **rubber duck debugging** is a well-known technique among developers. It involves explaining your code, line by line, to a rubber duck (or any inanimate object) to help clarify your thought process and identify potential bugs. This simple, yet effective method often helps developers approach problems from new angles and ultimately find solutions.

`ducksay` brings this fun and useful debugging concept to the terminal. Use it whenever you need a virtual rubber duck to guide you through your debugging process!

## Basic Usage

To use `ducksay`, simply run the following command in your terminal:

```bash
# If no message is provided, a random default message will be shown.
ducksay --message "Your message here!"

# random message
ducksay
```

## Example

```bash
ducksay --message "I need to debug this code!"
```
This will output

```bash
  ______________________________________
 < I need to debug this code!           >
  --------------------------------------
      \
       \
            _
          <(. )__
            (_(____)/
            `-----'

```

## Contributing

This is a basic version of ducksay, and there's always room for improvement! If you'd like to contribute, feel free to submit a pull request. We welcome contributions that make this tool more fun and helpful for developers.

PRs are always welcome!

## License

MIT