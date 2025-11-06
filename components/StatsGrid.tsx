'use client';

import { useTheme } from 'next-themes';

export default function StatsGrid() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const stats = [
    { title: 'Total Earning', value: '$112,893.00', trend: '+70.5%' },
    { title: 'Views', value: '+112,893', trend: '+70.5%' },
    { title: 'Total Sales', value: '+112,893', trend: '+70.5%' },
    { title: 'Subscriptions', value: '+112,893', trend: '+70.5%' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-xl shadow-sm p-6 flex flex-col justify-between transition-colors duration-200 ${
            isLight ? 'bg-white text-[#010114]' : 'bg-zinc-800 text-[#ededed]'
          }`}
        >
          <h3 className={`${isLight ? 'text-gray-500' : 'text-gray-400'} text-sm font-medium mb-2`}>
            {stat.title}
          </h3>
          <p className="text-2xl font-semibold">{stat.value}</p>
          <p className="text-green-500 text-sm mt-2">trend ↑ {stat.trend}</p>
        </div>
      ))}
    </div>
  );
}
