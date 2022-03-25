import { BossCard } from "components/BossCard"
import { useAllBosses } from "hooks/useAllBosses"
import { NextPage } from "next"
import Head from "next/head"
import { v4 as uuidv4 } from "uuid"
import { items } from "hardhat/data/items"

const bossRewards: any = {
  65: [],
  91: [{ potionId: 17, potionImage: items.itemsImageURIs[0], amount: 1 }],
  106: [{ potionId: 17, potionImage: items.itemsImageURIs[0], amount: 2 }],
  150: [
    { potionId: 17, potionImage: items.itemsImageURIs[0], amount: 2 },
    { potion: 25, potionImage: items.itemsImageURIs[3], amount: 1 }
  ]
}

const AdventureMode: NextPage = () => {
  const { bosses } = useAllBosses()

  return (
    <>
      <Head>
        <title>PokemonNFT - Adventure Mode</title>
      </Head>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white">Adventure Mode</h2>
        { bosses?.map((boss, index) => (
          <BossCard
            key={uuidv4()}
            id={boss.id}
            index={index}
            name={boss.name}
            imageURI={boss.imageURI}
            level={boss.level}
            hp={boss.hp}
            rewards={bossRewards[boss.id]} />
        )) }
      </div>
    </>
  )
}

export default AdventureMode
