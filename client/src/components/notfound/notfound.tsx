import Lottie from "react-lottie";
import animationJson from "../../json/notfound.json";
import React, { useContext, useEffect } from "react";
import { LoaderContext } from "../../context/loader/loader.context";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const { setLoadingPage } = useContext(LoaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingPage(false);
  }, []);

  function handleReturn() {
    navigate("/");
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-white">
      <div className="w-screen flex flex-col gap-10 justify-center items-center h-screen px-7">
        <div className="max-w-xl md:max-w-full">
          <Lottie options={{ loop: true, autoplay: true, animationData: animationJson }} />
        </div>
      </div>
    </div>
  );
}
