[English](README.en.md) | [日本語](README.md) | [简体中文](README.zh_hans.md) |

# Let's make "OmegaSisters(Omesis) Homepage"!

https://omegasisters.github.io/homepage

What happens if I update the homepage of OmegaSisters(Omesis) for the first time with only pull request? In planning

I'm waiting for your pull requests! ! ! !

## For those who do not know what this project is

### What is your current homepage like?

Click [here](https://omegasisters.github.io/homepage) to see the current status of the OmegaSisters(Omesis) website

### I have ideas and want to do this here, but I don't know to program

[In the **Issues** button on the top menu](https://github.com/omegasisters/homepage/issues), you can write what you want to do, what you want to change, and what you want to do again (because something is strange).

It's like a typical threaded message board.
Noted if you write something, it may be implemented or may not be.

To create a new issue, [create a GitHub account](https://github.com/join?source_repo=omegasisters%2Fhomepage) and [create an Issue](https://github.com/omegasisters/homepage/issues/new).

# Tips

## Local preview

If you want to preview in full pages including the VRM model, try the following.

You can develop it based on the original version published on GitHub Pages.

If you are connected to the same local network, you can check it from other terminals with the host's [IP address]: [port number] (example: http://192.168.1.2:8000).

**More description**

Please see [documents/environment](documents/environment).

## Code formatting (Node.js environment required)

```
yarn format # For yarn
npm run format # For npm
```

## Preact part development method (Node.js)

When previewing, enter one of the following commands:

```
yarn start # For yarn
npm run start # For npm
```

Hosted at http://localhost: 8080

When editing the source code, build before doing a 'git push':

```
yarn build # For yarn
npm run build # For npm
```

## Test (Node.js)

You can test with the following command.

```
yarn test # For yarn
npm run test # For npm
```

`__tests__`, `preact` has sample test cases.
