import React from 'react';
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomepageLayout = () => (
  <>
    <Container text style={{ textAlign: 'center', paddingTop: '40px' }}>
      <Header
        as="h1"
        content="Invontory managment"
      />
      <Header
        as="h2"
        content="Sign up to view your Greenhouses."
      />
      <Button as={Link} to="/GreenHomes" primary size="huge">
        View
        <Icon name="right arrow" />
      </Button>
    </Container>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Why Us
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              You get to view real time data of your greenhomes
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Why its important
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Optimal conditions are required to grow the best crops.
              with our system you can always ensure you are within optimal conditions
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
        </Grid.Row>
      </Grid>
    </Segment>
  </>
);

export default HomepageLayout;
