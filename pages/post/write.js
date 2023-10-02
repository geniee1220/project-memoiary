import { useRef, useState } from 'react';
import MainTemplate from '../../components/template/MainTemplate';
import Link from 'next/link';

function Write() {
  const idRef = useRef(undefined);
  const titleRef = useRef(undefined);
  const contentRef = useRef(undefined);

  const [showLink, setShowLink] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((response) => {
          if (response.ok) {
            response.json();
          } else {
            throw new Error('Fetch Error');
          }
        })
        .then((data) => {
          setShowLink(true);
          console.log('Success:', data);
          alert('Success');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error');
        });
    }
  };

  return (
    <MainTemplate>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {showLink && (
        <Link href={`/posts/${idRef.current.value}`}>
          생성된 포스트로 바로가기
        </Link>
      )}
    </MainTemplate>
  );
}

export default Write;
