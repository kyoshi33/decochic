
import styles from "../styles/Shop.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Product from "../components/product";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

function Shop() {


  return (
    <>
      <Head>
        <title>ConfoChic</title>
      </Head>
      <Header></Header>


      < Footer ></Footer >


    </>
  );
}

export default Shop;
