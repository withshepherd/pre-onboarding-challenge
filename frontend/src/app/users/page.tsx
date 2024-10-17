"use client"; //NOTE: this is required for next client side rendering
import {
  Anchor,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "react-hook-form";

const CreateUserForm = () => {
  type FormFields = {
    name: string;
    email: string;
  };

  const { handleSubmit, register } = useForm<FormFields>();

  return (
    <Box>
      <Title>Add User</Title>
      <form
        onSubmit={handleSubmit((formData) => {
          console.log(formData);
        })}
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
          <Button type="submit">Add</Button>
        </Stack>
      </form>
    </Box>
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
      </Stack>
    </Container>
  );
}
