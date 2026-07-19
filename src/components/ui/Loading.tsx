/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "neutral";
  id?: string;
}

export const LoadingSpinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "brand",
  className = "",
  id,
  ...props
}) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colors = {
    brand: "border-brand-500/20 border-t-brand-600",
    neutral: "border-industrial-300/20 border-t-industrial-700 dark:border-industrial-800/20 dark:border-t-industrial-400",
  };

  return (
    <div
      id={id || `spinner-${Math.random().toString(36).substr(2, 9)}`}
      className={`animate-spin rounded-full ${sizes[size]} ${colors[variant]} ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <div
      id={id || `skeleton-card-${Math.random().toString(36).substr(2, 9)}`}
      className="p-5 border border-industrial-100 dark:border-industrial-850 rounded-xl bg-white dark:bg-industrial-900 shadow-sm animate-pulse space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2 w-1/2">
          <div className="h-4 bg-industrial-200 dark:bg-industrial-800 rounded-md w-3/4" />
          <div className="h-3 bg-industrial-100 dark:bg-industrial-850 rounded-md w-1/2" />
        </div>
        <div className="h-8 w-8 rounded-full bg-industrial-200 dark:bg-industrial-800" />
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-industrial-150 dark:bg-industrial-800 rounded-md w-full" />
        <div className="h-3 bg-industrial-150 dark:bg-industrial-800 rounded-md w-11/12" />
        <div className="h-3 bg-industrial-150 dark:bg-industrial-800 rounded-md w-4/5" />
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-industrial-50 dark:border-industrial-850">
        <div className="h-5 bg-industrial-200 dark:bg-industrial-800 rounded-full w-20" />
        <div className="h-3 bg-industrial-100 dark:bg-industrial-850 rounded-md w-12" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number; id?: string }> = ({ rows = 4, id }) => {
  return (
    <div
      id={id || `skeleton-table-${Math.random().toString(36).substr(2, 9)}`}
      className="border border-industrial-100 dark:border-industrial-800 rounded-xl bg-white dark:bg-industrial-900 shadow-sm animate-pulse overflow-hidden"
    >
      <div className="p-4 bg-industrial-50/50 dark:bg-industrial-950/20 border-b border-industrial-100 dark:border-industrial-800 flex gap-4">
        <div className="h-4 bg-industrial-200 dark:bg-industrial-800 rounded-md w-28" />
        <div className="h-4 bg-industrial-200 dark:bg-industrial-800 rounded-md w-36" />
        <div className="h-4 bg-industrial-200 dark:bg-industrial-800 rounded-md w-24" />
      </div>
      <div className="divide-y divide-industrial-100 dark:divide-industrial-850">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="p-5 flex items-center justify-between gap-6">
            <div className="h-4 bg-industrial-150 dark:bg-industrial-800 rounded-md w-1/4" />
            <div className="h-4 bg-industrial-150 dark:bg-industrial-800 rounded-md w-1/5" />
            <div className="h-4 bg-industrial-150 dark:bg-industrial-800 rounded-md w-1/6" />
            <div className="h-4 bg-industrial-150 dark:bg-industrial-800 rounded-md w-12" />
          </div>
        ))}
      </div>
    </div>
  );
};
