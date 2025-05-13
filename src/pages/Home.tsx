// import { useEffect, useState } from "react";
import EventRegistration from "../component/EventRegisteration";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type dataProp = {
  data: {
    data: {
      eventImg: string;
      name: string;
    };
  };
};

const Home = () => {
  const { id } = useParams();

  const decodedString = atob(id as string);

  const { data }: UseQueryResult<dataProp, Error | null> = useQuery({
    queryKey: ["event"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/events/basic/${decodedString}`
      );
      return response;
    },
  });

  return (
    <>
      {data ? (
        <section>
          <main className="grid grid-cols-1 grid-rows-[200px_1fr] md:grid-rows-1 lg:grid-cols-2 lg:gap-10 h-fit lg:h-screen overflow-hidden">
            <section className="md:h-screen w-full overflow-hidden md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
              <img
                src={data.data.data.eventImg}
                alt="event img"
                className="object-cover h-full w-full"
              />
            </section>
            <section className="flex items-center justify-center md:row-span-1 md:row-start-1 md:col-start-1 md:col-span-1 lg:col-start-2 relative lg:right-[150px] 2xl:right-0">
              <div className="bg-white/95 p-2 pb-10 md:p-10 md:rounded-md lg:border 2xl:border-none">
                <EventRegistration eventName={data.data.data.name} />
              </div>
            </section>
          </main>
        </section>
      ) : (
        <div className="flex items-center justify-center fixed inset-0 bg-black/[0.8] text-white">
          <p className="text-lg font-medium">Loading....</p>
        </div>
      )}
    </>
  );
};

export default Home;
