import { FetchQueue } from "./helpers/FetchQueue";
export function getListUnit(page: number = 1, search_string: string) {
  return fetch('/api/unit/items', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page,
      search_string
    })
  })
}

const fetchQueue = new FetchQueue();
export function moveUnit(fromIndex: number, toIndex: number) {
  return fetchQueue.add('/api/unit/move', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromIndex,
      toIndex
    })
  })
}

export function tradeUnit(id: number, trade: 0 | 1) {
  return fetch('/api/unit/trade/' + id, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      trade
    })
  })
}

export function generateData(lenght: number) {
  return fetch('/api/unit/generate', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lenght
    })
  })
}