import * as React from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

type ButtonDialogProps = {
    children: React.ReactNode
    placeholder: string
    icon?: React.ElementType
    className?: string
    title?: string
    description?: string

    /** Optional controlled state */
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export default function ButtonDialog({
    children,
    placeholder,
    icon: Icon,
    className,
    title,
    description,
    open,
    onOpenChange,
}: ButtonDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <button type="button" className={className}>
                    {Icon && <Icon fontSize="small" />}
                    <span>{placeholder}</span>
                </button>
            </DialogTrigger>

            <DialogContent>
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && (
                            <DialogDescription className="my-2">
                                {description}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}

                {children}
            </DialogContent>
        </Dialog>
    )
}
