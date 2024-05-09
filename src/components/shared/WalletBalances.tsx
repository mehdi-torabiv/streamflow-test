import React from 'react';
import useSolanaTokens from '../../hooks/useSolanaTokens';

const WalletBalances = () => {
    const { tokens, loading } = useSolanaTokens();

    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-2">Wallet Balances</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    tokens.map((token, index) => (
                        <div key={index} className="mb-4 p-4 shadow border rounded-lg flex items-center space-x-4">
                            {token.logoURI && (
                                <img src={token.logoURI} alt={token.name} className="w-10 h-10" />
                            )}
                            <div>
                                <p className="text-lg font-semibold">{token.name} ({token.symbol})</p>
                                <p className="text-gray-600">Balance: {token.balance.toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WalletBalances;
