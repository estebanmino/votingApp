'use strict';

/* Add the dependencies you're testing */
const Voting = artifacts.require("./Voting.sol");

contract('VotingTest', function(accounts) {
	/* Define your constant variables and instantiate constantly changing 
	 * ones
	 */
    const args = {_empty: false, _account3Position: 3,  _account6Position: 6, _size: 5, _true: true, _false: false,
                    _minutes: 2};
    let voting, owner, candidate1, candidate2, voter1, voter2, voter3, voter4;

	beforeEach(async function() {
        owner = accounts[0];
        candidate1 = accounts[1];
        candidate2 = accounts[2];
        voter1 = accounts[3];
        voter2 = accounts[4];
        voter3 = accounts[5];
        voter4 = accounts[6];

        voting = await Voting.new("Test description", { from: owner })
	});

	/* Group test cases together 
	 * Make sure to provide descriptive strings for method arguements and
	 * assert statements
	 */
	describe('~Queues Work~', function() {
		it("Must have addCandidate() method.", async function() {
            await voting.addCandidate(candidate1, { from: owner });
            let candidates = await voting.getCandidates.call();
            let candidateFound = false;
            for (let i = 0; i < candidates.length; i++) {
                if (candidate1 == candidates[i]) {
                    candidateFound = true;
                }
            }
            assert.equal(candidateFound, args._true, "Candidate added in candidates list.");
        });
		it("Must have askRightVote() method.", async function() {
            await voting.askVoteRight({ from: voter1 });
            let voteRightAsked = await voting.voteRightAsked({ from: voter1 });
            assert.equal(voteRightAsked.valueOf(), args._true, "Vote righ asked.");
		});
		it("Must have startVotingPeriod() method.", async function() {
            await voting.startVotingPeriod(args._minutes);
            assert.equal(voting.votingPeriod, args._minutes, "Set voting period. ")
        });
		it("Must have vote() method after right given.", async function() {
        });
        it("Shouldn't have vote() method in not votePeriod.", async function() {
        });
        it("Shouldn't have vote() method in not rightToVote.", async function() {
        });
        it("Shouldn't have vote() method for address not candidate.", async function() {
		});
	});
});
