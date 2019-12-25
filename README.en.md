# Let's make "Omesis Homepage"!

https://omegasisters.github.io/homepage

What happens if I update the homepage of the 1st Omeshisu with only Pulllik? Planning

I'm waiting for Pullik! ! ! !

## For those who do not know what this is

### What is your current homepage like?

Click [here](https://omegasisters.github.io/homepage) to see the status of the Omesys website

### I want to do this here, oh. But I don't understand the program

[In the **Issues** menu on the top menu](https://github.com/omegasisters/homepage/issues), you can write what you want to do, what you want to change, and what you want to do again (because something is strange).

It's like a typical threaded bulletin board.
If you write something, it may be implemented. May not be.

To create a new one, [create a GitHub account](https://github.com/join?source_repo=omegasisters%2Fhomepage) and [create an Issue](https://github.com/omegasisters/homepage/issues/new).

# Tips

## Local preview

If you want to preview in full, including the VRM model, try the following.
You can develop it as it was published on GitHub Pages.
If you are connected to the same local network, you can check it from other terminals with the host's [IP address]: [port number] (example: http://192.168.1.2:8000).

**Moved description**
Please see [documents/environment](documents/environment).

## Code formatting (Node.js environment required)

```
For yarn format # yarn
npm run format # For npm
```

## Preact part development method (Node.js)

When previewing, enter one of the following commands:

```
yarn start # for yarn
npm run start # npm
```

Hosted at http://localhost: 8080

When editing the source code, build before git push:

```
For yarn build # yarn
npm run build # For npm
```

## Test (Node.js)

You can test with the following command.

```
For yarn test # yarn
npm run test # For npm
```

`__tests__`, `preact` has sample test cases.
