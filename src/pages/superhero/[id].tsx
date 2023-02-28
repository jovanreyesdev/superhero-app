import React, { useState, useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import PowerStats from '@/components/HeroProfile/PowerStats';
import Appearance from '@/components/HeroProfile/Appearance';
import { Hero } from '@types';

type Props = {
  hero: Hero;
};

const SuperheroProfile: React.FC<Props> = ({ hero }) => {
  const [data, setData] = useState(hero);
  
  return (
    <>
      <Head>
        <title>{`Profile | ${data?.name}`}</title>
      </Head>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {data?.name}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={data?.image?.url} />
              <Card.Body>
                <Card.Title dangerouslySetInnerHTML={{ __html: data?.name }} />
                <Card.Subtitle className="mb-2 text-muted" dangerouslySetInnerHTML={{ __html: data?.biography?.['full-name'] }} />
                  <p className="fs-6">
                    First Appearance: <b dangerouslySetInnerHTML={{ __html: data?.biography?.['first-appearance'] }} />
                  </p>

                  <p className="fs-6">
                    Alter Egos: <b dangerouslySetInnerHTML={{ __html: data?.biography?.['alter-egos'] }} />
                  </p>

                  <p className="fs-6">
                    Alignment: <b dangerouslySetInnerHTML={{ __html: data?.biography?.alignment }} />
                  </p>

                  <p className="fs-6">
                    Place of Birth: <b dangerouslySetInnerHTML={{ __html: data?.biography?.['place-of-birth'] }} />
                  </p>

                  <p className="fs-6">
                    Publisher: <b dangerouslySetInnerHTML={{ __html: data?.biography?.publisher }} />
                  </p>

                  <p className="fs-6">
                    Aliases: <b dangerouslySetInnerHTML={{ __html: data?.biography?.aliases.join(', ') }} />
                  </p>
              </Card.Body>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Power Stats</Accordion.Header>
                  <Accordion.Body>
                    <PowerStats data={data?.powerstats} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Appearance</Accordion.Header>
                  <Accordion.Body>
                    <Appearance data={data?.appearance} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Connections</Accordion.Header>
                  <Accordion.Body>
                    <small dangerouslySetInnerHTML={{ __html: data?.connections?.['group-affiliation'] }} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Relatives</Accordion.Header>
                  <Accordion.Body>
                    <small dangerouslySetInnerHTML={{ __html: data?.connections?.relatives }} />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Work</Accordion.Header>
                  <Accordion.Body>
                    <p className="fs-6">
                      Occupation: <b dangerouslySetInnerHTML={{ __html: data?.work?.occupation }} />
                    </p>
                    <p className="fs-6">
                      Base: <b dangerouslySetInnerHTML={{ __html: data?.work?.base }} />
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  const res = await fetch(
    `https://superheroapi.com/api/${process.env.SUPERHERO_API_TOKEN}/${id}`
  );
  const { response, ...hero } = await res.json();
  return {
    props: {
      hero,
    },
  };
};

export default React.memo(SuperheroProfile);