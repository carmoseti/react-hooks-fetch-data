import {createFileRoute} from '@tanstack/react-router'
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ResponseData, Story} from "../../types";

export const Route = createFileRoute('/fetch-data/refetch')({
    component: RefetchPage,
})

function RefetchPage() {
    const API = "https://hn.algolia.com/api/v1/search";

    const [data, setData] = useState<Story[]>([]);
    const [search, setSearch] = useState("");
    const [activeSearch, setActiveSearch] = useState("react");

    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<ResponseData> = await axios(`${API}?query=${activeSearch}`);

            setData(result.data.hits);
        };

        fetchData();
    }, [activeSearch]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = () => {
        setActiveSearch(search);
        setSearch("");
    };

    return (
        <Fragment>
            <div style={{padding: 8, borderBottom: 'solid 1px #ECECEC'}}>
                <input type="text" value={search} onChange={handleSearchChange}/>
                <button type="button" onClick={handleSearchSubmit}>
                    Search
                </button>
            </div>
            <ul>
                {data.map((item) => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </Fragment>
    );
}
