export interface Story {
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

export interface ResponseData {
    hits: Hit[]
}