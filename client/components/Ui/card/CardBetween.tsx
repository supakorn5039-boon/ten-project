import type { HTMLAttributes } from 'react';

interface CardBetweenProps extends HTMLAttributes<HTMLElement> {}

export default function CardBetween({ children, className, ...rest }: Readonly<CardBetweenProps>) {
    return (
        <div className={`flex justify-between items-center ${className}`} {...rest}>
            {children}
        </div>
    );
}
