"use client";

import React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, FileText } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortKey?: string | null;
  sortOrder?: "asc" | "desc";
  onSort?: (key: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

/**
 * Reusable sortable data table component for admin dashboard
 * Features:
 * - Sortable columns with visual indicators
 * - Alternating row backgrounds
 * - Purple accent hover states
 * - Loading skeleton rows
 * - Empty state message
 */
export function DataTable<T extends object>({
  columns,
  data,
  sortKey,
  sortOrder = "desc",
  onSort,
  isLoading = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const handleSort = (key: string, sortable?: boolean) => {
    if (sortable && onSort) {
      onSort(key);
    }
  };

  const getSortIcon = (key: string, sortable?: boolean) => {
    if (!sortable) return null;

    if (sortKey === key) {
      return sortOrder === "asc" ? (
        <ChevronUp className="w-4 h-4 text-purple-400" />
      ) : (
        <ChevronDown className="w-4 h-4 text-purple-400" />
      );
    }

    return <ChevronsUpDown className="w-4 h-4 text-slate-600" />;
  };

  const getValue = (row: T, key: keyof T | string): unknown => {
    const rowRecord = row as unknown as Record<string, unknown>;
    if (typeof key === "string" && key.includes(".")) {
      const keys = key.split(".");
      let value: unknown = rowRecord;
      for (const k of keys) {
        value = (value as Record<string, unknown>)?.[k];
      }
      return value;
    }
    return rowRecord[key as string];
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 text-left text-sm font-medium text-slate-400 ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    <div className="h-4 bg-white/10 rounded w-20 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`border-b border-white/10 ${
                    rowIdx % 2 === 0 ? "bg-white/5" : "bg-white/3"
                  }`}
                >
                  {columns.map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <div className="h-4 bg-white/10 rounded w-24 animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className={`px-6 py-4 text-sm font-medium text-slate-400 ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No pages found</h3>
          <p className="text-sm text-slate-400 text-center max-w-sm">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`px-6 py-4 text-sm font-medium text-slate-400 ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                      ? "text-center"
                      : "text-left"
                  } ${
                    column.sortable
                      ? "cursor-pointer select-none hover:text-white transition-colors"
                      : ""
                  }`}
                  onClick={() => handleSort(column.key as string, column.sortable)}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      column.align === "right"
                        ? "justify-end"
                        : column.align === "center"
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
                    <span>{column.label}</span>
                    {getSortIcon(column.key as string, column.sortable)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={`border-b border-white/10 transition-colors hover:bg-purple-500/10 ${
                  rowIdx % 2 === 0 ? "bg-white/5" : "bg-white/[0.03]"
                }`}
              >
                {columns.map((column, colIdx) => {
                  const value = getValue(row, column.key);
                  return (
                    <td
                      key={colIdx}
                      className={`px-6 py-4 text-sm ${
                        colIdx === 0 ? "text-white" : "text-slate-300"
                      } ${
                        column.align === "right"
                          ? "text-right"
                          : column.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {column.render
                        ? column.render(value, row)
                        : String(value ?? "-")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
