import Banner from "../components/Banner";
import GenreTabs from "../components/GenreTabs";

export default function Home() {
  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-14 md:py-20">
        <GenreTabs />
      </div>
    </>
  );
}
