import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverURL } from '../utils/constants';

type Writer = {
  id: number;
  username: string;
  name: string;
  rank: string;
};

type Item = {
  id: number;
  title: string;
  type: string;
  content: string;
  writer: Writer;
  createdAt: string;
  writerId: number;
};
type Prop = { date: string };

function UseBoard(Prop: Prop) {
  const [items, setItems] = useState<Item[]>([]);

  const getData = async () => {
    axios
      .get(serverURL + '/notice/')
      .then((response: any) => {
        console.log(response);
        setItems(response.data.items);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return { items };
}

export default UseBoard;
