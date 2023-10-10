import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';

const CopyButton = ({ target }) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target);
        alert('Copied!');
      } catch (error) {
        console.log(error);
        alert(`Copy failed ${error}`);
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-0.5 right-0.5 bg-white dark:text-gray-800 rounded-lg px-2"
    >
      Copy
    </button>
  );
};

function Codeblock({ children }) {
  return (
    <div className="relative">
      <CopyButton target={children} />
      <SyntaxHighlighter showLineNumbers style={rainbow}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

export default Codeblock;
