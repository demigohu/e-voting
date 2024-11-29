// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VotingToken is ERC20 {
    address public admin;
    uint256 public claimAmount = 1 * 10 ** 18; // 1 token (1 VTK)
    mapping(address => bool) public hasClaimed;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    constructor(uint256 initialSupply) ERC20("VotingToken", "VTK") {
        admin = msg.sender;
        _mint(admin, initialSupply); // Mint initial supply to admin
    }

    // Function for users to claim tokens
    function claimVotingTokens() public {
        require(!hasClaimed[msg.sender], "You have already claimed your token.");
        require(balanceOf(admin) >= claimAmount, "Not enough tokens available.");

        hasClaimed[msg.sender] = true; // Mark user as claimed
        _transfer(admin, msg.sender, claimAmount); // Transfer tokens from admin to user
    }

    // Override the _update function to restrict transfers
    function _update(address from, address to, uint256 amount) internal override {
        // Ensure only admin can transfer tokens
        if (from != address(0) && to != address(0)) {
            require(
                from == admin || to == admin,
                "Tokens are non-transferable."
            );
        }
        super._update(from, to, amount);
    }

    // Optional: Reset claim status for a user
    function resetClaimStatus(address user) public onlyAdmin {
        hasClaimed[user] = false;
    }

    // Optional: Update claim amount
    function setClaimAmount(uint256 _claimAmount) public onlyAdmin {
        claimAmount = _claimAmount;
    }
}
