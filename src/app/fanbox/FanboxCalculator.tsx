"use client";

import React, { useState, useMemo } from 'react';
import AdSenseBanner from '@/components/AdSenseBanner';

export default function FanboxCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [isR18, setIsR18] = useState<boolean>(false);

  // 연산 로직
  const { platformFee, withdrawalFee, netAmount } = useMemo(() => {
    const numAmount = parseInt(amount || '0', 10);
    if (isNaN(numAmount) || numAmount < 0) {
      return { platformFee: 0, withdrawalFee: 0, netAmount: 0 };
    }

    // 1. 서비스 수수료율 판정: R-18 미설정 10%, R-18 설정 12.9%
    const feeRate = isR18 ? 0.129 : 0.10;

    // 2. 플랫폼 수수료 계산: 소수점 이하 절사
    const platformFee = Math.floor(numAmount * feeRate);

    // 3. 은행 출금 수수료 산출: (총 금액 - 플랫폼 수수료) 기준
    const remaining = numAmount - platformFee;
    let withdrawalFee = 0;
    if (remaining > 0) {
      withdrawalFee = remaining < 30000 ? 200 : 300;
    }

    // 4. 최종 실수령액
    const netAmount = Math.max(0, numAmount - platformFee - withdrawalFee);

    return { platformFee, withdrawalFee, netAmount };
  }, [amount, isR18]);

  // 시뮬레이션 부가 기능: 후원자 수 예측
  const plans = [100, 500, 1000, 3000];
  const numAmount = parseInt(amount || '0', 10);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Top Banner ── */}
      <AdSenseBanner size="banner" className="mb-2" />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">FANBOX 手数料計算</h1>
        <p className="text-gray-600 dark:text-gray-400">最新の改定手数料率に対応（R-18設定・振込手数料考慮）</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">入力条件</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              月間総支援金額（円）
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                id="amount"
                type="number"
                min="0"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-lg"
                placeholder="例: 50000"
              />
            </div>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isR18}
              onChange={(e) => setIsR18(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <span className="text-sm font-medium">
              R-18コンテンツ掲載設定（ONの場合は手数料12.9%、OFFの場合は10%）
            </span>
          </label>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-blue-900 dark:text-blue-100">計算結果</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-blue-200/50 dark:border-blue-800/50">
            <span className="text-gray-600 dark:text-gray-300">総支援金額</span>
            <span className="font-medium text-lg">¥ {numAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-blue-200/50 dark:border-blue-800/50">
            <span className="text-gray-600 dark:text-gray-300">プラットフォーム手数料（{isR18 ? '12.9%' : '10%'}）</span>
            <span className="font-medium text-red-500 dark:text-red-400">- ¥ {platformFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-blue-200/50 dark:border-blue-800/50">
            <span className="text-gray-600 dark:text-gray-300">振込手数料</span>
            <span className="font-medium text-red-500 dark:text-red-400">- ¥ {withdrawalFee.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <span className="text-xl font-bold">最終手取り額（目安）</span>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
              ¥ {netAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ── Mid Banner（黄金の地）── */}
      <AdSenseBanner size="rectangle" />

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">支援者数の目安（シミュレーション）</h2>
        <p className="text-sm text-gray-500 mb-4">目標金額（{numAmount > 0 ? `¥${numAmount.toLocaleString()}` : '未入力'}）を達成するために必要な支援者数の目安です。</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {plans.map(plan => {
            const users = numAmount > 0 ? Math.ceil(numAmount / plan) : 0;
            return (
              <div key={plan} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">¥{plan.toLocaleString()} プラン</span>
                <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {users} <span className="text-sm font-normal">人</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Banner ── */}
      <AdSenseBanner size="leaderboard" />

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
        ※ 本計算機は簡易シミュレーターであり、月中のR-18設定変更など特殊条件によって実際の精算額と一部誤差が生じる場合があります。
      </p>
    </div>
  );
}
