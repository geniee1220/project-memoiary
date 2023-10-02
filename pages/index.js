import Head from 'next/head';
import Link from 'next/link';
import MainTempate, { siteTitle } from '../components/template/MainTemplate';
import Date from '../components/Date';
import utilStyles from '../styles/utils.module.css';

// getServerSideProps는 페이지에 접근할 때마다 호출
// export async function getServerSideProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/posts');
  const json = await response.json();

  return {
    props: {
      allPostsData: json.allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <MainTempate home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </MainTempate>
  );
}
