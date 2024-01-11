export interface Page {
    link: string,
    title: string
}

export type SetPage = () => void;

export type SetPageLink = (link: string) => void;

export type SetPageTitleLink = (link: string, title: string) => void;
