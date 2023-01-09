# Reach

### Before Installing the App:
Ensure you have node version [16.16.0](https://nodejs.org/download/release/v16.16.0/) or later, and npm version 8.11.0 or later. You can check this by running `node -v` and `npm -v`. If you have an earlier version or don't have it installed, use the link for your OS to find a version you can install.

If you are using Ubuntu or another Debian or RPM OS, [follow these instructions](https://github.com/nodesource/distributions#using-ubuntu-2). If you are on MacOS, [follow these instructions](https://formulae.brew.sh/formula/node@16). If you are on any other OS, [follow these instructions](https://nodejs.org/en/download/).

## Installing, Building, and Running the App

To install the app, clone this repository and drag the config file 'config.js' to the top level. Traverse to the `reach` directory via CLI and run `npm install`. Your directory should now look like this:

![image](https://user-images.githubusercontent.com/41023883/211117732-ef4e5abe-d8b7-4e0e-9c4a-75116f30af5a.png)

The bundle file is already built, but you can run `npm run build` if you are so inclined. Once the node module files are installed, run `npm run server`. This initializes the server.

The app will be available on port 3000.

### Notes

- works best on Chrome, but is compatible with other browsers
- continues (with limited functionality) if the server is offline
