"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import AdSenseBanner from '@/components/AdSenseBanner';
import { useAutoSave } from '@/hooks/useAutoSave';
import { saveHistory, savePreset, getPresets, PresetEntry } from '@/lib/historyStore';

// ────────────────────────────────────────────────
// プラットフォーム別手取り額計算ロジック
// ────────────────────────────────────────────────

function calcFanbox(amount: number): { net: number; fee: number; withdrawal: number } {
  // R-18未設定（全年齢）基準: 10%
  const platformFee = Math.floor(amount * 0.10);
  const remaining = amount - platformFee;
  const withdrawal = remaining > 0 ? (remaining < 30000 ? 200 : 300) : 0;
  const net = Math.max(0, amount - platformFee - withdrawal);
  return { net, fee: platformFee, withdrawal };
}

function calcSkeb(amount: number, isXLinked: boolean, isPast30Days: boolean): { net: number; fee: number; withdrawal: number; rate: number } {
  let feeRate = 0.098;
  if (amount >= 5000) {
    let discountCount = 0;
    if (isXLinked) discountCount++;
    if (isPast30Days) discountCount++;
    if (discountCount === 1) feeRate = 0.083;
    if (discountCount === 2) feeRate = 0.068;
  }
  const platformFee = Math.floor(amount * feeRate);
  const net = Math.max(0, amount - platformFee);
  return { net, fee: platformFee, withdrawal: 0, rate: feeRate };
}

function calcBooth(amount: number): { net: number; fee: number; withdrawal: number } {
  // BOOSTなし商品価格基準: 5.6% + 22円
  const serviceFee = Math.floor(amount * 0.056) + 22;
  const afterFee = amount - serviceFee;
  const withdrawal = afterFee > 0 ? (afterFee < 30000 ? 200 : 300) : 0;
  const net = Math.max(0, amount - serviceFee - withdrawal);
  return { net, fee: serviceFee, withdrawal };
}

const RANK_MEDALS = ['👑', '🥈', '🥉'];
const RANK_LABELS = ['1位', '2位', '3位'];
const RANK_RING = [
  'ring-2 ring-yellow-400 dark:ring-yellow-500 shadow-lg shadow-yellow-100 dark:shadow-yellow-900/30',
  'ring-1 ring-gray-300 dark:ring-gray-600',
  'ring-1 ring-gray-200 dark:ring-gray-700',
];

