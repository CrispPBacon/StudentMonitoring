import { cva } from 'class-variance-authority';

export const DEFAULT_VARIANT =
  'bg-primary text-primary-foreground shadow hover:bg-primary/90';
export const DESTRUCTIVE_VARIANT =
  'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90';
export const OUTLINE_VARIANT =
  'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground';
export const SECONDARY_VARIANT =
  'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80';
export const GHOST_VARIANT = 'hover:bg-accent hover:text-accent-foreground';
export const LINK_VARIANT = 'text-primary underline-offset-4 hover:underline';

export const DEFAULT_SIZE = 'h-9 px-4 py-2';
export const SM_SIZE = 'h-8 rounded-md px-3 text-xs';
export const LG_SIZE = 'h-10 rounded-md px-8';
export const ICON_SIZE = 'h-9 w-9';

export const DEFAULT = 'default';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: DEFAULT_VARIANT,
        destructive: DESTRUCTIVE_VARIANT,
        outline: OUTLINE_VARIANT,
        secondary: SECONDARY_VARIANT,
        ghost: GHOST_VARIANT,
        link: LINK_VARIANT,
      },
      size: {
        default: DEFAULT_SIZE,
        sm: SM_SIZE,
        lg: LG_SIZE,
        icon: ICON_SIZE,
      },
    },
    defaultVariants: {
      variant: DEFAULT,
      size: DEFAULT,
    },
  },
);
