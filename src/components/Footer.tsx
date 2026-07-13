import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 mt-auto">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} PochiTool. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
