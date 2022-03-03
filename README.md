# Getting started

## Installation
To get started with this codebase, you'll need to install [`yarn`](https://yarnpkg.com/), a package manager that we're using in this project. The most straightforward way to install `yarn` is using `npm`, the [Node Package Manager](https://docs.npmjs.com/). And, the best way to install `npm` is through `nvm`, the [Node Version Manager](https://github.com/nvm-sh/nvm).

### Installing `nvm`
See the [Installing and Updating](https://github.com/nvm-sh/nvm#installing-and-updating) section of the NVM documentation for a command that you can run to install NVM. As of this writing, on my machine, it's

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

### Installing `node`
Once you've installed NVM you can install `node` (and `npm` comes installed by default) with this command:

```
nvm install node
```

By default, this will install the latest version.

### Installing `yarn`
You can install `yarn` with this command:

```
npm install -g yarn
```

### Installing project dependencies
Once you've got `yarn` installed, navigate to this project directory using `cd` to change directories until you're in this folder. Then, run `yarn install`. You should see some output that indicates that `yarn` is looking for packages, downloading them, and linking them. Once it's done, you should regain control of the terminal and see a message that the installation was successful.

## Running the codebase
To run the website, navigate to this project directory using `cd` to change directories until you're in this folder. Then, run `yarn start`. You should see the website running in your browser.

As you make changes to the code, the website will refresh automatically, in real time.

# Style
We're using Angular-style component management for this project. In particular, that means that each folder should only represent one component. Each folder should have an `index.tsx` file that just exports the component from the file that's named with that component (this is just to make navigation in the IDE easier).

Additionally, note that the authentication logic is handled mostly by `App.tsx` and users are required to authenticate before they can do anything else. Once authenticated, the user object is stored in the `UserContext.ts` file, which is exported from `App/` or could and also exported as default from `App/UserContext.ts`.