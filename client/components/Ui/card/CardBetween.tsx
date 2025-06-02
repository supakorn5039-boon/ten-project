import type { HTMLAttributes } from 'react';

interface CardBetweenProps extends HTMLAttributes<HTMLElement> {}

export default function CardBetween({ children, className }: Readonly<CardBetweenProps>) {
    return <div className={`flex justify-between items-center ${className}`}>{children}</div>;
}
