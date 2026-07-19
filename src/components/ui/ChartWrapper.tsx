/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "../../hooks/useTheme";
import { Theme } from "../../types";

interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

interface ChartWrapperProps {
  data: ChartDataPoint[];
  type?: "line" | "bar" | "area";
  dataKeys: string[];
  colors?: string[];
  height?: number | string;
  showGrid?: boolean;
  showLegend?: boolean;
  id?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  data,
  type = "line",
  dataKeys,
  colors,
  height = 300,
  showGrid = true,
  showLegend = true,
  id,
}) => {
  const { theme } = useTheme();

  // Dynamic colors matching our enterprise design system
  const defaultColors = useMemo(() => {
    return [
      "#22c55e", // Brand green (compliance, active)
      "#384852", // Industrial steel (standards, audits)
      "#facc15", // Alert gold (revisions)
      "#38bdf8", // Info sky
      "#f87171", // Error red
    ];
  }, []);

  const chartColors = colors || defaultColors;

  const themeColors = useMemo(() => {
    const isDark = theme === Theme.Dark;
    return {
      grid: isDark ? "#2d3748" : "#f1f5f9",
      text: isDark ? "#9ca3af" : "#64748b",
      tooltipBg: isDark ? "#1a1e22" : "#ffffff",
      tooltipBorder: isDark ? "#384852" : "#e2e8f0",
    };
  }, [theme]);

  // Dynamic custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-3 bg-white dark:bg-industrial-950 border border-industrial-100 dark:border-industrial-800 rounded-lg shadow-md font-sans text-xs"
          style={{
            backgroundColor: themeColors.tooltipBg,
            borderColor: themeColors.tooltipBorder,
          }}
        >
          <p className="font-semibold text-industrial-900 dark:text-white mb-1.5 font-display">
            {label}
          </p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-industrial-500 dark:text-industrial-400 capitalize">
                  {entry.name}:
                </span>
                <span className="font-semibold text-industrial-800 dark:text-industrial-200">
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} />}
            <XAxis
              dataKey="name"
              stroke={themeColors.text}
              fontSize={10}
              fontFamily="var(--font-mono)"
              tickLine={false}
            />
            <YAxis
              stroke={themeColors.text}
              fontSize={10}
              fontFamily="var(--font-mono)"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  fontFamily: "var(--font-sans)",
                  paddingTop: "12px",
                }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index % chartColors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case "area":
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartColors[index % chartColors.length]}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors[index % chartColors.length]}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} />}
            <XAxis
              dataKey="name"
              stroke={themeColors.text}
              fontSize={10}
              fontFamily="var(--font-mono)"
              tickLine={false}
            />
            <YAxis
              stroke={themeColors.text}
              fontSize={10}
              fontFamily="var(--font-mono)"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  fontFamily: "var(--font-sans)",
                  paddingTop: "12px",
                }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#grad-${key})`}
              />
            ))}
          </AreaChart>
        );

      case "line":
      default:
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={themeColors.grid} />}
            <XAxis
              dataKey="name"
              stroke={themeColors.text}
              fontSize={10}
              fontFamily="var(--font-mono)"
              tickLine={false}
            />
            <YAxis
              stroke={themeColors.text}
              fontSize={10}
              fontFamily="var(--font-mono)"
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && (
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  fontFamily: "var(--font-sans)",
                  paddingTop: "12px",
                }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={chartColors[index % chartColors.length]}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div
      id={id || `chart-wrapper-${Math.random().toString(36).substr(2, 9)}`}
      className="w-full h-full min-h-[180px]"
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};
