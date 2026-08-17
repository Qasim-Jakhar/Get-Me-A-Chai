import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-center flex-col text-white gap-4 md:mb-5 min-h-[44vh]">
      <div className="font-bold md:text-5xl text-4xl flex justify-center items-center pl-8 p-4"><span>Buy me A Chai</span><span><img width={88} src="/tea.gif" alt="Chai Cup" /></span></div>
      <p className="p-4 text-center">A crowdfunding platform for creators. Get funded by your fans and followers. Start Now!</p>
      <div>
        <Link href={"/login"}>
      <button type="button" className="cursor-pointer text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 me-2 mb-2">Start Now</button>
        </Link>
        <Link href={"/about"}>
      <button type="button" className="cursor-pointer text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 me-2 mb-2">Read More</button>
        </Link>
      </div>
    </div>
    <div className="bg-white h-1 opacity-10"></div>
    <div className="text-white container mx-auto pb-20 pt-14">
      <h1 className="text-center mb-14 font-semibold md:text-3xl text-2xl">Your Fans can buy you a Chai</h1>
    <div className="flex md:flex-row flex-col gap-5 justify-around">
      <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-700 rounded-full p-2" width={100} src="man.gif" alt="Man" />
        <p className="font-bold">Fans want to help</p>
        <p>Your fans are available for you to help you</p>
      </div>
      <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-700 rounded-full p-2" width={100} src="coin.gif" alt="Man" />
        <p className="font-bold">Fans want to help</p>
        <p>Your fans are available for you to help you</p>
      </div>
      <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className="bg-slate-700 rounded-full p-2" width={100} src="group.gif" alt="Man" />
        <p className="font-bold">Fans want to help</p>
        <p>Your fans are available for you to help you</p>
      </div>
    </div>
    </div>
    <div className="bg-white h-1 opacity-10"></div>
    <div className="text-white container mx-auto pb-20 pt-14">
      <h1 className="text-center mb-14 font-bold text-3xl">Learn more about us</h1>
    <div className="flex gap-5 justify-around p-4 w-full">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/8411fEhNKNc?si=Hjacefbk5f6gjfNO" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
    </div>
    </>
  );
}
