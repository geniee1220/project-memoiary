import Head from 'next/head';
import MainTemplate from '../../components/template/MainTemplate';

import { getAllPostIds, getPostData } from '../../lib/posts';

// 동적인 페이지를 위해 getStaticPaths와 getStaticProps를 사용
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

function Post({ postData }) {
  return (
    <MainTemplate>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <h1>{postData.title}</h1>
      <br />
      {postData.id}
      <br />
      {postData.date}
    </MainTemplate>
  );
}

export default Post;
