import React, { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import AppNavBar from "@/components/Master/AppNavBar";
import Footer from "@/components/Master/Footer";

async function getData() {
  let socials = (await (await fetch(`${process.env.HOST}/api/social`)).json())[
    "data"
  ];
  let categories = (
    await (await fetch(`${process.env.HOST}/api/category`)).json()
  )["data"];
  return { socials: socials, categories: categories };
}

const PlainLayout = async (props) => {
  const data = await getData();
  return (
    <Fragment>
      <AppNavBar data={data} />
      {props.children}
      {/* <Toaster position="bottom-center"/> */}
      <Footer data={data} />
    </Fragment>
  );
};
export default PlainLayout;
