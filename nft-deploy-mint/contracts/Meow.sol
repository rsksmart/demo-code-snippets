// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// using OpenZeppelin libraries
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Meow is ERC721URIStorage, Ownable {
    /** 
    From the `Counters` docs:
    Provides counters that can only be incremented, decremented or reset. 
    This can be used e.g. to track the number
    of elements in a mapping, issuing ERC721 ids, or counting request ids.
    Include with `using Counters for Counters.Counter;` 
    */

    using Counters for Counters.Counter;
    // tracks the number of minted NFTs
    Counters.Counter private _tokenIds;

    // calling ERC721 constructor
    constructor() ERC721("Meow NFT", "MEO") {}

    // mints new NFTs. Can be called only by the deployer (s/c owner)
    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        // increment counter
        _tokenIds.increment();
        // get new NFT id
        uint256 newItemId = _tokenIds.current();
        // call internal ERC721 mint function
        _mint(recipient, newItemId);
        // write token URI to newly minted NFT
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}