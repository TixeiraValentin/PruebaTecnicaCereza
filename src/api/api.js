import { useQuery } from "@tanstack/react-query"

const getRandomUsers = async (pokemonName) => {
    console.log(pokemonName)
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        const res = await fetch(url)
        const json = await res.json()
        return json
    } catch (error) {
        console.log(error)
    }
}


export const useGetRandomName = (pokemonName) => {
    return useQuery(['getRandomUser', pokemonName], () => getRandomUsers(pokemonName), {cacheTime: 100000, enabled: !!pokemonName}) 
}

