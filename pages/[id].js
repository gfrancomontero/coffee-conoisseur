import { useRouter } from "next/router";
import Link from "next/link";
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Dynamicpage = () => {
  const router = useRouter();
  console.log('router', router.query.id)
  return(
    <div>
      <Head>
        <title>{router.query.id}</title>
      </Head>
      <p className={styles.statement}>This is a dynamic page with ID {router.query.id}</p>
      <Link href="/">
        <a>Link to</a>
      </Link>
      <br />
      <Link href={
          {pathname: 'dynamic'}
        }
      >
        <a>Go to page dynamic</a>
      </Link>
    </div>
  )
}
export default Dynamicpage;
