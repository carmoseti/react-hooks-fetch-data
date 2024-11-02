import {createFileRoute} from '@tanstack/react-router'
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ResponseData, Story} from "../../types";

export const Route = createFileRoute('/fetch-data/from-state')({
    component: FromStatePage,
})

function FromStatePage() {
    const API = "https://hn.algolia.com/api/v1/search";

    const [data, setData] = useState<Story[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result: AxiosResponse<ResponseData> = await axios(`${API}?query=react`);

            setData(result.data.hits);
        };

        fetchData();
    }, []);

    return (
        <ul>
            {data.map((item) => (
                <li key={item.objectID}>
                    <a href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    );
}
