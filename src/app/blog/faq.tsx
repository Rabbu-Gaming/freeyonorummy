'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items: FAQItem[];
};

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative w-[16px] h-[16px] shrink-0">
      <span className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${open ? "rotate-180 opacity-0" : "opacity-100"}`}>+</span>
      <span className={`absolute inset-0 flex items-center justify-center text-[16px] leading-none transition-transform duration-200 ${open ? "opacity-100" : "opacity-0"}`}>−</span>
    </span>
  );
}

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [item.answer, isOpen]);

  return (
    <div
      className={`rounded-[10px] border-l-4 bg-gray-50 transition-colors duration-200 ${isOpen ? "border-green-700 bg-green-50/40" : "border-gray-200"}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-1 rounded-[10px]"
      >
        <span className="text-[13px] font-bold text-gray-900 leading-snug" itemProp="name">
          {String(index + 1).padStart(2, "0")}. {item.question}
        </span>
        <span className={`shrink-0 mt-0.5 transition-colors duration-200 ${isOpen ? "text-green-700" : "text-gray-400"}`}>
          <PlusMinusIcon open={isOpen} />
        </span>
      </button>
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: "hidden",
          transition: "height 0.28s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-hidden={!isOpen}
      >
        <div ref={bodyRef} className="px-4 pb-4" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
          <div className="text-gray-600 prose prose-sm max-w-none" itemProp="text">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => <p className="mb-3 last:mb-0 leading-relaxed text-[13px]" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                a: ({ node, ...props }) => (
                  <a
                    className="text-green-700 hover:text-green-800 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-3 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal ml-5 mb-3 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="leading-relaxed text-[13px]" {...props} />,
              }}
            >
              {item.answer}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items?.length) return null;

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-12 mb-10" itemScope itemType="https://schema.org/FAQPage">
      <div className="flex items-center gap-3 mt-10 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item, index) => (
          <FAQAccordionItem
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>
    </section>
  );
}