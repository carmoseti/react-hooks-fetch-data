import {ChangeEvent, FormEvent, Fragment, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

interface Story {
    objectID: string;
    title: string;
    url: string;
}

interface Author {
    matchLevel: string
    matchedWords: any[]
    value: string
}

interface Title {
    fullyHighlighted: boolean
    matchLevel: string
    matchedWords: string[]
    value: string
}

interface Url {
    matchLevel: string
    matchedWords: string[]
    value: string
    fullyHighlighted?: boolean
}

interface HighlightResult {
    author: Author
    title: Title
    url: Url
}

interface Hit {
    _highlightResult: HighlightResult
    _tags: string[]
    author: string
    children: number[]
    created_at: string
    created_at_i: number
    num_comments: number
    objectID: string
    points: number
    story_id: number
    title: string
    updated_at: string
    url: string
}

interface ResponseData {
    hits: Hit[]
}

const API = "https://hn.algolia.com/api/v1/search";

interface UseQueryArgs<T> {
    queryKey: string[];
    queryFn: () => Promise<T>;
    initialData: T;
}

function useQuery<T>({queryFn, queryKey, initialData}: UseQueryArgs<T>) {
    const [data, setData] = useState<T>(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const result = await queryFn();

                if (!didCancel) setData(result);
            } catch (e) {
                if (!didCancel) setIsError(true);
                alert(`${e.code} => ${e.message}`);
            }
            setIsLoading(false);
        };

        fetchData().then((a) => {
            console.log(a)
        });

        return () => {
            didCancel = true;
        };
    }, [...queryKey]);

    return {data, isLoading, isError}
}

const App = () => {
    const [search, setSearch] = useState<string>("");
    const [activeSearch, setActiveSearch] = useState<string>("react");

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
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={search} onChange={handleSearchChange}/>
                <button type="submit">
                    Search
                </button>
            </form>

            {isError && <div>Something went wrong ...</div>}

            <ul>
                {
                    isLoading ?
                        <div>Loading...</div> :
                        data.map((item) => (
                            <li key={item.objectID}>
                                <a href={item.url}>{item.title}</a>
                            </li>))
                }
            </ul>
        </Fragment>
    );
}

export default App;