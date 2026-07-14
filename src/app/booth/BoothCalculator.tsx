"use client";

import React, { useState, useMemo } from 'react';
import AdSenseBanner from '@/components/AdSenseBanner';

export default function BoothCalculator() {
  const [productPrice, setProductPrice] = useState<string>('');
  const [boostAmount, setBoostAmount] = useState<string>('');

  const numProduct = parseInt(productPrice || '0', 10);
  const numBoost = parseInt(boostAmount || '0', 10);

  const { totalPayment, serviceFee, withdrawalFee, netAmount } = useMemo(() => {
    const p = isNaN(numProduct) || numProduct < 0 ? 0 : numProduct;
    const b = isNaN(numBoost) || numBoost < 0 ? 0 : numBoost;

    // 1. 총 결제 금액
    const totalPayment = p + b;

    // 2. 서비스 수수료: Math.floor(총 결제 금액 × 5.6%) + 22엔
    const serviceFee = Math.floor(totalPayment * 0.056) + 22;

    // 3. 은행 출금 수수료: (총 결제 금액 - 서비스 수수료) 기준
    const afterServiceFee = totalPayment - serviceFee;
    let withdrawalFee = 0;
    if (afterServiceFee > 0) {
      withdrawalFee = afterServiceFee < 30000 ? 200 : 300;
    }

    // 4. 최종 실수령액
    const netAmount = Math.max(0, totalPayment - serviceFee - withdrawalFee);

    return { totalPayment, serviceFee, withdrawalFee, netAmount };
  }, [numProduct, numBoost]);

  // 수수료율 (참고용 표시)
  const effectiveFeeRate = totalPayment > 0
    ? ((serviceFee / totalPayment) * 100).toFixed(2)
    : '0.00';

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Top Banner ── */}
      <AdSenseBanner size="banner" className="mb-2" />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">BOOTH 手数料計算</h1>
        <p className="text-gray-600 dark:text-gray-400">
          決済手数料（5.6% + 22円）・BOOST・振込手数料をまとめて計算
        </p>
      </div>

      {/* 입력 영역 */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">入力条件</h2>
        <div className="space-y-5">
          <div>
            <label htmlFor="product-price" className="block text-sm font-medium mb-2">
              商品合計金額（円）
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                id="product-price"
                type="number"
                min="0"
                step="100"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow text-lg"
                placeholder="例: 1500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="boost-amount" className="block text-sm font-medium mb-2">
              BOOST（上乗せ支援金）金額（円）
              <span className="ml-2 text-xs text-gray-400 font-normal">任意・省略可</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
              <input
                id="boost-amount"
                type="number"
                min="0"
                step="100"
                value={boostAmount}
                onChange={(e) => setBoostAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow text-lg"
                placeholder="例: 500（省略可）"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              ※ BOOSTにも同じ決済手数料（5.6% + 22円）が合算適用されます
            </p>
          </div>
        </div>
      </div>

      {/* 계산 결과 */}
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800/50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-orange-900 dark:text-orange-100">計算結果</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-orange-200/50 dark:border-orange-800/50">
            <span className="text-gray-600 dark:text-gray-300">商品合計</span>
            <span className="font-medium">¥ {numProduct.toLocaleString()}</span>
          </div>
          {numBoost > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-orange-200/50 dark:border-orange-800/50">
              <span className="text-gray-600 dark:text-gray-300">BOOST 金額</span>
              <span className="font-medium">+ ¥ {numBoost.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-orange-200/50 dark:border-orange-800/50">
            <span className="text-gray-700 dark:text-gray-200 font-medium">総決済金額</span>
            <span className="font-semibold text-lg">¥ {totalPayment.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-orange-200/50 dark:border-orange-800/50">
            <div>
              <span className="text-gray-600 dark:text-gray-300">決済手数料（5.6% + 22円）</span>
              {totalPayment > 0 && (
                <span className="ml-2 text-xs text-gray-400">実効率 {effectiveFeeRate}%</span>
              )}
            </div>
            <span className="font-medium text-red-500 dark:text-red-400">
              - ¥ {serviceFee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-orange-200/50 dark:border-orange-800/50">
            <span className="text-gray-600 dark:text-gray-300">
              振込手数料
              {totalPayment > 0 && (
                <span className="ml-1 text-xs text-gray-400">
                  （{(totalPayment - serviceFee) >= 30000 ? '3万円以上 → 300円' : '3万円未満 → 200円'}）
                </span>
              )}
            </span>
            <span className="font-medium text-red-500 dark:text-red-400">
              - ¥ {withdrawalFee.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center pt-4">
            <span className="text-xl font-bold">最終手取り額（目安）</span>
            <span className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">
              ¥ {netAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ── Mid Banner（黄金の地）── */}
      <AdSenseBanner size="rectangle" />

      {/* 가격대별 수수료 시뮬레이션 카드 */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">価格帯別 手数料シミュレーション</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          代表的な商品価格でのサービス手数料（5.6% + 22円）と手取り額の目安
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[500, 1000, 3000, 5000].map((price) => {
            const fee = Math.floor(price * 0.056) + 22;
            const net = price - fee;
            const rateStr = ((fee / price) * 100).toFixed(1);
            return (
              <div
                key={price}
                className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col text-center"
              >
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  ¥{price.toLocaleString()} の場合
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  ¥{net.toLocaleString()}
                </span>
                <span className="text-xs text-red-400 mt-1">
                  手数料 ¥{fee} ({rateStr}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Banner ── */}
      <AdSenseBanner size="leaderboard" />

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 leading-relaxed">
        ※ 本計算機は1回の注文（決済）を基準とした手数料（5.6% + 22円）を計算します。複数回に分割した決済が発生した場合、実際の手数料合計は異なる場合があります。<br />
        最終確認日: 2026年7月14日
      </p>
    </div>
  );
}
