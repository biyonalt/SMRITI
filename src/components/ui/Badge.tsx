/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "gold";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className = "",
  id,
  ...props
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full transition-colors font-mono tracking-wide border";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-industrial-100 dark:bg-industrial-800 text-industrial-800 dark:text-industrial-200 border-industrial-200 dark:border-industrial-700",
    success: "bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400 border-brand-200 dark:border-brand-900/50",
    warning: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    error: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50",
    info: "bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-900/50",
    gold: "bg-gold-50 dark:bg-gold-950/40 text-gold-700 dark:text-gold-400 border-gold-200 dark:border-gold-900/50",
  };

  return (
    <span
      id={id || `badge-${Math.random().toString(36).substr(2, 9)}`}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === "success" && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />}
      {variant === "error" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
      {variant === "warning" && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
      {variant === "info" && <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
      {variant === "gold" && <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />}
      {children}
    </span>
  );
};
