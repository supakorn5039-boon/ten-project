import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type GaugeChartProps = {
    achieved: number;
    target: number;
    size?: number;
    showLabels?: boolean;
};

export const GaugeChart = ({ achieved, target, size = 120, showLabels = true }: Readonly<GaugeChartProps>) => {
    const remaining = target - achieved;

    const achievedNumber = () => {
        if (achieved > 1000) {
            return `${achieved / 1000}k`;
        }
        return achieved;
    };

    const data = [
        { name: 'achieved', value: achieved },
        { name: 'remaining', value: remaining },
    ];

    const COLORS = ['#00B894', '#E8F4F8'];

    return (
        <div className="relative flex flex-col items-center">
            <div className="relative">
                <ResponsiveContainer width={size} height={size * 0.5}>
                    <PieChart>
                        <Pie
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            innerRadius={size * 0.35}
                            outerRadius={size * 0.45}
                            dataKey="value"
                            cy="100%"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${entry.value}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {showLabels && (
                <div className="mt-2 text-center">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1 w-40 ml-[1rem]">
                        <span>$0</span>
                        <span className="font-semibold text-black text-sm">{achievedNumber()}</span>
                        <span>$20K</span>
                    </div>
                    <p className="text-black font-semibold">Target vs Achievement</p>
                </div>
            )}
        </div>
    );
};
