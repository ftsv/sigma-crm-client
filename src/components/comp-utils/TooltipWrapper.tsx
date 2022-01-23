import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface TooltipWrapperProps {
    data: string;
    length: number;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({data, length}): JSX.Element => {
    if (length < 10) {
        length = 10;
    }
    return (
        <>
            {(data.length > length)
            ? (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{data}</Tooltip>}>
                <span>{data.slice(0, (length - 3)) + "..."}</span>
                </OverlayTrigger>)
            : <span>{data}</span>
            }
        </>
    )
}