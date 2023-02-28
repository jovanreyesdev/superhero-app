import React, { useState, useEffect, useMemo, useCallback, useRef, MutableRefObject  } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ConditionalRender from '@/components/ConditionalRender';
import styles from '@/styles/Home.module.css';
import { Hero } from '@types';

interface SearchResult {
  response: string;
  results: Hero[];
  "results-for": string;
}

interface Props {
  initialSearchResults: Hero[];
}

const DEBOUNCE = 500;

function Home({
  initialSearchResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Hero[]>(initialSearchResults);
  const [isLoading, setIsLoading] = useState(false);

  const timer: MutableRefObject<Timeout | null> = useRef(null);

  useEffect(() => {
    if (!query) return;

    timer.current = setTimeout(
      async () => {
        setIsLoading(true);

        const response = await fetch(`/api/search?name=${query}`);
        const data = await response.json();
        router.push('/', `/?query=${query}`);

        setSearchResults(data);

        setIsLoading(false);
      },
      DEBOUNCE
    );

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current as number);
      }
    };
  }, [query]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const searchQuery = event.target.value;
      setQuery(searchQuery);
    },
    []
  );

  return (
    <>
      <Head>
        <title>SuperHero App</title>
      </Head>
      <main className={styles.main}>
        <Row>
          <Col xs={12}>
            <input
              type="text"
              placeholder="Search for a superhero"
              className="mb-3"
              value={query}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs={12}>
            <ConditionalRender
              condition={!!searchResults.length}
              whenTrue={
                <ListGroup as="ol" numbered>
                  {searchResults?.map((hero) => (
                    <ListGroup.Item
                      as="li"
                      key={hero.id}
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{hero.name}</div>
                      </div>
                      <a href={`superhero/${hero.id}`}>
                        <small>view profile</small>
                      </a>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              }
              whenFalse={
                <p>No result.</p>
              }
            />
          </Col>
        </Row>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context.query;
  const res = await fetch(
    `https://superheroapi.com/api/${process.env.SUPERHERO_API_TOKEN}/search/${query}`
  );
  const data = await res.json();
  return {
    props: {
      initialSearchResults: data?.results || [],
    },
  };
};

export default Home;
