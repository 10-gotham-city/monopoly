import { colors } from '@mui/material';
import { useEffect, useReducer } from 'react';

// стандартные цвета mui, через одного для увеличения контрастности
const colorsMap = Object.values(colors).reduce((acc, color, i) => {
  // @ts-ignore
  if (color[500] && i % 2) {
    // @ts-ignore
    acc.push(color[500]);
  }
  return acc;
}, []);

type TPlayer = {
  name: string;
  color: keyof typeof colorsMap;
};

type TAction =
  | {
      type: 'add';
      payload: {
        name: string;
      };
    }
  | {
      type: 'remove';
      payload: {
        index: number;
      };
    };

function reducer(state: TPlayer[], action: TAction) {
  switch (action.type) {
    case 'add':
      return [
        // @ts-ignore
        ...state,
        {
          name: action.payload.name,
          color: colorsMap[state.length],
        },
      ];
    case 'remove':
      // удаляем игрока и обновляем цвета по индексу
      return state.reduce<TPlayer[]>((acc, { name }, index) => {
        if (index === action.payload.index) {
          acc.push({
            name,
            color: colorsMap[index],
          });
        }
        return acc;
      }, []);
    default:
      return state;
  }
}

export const AddPlayer = () => {
  const [players, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    dispatch({
      type: 'add',
      payload: {
        name: 'name',
      },
    });
  }, []);
  return (
    <>
      <ul>{players.map(({ name, color }) => {})}</ul>
    </>
  );
};
