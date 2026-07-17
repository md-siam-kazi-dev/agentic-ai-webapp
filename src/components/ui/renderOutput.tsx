import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function RenderMarkdown({ aiOutput }: { aiOutput: string }) {
  return (
    <div className="prose prose-slate max-w-none p-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {aiOutput}
      </ReactMarkdown>
    </div>
  );
}