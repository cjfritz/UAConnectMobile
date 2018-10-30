# Introduction 
Welcome to the UAConnect mobile app

# Getting Started
1.	Installation process
  - Install NPM (node package manager)
  - Install the react native cli
    - `sudo npm install -g react-native-cli`
  - Please follow the link below to install android studio and the required APIs
    [React Native Android Installation](https://facebook.github.io/react-native/docs/getting-started.html)
  - Watchman would be nice to have, but don't worry about it
    - Watchman will watch files and make sure files are compatible, but probably not gonna be an issue for a small project
  - Install your favorite emulator from the AVD manager (tutorial in [React Native Android Installation] above)
  - run `npm install` to install packages into the project's node_modules folder
  - finally, run `npm run android` to run the project (make sure you have your AVD running first)

# Build and Test
1. Buidling
  - The project is built after running `npm install` and `npm run android`
  - After you make code changes, press `ctrl + m` to bring up the developer menu
    - Here, you can reload the app, debug using the javascript console, etc
2. Testing
  - To run all unit tests in the project, run `npm run test`
  - If you change a component's view, make sure to run all the tests to make sure you made the right changes
   - If so, run `npm run test:update` to update the snapshots for all components

# PR Guide
1. Commit regularly into logical portions so that it is easy to revert if necessary
2. Write unit tests for any components you make, even commmon components
3. Make sure to run `npm run validate` when you are done making changes
4. Push your changes and create a PR
 - Make sure to give a good description of what you've added/changes/fixed
 