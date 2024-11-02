import {createFileRoute} from '@tanstack/react-router'
import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ResponseData, Story} from "../../types";

export const Route = createFileRoute('/fetch-data/with-abort')({
    component: WithAbortPage,
})

interface UseQueryArgs<T> {
    queryKey: string[];
    queryFn: () => Promise<T>;
    initialData: T;
}

function useQuery<T>({queryFn, queryKey, initialData}: UseQueryArgs<T>) {
    const [data, setData] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await queryFn();
                if (!didCancel) setData(result);
            } catch (error) {

                if (!didCancel) setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [...queryKey]);

    return {data, isLoading, isError};
};

function WithAbortPage() {
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
