import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "warning" | "dark" | "black" | "success";
  size?: "sm" | "md" | "lg" | "xl";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-[#FF6D00] text-white hover:bg-[#E65100]",
      secondary: "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]",
      danger: "bg-[#D32F2F] text-white hover:bg-[#B71C1C]",
      warning: "bg-[#FBC02D] text-[#1A1A1A] hover:bg-[#F57F17]",
      dark: "bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]",
      black: "bg-black text-white hover:bg-[#111]",
      success: "bg-[#00C853] text-white hover:bg-[#00B248]",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
      xl: "px-12 py-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-xl font-black uppercase tracking-wider transition-colors disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
