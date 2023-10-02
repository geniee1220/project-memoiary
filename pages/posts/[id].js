import Head from 'next/head';
import MainTemplate from '../../components/template/MainTemplate';
import Date from '../../components/Date';

import { useRouter } from 'next/router';
import { getAllPostIds, getPostData } from '../../lib/posts';

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
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </MainTemplate>
  );
}

export default Post;
