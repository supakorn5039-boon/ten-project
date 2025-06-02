import CardBetween from '@/components/Ui/card/CardBetween';
import CardGrid from '@/components/Ui/card/CardGrid';
import CardLayout from '@/components/Ui/card/CardLayout';
import { useFormatDate } from '@/hooks/useFormatDate';

export default function TopSection() {
    return (
        <CardGrid col={3}>
            <div>
                <h1 className="tesxt-lg">Total Balance</h1>
                <CardLayout className="mt-2">
                    <CardBetween>
                        <p className="text-base font-bold">240,399 ฿</p>
                        <p className="text-gray-400">All Accounts</p>
                    </CardBetween>
                    <hr className="my-2" />
                    <CardLayout className="!bg-green-sub">
                        <CardBetween>
                            <p className="text-gray-200 font-semibold">Account Type</p>
                            {/* <Image src={} /> */}
                        </CardBetween>
                    </CardLayout>
                </CardLayout>
            </div>
            <div>
                <h1 className="tesxt-lg">Goals</h1>
                <CardLayout className="mt-2 flex justify-between">
                    <p>23,000 Bath</p>
                    <p>{useFormatDate()}</p>
                </CardLayout>
            </div>
            <div>
                <CardBetween>
                    <h1 className="tesxt-lg">Upcoming Bill</h1>
                    <p>View All</p>
                </CardBetween>
                <CardLayout className="mt-2 "></CardLayout>
            </div>
        </CardGrid>
    );
}
