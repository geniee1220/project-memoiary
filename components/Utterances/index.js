import { memo } from 'react';

function Utterances() {
  return (
    <section
      className="mt-10"
      ref={(elem) => {
        if (!elem) return;
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://utteranc.es/client.js';
        scriptElement.async = true;
        scriptElement.setAttribute('repo', 'geniee1220/project-memoiary');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('theme', 'github-light');
        scriptElement.setAttribute('label', 'Comment');
        scriptElement.crossOrigin = 'anonymous';
        elem.appendChild(scriptElement);
      }}
    />
  );
}

export default memo(Utterances);
