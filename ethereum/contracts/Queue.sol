pragma solidity 0.4.19;

contract Queue {
    address[] queue;

    uint8 front;
    uint8 back;

    event Enqueue(address adr, uint pos);
    event Dequeue(address adr);
    event CheckPlace(uint _pos);
    
    /* Add constructor */
    function Queue() public {
        queue = new address[](0);
        front = 0;
        back = 0;
    }

    /* Returns the number of people waiting in line */
    function qsize() public constant returns(uint8) {
        if (back == front) {
            return 0;
        } else {
            return back-front;
        }
    }

    /* Returns whether the queue is empty or not */
    function empty() public constant returns(bool) {
        return qsize() == 0;
    }

    /* Returns the address of the person in the front of the queue */
    function getFirst() public constant returns(address) {
        if (empty()) {
            return 0;
        }
        return queue[front];
    }

    /* Allows `msg.sender` to check their position in the queue */
    function checkPlace(address _address) public constant returns(uint8) {
        for (uint8 i = front; i < qsize() + front; i++) {
            if (_address == queue[i]) {
                return i+1-front;
            }
        }
        return 0;
    }

    /* Removes the first person in line; either when their time is up or when
        * they are done with their purchase
        */
    function dequeue() public {
        require(!empty());
        Dequeue(queue[front]);
        delete queue[front];
        front += 1;
    }

    /* Places `addr` in the first empty position in the queue */
    function enqueue(address addr) public returns (bool) {
        back += 1;
        queue.push(addr);
        Enqueue(addr, qsize());
        return true;
    }
    
    function () public payable {
        msg.sender.transfer(msg.value);
        revert();
    }
}