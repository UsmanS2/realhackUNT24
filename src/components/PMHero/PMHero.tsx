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

          {/* <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all components and hooks
              export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
              any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
              keyboard
            </List.Item>
          </List> */}

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              View Details →
            </Button>
            {/* <Button variant="default" radius="xl" size="md" className={classes.control}>
              Source code
            </Button> */}
          </Group>
          </div>
          <RingProgress
          size={250}
          thickness={24}
          sections={[{ value: 70, color: 'yellow' }]} 
          label={<Text size="xl" ta="center">70%</Text>}
        />
        
        {/* <Image src={image.src} className={classes.image} /> */}
      </div>
    </Container>
  );
}