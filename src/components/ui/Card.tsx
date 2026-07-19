/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  statusAccent?: "success" | "warning" | "error" | "info" | "gold" | "none";
  id?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  statusAccent = "none",
  id,
  ...props
}) => {
  const accentStyles: Record<string, string> = {
    none: "",
    success: "border-l-4 border-l-brand-500",
    warning: "border-l-4 border-l-amber-500",
    error: "border-l-4 border-l-red-500",
    info: "border-l-4 border-l-sky-500",
    gold: "border-l-4 border-l-gold-500",
  };

  return (
    <div
      id={id || `card-${Math.random().toString(36).substr(2, 9)}`}
      className={`bg-white dark:bg-industrial-900 border border-industrial-100 dark:border-industrial-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${accentStyles[statusAccent]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`p-5 pb-3 border-b border-industrial-50 dark:border-industrial-850 flex items-center justify-between gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <h3 className={`text-base font-semibold text-industrial-900 dark:text-white font-display tracking-tight leading-none ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <p className={`text-xs text-industrial-400 dark:text-industrial-500 mt-1.5 font-sans ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`px-5 py-3 bg-industrial-50/50 dark:bg-industrial-950/20 border-t border-industrial-50 dark:border-industrial-850 flex items-center justify-between gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
