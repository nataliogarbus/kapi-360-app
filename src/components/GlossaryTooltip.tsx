'use client';

import React, { useState } from 'react';

interface GlossaryTooltipProps {
    term: string;
    definition: string;
    children: React.ReactNode;
}

const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ term, definition, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <span
            className="relative inline-block border-b-2 border-dashed border-[#00DD82]/50 cursor-help group"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onClick={() => setIsVisible(!isVisible)} // Mobile support
        >
            <span className="text-[#00DD82] font-medium">{children}</span>

            {isVisible && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 animate-in fade-in zoom-in duration-200">
                    <span className="block text-sm font-bold text-white mb-1">{term}</span>
                    <span className="block text-xs text-gray-300 leading-relaxed text-left">
                        {definition}
                    </span>
                    {/* Arrow */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></span>
                </span>
            )}
        </span>
    );
};

export default GlossaryTooltip;
