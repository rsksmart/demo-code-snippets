# How to switch network to Rootstock programmatically in Metamask 
##  Usage walkthrough

- download the [`switch-network-to-rsk` directory](https://github.com/rsksmart/demo-code-snippets/tree/master/switch-network-to-rsk) from the `demo-code-snippets` repository. [Use this link](https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2Frsksmart%2Fdemo-code-snippets%2Ftree%2Fmaster%2Fswitch-network-to-rsk) to download all files in a single zip archive
- unzip the archive
- open the created folder in VSCode
- within the folder open `index.html`
- run`index.html` with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VSCode extension by pressing `Go Live` button in the bottom-right corner of the VSCode window
- VSCode will open the web page from `index.html` in a new browser window
- on the web page press either `Connect to Testnet` or `Connect to Mainnet` button to add and switch to the corresponding network
- the browser will open up a Metamask password prompt window
- enter your Metamask password and press `Unlock`
- Metamask shows a prompt: `Allow this site to add a network?`
- Press `Approve`
- Metamask shows a prompt: `Allow this site to switch the network?`
- Press `Switch network`
- Now Metamask has added the new Rootstock network and switched to it

## Code walkthrough

- in`networks.js` there are all the parameters of the Rootstock networks necessary to add them to Metamask
- `index.html` has 2 connection buttons for both Mainnet and Testnet
- `index.js`
    - imports the networks parameters from `networks.js`
    - defines `connectProviderTo(network)` function which is intended to initiate the connection to each of the Rootstock networks in Metamask
    - links the buttons from `index.html` and assigns `connectProviderTo()` as a click event listener
    - in turn `connectProviderTo()` invokes `switchToNetwork(network)` function which is responsible for adding the new network to Metamask and subsequent switching to that network
    - calls `showPage()` in case of successful switching to another network
    - calls `showError()` in case something went wrong 