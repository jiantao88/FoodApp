// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { Record } from "../types";
import React from "react";

const Home: NextPage = () => {
  const [records, setRecords] = useState<Record[] | null>(null);
  useEffect(() => {
    fetch("/api/records")
      .then((res) => res.json())
      .then(setRecords);
  }, []);

  const renderCards = () => {
    if (!records) {
      return null;
    }
    return records.map((x) => (
      <Card key={`${x.date}${x.title}${x.year}`} {...x} />
    ));
  };

  return (
    <div className="mx-[3.5rem] min-w-[15rem] max-w-full sm:mx-auto sm:w-[30rem] font-sans">
      <Head>
        <title>我看过的</title>
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-slate-300 flex justify-between items-center text-xl sm:text-5xl my-8 sm:my-20">
        <span>我看过的</span>
        <span className="text-xs sm:text-xl">电影 / 动漫 / 剧 / 书</span>
      </h1>

      <div>{renderCards()}</div>
    </div>
  );
};

export default Home;
