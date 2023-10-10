import React from 'react';

function Utterances() {
  return (
    <section
      ref={(elem) => {
        if (!elem) return;
        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.crossOrigin = 'anonymous';
        scriptElem.setAttribute('repo', 'geniee1220/project-memoirey');
        scriptElem.setAttribute('issue-term', 'pathname');
        scriptElem.setAttribute('label', 'Comment');
        scriptElem.setAttribute('theme', 'github-light');
        elem.appendChild(scriptElem);
      }}
    ></section>
  );
}

export default Utterances;
