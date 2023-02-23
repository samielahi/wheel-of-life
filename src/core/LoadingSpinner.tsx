import Footer from "./Footer";

export default function LoadingSpinner() {
  return (
    <>
      <div className="dotted-alt flex h-full w-full flex-col items-center justify-center gap-10">
        <h3 className="text-4xl text-red">Wheel Of Life</h3>
        <img
          src="/images/prax.png"
          className="pulse h-[200px] drop-shadow-lg"
          alt="Loading spinner"
        />
        <p className="text-2xl font-bold italic text-orange">Loading...</p>
      </div>
      <Footer />
    </>
  );
}
