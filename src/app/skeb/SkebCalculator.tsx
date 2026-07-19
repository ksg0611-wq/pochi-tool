"use client";

import React, { useState, useMemo, useEffect } from 'react';
import AdSenseBanner from '@/components/AdSenseBanner';
import { useAutoSave } from '@/hooks/useAutoSave';
import { saveHistory, savePreset, getPresets, PresetEntry } from '@/lib/historyStore';

export default function SkebCalculator() {
  const [amount, setAmount] = useAutoSave<string>('skeb_amount', '');
  const [isXLinked, setIsXLinked] = useAutoSave<boolean>('skeb_isXLinked', false);
  const [isPast30Days, setIsPast30Days] = useAutoSave<boolean>('skeb_isPast30Days', false);
  const [presets, setPresets] = useState<PresetEntry[]>([]);

  useEffect(() => {
    setPresets(getPresets('skeb'));
  }, []);

  const handleSavePreset = () => {
    const name = window.prompt('プリセット名を入力してください', 'Skeb基本設定');
    if (name) {
      savePreset({ name, platform: 'skeb', data: { amount, isXLinked, isPast30Days } });
      setPresets(getPresets('skeb'));
      window.alert('プリセットを保存しました。');
    }
  };

  const handleLoadPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = presets.find(x => x.id === e.target.value);
    if (p) {
      setAmount(p.data.amount);
      setIsXLinked(p.data.isXLinked);
      setIsPast30Days(p.data.isPast30Days);
    }
  };

  const numAmount = parseInt(amount || '0', 10);

  const { platformFee, netAmount, feeRate } = useMemo(() => {
    if (isNaN(numAmount) || numAmount < 0) {
      return { platformFee: 0, netAmount: 0, feeRate: 0.098 };
    }

    let currentFeeRate = 0.098; // 基本手数料

    if (numAmount >= 5000) {
      let discountCount = 0;
      if (isXLinked) discountCount++;
      if (isPast30Days) discountCount++;

      if (discountCount === 1) currentFeeRate = 0.083;
      if (discountCount === 2) currentFeeRate = 0.068;
    }

    const platformFee = Math.floor(numAmount * currentFeeRate);
    const netAmount = Math.max(0, numAmount - platformFee);

    return { platformFee, netAmount, feeRate: currentFeeRate };
  }, [numAmount, isXLinked, isPast30Days]);

  const handleSaveHistory = () => {
    if (numAmount <= 0) return;
    
    let detailArr = [];
    if (isXLinked) detailArr.push('X連携');
    if (isPast30Days) detailArr.push('30日以内');
    const details = detailArr.length > 0 ? detailArr.join(', ') : '割引なし';

    saveHistory({
      platform: 'Skeb',
      grossAmount: numAmount,
      fee: platformFee,
      netAmount: netAmount,
      details: details,
    });
    window.alert('計算結果を履歴に保存しました。');
  };

  const feeRatePercent = `${(feeRate * 100).toFixed(1)}%`;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Top Banner ── */}
      <AdSenseBanner size="banner" className="mb-2" />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Skeb 手数料計算</h1>
        <p className="text-gray-600 dark:text-gray-400">
          割引条件の達成状況に応じた段階的な手数料率（最大6.8%）に対応
        </p>
      </div>

      {/* 입력 영역 */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">入力条件</h2>
          <div className="flex gap-2 items-center">
            {presets.length > 0 && (
              <select onChange={handleLoadPreset} className="text-sm border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1">
                <option value="">プリセット読込...</option>
                {presets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            )}
            <button onClick={handleSavePreset} className="text-sm bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 px-3 py-1 rounded-md hover:bg-teal-200 transition-colors">
              プリセット保存
            </button>
          </div>
        </div>
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
                placeholder="例: 10000"
              />
            </div>
            <p className="text-xs text-red-500 mt-2">
              ※ リクエスト金額が5,000円未満の場合は、割引条件を満たしていても一律9.8%の手数料が適用されます。
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">手数料割引条件（5,000円以上の場合適用）</p>
            
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
                  X（旧Twitter）プロフィールにSkebのURLを掲載
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                  条件達成で手数料 -1.5% 割引
                </span>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={isPast30Days}
                  onChange={(e) => setIsPast30Days(e.target.checked)}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div>
                <span className="text-sm font-medium block">
                  過去30日間に同ジャンルのリクエストを募集
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 block">
                  条件達成で手数料 -1.5% 割引
                </span>
              </div>
            </label>
          </div>
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

        <div className="mt-8 border-t border-teal-200/50 dark:border-teal-800/50 pt-6">
          <button
            onClick={handleSaveHistory}
            disabled={numAmount <= 0}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            この計算結果を履歴に保存
          </button>
          <p className="text-xs text-teal-600/80 dark:text-teal-300/80 text-center mt-3">
            ※ このデータは現在のブラウザにのみ保存され、ブラウザのキャッシュを削除すると初期化されます。
          </p>
        </div>
      </div>

      {/* ── Mid Banner（黄金の地）── */}
      <AdSenseBanner size="rectangle" />

      {/* 割引効果の比較カード */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">割引適用時の効果（比較シミュレーション）</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          入力金額（{numAmount > 0 ? `¥${numAmount.toLocaleString()}` : '未入力'}）における各条件の手取り比較
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: '割引なし（基本）', rate: 0.098, rateLabel: '9.8%', accent: 'border-gray-200 dark:border-gray-700' },
            { label: '割引1つ達成', rate: numAmount >= 5000 ? 0.083 : 0.098, rateLabel: numAmount >= 5000 ? '8.3%' : '9.8%', accent: 'border-teal-300 dark:border-teal-700' },
            { label: '割引2つ達成（最大）', rate: numAmount >= 5000 ? 0.068 : 0.098, rateLabel: numAmount >= 5000 ? '6.8%' : '9.8%', accent: 'border-teal-500 dark:border-teal-500' },
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
      </div>

      {/* ── Bottom Banner ── */}
      <AdSenseBanner size="leaderboard" />

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
        ※ 本計算機は基本手数料率（9.8%）を基準としており、Skebが不定期に実施する「手数料無料キャンペーン（0%）」期間中は手数料が発生しない場合があります。<br />
        ※ 5,000円未満のリクエストには一律で基本手数料（9.8%）が適用されます。<br />
        最終確認日: 2026年7月14日
      </p>
    </div>
  );
}
