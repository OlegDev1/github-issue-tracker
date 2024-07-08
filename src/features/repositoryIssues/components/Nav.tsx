import "./Nav.css";
import { Tabs, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import SearchParamsTypes from "../types/searchParams.interface";
import LabelSelect from "./LabelSelect";
import AssigneesSelect from "./AssigneesSelect";
import ClearFilters from "./ClearFilters";
import SortSelect from "./SortSelect";

type NavProps = {
  searchParamsObj: SearchParamsTypes;
  setSearchParams: (params: SearchParamsTypes) => void;
  user: string;
  repo: string;
};

export default function Nav({ searchParamsObj, setSearchParams, user, repo }: NavProps) {
  const status = searchParamsObj.status;
  const label = searchParamsObj.label;
  const assignee = searchParamsObj.assignee;
  const sort = searchParamsObj.sort;

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
          <div className="nav__clearFilters">
            {(!label && !assignee && !sort) || <ClearFilters setSearchParams={setSearchParams} />}
          </div>
          <div className="nav__sort">
            <SortSelect searchParamsObj={searchParamsObj} setSearchParams={setSearchParams} />
          </div>
          <div className="nav__assignees">
            <AssigneesSelect
              searchParamsObj={searchParamsObj}
              setSearchParams={setSearchParams}
              user={user}
              repo={repo}
            />
          </div>
          <div className="nav__label">
            <LabelSelect
              searchParamsObj={searchParamsObj}
              setSearchParams={setSearchParams}
              user={user}
              repo={repo}
            />
          </div>
        </section>
      </nav>
    </>
  );
}
