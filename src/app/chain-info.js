'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { WagmiConfig } from "wagmi";

export default function ChainInfoPage() {
    const [chainId, setChainId] = useState(null);
    const [lastBlockNumber, setLastBlockNumber] = useState(null);
    const [latestBlockHash, setLatestBlockHash] = useState(null);
    const [gasUsed, setGasUsed] = useState(null);
    const [gasPrice, setGasPrice] = useState(null);
    const [burntFees, setBurntFees] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(); // Default to public provider
                const network = await provider.getNetwork();

                // Chain ID
                setChainId(network.chainId);

                // Block details
                const blockNumber = await provider.getBlockNumber();
                setLastBlockNumber(blockNumber);

                const block = await provider.getBlock(blockNumber);
                setLatestBlockHash(block.hash);
                setGasUsed(block.gasUsed.toString());

                // Gas price
                const gasPrice = await provider.getGasPrice();
                setGasPrice(ethers.utils.formatUnits(gasPrice, 'gwei'));

                // Burnt Fees (EIP-1559 base fees)
                const baseFee = block.baseFeePerGas
                    ? ethers.utils.formatUnits(block.baseFeePerGas.mul(block.gasUsed), 'ether')
                    : '0';
                setBurntFees(baseFee);
            } catch (error) {
                console.error('Error fetching chain info:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Ethereum Chain Info</h1>
            <ul>
                <li><strong>Current Chain ID:</strong> {chainId ?? 'Loading...'}</li>
                <li><strong>Last Block Number:</strong> {lastBlockNumber ?? 'Loading...'}</li>
                <li><strong>Latest Block Hash:</strong> {latestBlockHash ?? 'Loading...'}</li>
                <li><strong>Gas Used:</strong> {gasUsed ?? 'Loading...'}</li>
                <li><strong>Gas Price (Gwei):</strong> {gasPrice ?? 'Loading...'}</li>
                <li><strong>Burnt Fees (ETH):</strong> {burntFees ?? 'Loading...'}</li>
            </ul>
        </div>
    );
}
