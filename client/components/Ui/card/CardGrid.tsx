import type React from 'react';
import type { HTMLAttributes } from 'react';

interface CardGridProps extends HTMLAttributes<HTMLElement> {
    col?: number;
}

export default function CardGrid({ children, className, col }: Readonly<CardGridProps>): React.ReactElement {
    return <div className={`grid grid-cols-${col} gap-4 ${className}`}>{children}</div>;
}
