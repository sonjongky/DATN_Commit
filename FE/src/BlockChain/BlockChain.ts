import crypto from 'crypto';

class Block {
    public previousHash;
    public timestamp;
    public data;
    public nonce;
    public hash;

    constructor(timestamp: number, previousHash = '', data: any) {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
            .digest('hex');
    }
}

class Blockchain {
    public chain;
    public difficulty;
    public data: any[];
    public miningReward;

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.data = [];
        this.miningReward = 100;
    }
    createGenesisBlock() {
        return new Block(Date.parse('2022-01-01'), '0', []);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    isChainValid() {
        const realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }

        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (previousBlock.hash !== currentBlock.previousHash) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
