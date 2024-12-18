import React, { useState } from 'react';
import { Wallet, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatPrice } from '../utils';

const QUICK_ADD_AMOUNTS = [10, 25, 50, 100];

export default function BalanceManager() {
  const { user, updateUserBalance } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBalance = async (amount: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const { balance } = await balanceApi.addBalance(amount);
      updateUserBalance(balance);
      setIsAdding(false);
      setCustomAmount('');
    } catch (err) {
      setError('Failed to add balance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    handleAddBalance(amount);
  };

  if (!isAdding) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Wallet className="h-6 w-6 text-emerald-500" />
            <div>
              <h3 className="text-xl font-semibold">Your Balance</h3>
              <p className="text-2xl font-bold text-emerald-500">
                {formatPrice(user?.balance || 0)}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-emerald-500 rounded-md hover:bg-emerald-600 transition flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Funds</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add Funds</h3>
        <p className="text-gray-400">Select an amount to add to your balance</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {QUICK_ADD_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => handleAddBalance(amount)}
            disabled={isLoading}
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex flex-col items-center justify-center"
          >
            <span className="text-lg font-bold text-emerald-500">{formatPrice(amount)}</span>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Or enter custom amount:</p>
        <form onSubmit={handleCustomAmount} className="flex space-x-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="0.01"
              step="0.01"
              placeholder="Enter amount"
              className="w-full pl-8 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-500 rounded-md hover:bg-emerald-600 transition"
          >
            Add
          </button>
        </form>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsAdding(false)}
          className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}