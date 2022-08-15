import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  console.log('router', router.query.id)
  return(
    <div>
      <p>Coffee Store {router.query.id}</p>
      <Link href="/">
        <a>Take me home</a>
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

export default CoffeeStore;
