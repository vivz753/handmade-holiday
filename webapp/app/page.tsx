export default function Home() {
  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-between bg-yellow-50 px-8 py-16 pt-[100px] sm:items-start lg:px-16">
      <div className="flex flex-col gap-4 pt-8">
        <span className="text-3xl">Handmade Holiday</span>
        <span className="text-2xl">Purpose</span>
        <span className="text-red-500">
          Create something original to enter the pool of holiday gift giving (and gambling)!
        </span>
        <span className="text-2xl">How it works</span>
        <span className="text-xl">Crafting</span>
        <span className="text">
          To play, you must enter a custom item hand-crafted or designed by you (absolutely no input from AI, except to
          ask for technical help – the creativity must come from your precious brain). If you really are unable or do
          not believe in your innate ability to create, you may enter an item worth at least $50 USD. This should be the
          last resort, and I encourage everyone to really take this opportunity to exercise their creative mind and
          craftswomanship!
        </span>
        <span className="text">
          Gifts can be of various mediums but not limited to: fabrics, ceramics, woodwork, metallurgy, 3d printed
          objects, paper
        </span>
        <span className="text-xl">Examples</span>
        <div className="flex flex-row gap-4 lg:gap-12">
          <ul className="list-disc">
            <span>3D</span>
            <li>Ceramic mug</li>
            <li>Painted figurine</li>
            <li>Felted animal plushies</li>
            <li>Knitted beanie</li>
            <li>Sewn Pillowcase</li>
            <li>Mosaic coaster</li>
            <li>Wooden carved toy</li>
            <li>Embroidered handkerchief</li>
            <li>Notebook decorated w/ stickers</li>
            <li>Bedazzled container</li>
            <li>Soap or candle</li>
            <li>Jewelry</li>
          </ul>
          <ul className="list-disc">
            <span>2D</span>
            <li>Painting</li>
            <li>Fan-art</li>
            <li>Greeting card</li>
            <li>Sticker</li>
            <li>Photographs</li>
            <li>Short story</li>
            <li>Booklet of poems</li>
            <li>Fan-fiction</li>
            <li>Sheet music</li>
            <li>CD recording</li>
          </ul>
        </div>
        <span className="text-xl">Rules</span>
        <ol className="list-decimal">
          <li>Item must be functional OR serve an aesthetic purpose. Ideally both!</li>
          <li>
            Each item should have taken 2-4 hours of effort (you can enter multiple items together as one set to meet
            this requirement)
          </li>
          <li>Each entry grants you 10 tokens.</li>
        </ol>
        <span className="text-xl">What do I do with tokens?</span>
        <span>
          On the day of the event, tokens are used to play-to-win other crafts. Each person has a chance to spend a
          token on an item they want. 1 token = 1 chance to roll a pair of dice. Players will take turns rolling, and
          the highest cumulative score wins.
        </span>
        <span>
          If you already claimed one item and wish to donate your remaining tokens to another player, you may.
        </span>
      </div>
    </main>
  )
}
