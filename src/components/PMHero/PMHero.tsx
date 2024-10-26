import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem, RingProgress } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './PMHero.module.css';

export function PMHero() {
  return (
    <Container size="md">
        <Title className={classes.toptitle} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Your Buildings
        </Text>
      </Title>


      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Building 1</span> 
          </Title>
          <Text c="dimmed" mt="md">
            Located in Dallas, Texas
          </Text>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              View Details →
            </Button>

          </Group>
          </div>
          <RingProgress
          size={250}
          thickness={24}
          sections={[{ value: 70, color: 'yellow' }]} 
          label={<Text size="xl" ta="center">70%</Text>}
        />
        
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Building 2</span> 
          </Title>
          <Text c="dimmed" mt="md">
            Located in Los Angelos, California
          </Text>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              View Details →
            </Button>

          </Group>
          </div>
          <RingProgress
          size={250}
          thickness={24}
          sections={[{ value: 90, color: 'green' }]} 
          label={<Text size="xl" ta="center">90%</Text>}
        />
        
      </div>
    </Container>
  );
}