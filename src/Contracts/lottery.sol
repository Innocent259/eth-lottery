//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
contract Lottery {
    address public owner;
    address payable[] public players;
    uint public lotteryId;
    mapping(uint => address payable) public LotteryHistory;
    constructor() {
        owner = msg.sender;
        lotteryId = 1;

    }
    function getWinnerByLottery(uint lottery) public view returns(address payable) {
        return LotteryHistory[lottery];

    }
    function getBalance() public view returns(uint) {
        return address(this).balance;
    
    }
    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }
    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(payable(msg.sender));

    }
    function getRandomNumber() public view returns(uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));

    }
    function PickWinner() public onlyowner {
        uint index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);
        LotteryHistory[lotteryId] = players[index];
        lotteryId++;
        players = new address payable[](0);
    }
    modifier onlyowner(){
        require(msg.sender == owner);
        _;
    }
}
