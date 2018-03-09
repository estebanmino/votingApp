pragma solidity 0.4.19;

import './Queue.sol';

contract Voting {
    /* CREATOR
    - is the owner
    - add participants to vote for
    - set voting period
    - close voting*

        VOTERS
    - vote

        GENRAL
    - see realtime results
    - see closed results
    */

    struct CandidateResult {
        uint count;
        bool initialized;
    }

    struct VoteRegistry {
        bool vote;
        bool initialized;
    }

    address public owner;
    uint public votingStart = 0;
    uint public votingPeriod; //minutes
    string public description;
    Queue public queue;

    address[] candidates;

    mapping (address=>CandidateResult) votingPoll; // address voted for, q of votes
    mapping(address=>VoteRegistry) votersRegistry;

    function Voting(string _description) public {
        owner = msg.sender;
        description = _description;
        candidates = new address[](0);
        queue = new Queue();
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier duringVotingTime() {
        require(now - votingStart <= votingPeriod);
        _;
    }

    modifier notVoteAlready() {
        require(votersRegistry[msg.sender].initialized && votersRegistry[msg.sender].vote == false);
        _;
    }

    modifier invitedToVote() {
        require(votersRegistry[msg.sender].initialized);
        _;
    }

    modifier beforeStarts() {
        require(votingStart == 0);
        _;
    }

    // OWNER

    function addCandidate(address _newCandidate) public onlyOwner() beforeStarts() {
        votingPoll[_newCandidate] = CandidateResult(0, true);
        candidates.push(_newCandidate);
    }

    function startVotingPeriod(uint _votingPeriod) public onlyOwner() beforeStarts() {
        votingStart = now;
        votingPeriod = _votingPeriod;
    }

    function askVoteRight() public beforeStarts() {
        votersRegistry[msg.sender] = VoteRegistry(false, true);
    }

    // VOTERS
    function vote(address _candidateAddress) public notVoteAlready() duringVotingTime() {
        require(votingPoll[_candidateAddress].initialized);
        votersRegistry[msg.sender].vote == true;
        votingPoll[_candidateAddress].count += 1; 
    } 

       // queue for requests

    // GENERAL
    function getCandidates() public constant returns (address[]) {
        return candidates;
    }


    function getResult(address _candidate) public constant returns (uint) {
        if (votingPoll[_candidate].initialized) {
            return votingPoll[_candidate].count;
        } else {
            return 0;
        }
    }
}