import { ButtonHTMLAttributes, forwardRef } from "react";
import { Icon } from "@iconify/react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    icon?: string;
    loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className = "",
    variant = "primary",
    children,
    icon,
    loading,
    disabled,
    ...props
}, ref) => {

    // Base styles: Black bg, White text for primary.
    const baseStyles = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-black text-white hover:bg-zinc-800",
        outline: "border border-black text-black hover:bg-zinc-50",
        ghost: "text-black hover:bg-zinc-100"
    };

    return (
        <button
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Icon icon="eos-icons:loading" className="mr-2 h-4 w-4 animate-spin" />
            ) : icon ? (
                <Icon icon={icon} className="mr-2 h-5 w-5" />
            ) : null}
            {children}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
