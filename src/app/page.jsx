import Hero from "@/components/Hero";
import PlainLayout from "@/components/Master/Plain-Layout";
import NewsList from "@/components/NewsList";
import PopularList from "@/components/PopularList";

async function getData() {
  let slider = (
    await (await fetch(`${process.env.HOST}/api/news/type?type=Slider`)).json()
  )["data"];
  let featured = (
    await (
      await fetch(`${process.env.HOST}/api/news/type?type=Featured`)
    ).json()
  )["data"];
  let Latest = (
    await (await fetch(`${process.env.HOST}/api/news/latest`)).json()
  )["data"];
  let Popular = (
    await (await fetch(`${process.env.HOST}/api/news/type?type=Popular`)).json()
  )["data"];
  return { slider, featured, Latest, Popular };
}

const page = async ({ children }) => {
  const data = await getData();
  return (
    <div>
      <PlainLayout>
        <Hero slider={data.slider} featured={data.featured} />
        <div className="container mt-5">
          <h5>LATEST</h5>
          <hr className="" />
          <div className="row">
            <div className="col-md-9 col-lg-9 col-sm-12 col-12 px-3">
              <NewsList latest={data["Latest"]} />
            </div>
            <div className="col-md-3 col-lg-3 col-sm-12 col-12 px-3">
              <PopularList popular={data["Popular"]} />
            </div>
          </div>
        </div>
      </PlainLayout>
    </div>
  );
};

export default page;
