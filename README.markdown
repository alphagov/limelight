# Limelight

"Limelight" is the codename for the proof-of-concept frontend app for exposing 
data and visualisations from data exported by the Performance Platform's API.

## Development setup

You can run this either in your development VM or your host machine.

- Download and install Node.js: http://nodejs.org/
- Install dependencies and run development server:

```
$ cd <limelight_repo>
$ npm install
$ grunt # Compiles SASS files, copies assets, runs tests, lints code
$ grunt forever:start # Starts development server
```
