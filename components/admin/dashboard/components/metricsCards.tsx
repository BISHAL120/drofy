import { ChartLine, FileText, User } from 'lucide-react';

const metrics = [
    {
        title: 'Total Sales',
        value: '$124,567',
        change: '+12.5%',
        changeType: 'increase',
        icon: ChartLine,
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        title: 'Total Revenue',
        value: '$98,234',
        change: '+8.2%',
        changeType: 'increase',
        icon: ChartLine,
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        title: 'Total Orders',
        value: '2,456',
        change: '+18.7%',
        changeType: 'increase',
        icon: FileText,
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-600',
    },
    {
        title: 'Active Vendors',
        value: '147',
        change: '+5.1%',
        changeType: 'increase',
        icon: User,
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
    },
];

const MetricsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-3 md:p-1">
            {metrics.map((metric, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                            <div className="flex items-center mt-2">
                                <span className={`text-sm font-medium ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {metric.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">vs last month</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                            <metric.icon size={24} className={metric.iconColor} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MetricsCards;
