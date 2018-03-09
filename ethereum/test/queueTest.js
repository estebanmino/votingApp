'use strict';

/* Add the dependencies you're testing */
const Queue = artifacts.require("./Queue.sol");

contract('QueueTest', function(accounts) {
	/* Define your constant variables and instantiate constantly changing 
	 * ones
	 */
	const args = {_empty: false, _account3Position: 3,  _account6Position: 6, _size: 5};
	let queue, account1, account2, account3, account4, account5, account6;
	// YOUR CODE HERE

	/* Do something before every `describe` method */
	beforeEach(async function() {
		queue = await Queue.new();
		account1 = accounts[0];
		account2 = accounts[1];
		account3 = accounts[2];
		account4 = accounts[3];
		account5 = accounts[4];
		account6 = accounts[5];
		await queue.enqueue(account1);
		await queue.enqueue(account2);
		await queue.enqueue(account3);
		await queue.enqueue(account4);
		await queue.enqueue(account5);
	});

	/* Group test cases together 
	 * Make sure to provide descriptive strings for method arguements and
	 * assert statements
	 */
	describe('~Queues Work~', function() {
		it("Must have qsize() method.", async function() {
			let queueSize = await queue.qsize.call();
			assert.equal(queueSize.valueOf(), args._size, 'qsize() method should return correct size.');
		});
		it("Must have empty() method.", async function() {
			let empty = await queue.empty.call();
			assert.equal(empty.valueOf(), args._empty, 'empty() exists and works.');
		});
		it("Must have getFirst() method.", async function() {
			let first = await queue.getFirst.call();
			assert.equal(first.valueOf(), account1, 'getFirst() exists and works.')
		});
		it("Must have checkPlace() method.", async function() {
			let place = await queue.checkPlace(account3);
			assert.equal(place.valueOf(), args._account3Position, 'getFirst() exists and works.')
		});
		it("Must have dequeue() method.", async function() {
			let first = await queue.getFirst.call();
			await queue.dequeue.call();
			assert.notEqual(first.valueOf(), account2, "dequeue() first is not the same");
			let newFirst = await queue.getFirst.call();
			assert.notEqual(newFirst.valueOf(), account2, "dequeue() second is the second account");

		});
		it("Must have enqueue(address addr) method.", async function() {
			await queue.enqueue(account6);
			let place = await queue.checkPlace(account6);
			assert.equal(place, args._account6Position, "enqueue() works");
		});
	});
});
