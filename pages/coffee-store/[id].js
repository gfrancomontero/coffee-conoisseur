import { useRouter } from "next/router";
import Link from "next/link";
import coffeeShopListJson from "../../data/coffee-stores.json";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";
import { fetchCoffeeStores } from '../../lib/coffee-stores'
import { fetchIndividualCoffeeStore } from '../../lib/coffee-stores'
import { fetchImageForFoursquareId } from '../../lib/coffee-stores'

// Gonzalo already explained getStaticProps function in index.js
export async function getStaticProps(staticProps) {

  const results = await fetchIndividualCoffeeStore(staticProps.params.id);
  const imgUrl = await fetchImageForFoursquareId(staticProps.params.id, 1);

  return {
    props: {
      coffeeStores: results,
      image: imgUrl,
    },
  }
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores(1);
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString()
      }
    }
  });

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

  const { name, location } = props.coffeeStores;
  const imgUrl = props.image;

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
          src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80" }
          height={600}
          width={360}
          className={styles.storeImg}
          alt={name}
        ></Image>
      </div>
      <div className={cls("glass", styles.col2)}>
        <div className={styles.iconWrapper}>
          <Image src={'/static/icons/places.svg'} height={24} width={24} />
          <p className={styles.text}>{location.address}</p>
        </div>
        <div className={styles.iconWrapper}>
          <Image src={'/static/icons/nearMe.svg'} height={24} width={24} />
          <p className={styles.text}>{location.neighborhood || location.cross_street || location.locality }</p>
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
