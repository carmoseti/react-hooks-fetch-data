import {createFileRoute} from '@tanstack/react-router'
import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ResponseData, Story} from "../../types";

export const Route = createFileRoute('/fetch-data/with-form')({
    component: WithFormPage,
})

function WithFormPage() {
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
