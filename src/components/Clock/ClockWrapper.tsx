"use client";

import dynamic from "next/dynamic";

const Clock = dynamic(() => import("./Clock"), {
  ssr: false,
});

function ClockWrapper() {
  return <Clock />;
}

export default ClockWrapper;
