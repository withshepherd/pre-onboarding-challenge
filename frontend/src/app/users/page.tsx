"use client"; //NOTE: this is required for next client side rendering
import {
  Alert,
  Anchor,
  Box,
  Button,
  Text,
  Container,
  Divider,
  Group,
  Stack,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useCreateUserMutation, useUsersQuery } from "./User.generated";
import { namedOperations } from "../../graphql/namedOperations.generated";

const CreateUserForm = () => {
  const [create, { loading }] = useCreateUserMutation({
    refetchQueries: [namedOperations.Query.Users],
  });

  type FormFields = {
    name: string;
    email: string;
  };

  const { handleSubmit, register } = useForm<FormFields>();

  return (
    <Box>
      <Title order={4}>Add User</Title>
      <form
        onSubmit={handleSubmit(async (formData) =>
          create({
            variables: {
              input: {
                email: formData.email,
                name: formData.name,
              },
            },
          }),
        )}
      >
        <Stack gap="xs">
          <TextInput
            size="sm"
            placeholder="Mr. Shepherd"
            required
            {...register("name", { required: true, minLength: 1 })}
          />
          <TextInput
            size="sm"
            placeholder="shep@erd.com"
            required
            {...register("email", {
              required: true,
              pattern: {
                value: /@/,
                message: "Field must contain an @ symbol",
              },
            })}
          />
          <Button loading={loading} type="submit">
            Add
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

const UserList = () => {
  const { loading, error, data } = useUsersQuery();

  if (error) {
    return <Alert title="uh oh">{error.message}</Alert>;
  }

  return (
    <>
      <Group>
        <Title order={5}>All Users</Title>
        {loading ? <Loader size="xs" type="bars" /> : null}
      </Group>
      <Divider />
      {data?.users.map((user) => {
        return (
          <Group>
            <Text fw="500">{user.name}</Text>
            <Text>{user.email}</Text>
          </Group>
        );
      })}
    </>
  );
};

export default function Users() {
  return (
    <Container p="xl" size="xs">
      <Stack gap="sm">
        <Title>Users</Title>
        <Anchor component={Link} href="/">
          Back Home
        </Anchor>
        <Divider />
        <CreateUserForm />
        <UserList />
      </Stack>
    </Container>
  );
}
