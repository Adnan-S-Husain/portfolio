import { useContext, useRef, useState } from "react";
import { MouseContext } from "../../context/mousepos/mouse.context";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";

export default function ProjectsCompleted({ data }: { data: any }) {
  const containerRef = useRef(null);
  var sortedData = null;
  if (data) {
    sortedData = [...data].sort(() => Math.random() - 0.5);
  }

  return (
    <div className="w-full flex justify-start items-center" ref={containerRef}>
      <motion.div
        className="flex justify-start items-stretch gap-8 md:gap-4"
        drag="x"
        dragConstraints={containerRef}
        whileTap={{ cursor: "grab" }}
      >
        {sortedData &&
          sortedData.map((fw: any, i: number) => {
            return (
              <Project
                key={i}
                data={{
                  title: fw.title,
                  tech: fw.tech,
                  image: fw.image,
                  url: fw.url,
                  github: fw.github,
                }}
              />
            );
          })}
      </motion.div>
    </div>
  );
}

interface WorkInterface {
  title: string;
  tech: string;
  image: string;
  url: string;
  github: string;
}

function Project({ data }: { data: WorkInterface }) {
  const { options, setOptions } = useContext(MouseContext);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
    setOptions({
      ...options,
      scale: 4,
      bgColor: "transparent",
      zIndex: 1,
      bg: <FWHover />,
      invert: false,
    });
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    setOptions({
      ...options,
      scale: null,
      bgColor: null,
      zIndex: null,
      bg: null,
    });
  };
  return (
    <motion.div
      className="min-w-[400px] flex flex-col rounded-xl max-w-[750px] bg-white cursor-pointer md:min-w-[300px] md:w-[300px] transition-all shadow-xl"
      id="featuredWork"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: isHovering ? "#171717" : "white",
        color: isHovering ? "white" : "black",
      }}
      whileTap={{ cursor: "grab" }}
    >
      <div className="overflow-hidden flex justify-center items-center h-4/6 w-full p-5">
        <img
          src={data.image}
          className="w-full max-h-[290px] rounded-lg transition-transform pointer-events-none"
          alt={data.title}
        />
      </div>
      <div className="flex flex-col gap-3 py-5 px-5">
        <p className="text-2xl font-medium">{data.title}</p>
        <p className="text-1xl text-[#6f6f6f] font-medium">{data.tech}</p>
      </div>
      <div className="flex w-full px-5 items-center justify-between">
        <p>
          {data.github && (
            <a href={data.github}>
              <GitHubIcon />
            </a>
          )}
        </p>
        <p>
          {data.url && (
            <a href={data.url}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"
                />
              </svg>
            </a>
          )}
        </p>
      </div>
    </motion.div>
  );
}

function FWHover() {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full text-white bg-opacity-60 font-[arial] bg-white font-semibold"
      style={{ fontSize: "3px", letterSpacing: "0.07px" }}
    >
      <p>drag</p>
    </div>
  );
}
