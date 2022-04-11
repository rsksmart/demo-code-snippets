// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PurrNft is ERC721 {

  IERC20 public acceptedToken;

  constructor(IERC20 _acceptedToken) ERC721("Purr NFT", "PUR") {
    acceptedToken = _acceptedToken;
  }
}