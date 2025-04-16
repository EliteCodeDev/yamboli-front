import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border-0 bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:ring-gray-700 dark:placeholder:text-gray-500 dark:text-gray-100",
            {
              "ring-red-500 focus:ring-red-500": error,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;