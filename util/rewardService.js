// rewardService.js
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const abiPath = path.join(__dirname, '../contractABI.json');
const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8')).abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const token = new ethers.Contract(process.env.TOKEN_CONTRACT, abi, wallet);

exports.rewardUser = async (toAddress, amount) => {
    try {
        // 1. 서버 지갑의 토큰 잔액 확인
        const balance = await token.balanceOf(wallet.address);
        const formattedBalance = ethers.formatUnits(balance, 18);
        console.log(`현재 서버 지갑 보유 토큰: ${formattedBalance} CTK`);

        if (Number(formattedBalance) < Number(amount)) {
            throw new Error('잔액이 부족합니다.');
        }

        // 2. 토큰 전송 실행
        const tx = await token.transfer(
            toAddress,
            ethers.parseUnits(amount.toString(), 18)
        );
        console.log(`TX Sent: ${tx.hash}`);

        return tx.hash;
    } catch (error) {
        console.error('토큰 전송 실패:', error.message);
        throw new Error('토큰 전송 중 오류가 발생했습니다.');
    }
};

exports.getRewardTokenBalance = async (address) => {
    try {
        if (!ethers.isAddress(address)) {
            throw new Error('유효하지 않은 주소입니다.');
        }

        const balance = await token.balanceOf(address);
        const formatted = ethers.formatUnits(balance, 18);
        return formatted;
    } catch (error) {
        console.error(`잔액 조회 실패: ${error.message}`);
        throw new Error('잔액 조회 중 오류 발생');
    }
};
