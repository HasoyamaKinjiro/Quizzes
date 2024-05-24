export function saveToLocalStorage<T>(key: string, data: T):Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            const jsonData = JSON.stringify(data)
            localStorage.setItem(key, jsonData)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

export function getFromLocalStorage<T>(key: string):Promise<T | null> {
    return new Promise((resolve, reject) => {
        try {
            const jsonData = localStorage.getItem(key)
            if (jsonData !== null) {
                const data: T = JSON.parse(jsonData)
                resolve(data)
            } else {
                resolve(null)
            }
        } catch (error) {
            reject(error)
        }
    })
}
