// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingToken.sol";

contract EVoting {
    struct Candidate {
        uint id;
        string name;
        string photoUrl;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;
    uint public totalVotes;
    VotingToken public votingToken;
    address public admin;

    event CandidateAdded(uint id, string name, string photoUrl);
    event Voted(address indexed voter, uint candidateId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    constructor(VotingToken _votingToken) {
        admin = msg.sender;
        votingToken = _votingToken;
    }

    function addCandidate(string memory _name, string memory _photoUrl) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _photoUrl, 0);
        emit CandidateAdded(candidatesCount, _name, _photoUrl);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        require(votingToken.balanceOf(msg.sender) > 0, "You must hold voting tokens to vote.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidate(uint _candidateId) public view returns (uint, string memory, string memory, uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.photoUrl, candidate.voteCount);
    }

    function getTotalVotes() public view returns (uint) {
        return totalVotes;
    }
}
