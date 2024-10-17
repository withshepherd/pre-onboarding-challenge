import { Anchor, Container, Divider, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Container p="xl" size="xs">
      <Stack gap="sm">
        <Title>Hello World!</Title>
        <Divider />
        <Title order={4}>Links</Title>
        <Anchor component={Link} href="/users">
          Users
        </Anchor>
      </Stack>
    </Container>
  );
}
