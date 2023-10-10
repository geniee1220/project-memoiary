import Head from 'next/head';
import MainTemplate from '../../components/template/MainTemplate';
import Date from '../../components/Date';
import Codeblock from '../../components/Codeblock';

import { useRouter } from 'next/router';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { MDXRemote } from 'next-mdx-remote';

import utilStyles from '../../styles/utils.module.css';

// 동적인 페이지를 위해 getStaticPaths와 getStaticProps를 사용
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: 'blocking', // true로 할 경우 getServerSideProps 호출
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

const Button = ({ children }) => {
  return (
    <button
      className="bg-black dark:bg-white text-lg text-teal-500 rounded-md px-5"
      onClick={() => alert(`thanks to ${children}`)}
    >
      {children}
    </button>
  );
};

const components = { Button, Codeblock };

function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <MainTemplate>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}

        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </MainTemplate>
  );
}

export default Post;
