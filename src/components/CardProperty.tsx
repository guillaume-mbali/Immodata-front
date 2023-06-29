import React, { Children, FunctionComponent, ReactNode } from "react";

type Props = {
    icon: IconType,
    title: string,
    isActivate: boolean
    onChildClick: any
}

interface IconTypeProps {
    className: string
}

type IconType = (props: IconTypeProps) => JSX.Element;

function CardProperty({ icon, title, onChildClick, isActivate }: Props) {
    return (
        <div className={`relative h-38 w-38 md:h-40 md:w-40 flex flex-col border-2 rounded-md border-blue-500 items-center justify-center ${isActivate ? "bg-blue-500 text-white" : "text-blue-500"}`} onClick={onChildClick}>
            {React.createElement(icon, { className: 'h-6 w-6' })}
            {title}
        </div>
    )
}

export default CardProperty
