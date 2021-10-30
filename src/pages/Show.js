import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetResults } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  useEffect(() => {
    apiGetResults(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      setShow(results);
    });
  }, [id]);

  console.log('show', show);

  return <div>Hello World</div>;
};

export default Show;
