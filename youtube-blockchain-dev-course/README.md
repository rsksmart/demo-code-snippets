# Code snippents from the [YouTube blockchain course](https://www.youtube.com/playlist?list=PLWlFXymvoaJ_0ok740kLXTn5qn-i1UnYr)

## Installation
```bash
nvm use 12
npm install
```
Rename `.template.secret.json` to `.secret.json` and put there your test accounts mnemonic.

## RSK regtest issues
Try to run tests from `test/Demo.js` against `rskregtest`.
```bash
npx hardhat test
```
 There are 2 issues now:
- it doesn't provide the correct block time stamp
- it reverts `withdraw` transaction
Other networks listed in `hardhat.config.js` pass the tests.
