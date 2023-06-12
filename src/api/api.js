import { parseQueryArgs, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const getProducts = async () => {

    try {
        const url = "https://dummyjson.com/products"
        const res = await fetch(url)
        const json = await res.json()
        return json
    } catch (error) {
        console.log(error)
    }
}

export const useGetProducts = () => {
    return useQuery(['getProducts'], () => getProducts()) 
}

export const useGetAddedToInvoice = () => {
    const queryClient = useQueryClient();
    if (!queryClient.getQueryData(['getAddedToInvoice'])) {
      queryClient.setQueryData(['getAddedToInvoice'], []);
    }
    return useQuery(['getAddedToInvoice'], {
        queryFn: () => queryClient.getQueryData(['getAddedToInvoice']),
    });
}

export const useResetAddedToInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation(() => {
        queryClient.setQueryData(['getAddedToInvoice'], []);
    });
};
 

