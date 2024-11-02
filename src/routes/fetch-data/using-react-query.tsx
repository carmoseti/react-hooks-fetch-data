import {createFileRoute} from '@tanstack/react-router'
import {ChangeEvent, FormEvent, Fragment, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ResponseData, Story} from "../../types";
import {useQuery} from "@tanstack/react-query";

export const Route = createFileRoute('/fetch-data/using-react-query')({
  component: UsingreactQueryPage,
})

function UsingreactQueryPage() {
  const API = "https://hn.algolia.com/api/v1/search";

  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("react");

  const {data, isLoading, isError} = useQuery<Story[]>({
    queryKey: [activeSearch],
    queryFn: async () => {
      const result: AxiosResponse<ResponseData> = await axios(`${API}?query=${activeSearch}`);

      return result.data.hits;
    },
    initialData: [],
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    setActiveSearch(search);
    setSearch("");

    event.preventDefault();
  };

  return (
      <Fragment>
        <div style={{padding: 8, borderBottom: 'solid 1px #ECECEC'}}>
          <form onSubmit={handleSearchSubmit}>
            <input type="text" value={search} onChange={handleSearchChange}/>
            <button type="submit">Search</button>
          </form>
        </div>
        {isError && <div>Something went wrong ...</div>}
        <ul>
          {isLoading ? (
              <div>Loading ...</div>
          ) : (
              data.map((item) => (
                  <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                  </li>
              ))
          )}
        </ul>
      </Fragment>
  );
}
