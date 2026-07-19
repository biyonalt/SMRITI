/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { TableColumn } from "../../types";

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  itemsPerPage?: number;
  zebra?: boolean;
  id?: string;
}

export function Table<T extends { id: string | number }>({
  data,
  columns,
  searchPlaceholder = "Search records...",
  searchKeys = [],
  itemsPerPage = 5,
  zebra = false,
  id,
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredData = useMemo(() => {
    if (!searchTerm || searchKeys.length === 0) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((row) => {
      return searchKeys.some((key) => {
        const val = row[key];
        if (val === undefined || val === null) return false;
        return String(val).toLowerCase().includes(lowerSearch);
      });
    });
  }, [data, searchTerm, searchKeys]);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const sorted = [...filteredData];
    const { key, direction } = sortConfig;

    sorted.sort((a, b) => {
      const aVal = a[key as keyof T];
      const bVal = b[key as keyof T];

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (aStr < bStr) return direction === "asc" ? -1 : 1;
      if (aStr > bStr) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // Reset pagination on search
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (column: TableColumn<T>) => {
    if (!column.sortable) return null;
    const colKey = typeof column.accessor === "string" ? (column.accessor as string) : "";
    if (!colKey) return null;

    if (!sortConfig || sortConfig.key !== colKey) {
      return <ChevronsUpDown className="w-3.5 h-3.5 text-industrial-300 dark:text-industrial-600 ml-1 inline" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 ml-1 inline" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 ml-1 inline" />
    );
  };

  return (
    <div className="w-full flex flex-col gap-4" id={id || `table-container-${Math.random().toString(36).substr(2, 9)}`}>
      {/* Search Input Controls */}
      {searchKeys.length > 0 && (
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-industrial-400 dark:text-industrial-500" />
          </span>
          <input
            type="text"
            className="block w-full pl-9 pr-4 py-2 border border-industrial-200 dark:border-industrial-800 rounded-lg text-sm bg-white dark:bg-industrial-950 text-industrial-850 dark:text-industrial-100 placeholder-industrial-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-sans"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Main Table Wrapper */}
      <div className="overflow-x-auto border border-industrial-100 dark:border-industrial-800 rounded-xl bg-white dark:bg-industrial-900 shadow-sm">
        <table className="min-w-full divide-y divide-industrial-100 dark:divide-industrial-800 text-sm text-left">
          <thead className="bg-industrial-50/50 dark:bg-industrial-950/20 font-display text-xs text-industrial-500 dark:text-industrial-400 font-medium uppercase tracking-wider">
            <tr>
              {columns.map((col, idx) => {
                const alignClass =
                  col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left";
                const isSortable = col.sortable && typeof col.accessor === "string";
                const colKey = typeof col.accessor === "string" ? (col.accessor as string) : `col-${idx}`;

                return (
                  <th
                    key={colKey}
                    onClick={() => isSortable && handleSort(colKey)}
                    className={`px-6 py-4 ${alignClass} ${isSortable ? "cursor-pointer select-none hover:bg-industrial-100/30 dark:hover:bg-industrial-800/30 transition-colors" : ""} ${col.className || ""}`}
                  >
                    <div className={`inline-flex items-center gap-1 ${col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : "justify-start"}`}>
                      {col.header}
                      {getSortIcon(col)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-industrial-100 dark:divide-industrial-850">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => {
                const isZebra = zebra && rowIdx % 2 !== 0;
                return (
                  <tr
                    key={row.id}
                    className={`hover:bg-industrial-50/30 dark:hover:bg-industrial-850/20 transition-all duration-150 ${isZebra ? "bg-industrial-50/10 dark:bg-industrial-850/5" : ""}`}
                  >
                    {columns.map((col, colIdx) => {
                      const alignClass =
                        col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left";
                      const colKey = typeof col.accessor === "string" ? (col.accessor as string) : `cell-${colIdx}`;

                      return (
                        <td key={colKey} className={`px-6 py-4 text-industrial-700 dark:text-industrial-200 ${alignClass} ${col.className || ""}`}>
                          {typeof col.accessor === "function"
                            ? col.accessor(row)
                            : (row[col.accessor as keyof T] as React.ReactNode)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-industrial-400 dark:text-industrial-500 font-sans">
                  No records match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Table Footer / Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-industrial-100 dark:border-industrial-850 bg-white dark:bg-industrial-900 text-xs text-industrial-400 dark:text-industrial-500 font-sans">
            <div>
              Showing <span className="font-semibold text-industrial-700 dark:text-industrial-300">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-semibold text-industrial-700 dark:text-industrial-300">
                {Math.min(currentPage * itemsPerPage, sortedData.length)}
              </span>{" "}
              of <span className="font-semibold text-industrial-700 dark:text-industrial-300">{sortedData.length}</span> records
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 border border-industrial-100 dark:border-industrial-800 rounded-lg bg-white dark:bg-industrial-950 hover:bg-industrial-50 dark:hover:bg-industrial-850 disabled:opacity-45 disabled:pointer-events-none transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="h-4 w-4 text-industrial-500" />
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-7 h-7 font-semibold rounded-lg flex items-center justify-center transition-all ${
                    currentPage === i + 1
                      ? "bg-brand-500 text-white dark:bg-brand-600 shadow-sm"
                      : "border border-industrial-100 dark:border-industrial-800 hover:bg-industrial-50 dark:hover:bg-industrial-850 text-industrial-600 dark:text-industrial-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 border border-industrial-100 dark:border-industrial-800 rounded-lg bg-white dark:bg-industrial-950 hover:bg-industrial-50 dark:hover:bg-industrial-850 disabled:opacity-45 disabled:pointer-events-none transition-colors"
                title="Next Page"
              >
                <ChevronRight className="h-4 w-4 text-industrial-500" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
