import {useEffect, useReducer, useState} from 'react';
import './App.css';
import {useQuery} from "@tanstack/react-query";


const getRandomNumberFromApi = async():Promise<number> => {
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new');
  const numberString = await res.text();
  return +numberString;
}
export const App = () => {
 const query = useQuery([],
     getRandomNumberFromApi
 );

  return (
    <div className="App App-header">
      {/* isLoading es sólo para el primer renderizado
      isFetching para preguntar si se está realizando
      de vuelta la consulta */}
      {
        query.isFetching ?
            <h2>Loading...</h2>
            :
            <h2>Numero aleatorio: {query.data} </h2>
      }

      {
        !query.isLoading && query.isError && (<h3>{ `${ query.error }` }</h3>)
      }
      <button onClick={ ()=> query.refetch() } disabled={ query.isFetching }>
        {
          query.isFetching ? '...' : 'Nuevo Número'
        }
      </button>
    </div>
  );
};
