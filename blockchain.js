'use strict';
//定义一个class，叫Blockchain，每一个区块链都是这个class的实例
class Blockchain {
    constructor() {
        this.chain = []; // 储存所有区块
        this.currentTransactions = []; // 储存所有交易
    }

    createBlock() {
        // 创造一个新区块
    }

    createTransaction() {
        // 创建一个交易
    }

    static hash(block) {
        // 对一个区块进行哈希
    }

    static lastBlock() {
        // 取得链上的最后一个区块
    }
}
