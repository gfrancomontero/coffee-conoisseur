import { useRouter } from "next/router";
import Link from "next/link";
import coffeeShopListJson from "../../data/coffee-stores.json";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";

// Gonzalo already explained getStaticProps function in index.js
export function getStaticProps(staticProps) {
  return {
    props: {
      coffeeStores: coffeeShopListJson.find(coffeeStore => {
        return coffeeStore.id.toString() === staticProps.params.id;
      }),
    },
  }
}

export function getStaticPaths() {
  const paths = coffeeShopListJson.map(coffeeStore => {
    return { params: {id: coffeeStore.id.toString() } }
  })
  return {
    paths: paths,
    fallback: true
  }
}

const CoffeeStore = (props) => {
  // we're incluidng this router.isFallback for when the fallback is true and there is no
  // pre-rendered route matching the one requested in the url
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>Loading...</div>
    )
  }
  // end of comment

  const handleUpVoteButton = () => {
    console.log("handle upvote button");
  };
 
  const { name, address, neighbourhood, imgUrl } = props.coffeeStores;
  
  return(
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.col1}>
        <div className={styles.backToHomeLink}>
          <Link href="/">
            <a>Back home</a>
          </Link>
        </div>
        <div className={styles.nameWrapper}>
          <h1 className={styles.name}>{name}</h1>
        </div>
        <Image
          src={imgUrl}
          height={600}
          width={360}
          className={styles.storeImg}
          alt={name}
        ></Image>
      </div>
      <div className={cls("glass", styles.col2)}>
        <div className={styles.iconWrapper}>
          <Image src={'/static/icons/places.svg'} height={24} width={24} />
          <p className={styles.text}>{address}</p>
        </div>
        <div className={styles.iconWrapper}>
          <Image src={'/static/icons/nearMe.svg'} height={24} width={24} />
          <p className={styles.text}>{neighbourhood}</p>
        </div>
        <div className={styles.iconWrapper}>
          <Image src={'/static/icons/star.svg'} height={24} width={24} />
          <p className={styles.text}>1</p>
        </div>
        <button className={styles.upVoteButton} onClick={handleUpVoteButton}>UpVote!</button>
        <br />
      </div>
    </div>
  )
}

export default CoffeeStore;
