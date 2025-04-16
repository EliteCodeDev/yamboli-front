import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "default",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500":
              variant === "primary",
            "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500":
              variant === "secondary",
            "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500":
              variant === "outline",
            "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500":
              variant === "ghost",
            "underline-offset-4 hover:underline text-green-600 hover:text-green-700":
              variant === "link",
            "h-10 py-2 px-4": size === "default",
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;