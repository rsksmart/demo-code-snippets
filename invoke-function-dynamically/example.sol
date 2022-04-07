pragma solidity ^0.8.0;

contract Example {
  function myFuncA(uint256 someParam)
    public
    pure
    returns (uint256)
  {
    return someParam + 1;
  }

  function myFuncB(uint256 someParam)
    public
    pure
    returns (uint256)
  {
    return someParam + 2;
  }

  function myDynamicFunc1(uint256 someParam)
    public
    pure
    returns (uint256 result)
  {
    bytes4 selector =
      /* ... some internal logic ... */
      this.myFuncA.selector;

    if (selector == this.myFuncA.selector) {
      result = myFuncA(someParam);
    } else if (selector == this.myFuncB.selector) {
      result = myFuncB(someParam);
    }
    // (A) instead of something like this ^ branching logic (which works)
  }

  function myDynamicFunc2(uint256 someParam)
    public
    // pure
    returns (bytes memory result)
  {
    bytes4 selector =
      /* ... some internal logic ... */
      this.myFuncA.selector;

    (bool success, bytes memory resultBytes) =
      address(this).call(abi.encodePacked(selector, someParam));
    // (B) can something like this ^ instead by calling the selector directly instead (does not work)
    require(success, "failed to call selector");
    result = resultBytes;
  }
}
