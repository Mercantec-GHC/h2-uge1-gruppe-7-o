import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium hover:cursor-pointer trasition-colors duration-100",
  {
    variants: {
      intent: {
        primary: "bg-black text-white hover:opacity-80",
        secondary: "bg-gray-100 text-black hover:opacity-80",
      },
      fullWidth: {
        true: "w-full",
      },
      disabled: {
        false: null,
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({
  className,
  intent,
  fullWidth,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ intent, fullWidth, disabled, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
