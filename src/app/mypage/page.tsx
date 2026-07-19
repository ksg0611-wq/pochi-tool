"use client";

import React, { useEffect, useState } from 'react';
import AdSenseBanner from '@/components/AdSenseBanner';
import { getHistory, clearHistory, exportHistoryToCSV, HistoryEntry } from '@/lib/historyStore';
import Link from 'next/link';

export default function MyPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setHistory(getHistory().reverse()); // Show newest first
    setIsMounted(true);
  }, []);

  const handleClear = () => {
    if (window.confirm('すべての履歴を削除しますか？この操作は取り消せません。')) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleExport = () => {
    exportHistoryToCSV(history);
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <AdSenseBanner size="banner" className="mb-2" />

      <div>
        <h1 className="text-3xl font-bold mb-4">マイページ（計算履歴）</h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-5 rounded-r-xl space-y-2 mb-6">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-start">
            <span className="mr-2">🔒</span>
            このページのすべての計算履歴はサーバーに送信されず、現在ご利用のブラウザ（ローカル環境）にのみ安全に保存されます。
          </p>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-start">
            <span className="mr-2">📊</span>
            保存された履歴は、税務の確定申告や帳簿作成の参考資料として自由にCSV形式でダウンロードできます。
          </p>
          <p className="text-sm font-bold text-red-600 dark:text-red-400 flex items-start mt-2">
            <span className="mr-2">⚠️</span>
            ブラウザのキャッシュを削除するとデータが消失する可能性があるため、定期的なバックアップ（CSVダウンロード）を推奨します。
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">保存された履歴 ({history.length}件)</h2>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              disabled={history.length === 0}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              CSV エクスポート
            </button>
            <button
              onClick={handleClear}
              disabled={history.length === 0}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              すべて削除
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="mb-4">保存された履歴はありません。</p>
            <div className="flex gap-4 justify-center">
              <Link href="/fanbox" className="text-blue-600 dark:text-blue-400 hover:underline">FANBOX計算機へ</Link>
              <Link href="/skeb" className="text-teal-600 dark:text-teal-400 hover:underline">Skeb計算機へ</Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">日付</th>
                  <th scope="col" className="px-6 py-3">プラットフォーム</th>
                  <th scope="col" className="px-6 py-3 text-right">入力金額</th>
                  <th scope="col" className="px-6 py-3 text-right">総手数料</th>
                  <th scope="col" className="px-6 py-3 text-right">実手取り額</th>
                  <th scope="col" className="px-6 py-3">詳細条件</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.date).toLocaleString('ja-JP')}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {item.platform}
                    </td>
                    <td className="px-6 py-4 text-right">
                      ¥{item.grossAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-red-500">
                      -¥{item.fee.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600 dark:text-blue-400">
                      ¥{item.netAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {item.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdSenseBanner size="rectangle" />
    </div>
  );
}
