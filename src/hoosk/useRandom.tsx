import {useQuery} from "@tanstack/react-query";
const getRandomNumberFromApi = async():Promise<number> => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
    const numberString = await res.text();
    return +numberString;
}
export const useRandom = () => {
    const query = useQuery([],
        getRandomNumberFromApi,
        //  en caso de error, reintenta el fetch una vez más y luego lanza el error
        {
            retry: 1
        }
    );
    return query;
}