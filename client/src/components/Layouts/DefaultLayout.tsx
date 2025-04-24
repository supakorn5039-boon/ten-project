import { PropsWithChildren, Suspense } from 'react';
import App from '../../App';

const DefaultLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <Suspense>
                <div className={`p-6`}>{children}</div>
            </Suspense>
        </App>
    );
};

export default DefaultLayout;
