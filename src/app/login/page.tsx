"use client";

import Alert from "@/components/Alert";
import { useLogin } from "@/lib/utils/hooks";
import { LoginInput, loginValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const LoginPage = () => {
  const { login, isLoading, error } = useLogin();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const isLoginSuccess = await login(data.email, data.password);
    if (isLoginSuccess) {
      reset();
      router.push("/");
    }
  };

  return (
    <div className="full-screen-container gap-4 justify-center items-center">
      {error && (
        <Alert color="red" title="Error">
          <Text>{error}</Text>
        </Alert>
      )}

      <Paper shadow="xl" radius="lg" p="xl" withBorder>
        <Title order={1} className="text-center">
          Login
        </Title>

        {/* Email and password input */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 relative"
        >
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ blur: 2 }}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                label="Email"
                placeholder="Email"
                required
                {...field}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                label="Password"
                placeholder="Password"
                required
                {...field}
                error={errors.password?.message}
              />
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
