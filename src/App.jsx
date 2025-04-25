import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(null); // 'alphabet' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = type => {
    const sorted = [...goodsFromServer];

    if (type === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    setGoods(isReversed ? sorted.reverse() : sorted);
    setSortType(type);
  };

  const reverseGoods = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  const isDefaultOrder =
    goods.join(',') === goodsFromServer.join(',') && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => sortGoods('alphabet')}
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => sortGoods('length')}
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGoods}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            onClick={resetGoods}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
