import "./Nav.css";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import SearchParamsTypes from "../types/searchParams.interface";
import LabelSelect from "./LabelSelect";
import fetchLabels from "../utils/fetchLabels";
import nextPageParam from "../utils/fetchLabelsNextParam";
import { useInfiniteQuery } from "@tanstack/react-query";

type NavProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  user: string;
  repo: string;
};

export default function Nav({ searchParamsObj, setSearchParams, user, repo }: NavProps) {
  const status = searchParamsObj.status;

  const {
    data: labelsData,
    isLoading: isLabelsLoading,
    isError: isLabelsError,
    fetchNextPage: fetchNextLabelsPage,
    isFetchingNextPage: isFetchingNextLabelsPage,
  } = useInfiniteQuery({
    queryKey: ["lables", user, repo],
    queryFn: ({ pageParam }) => fetchLabels(user ?? "microsoft", repo ?? ".github", pageParam),
    initialPageParam: "1",
    getNextPageParam: (lastPage) => nextPageParam(lastPage),
  });

  if (isLabelsError) return <h1>Network error</h1>;

  return (
    <>
      <nav className="issues__nav">
        <section className="nav__firstSection">
          <p className="nav__title">Issues</p>
          <Tabs defaultValue={status ?? "opened"}>
            <TabsList>
              <TabsTrigger
                value="opened"
                onClick={() =>
                  setSearchParams({ ...searchParamsObj, page: "1", status: "opened" })
                }>
                Opened
              </TabsTrigger>
              <TabsTrigger
                value="closed"
                onClick={() =>
                  setSearchParams({ ...searchParamsObj, page: "1", status: "closed" })
                }>
                Closed
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>
        <section className="nav__buttons">
          <div className="nav__labels">
            <LabelSelect
              isLoading={isLabelsLoading}
              labels={labelsData}
              searchParamsObj={searchParamsObj}
              setSearchParams={setSearchParams}
              fetchNextPage={fetchNextLabelsPage}
              isFetchingNextPage={isFetchingNextLabelsPage}
            />
          </div>
        </section>
      </nav>
    </>
  );
}
