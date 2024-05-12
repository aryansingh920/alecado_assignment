// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract SimpleStorage {
    struct File {
        bytes32 fileHash;
        bytes32 signature;
    }

    mapping(string => File) public files;

    function setFile(string memory _fileName, bytes32 _fileHash, bytes32 _signature) public {
        files[_fileName] = File(_fileHash, _signature);
    }

    function getFile(string memory _fileName) public view returns (bytes32, bytes32) {
        File memory file = files[_fileName];
        return (file.fileHash, file.signature);
    }
}
