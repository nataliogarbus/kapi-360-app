'use client';

import React from 'react';
import GlossaryTooltip from './GlossaryTooltip';
import { glossaryTerms } from '@/lib/glossary-terms';

interface GlossaryTextProps {
    text: string;
    className?: string; // Allow passing text styles (color, size, etc.)
}

const GlossaryText: React.FC<GlossaryTextProps> = ({ text, className = "" }) => {
    // We sort keys by length (longest first) to match specific terms before general ones if they overlap
    const keys = Object.keys(glossaryTerms).sort((a, b) => b.length - a.length);

    // Create a regex from the keys
    const regex = new RegExp(`\\b(${keys.join('|')})\\b`, 'gi');

    const parts = text.split(regex);

    return (
        <span className={className}>
            {parts.map((part, i) => {
                // Check if the part matches a key (case-insensitive)
                const matchedKey = keys.find(k => k.toLowerCase() === part.toLowerCase());

                if (matchedKey) {
                    return (
                        <GlossaryTooltip
                            key={i}
                            term={matchedKey}
                            definition={glossaryTerms[matchedKey]}
                        >
                            {part}
                        </GlossaryTooltip>
                    );
                }
                return part;
            })}
        </span>
    );
};

export default GlossaryText;
