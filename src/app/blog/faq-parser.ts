export type FaqItem = {
  question: string;
  answer: string;
};

export function extractFaqFromContent(content: string): {
  cleanedContent: string;
  faqItems: FaqItem[];
} {
  const faqItems: FaqItem[] = [];

  const cleaned = content.replace(/:::faq\s*([\s\S]*?)\s*:::/g, (_, block) => {
    const lines = block.trim().split("\n");
    let question = "";
    let answer = "";
    let collecting = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        if (question && answer) {
          faqItems.push({ question, answer: answer.trim() });
        }
        question = trimmed.slice(2, -2).trim();
        answer = "";
        collecting = true;
      } else if (collecting && trimmed) {
        answer += (answer ? "\n" : "") + trimmed;
      }
    }

    if (question && answer) {
      faqItems.push({ question, answer: answer.trim() });
    }

    return "";
  });

  return {
    cleanedContent: cleaned,
    faqItems,
  };
}