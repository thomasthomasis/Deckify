import Navbar from "@/components/ui/Navbar";


export default function DashboardPage() {

  return (

    <main className="mx-auto max-w-6xl px-8">

      <Navbar />


      <section className="mt-10">

        <h1 className="text-4xl font-bold">
          Welcome back 👋
        </h1>


        <p className="mt-2 text-zinc-400">
          Continue building your knowledge.
        </p>


        <div className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

          <p className="text-zinc-400">
            Current Streak
          </p>
          
          <h2 className="mt-2 text-4xl font-bold">
            🔥 7 days
          </h2>

        </div>


      </section>


      <section className="mt-12">


        <div className="flex justify-between">

          <h2 className="text-2xl font-semibold">
            Continue Learning
          </h2>


          <button
            className="
            rounded-xl
            bg-green-500
            px-5
            py-3
            font-medium
            text-black
            hover:bg-green-400
            "
          >
            + New Deck
          </button>


        </div>


        <div className="mt-20 text-center">

            <h2 className="text-2xl font-bold">
                No decks yet
            </h2>

            <p className="mt-3 text-zinc-400">
                Create your first deck and start learning
            </p>
        </div>


      </section>


    </main>

  );
}