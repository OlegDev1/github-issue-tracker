import "./Nav.css";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { SetURLSearchParams } from "react-router-dom";

type NavProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export default function Nav({ searchParams, setSearchParams }: NavProps) {
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  const status = searchParams.get("status");

  return (
    <>
      <nav className="issues__nav">
        <div className="nav__firstSection">
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
        </div>
        <div className="nav__buttons"></div>
      </nav>
    </>
  );
}
