'use client';

import { PropsWithChildren } from 'react';

function App({ children }: PropsWithChildren) {
    return <div className="main-section relative font-nunito text-sm font-normal antialiased">{children}</div>;
}

export default App;
