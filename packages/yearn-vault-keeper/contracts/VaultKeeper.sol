pragma solidity 0.7.0;

// SPDX-License-Identifier: MIT

interface Vault {
    function earn() external;
}

contract VaultKeeper {
    function earn(address[] calldata vaults) external {
        for (uint256 i = 0; i < vaults.length; i++) {
            Vault(vaults[i]).earn();
        }
    }
}
