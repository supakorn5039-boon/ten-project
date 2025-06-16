import CardLayout from '@/components/Ui/card/CardLayout';
import { FaGamepad } from 'react-icons/fa';
import { GiShoppingBag } from 'react-icons/gi';

export default function RecentTransaction() {
    return (
        <div className="gap-4 m-1">
            <p className="text-lg">Recent Transactions</p>
            <CardLayout className="mt-2 border border-gray-200 shadow-md space-y-4">
                <div className="flex items-center">
                    <div className="p-2 bg-gray-100 w-[40px] mr-[1rem] rounded-lg flex items-center justify-center">
                        <FaGamepad />
                    </div>
                    <div className="flex-1">
                        <p>GTA V</p>
                    </div>
                    <div className="">
                        <p>400 ฿</p>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="p-2 bg-gray-100 w-[40px] mr-[1rem] rounded-lg flex items-center justify-center">
                        <GiShoppingBag />
                    </div>
                    <div className="flex-1 ">
                        <p>Shirt</p>
                    </div>
                    <div className="">
                        <p>400 ฿</p>
                    </div>
                </div>
            </CardLayout>
        </div>
    );
}
