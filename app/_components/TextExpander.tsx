"use client";

import { useState } from "react";

interface TextExpanderProps {
  children: string; // Assuming children should always be a string
  maxWords?: number; // Optional prop to customize max words
}

function TextExpander({ children, maxWords = 40 }: TextExpanderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, maxWords).join(" ") +
      `${maxWords === 0 ? "" : "..."}`;

  if (children.split(" ").length <= maxWords) return children;

  return (
    <span>
      {displayText}{" "}
      <button
        className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;
