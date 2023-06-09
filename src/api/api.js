import { useQuery } from "@tanstack/react-query"

const getProducts = async () => {

    try {
        const url = "https://dummyjson.com/products"
        const res = await fetch(url)
        const json = await res.json()
        console.log(json)
        return json
    } catch (error) {
        console.log(error)
    }
}

export const useGetProducts = () => {
    return useQuery(['getProducts'], () => getProducts()) 
}


