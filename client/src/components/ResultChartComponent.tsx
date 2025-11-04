import { createMemo } from 'solid-js';
import { useAppStore } from '../store';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut } from 'solid-chartjs';
import { Show } from 'solid-js';

Chart.register(ChartDataLabels);
const ResultChartComponent = () => {
  const [state] = useAppStore();

  const data = createMemo(() => {
    const chartData = state.calculateScore?.chart ?? [];

    const backgroundColors = [
      '#8884d8',
      '#82ca9d',
      '#ffc658',
      '#f28a8a',
      '#a4c9e4',
      '#d0a6e0',
      '#f4a460',
      '#90ee90',
      '#add8e6',
      '#ffe4c4',
    ];

    return {
      labels: chartData.map((item: any) => item.label.toString()),
      datasets: [
        {
          label: 'Oy Sayısı',
          data: chartData.map((item: any) => item.count),
          backgroundColor: chartData.map((_: any, index: any) => backgroundColors[index % backgroundColors.length]),
          hoverOffset: 4,
        },
      ],
    };
  });

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },

    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      title: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const voteCount = context.parsed; // Ham oy sayısı
            const totalVotes = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
            const percentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;

            return `Oy Sayısı: ${voteCount} (${percentage}%)`;
          },
        },
      },

      datalabels: {
        font: {
          // 💡 KALINLIĞI ARTIRIN
          weight: 'bolder', // 'bold' yerine 'bolder' veya çok kalın istiyorsanız bir sayı (örn. 800) kullanabilirsiniz.
          size: 14,
        },
        formatter: (value: any, context: any) => {
          console.log(context.chart.data.labels);
          const score = context.chart.data.labels[context.dataIndex];

          const totalVotes = context.dataset.data.reduce((a: any, b: any) => a + b, 0);
          if (totalVotes === 0) return '0%';
          const percentage = ((value / totalVotes) * 100).toFixed(0);
          return `${value} Oy (${score})\n(${percentage}%)`;
        },
      },
    },
    scales: {},
  };

  return (
    <div class="flex items-center justify-center text-center border! border-gray-300 rounded-lg">
      <Show when={(state.calculateScore?.chart || []).length > 0}>
        <div style={{ width: '400px', height: '300px' }}>
          <Doughnut data={data()} options={options} />
        </div>
      </Show>
      <Show when={!((state.calculateScore?.chart || []).length > 0)}>
        <span class="py-24">Gösterilecek oy görülmedi. İlk önce puanlama yapmalısınız.</span>
      </Show>
    </div>
  );
};

export default ResultChartComponent;
