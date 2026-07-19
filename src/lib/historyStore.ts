export interface HistoryEntry {
  id: string;
  date: string; // ISO string
  platform: string;
  grossAmount: number;
  fee: number;
  netAmount: number;
  details: string; // Additional string like "X連携あり, 30日以内" or "R-18"
}

const HISTORY_KEY = 'pochi_tool_history';

export function saveHistory(entry: Omit<HistoryEntry, 'id' | 'date'>): void {
  if (typeof window === 'undefined') return;

  try {
    const existingStr = localStorage.getItem(HISTORY_KEY);
    const existing: HistoryEntry[] = existingStr ? JSON.parse(existingStr) : [];
    
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    
    // Append to history
    existing.push(newEntry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Failed to save history', error);
  }
}

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const existingStr = localStorage.getItem(HISTORY_KEY);
    return existingStr ? JSON.parse(existingStr) : [];
  } catch (error) {
    console.error('Failed to parse history', error);
    return [];
  }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
}

export function exportHistoryToCSV(history: HistoryEntry[]): void {
  if (typeof window === 'undefined' || history.length === 0) return;

  const headers = ['日付', 'プラットフォーム', '入力金額(円)', '総手数料(円)', '実手取り額(円)', '詳細条件'];
  
  const escapeCSV = (val: string | number) => `"${String(val).replace(/"/g, '""')}"`;
  
  const rows = history.map(h => [
    new Date(h.date).toLocaleString('ja-JP'),
    h.platform,
    h.grossAmount,
    h.fee,
    h.netAmount,
    h.details
  ].map(escapeCSV).join(','));
  
  const csvContent = [headers.join(','), ...rows].join('\n');
  
  // Add BOM for Excel UTF-8 support
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `pochi_tool_history_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ── Preset Logic ──

export interface PresetEntry {
  id: string;
  name: string;
  platform: string;
  data: any;
}

const PRESET_KEY = 'pochi_tool_presets';

export function savePreset(preset: Omit<PresetEntry, 'id'>): void {
  if (typeof window === 'undefined') return;
  try {
    const existingStr = localStorage.getItem(PRESET_KEY);
    const existing: PresetEntry[] = existingStr ? JSON.parse(existingStr) : [];
    
    const newEntry: PresetEntry = {
      ...preset,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    };
    
    existing.push(newEntry);
    localStorage.setItem(PRESET_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error('Failed to save preset', error);
  }
}

export function getPresets(platform?: string): PresetEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const existingStr = localStorage.getItem(PRESET_KEY);
    let presets: PresetEntry[] = existingStr ? JSON.parse(existingStr) : [];
    if (platform) {
      presets = presets.filter(p => p.platform === platform);
    }
    return presets;
  } catch (error) {
    console.error('Failed to parse presets', error);
    return [];
  }
}
