import Header from "../components/Header";
import WaldoFull from "../assets/waldo-full.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <main className="flex justify-center gap-10 p-10">
        <div className="flex flex-col items-center gap-4">
          <img className="h-96" src={WaldoFull} alt="" />
          <Link to="/game" className="font-bold flex cursor-pointer items-center justify-center rounded-md bg-red-700 p-12 py-3 text-xl text-white transition duration-200 hover:bg-red-600">
            PLAY NOW ➜
          </Link>
        </div>
        <div className="w-[60%]">
          <section className="mb-8">
            <h2 className="mb-4 text-3xl font-bold">
              Welcome to Where's Waldo!
            </h2>
            <p className="text-xl">
              Think you've got a sharp eye? Put your observation skills to the
              test in this exciting <b>Where's Waldo?</b> challenge!
            </p>
          </section>
          <section className="mb-8">
            <h3 className="mb-4 text-2xl font-bold">🔍 How to Play:</h3>
            <ol className="list-inside list-disc text-xl">
              <li>
                Look at the image carefully and{" "}
                <b>find Waldo, Wizard and Odlaw</b>—they're hiding somewhere!
              </li>
              <li>Click on them when you spot them.</li>
              <li>
                Beat the clock and challenge yourself to{" "}
                <b>find all of them as fast as possible!</b>
              </li>
            </ol>
          </section>
          <section className="mb-8">
            <h3 className="mb-4 text-2xl font-bold">
              ⏱ Compete for the Best Time!
            </h3>
            <p className="text-xl">
              Can you set a record for the <b>fastest find</b>? Track your score
              and see if you can improve with each round.
            </p>
          </section>

          <section className="mb-8">
            <p className="text-xl">
              <b>Start Playing Now!</b> Can you find Waldo before time runs out?
            </p>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
