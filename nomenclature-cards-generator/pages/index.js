import Head from 'next/head'
import Header from 'components/Header/Header'
import Tabs from 'components/Tabs/Tabs'
import Tool from 'components/tool/tool'
import ListCart from 'components/ListCart/ListCart'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Tabs/>
      <Tool/>
      <ListCart/>
      <p>Pour dépasser les limitations et créer des cartes à l’infinie <Link>passez à Card+</Link></p>
    </div>
  )
}
