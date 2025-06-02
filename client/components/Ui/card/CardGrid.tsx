import type React from 'react';
import type { HTMLAttributes } from 'react';

interface CardGridProps extends HTMLAttributes<HTMLElement> {
    col?: number;
}

const columnClasses: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
};

export default function CardGrid({
    children,
    className,
    col = 1,
    ...rest
}: Readonly<CardGridProps>): React.ReactElement {
    const gridCols = columnClasses[col] ?? 'grid-cols-1';

    return (
        <div className={`grid ${gridCols} gap-4 ${className}`} {...rest}>
            {children}
        </div>
    );
}
