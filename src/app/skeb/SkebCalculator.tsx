"use client";

import React, { useState, useMemo } from 'react';

export default function SkebCalculator() {
  const [amount, setAmount] = useState<string>('');
  const [isXLinked, setIsXLinked] = useState<boolean>(false);

  const numAmount = parseInt(amount || '0', 10);

  const { platformFee, netAmount, feeRate } = useMemo(() => {
    if (isNaN(numAmount) || numAmount < 0) {
      return { platformFee: 0, netAmount: 0, feeRate: 0.136 };
    }

    // 1. 수수료율 판정: X 미연동 13.6%, X 연동 6.8%
    const feeRate = isXLinked ? 0.068 : 0.136;

    // 2. 플랫폼 수수료 계산: 소수점 이하 절사
    const platformFee = Math.floor(numAmount * feeRate);

    // 3. 출금 수수료: Skeb은 항상 0엔
    // 4. 최종 실수령액
    const netAmount = Math.max(0, numAmount - platformFee);

    return { platformFee, netAmount, feeRate };
  }, [numAmount, isXLinked]);

  const feeRatePercent = isXLinked ? '6.8%' : '13.6%';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Skeb 手数料計算</h1>
        <p className="text-gray-600 dark:text-gray-400">
          X（旧Twitter）連携の有無で変わる手数料率に対応
        </p>
      </div>

      {/* 입력 영역 */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">入力条件</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="skeb-amount" className="block text-sm font-medium mb-2">
              リクエスト承認金額（円）
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                id="skeb-amount"
                type="number"
                min="0"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow text-lg"
                placeholder="例: 30000"
              />
            </div>
          </div>

          <label className="flex items-start space-x-3 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                type="checkbox"
                checked={isXLinked}
                onChange={(e) => setIsXLinked(e.target.checked)}
                className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <span className="text-sm font-medium block">
                X（旧Twitter）アカウント連携あり
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                連携・条件充足でサービス手数料が <strong>13.6% → 6.8%</strong> に半減
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* 계산 결과 */}
      <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl border border-teal-100 dark:border-teal-800/50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-teal-900 dark:text-teal-100">計算結果</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-teal-200/50 dark:border-teal-800/50">
            <span className="text-gray-600 dark:text-gray-300">リクエスト承認金額</span>
            <span className="font-medium text-lg">¥ {numAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-teal-200/50 dark:border-teal-800/50">
            <span className="text-gray-600 dark:text-gray-300">
              サービス手数料（{feeRatePercent}）
            </span>
            <span className="font-medium text-red-500 dark:text-red-400">
              - ¥ {platformFee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-teal-200/50 dark:border-teal-800/50">
            <span className="text-gray-600 dark:text-gray-300">振込手数料</span>
            <span className="font-medium text-teal-600 dark:text-teal-400">
              ¥ 0（無料）
            </span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-xl font-bold">最終手取り額（目安）</span>
            <span className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
              ¥ {netAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* X 연동 효과 비교 카드 */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">X連携の効果（比較シミュレーション）</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          入力金額（{numAmount > 0 ? `¥${numAmount.toLocaleString()}` : '未入力'}）における X 連携あり・なしの手取り比較
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'X 連携なし', rate: 0.136, rateLabel: '13.6%', accent: 'border-gray-200 dark:border-gray-700' },
            { label: 'X 連携あり', rate: 0.068, rateLabel: '6.8%', accent: 'border-teal-400 dark:border-teal-600' },
          ].map(({ label, rate, rateLabel, accent }) => {
            const fee = Math.floor(numAmount * rate);
            const net = Math.max(0, numAmount - fee);
            return (
              <div key={label} className={`p-4 rounded-xl border-2 ${accent} bg-gray-50 dark:bg-gray-800/50`}>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}（{rateLabel}）</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  ¥ {net.toLocaleString()}
                </p>
                <p className="text-xs text-red-400 mt-1">手数料 ¥ {fee.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
        {numAmount > 0 && (
          <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mt-4 text-right">
            X連携で最大 ¥{(Math.floor(numAmount * 0.136) - Math.floor(numAmount * 0.068)).toLocaleString()} お得
          </p>
        )}
      </div>

      {/* 주의 문구 */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
        ※ 본 계산기는 기본 수수료율(13.6% / 6.8%)을 기준으로 하며, Skeb에서 비정기적으로 진행하는 &apos;수수료 무료 캠페인(0%)&apos; 기간에는 수수료가 발생하지 않을 수 있습니다.<br />
        （※ 本計算機は基本手数料率（13.6%・6.8%）を基準としており、Skebが不定期に実施する「手数料無料キャンペーン（0%）」期間中は手数料が発生しない場合があります。）
      </p>
    </div>
  );
}
