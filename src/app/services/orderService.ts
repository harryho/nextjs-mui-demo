import { _guid, _orders } from '@/app/_mock';


const KEYS = {
    items: "orders",
    itemId: "orderId"
};

let cache : any []= Object.assign([], _orders);

export function init() {
    cache = Object.assign([], _orders);
}

export function addItem(data: TODO) {
    let items = getAllItems();
    data["id"] = generateItemId(items.length);
    cache.push(data);
}

export function generateItemId(totalCount: number) {
    return `${_guid}${(totalCount + 1)}`;
}

export function updateItem(data: TODO) {
    let items = getAllItems() as TODO;
    let index = items.findIndex((a: TODO) => a.id === data.id);
    cache[index] = data;
}

export function getAllItems() {
    if (!cache || cache.length < 5) cache = Object.assign([], _orders);
    return cache
}


export function getItemById(id: string | number) {
    return cache.find((u: TODO) => u.id === id);
}

export function deleteItemById(id: string | number) {
    const index = cache.findIndex((u: TODO) => u.id === id);
    cache.splice(index, 1);
}



export function getItemsByPageNumber(
    pageNumber: number, pageSize: number = 10) {

    if (!cache || cache.length<1) cache = Object.assign([], _orders);

    console.log(` pageNumber ${pageNumber} `)
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize
    return cache.slice(start, end);
}

