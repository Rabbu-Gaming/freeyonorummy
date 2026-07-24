import parse, { domToReact } from "html-react-parser";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });

const options = {
  replace(node) {
    if (node.type !== "tag") return;

    switch (node.name) {
      case "h1":
  return (
    <h2 className={`text-[20px] font-extrabold text-gray-900 tracking-tight leading-snug mt-10 mb-4 first:mt-0 ${inter.className}`}>
            {domToReact(node.children, options)}
            <span className="block w-10 h-[3px] rounded-full bg-gradient-to-r from-emerald-600 to-amber-400 mt-2.5" />
          </h2>
        );

      case "h2":
        return (
          <h2 className={`text-[17.5px] font-extrabold text-gray-900 tracking-tight leading-snug mt-9 mb-3.5 ${inter.className}`}>
            {domToReact(node.children, options)}
            <span className="block w-8 h-[3px] rounded-full bg-gradient-to-r from-emerald-600 to-amber-400 mt-2" />
          </h2>
        );

      case "h3":
        return (
          <h3 className={`text-[13px] font-bold text-emerald-800 uppercase tracking-wider mt-6 mb-2.5 ${inter.className}`}>
            {domToReact(node.children, options)}
          </h3>
        );

      case "p":
        return (
          <p className="text-[13px] text-gray-600 leading-[1.8] mb-3">
            {domToReact(node.children, options)}
          </p>
        );

      case "ul":
        return (
          <ul className="flex flex-col gap-2 my-4 p-0 list-none">
            {node.children
              .filter((c) => c.type === "tag" && c.name === "li")
              .map((li, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-700 leading-[1.65] px-3.5 py-2.5 bg-gray-50/70 border border-gray-100 rounded-xl">
                  <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-50 text-emerald-700 shrink-0 mt-px">
                    <svg viewBox="0 0 12 9" className="w-2.5 h-2.5" fill="none">
                      <path d="M1 4.5L4.2 7.5L11 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{domToReact(li.children, options)}</span>
                </li>
              ))}
          </ul>
        );

      case "ol":
        return (
          <ol className="flex flex-col gap-2 my-4 p-0 list-none">
            {node.children
              .filter((c) => c.type === "tag" && c.name === "li")
              .map((li, i) => (
                <li key={i} className="flex items-start gap-3 text-[13px] text-gray-700 leading-[1.65] px-3.5 py-2.5 bg-gray-50/70 border border-gray-100 rounded-xl">
                  <span className="shrink-0 w-5.5 h-5.5 rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-600 text-white text-[10.5px] font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="pt-px">{domToReact(li.children, options)}</span>
                </li>
              ))}
          </ol>
        );

      case "strong":
        return <strong className="font-bold text-gray-900">{domToReact(node.children, options)}</strong>;

      case "em":
        return <em className="italic text-gray-500">{domToReact(node.children, options)}</em>;

      case "a":
        return (
          <a href={node.attribs.href} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold no-underline underline-offset-2 decoration-emerald-300 hover:underline">
            {domToReact(node.children, options)}
          </a>
        );

      case "img":
        return (
          <img src={node.attribs.src} alt={node.attribs.alt || ""} className="w-full rounded-2xl border border-gray-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] my-5 object-cover" />
        );

      case "hr":
        return (
          <div className="flex items-center justify-center gap-2 my-6">
            <span className="h-px flex-1 bg-gray-100" />
            <svg viewBox="0 0 10 10" className="w-2 h-2 text-amber-400 shrink-0" fill="currentColor">
              <path d="M5 0L10 5L5 10L0 5Z" />
            </svg>
            <span className="h-px flex-1 bg-gray-100" />
          </div>
        );

      case "blockquote":
        return (
          <blockquote className="relative border-l-2 border-amber-400 bg-emerald-50/40 rounded-r-xl pl-4 pr-4 py-3 my-4 text-[13px] text-gray-600 leading-[1.75] not-italic">
            {domToReact(node.children, options)}
          </blockquote>
        );

      case "code":
        return (
          <code className="bg-gray-100 text-emerald-700 text-[12px] font-mono px-1.5 py-0.5 rounded-md">
            {domToReact(node.children, options)}
          </code>
        );

      default:
        return undefined;
    }
  },
};

export default function ContentRenderer({ html }) {
  return <div>{parse(html, options)}</div>;
}