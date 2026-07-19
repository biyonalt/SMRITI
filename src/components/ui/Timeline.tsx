/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Badge } from "./Badge";
import { TimelineItem } from "../../types";

interface TimelineProps {
  items: TimelineItem[];
  animate?: boolean;
  id?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  animate = true,
  id,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const Wrapper = animate ? motion.div : "div";

  return (
    <Wrapper
      id={id || `timeline-${Math.random().toString(36).substr(2, 9)}`}
      className="relative pl-6 border-l-2 border-industrial-100 dark:border-industrial-800 space-y-6"
      {...(animate ? { variants: containerVariants, initial: "hidden", animate: "show" } : {})}
    >
      {items.map((item, index) => {
        const ItemWrapper = animate ? motion.div : "div";
        return (
          <ItemWrapper
            key={item.id}
            className="relative"
            {...(animate ? { variants: itemVariants } : {})}
          >
            {/* Timeline node marker */}
            <span className={`absolute -left-[31px] top-1 flex items-center justify-center w-5 h-5 rounded-full ring-4 ring-white dark:ring-industrial-950 ${
              item.highlight
                ? "bg-brand-500 text-white dark:bg-brand-600"
                : "bg-industrial-100 dark:bg-industrial-800 text-industrial-500"
            }`}>
              {item.icon ? (
                <div className="w-3 h-3 flex items-center justify-center">{item.icon}</div>
              ) : (
                <span className={`w-2 h-2 rounded-full ${item.highlight ? "bg-white" : "bg-industrial-400"}`} />
              )}
            </span>

            {/* Timeline content card */}
            <div className={`p-4 rounded-xl border transition-all ${
              item.highlight
                ? "bg-brand-50/20 dark:bg-brand-950/10 border-brand-100/50 dark:border-brand-900/20 shadow-sm"
                : "bg-white dark:bg-industrial-900 border-industrial-100 dark:border-industrial-800 hover:border-industrial-200 dark:hover:border-industrial-700"
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-semibold text-industrial-900 dark:text-white font-display tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-industrial-400 dark:text-industrial-500 font-mono mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-industrial-400 dark:text-industrial-500">
                    {item.timestamp}
                  </span>
                  {item.badge && (
                    <Badge variant={item.badge.variant}>{item.badge.text}</Badge>
                  )}
                </div>
              </div>
              <p className="text-xs text-industrial-600 dark:text-industrial-300 font-sans mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </ItemWrapper>
        );
      })}
    </Wrapper>
  );
};
