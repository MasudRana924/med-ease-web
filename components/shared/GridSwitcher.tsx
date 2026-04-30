"use client";

import { Icon } from "@iconify/react";

interface GridSwitcherProps {
    currentColumns: number;
    onChange: (columns: number) => void;
}

export default function GridSwitcher({ currentColumns, onChange }: GridSwitcherProps) {
    const gridOptions = [
        { cols: 1, icon: "solar:list-bold" },
        { cols: 2, icon: "solar:widget-2-bold" },
        { cols: 3, icon: "solar:widget-3-bold" },
        { cols: 4, icon: "solar:widget-4-bold" },
    ];

    return (
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl w-fit">
            {gridOptions.map((option) => (
                <button
                    key={option.cols}
                    onClick={() => onChange(option.cols)}
                    className={`p-2 rounded-lg transition-all duration-200 ${currentColumns === option.cols
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                    title={`${option.cols} Columns`}
                >
                    <Icon icon={option.icon} className="text-xl" />
                </button>
            ))}
        </div>
    );
}
