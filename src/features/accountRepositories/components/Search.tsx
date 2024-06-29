import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import "./Search.css";
import { SetURLSearchParams } from "react-router-dom";

type SearchProps = {
  setSearchParams: SetURLSearchParams;
  searchQuery: string | null;
  searchParams: URLSearchParams;
};

export default function Search({ setSearchParams, searchQuery, searchParams }: SearchProps) {
  const [inputText, setInputText] = useState(searchQuery);
  const searchParamsObj = Object.fromEntries(searchParams.entries());

  return (
    <div className="searchBar">
      <div className="searchBar__input">
        <Input
          className="searchBar__input-input"
          placeholder="Search by name..."
          value={inputText === null ? "" : inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {searchQuery !== null && (
          <svg
            onClick={() => {
              delete searchParamsObj.query;
              setSearchParams({ ...searchParamsObj, page: "1" });
              setInputText(null);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 searchBar__cancel-button">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        )}
      </div>
      <Button
        onClick={() =>
          setSearchParams({
            ...searchParamsObj,
            page: "1",
            query: inputText === null ? "" : inputText,
          })
        }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Button>
    </div>
  );
}