export default function CompareCalculator() {
  const [amount, setAmount] = useAutoSave<string>('compare_amount', '');
  const [isSkebXLinked, setIsSkebXLinked] = useAutoSave<boolean>('compare_isSkebXLinked', false);
  const [isSkebPast30Days, setIsSkebPast30Days] = useAutoSave<boolean>('compare_isSkebPast30Days', false);
  const [presets, setPresets] = useState<PresetEntry[]>([]);

  useEffect(() => {
    setPresets(getPresets('compare'));
  }, []);

  const handleSavePreset = () => {
    const name = window.prompt('プリセット名を入力してください', '比較シミュレーション基本設定');
    if (name) {
      savePreset({ name, platform: 'compare', data: { amount, isSkebXLinked, isSkebPast30Days } });
      setPresets(getPresets('compare'));
      window.alert('プリセットを保存しました。');
    }
  };

  const handleLoadPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const p = presets.find(x => x.id === e.target.value);
    if (p) {
      setAmount(p.data.amount);
      setIsSkebXLinked(p.data.isSkebXLinked);
      setIsSkebPast30Days(p.data.isSkebPast30Days);
    }
  };

  const numAmount = parseInt(amount || '0', 10);
  const isValid = !isNaN(numAmount) && numAmount > 0;

  // 3つのプラットフォーム計算後、手取り額基準の降順に並べ替え
  const ranked = useMemo(() => {
    const fanboxResult = calcFanbox(numAmount);
    const skebResult = calcSkeb(numAmount, isSkebXLinked, isSkebPast30Days);
    const boothResult = calcBooth(numAmount);

    const platforms = [
      {
        id: 'fanbox',
        name: 'FANBOX',
        note: '全年齢（R-18なし）・10%手数料',
        href: '/fanbox',
        ...fanboxResult,
        color: {
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          border: 'border-blue-200 dark:border-blue-700',
          borderTop: 'border-t-blue-500',
          accent: 'text-blue-600 dark:text-blue-400',
          badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        },
      },
      {
        id: 'skeb',
        name: 'Skeb',
        note: `選択条件適用（${(skebResult.rate * 100).toFixed(1)}%）・振込無料`,
        href: '/skeb',
        ...skebResult,
        color: {
          bg: 'bg-teal-50 dark:bg-teal-900/20',
          border: 'border-teal-200 dark:border-teal-700',
          borderTop: 'border-t-teal-500',
          accent: 'text-teal-600 dark:text-teal-400',
          badge: 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300',
        },
      },
      {
        id: 'booth',
        name: 'BOOTH',
        note: 'BOOSTなし・5.6%+22円',
        href: '/booth',
        ...boothResult,
        color: {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-200 dark:border-orange-700',
          borderTop: 'border-t-orange-500',
          accent: 'text-orange-600 dark:text-orange-400',
          badge: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300',
        },
      },
    ];

    return platforms.sort((a, b) => b.net - a.net);
  }, [numAmount, isSkebXLinked, isSkebPast30Days]);

  // 1位との差額
  const topNet = ranked[0]?.net ?? 0;

  const handleSaveHistory = () => {
    if (!isValid) return;
    const top = ranked[0];
    saveHistory({
      platform: `Compare (1位: ${top.name})`,
      grossAmount: numAmount,
      fee: top.fee + top.withdrawal,
      netAmount: top.net,
      details: `${ranked[0].name} > ${ranked[1].name} > ${ranked[2].name}`,
    });
    window.alert('計算結果を履歴に保存しました。');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Top Banner ── */}
      <AdSenseBanner size="banner" className="mb-2" />

      {/* 헤더 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">プラットフォーム 手取り比較</h1>
        <p className="text-gray-600 dark:text-gray-400">
          同じ金額でも、プラットフォームごとに手取りは変わります。最もお得なプラットフォームを一目で確認できます。
        </p>
      </div>

      {/* 入力エリア */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="compare-amount" className="block text-sm font-medium">
            目標・比較したい金額（円）
          </label>
          <div className="flex gap-2 items-center">
            {presets.length > 0 && (
              <select onChange={handleLoadPreset} className="text-sm border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 px-2 py-1">
                <option value="">プリセット読込...</option>
                {presets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            )}
            <button onClick={handleSavePreset} className="text-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 px-3 py-1 rounded-md hover:bg-indigo-200 transition-colors">
              プリセット保存
            </button>
          </div>
        </div>
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">¥</span>
          <input
            id="compare-amount"
            type="number"
            min="0"
            step="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-xl font-semibold"
            placeholder="例: 50000"
          />
        </div>

        {/* Skeb 할인 조건 설정 */}
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
      </div>

      {/* ランキングカード */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          手取り額ランキング
          {isValid && (
            <span className="ml-2 text-sm font-normal text-gray-500">（¥{numAmount.toLocaleString()} 入力時）</span>
          )}
        </h2>

        {ranked.map((p, i) => {
          const isFirst = i === 0;
          const diff = isValid && !isFirst ? topNet - p.net : null;
          const effectiveRate = isValid && numAmount > 0
            ? (((numAmount - p.net) / numAmount) * 100).toFixed(1)
            : null;

          return (
            <div
              key={p.id}
              className={`
                rounded-2xl border-t-4 p-6 transition-all duration-300
                ${p.color.bg} ${p.color.border} ${p.color.borderTop}
                ${RANK_RING[i]}
                ${isFirst ? 'scale-[1.02]' : ''}
              `}
            >
              <div className="flex items-start justify-between gap-4">
                {/* 左側: 順位 + プラットフォーム名 */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl leading-none flex-shrink-0">{RANK_MEDALS[i]}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.color.badge}`}>
                        {RANK_LABELS[i]}
                      </span>
                      <span className="text-xl font-extrabold">{p.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.note}</p>
                  </div>
                </div>

                {/* 右側: 手取り額 */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-2xl md:text-3xl font-extrabold ${p.color.accent}`}>
                    {isValid ? `¥ ${p.net.toLocaleString()}` : '—'}
                  </p>
                  {effectiveRate && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      実効手数料率 {effectiveRate}%
                    </p>
                  )}
                </div>
              </div>

              {/* 手数料内訳 */}
              {isValid && (
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200/60 dark:border-gray-700/60 pt-3">
                  <span>サービス手数料 <strong className="text-red-500">¥{p.fee.toLocaleString()}</strong></span>
                  <span>振込手数料 <strong className="text-red-500">¥{p.withdrawal.toLocaleString()}</strong></span>
                  {diff !== null && diff > 0 && (
                    <span className="ml-auto text-gray-400">
                      1位より <strong className="text-red-400">¥{diff.toLocaleString()}</strong> 少ない
                    </span>
                  )}
                  {isFirst && (
                    <span className="ml-auto font-semibold text-yellow-600 dark:text-yellow-400">
                      ✨ 最も手取りが多い
                    </span>
                  )}
                </div>
              )}

              {/* 計算機へのリンク */}
              <div className="mt-3 text-right">
                <Link
                  href={p.href}
                  className={`text-xs underline underline-offset-2 ${p.color.accent} hover:opacity-70 transition-opacity`}
                >
                  {p.name}の詳細計算へ →
                </Link>
              </div>
            </div>
          );
        })}

        {isValid && (
          <div className="mt-8 border-t border-gray-200/50 dark:border-gray-800/50 pt-6">
            <button
              onClick={handleSaveHistory}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              この計算結果を履歴に保存
            </button>
            <p className="text-xs text-indigo-600/80 dark:text-indigo-300/80 text-center mt-3">
              ※ このデータは現在のブラウザにのみ保存され、ブラウザのキャッシュを削除すると初期化されます。
            </p>
          </div>
        )}
      </div>

      {/* ── Mid Banner（黄金の地）── */}
      <AdSenseBanner size="rectangle" />

      {/* 前提条件案内 */}
      {isValid && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p className="font-semibold text-gray-600 dark:text-gray-300 mb-2">比較の前提条件</p>
          <p>・ FANBOX：全年齢設定（R-18なし）、手数料 10%</p>
          <p>・ Skeb：上記で設定した割引条件を適用（5,000円未満は無条件で9.8%）、振込手数料 0円</p>
          <p>・ BOOTH：BOOST なし、手数料 5.6% + 22円</p>
          <p className="mt-2 text-red-500">※ Skebはリクエスト金額が5,000円未満の場合、割引条件を満たしていても一律9.8%の手数料が適用されます。</p>
        </div>
      )}

      {/* ── Bottom Banner ── */}
      <AdSenseBanner size="leaderboard" />

      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        ※ 本比較計算機は各プラットフォームの基本設定を基準としたシミュレーションです。実際の精算金額は条件により異なります。<br />
        最終確認日: 2026年7月14日
      </p>
    </div>
  );
}
