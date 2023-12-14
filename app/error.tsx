"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error", error);
  return (
    <>
      <div className="mb-5">发生了未知错误.</div>
      <button className="btn" onClick={() => reset()}>
        重试
      </button>
    </>
  );
};

export default ErrorPage;
