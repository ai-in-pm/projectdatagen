import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'secondary';
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      variant === 'default' ? 
        "bg-blue-500 text-white hover:bg-blue-600" :
        "bg-gray-100 text-gray-900 hover:bg-gray-200",
      className
    )}
    {...props}
  />
));
Button.displayName = "Button";

export { Button };