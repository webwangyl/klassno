export interface ItagItem {
    name: string,
    type: "" | "success" | "warning" | "info" | "danger", unknown, "", boolean,
}

export interface IBlogItem {
    title: string,
    time: string,
    preview: string,
    tags: ItagItem[],
    filename: string,
}
