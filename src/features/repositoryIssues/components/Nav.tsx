import "./Nav.css";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import SearchParamsTypes from "../types/searchParams.interface";
import Label from "../types/label.interface";
import LabelSelect from "./LabelSelect";

type NavProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  isLoading: boolean;
  labels: Label[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
};

export default function Nav({
  searchParamsObj,
  setSearchParams,
  isLoading,
  labels,
  fetchNextPage,
  isFetchingNextPage,
}: NavProps) {
  const status = searchParamsObj.status;

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
              isLoading={isLoading}
              labels={labels}
              searchParamsObj={searchParamsObj}
              setSearchParams={setSearchParams}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        </section>
      </nav>
    </>
  );
}
