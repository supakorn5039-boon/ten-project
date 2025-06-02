import type React from 'react';
import type { HTMLAttributes } from 'react';

interface CardLayoutProps extends HTMLAttributes<HTMLElement> {
    bgColor?: string;
}

export default function CardLayout({
    children,
    className,
    bgColor = 'bg-white',
    ...rest
}: Readonly<CardLayoutProps>): React.ReactElement {
    return (
        <div className={`p-4 rounded-md ${bgColor} ${className}`} {...rest}>
            {children}
        </div>
    );
}
