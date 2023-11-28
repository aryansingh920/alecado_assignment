// SimpleStorage.sol
pragma solidity ^0.8.0;

contract SimpleStorage {
    string public storedText;

    function set(string memory _text) public {
        storedText = _text;
    }

    function getText() public view returns (string memory) {
        return storedText;
    }
}
