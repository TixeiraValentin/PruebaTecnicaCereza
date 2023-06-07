'use client'
import { useGetRandomName } from "@/api/api"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"


export default function Home() {
  const queryClient = useQueryClient()
  const [pokemonName, setPokemonName] = useState()
  const {data:user, isLoading:isLoadingRandomUser, isError, error} = useGetRandomName(pokemonName)

  const handleNamePokemon = (e) => {
    e.preventDefault()
    setPokemonName(e.target.value)
  }
  const handleInvalidQuery = (e) => {
    queryClient.invalidateQueries(['getRandomUser'])
    setPokemonName('')
  }
  console.log({user})
  return (
   <>
   <form>
    <input onChange={handleNamePokemon} type="text" />
    <button type="submit">Click</button>
   </form>
   <button onClick={handleInvalidQuery}>Invalidar Query</button>
    <h1>{user?.name}</h1>
    <img src={user?.sprites?.front_default} />
   </>
  )
}
