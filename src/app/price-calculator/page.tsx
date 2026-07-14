"use client";

import React, { useState, useMemo } from 'react';
import AdSenseBanner from '@/components/AdSenseBanner';

function calcReversePrice(targetNet: number, platform: string, isSkebXLinked: boolean, isSkebPast30Days: boolean): number {
  if (targetNet <= 0) return 0;

  let low = targetNet;
  let high = targetNet * 2 + 10000;
  let ans = high;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    let net = 0;

    if (platform === 'fanbox') {
      const fee = Math.floor(mid * 0.10);
      const remaining = mid - fee;
      const withdrawal = remaining > 0 ? (remaining < 30000 ? 200 : 300) : 0;
      net = Math.max(0, mid - fee - withdrawal);
    } else if (platform === 'skeb') {
      let feeRate = 0.098;
      if (mid >= 5000) {
        let count = 0;
        if (isSkebXLinked) count++;
        if (isSkebPast30Days) count++;
        if (count === 1) feeRate = 0.083;
        if (count === 2) feeRate = 0.068;
      }
      const fee = Math.floor(mid * feeRate);
      net = Math.max(0, mid - fee);
    } else if (platform === 'booth') {
      const serviceFee = Math.floor(mid * 0.056) + 22;
      const afterFee = mid - serviceFee;
      const withdrawal = afterFee > 0 ? (afterFee < 30000 ? 200 : 300) : 0;
      net = Math.max(0, mid - serviceFee - withdrawal);
    }

    if (net >= targetNet) {
      ans = mid;
      high = mid - 1; // Try to find a smaller valid gross price
    } else {
      low = mid + 1;
    }
  }

  return ans;
}

export default function PriceCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState<string>('1500');
  const [hours, setHours] = useState<string>('5');
  const [platform, setPlatform] = useState<string>('fanbox');
  const [isSkebXLinked, setIsSkebXLinked] = useState<boolean>(false);
  const [isSkebPast30Days, setIsSkebPast30Days] = useState<boolean>(false);

  const numHourly = parseInt(hourlyRate || '0', 10);
  const numHours = parseFloat(hours || '0');
  
  const targetNet = Math.floor(numHourly * numHours);
  const isValid = !isNaN(numHourly) && numHourly > 0 && !isNaN(numHours) && numHours > 0;

  const requiredGross = useMemo(() => {
    if (!isValid) return 0;
    return calcReversePrice(targetNet, platform, isSkebXLinked, isSkebPast30Days);
  }, [isValid, targetNet, platform, isSkebXLinked, isSkebPast30Days]);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <AdSenseBanner size="banner" className="mb-2" />

      <div>
        <h1 className="text-3xl font-bold mb-2">適正単価 逆算シミュレーター</h1>
        <p className="text-gray-600 dark:text-gray-400">
          目標とする手取り額（純利益）を確保するために、実際に設定・請求すべき「最低募集単価」を各プラットフォームの手数料を逆算して算出します。
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="hourly-rate" className="block text-sm font-medium mb-3">
              目標時給（円）
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">¥</span>
              <input
                id="hourly-rate"
                type="number"
                min="0"
                step="100"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-lg font-semibold"
                placeholder="例: 1500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="hours" className="block text-sm font-medium mb-3">
              予想作業時間（時間）
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">⏳</span>
              <input
                id="hours"
                type="number"
                min="0"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-lg font-semibold"
                placeholder="例: 5"
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-300 font-medium">目標手取り額（純利益）:</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {isValid ? `¥ ${targetNet.toLocaleString()}` : '—'}
          </span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            精算プラットフォームを選択
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'fanbox', label: 'FANBOX' },
              { id: 'skeb', label: 'Skeb' },
              { id: 'booth', label: 'BOOTH' }
            ].map((p) => (
              <label
                key={p.id}
                className={`
                  flex items-center justify-center py-3 px-2 rounded-xl border-2 cursor-pointer transition-all
                  ${platform === p.id 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 font-bold' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'}
                `}
              >
                <input
                  type="radio"
                  name="platform"
                  value={p.id}
                  checked={platform === p.id}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="hidden"
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>

        {platform === 'skeb' && (
          <div className="bg-teal-50 dark:bg-teal-900/10 p-4 rounded-xl border border-teal-100 dark:border-teal-800/30">
            <p className="text-sm font-medium text-teal-800 dark:text-teal-200 mb-3">
              Skeb 割引シミュレーション条件
            </p>
            <div className="space-y-3">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={isSkebXLinked}
                    onChange={(e) => setIsSkebXLinked(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 block">
                    X（旧Twitter）連携あり (-1.5%)
                  </span>
                </div>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={isSkebPast30Days}
                    onChange={(e) => setIsSkebPast30Days(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 block">
                    過去30日間に同ジャンルの募集あり (-1.5%)
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-900/20 rounded-3xl p-8 border border-indigo-100 dark:border-indigo-800/50 shadow-lg relative overflow-hidden text-center">
        <div className="relative z-10">
          <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-2">
            設定すべき最低募集単価（請求額）
          </h2>
          <p className="text-sm text-indigo-700/80 dark:text-indigo-300/80 mb-6 max-w-lg mx-auto">
            プラットフォームの定率・定額手数料および小数点処理を逆算し、目標手取り額を確実に受け取るために必要な最低金額です。
          </p>
          <div className="text-5xl md:text-6xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
            {isValid ? `¥ ${requiredGross.toLocaleString()}` : '—'}
          </div>
        </div>
      </div>

      <AdSenseBanner size="rectangle" />

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
        ※ 本サイトはプラットフォームの手数料計算のための参考情報を提供するものであり、税務・会計相談を代替するものではありません。正確な税務処理については、専門家や管轄の税務署にご確認ください。<br />
        最終確認日: 2026年7月14日
      </p>
    </div>
  );
}
