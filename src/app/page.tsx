export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
        クリエイターの収益を<br className="md:hidden" />
        <span className="text-blue-600 dark:text-blue-400">スマートに計算</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
        FANBOX、Skeb、BOOTHなど、様々なプラットフォームの手数料をすばやく計算し、手取り額を正確に把握しましょう。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
        <a href="/fanbox" className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-900 shadow-sm hover:shadow-md">
          <h2 className="text-2xl font-bold mb-2">FANBOX</h2>
          <p className="text-gray-500 dark:text-gray-400">支援金の手取り計算</p>
        </a>
        <a href="/skeb" className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-900 shadow-sm hover:shadow-md">
          <h2 className="text-2xl font-bold mb-2">Skeb</h2>
          <p className="text-gray-500 dark:text-gray-400">リクエスト報酬の計算</p>
        </a>
        <a href="/booth" className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-white dark:bg-gray-900 shadow-sm hover:shadow-md">
          <h2 className="text-2xl font-bold mb-2">BOOTH</h2>
          <p className="text-gray-500 dark:text-gray-400">販売利益の計算</p>
        </a>
      </div>
    </div>
  );
}
