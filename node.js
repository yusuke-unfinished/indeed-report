import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts';
import { 
  TrendingUp, Users, MousePointer2, Eye, 
  Download, Filter, Calendar, LayoutDashboard, FileText, AlertCircle
} from 'lucide-react';

const mockData = [
  { name: '1月', impressions: 45000, clicks: 1200, conv: 12 },
  { name: '2月', impressions: 52000, clicks: 1500, conv: 15 },
  { name: '3月', impressions: 48000, clicks: 1350, conv: 10 },
  { name: '4月', impressions: 61000, clicks: 1800, conv: 18 },
  { name: '5月', impressions: 58000, clicks: 1650, conv: 14 },
  { name: '6月', impressions: 72000, clicks: 2100, conv: 22 },
  { name: '7月', impressions: 85000, clicks: 2400, conv: 26 },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
      <span className="text-xs text-gray-400 ml-2">前月比</span>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="text-emerald-400" />
            Organic Reporter
          </h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Free Listing Edition</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('summary')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'summary' ? 'bg-emerald-600' : 'hover:bg-slate-700'}`}
          >
            <LayoutDashboard size={20} />
            全体サマリー
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'jobs' ? 'bg-emerald-600' : 'hover:bg-slate-700'}`}
          >
            <Users size={20} />
            求人票別分析
          </button>
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition"
          >
            <FileText size={20} />
            レポート出力
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-800">Indeed無料枠 運用状況</h2>
            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-bold">ORGANIC ONLY</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 shadow-sm transition">
              <Download size={16} />
              CSVをアップロード
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 space-y-8 overflow-y-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="表示回数" value="85,000" change="+18.1%" icon={Eye} color="bg-slate-500" />
            <StatCard title="クリック数" value="2,400" change="+14.3%" icon={MousePointer2} color="bg-blue-500" />
            <StatCard title="応募完了数" value="26" change="+18.2%" icon={Users} color="bg-emerald-500" />
            <StatCard title="応募率 (CVR)" value="1.08%" change="+0.04%" icon={TrendingUp} color="bg-purple-500" />
          </div>

          {/* Main Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-slate-700 mb-6">流入と獲得のトレンド</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" />
                  <Area yAxisId="left" type="monotone" dataKey="impressions" name="表示回数" fill="#e2e8f0" stroke="#94a3b8" />
                  <Bar yAxisId="left" dataKey="clicks" name="クリック数" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="conv" name="応募数" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: "#10b981" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-slate-700 mb-4">改善が必要な求人票（ワーストCTR）</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                    <tr>
                      <th className="px-4 py-3">求人タイトル</th>
                      <th className="px-4 py-3 text-right">表示数</th>
                      <th className="px-4 py-3 text-right">クリック率</th>
                      <th className="px-4 py-3 text-right">状態</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-medium">事務職/未経験OK/土日祝休み</td>
                      <td className="px-4 py-3 text-right">12,400</td>
                      <td className="px-4 py-3 text-right text-red-500 font-bold">1.2%</td>
                      <td className="px-4 py-3 text-right"><span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs">タイトル見直し</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">【急募】ルート配送ドライバー</td>
                      <td className="px-4 py-3 text-right">8,200</td>
                      <td className="px-4 py-3 text-right text-amber-500">2.1%</td>
                      <td className="px-4 py-3 text-right"><span className="px-2 py-0.5 bg-amber-50 text-amber-600 rounded text-xs">画像追加推奨</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
              <h4 className="flex items-center gap-2 font-bold text-emerald-800 mb-4">
                <AlertCircle size={18} />
                SEO改善アドバイス
              </h4>
              <ul className="space-y-4 text-emerald-900 text-sm">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  表示回数は18%増加しており、Indeed内での露出強度は高まっています。
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  「事務職」の求人でCTRが平均を下回っています。競合他社に埋もれている可能性があるため、タイトルに固有の福利厚生を追加しましょう。
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  応募完了率は1%を超えており、求人票自体の魅力は十分です。流入数を増やす施策に集中してください。
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
