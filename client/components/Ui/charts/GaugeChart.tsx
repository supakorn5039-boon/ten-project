import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

export const GaugeChart = ({ achieved = 12500, target = 20000, size = 120, showLabels = true }) => {
    const remaining = target - achieved;
    const percentage = Math.round((achieved / target) * 100);

    const data = [
        { name: 'achieved', value: achieved },
        { name: 'remaining', value: remaining },
    ];

    const COLORS = ['#00B894', '#E8F4F8'];

    return (
        <div className="relative flex flex-col items-center">
            <div className="relative">
                <ResponsiveContainer width={size} height={size * 0.6}>
                    <PieChart>
                        <Pie
                            startAngle={180}
                            endAngle={0}
                            data={data}
                            innerRadius={size * 0.35}
                            outerRadius={size * 0.45}
                            dataKey="value"
                            cx="50%"
                            cy="85%"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${entry.value}`} fill={COLORS[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Center indicator dot */}
                <div
                    className="absolute bg-teal-500 rounded-full"
                    style={{
                        width: '8px',
                        height: '8px',
                        bottom: `${size * 0.15}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                />

                <div
                    className="absolute bottom-0 left-1/2 origin-bottom bg-teal-500"
                    style={{
                        width: '2px',
                        height: `${size * 0.3}px`,
                        transform: `translateX(-50%) rotate(${-90 + percentage * 1.8}deg)`,
                        transformOrigin: 'bottom center',
                    }}
                />
            </div>

            {showLabels && (
                <div className="mt-2 text-center">
                    <div className="flex justify-between items-center w-20 text-xs text-gray-500 mb-1">
                        <span>$0</span>
                        <span className="font-semibold text-black text-sm">{achieved}</span>
                        <span>$20K</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Target vs Achievement</p>
                </div>
            )}
        </div>
    );
};
