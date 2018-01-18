'use strict';
const crypto = require('crypto');

//定义一个class，叫Blockchain，每一个区块链都是这个class的实例
class Blockchain {
    constructor() {
        this.chain = []; // 储存所有区块
        this.difficulty = 1; // 挖矿的难度
        this.chain.push(this.createBlock(1)); // 创建第一个区块
    }

    isProofValid(tentativeBlock) {
        // 这里我们判断newProof是不是一个合法的proof的方法是
        // 将整个区块进行哈希
        // 如果得到的散列值指的最后n位都是0，那么这是一个valid proof
        // 其中，n = difficulty
        var result = this.constructor.hash(tentativeBlock);
        return result.substr(result.length - this.difficulty) == '0'.repeat(this.difficulty);
    }

    mineProof(tentativeBlock) {
        while (!this.isProofValid(tentativeBlock)) {
            tentativeBlock.proof += 1; // 如果不是可用的proof，我们就接着枚举
        }
    }

    createBlock(previousHash = undefined) {
        // 创造一个新区块
        // 一开始的proof是0，不一定是有效的，所以我们需要mineProof来找到有效的proof
        var block = {
            timestamp: Date.now(),
            id: this.chain.length,
            proof: 0,
            previousBlockHash: previousHash || this.constructor.hash(this.lastBlock()),
            transactions: []
        };

        self.mineProof(block);

        this.chain.push(block);
    }

    createTransaction(sender, receiver, value) {
        // 创建一个交易
        // 根据提供的sender, receiver地址，以及转账的价值，建立一个交易
        // 并把它加入到我们的区块链里
        var transaction = {
            sender: sender,
            receiver: receiver,
            value: value
        };
        this.lastBlock.transactions.push(transaction);
        return this.lastBlock.id;
    }

    static hash(block) {
        // 对一个区块进行哈希:
        // 现将block 转换成base64
        // 将得到的结果进行SHA哈希
        var blockStr = JSON.stringify(block);
        var blockB64 = new Buffer(blockStr).toString('base64');
        var newHash = crypto.createHash('sha256');
        newHash.update(blockB64);
        return newHash.digest('hex');
    }

    lastBlock() {
        // 取得链上的最后一个区块
        return this.chain[this.chain.length - 1];
    }
}
