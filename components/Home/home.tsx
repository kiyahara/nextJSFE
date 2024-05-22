"use client";

import { Login } from "@/app/api/auth";
import {
  AppShell,
  Box,
  Button,
  Center,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import moment from "moment";
import { useCookies } from "next-client-cookies";
import NotificationComponent from "../Notification/notification";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginModel {
  email: string;
  password: string;
}

export default function HomeComponent() {
  const cookies = useCookies();
  const router = useRouter();
  const [visible, setVisible] = useState(true);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (value != "" ? null : "Invalid email"),
      password: (value) => (value != "" ? null : "Invalid Password"),
    },
  });

  function onLogin(body: LoginModel) {
    setVisible(true);
    Login(body)
      .then((res) => {
        setVisible(false);
        if (res.status == 201) {
          cookies.set("idProfile", res.data?.user?.id);
          cookies.set("accessToken", res.data?.backendTokend?.accessToken);
          cookies.set("refreshToken", res.data?.backendTokend?.refreshToken);
          router.push("/Profile");
        }
      })
      .catch((err) => {
        setVisible(false);
        console.log(err);
        NotificationComponent({ message: "Failed to Login", color: "red" });
      });
  }

  useEffect(() => {
    if (cookies.get("accessToken") != undefined) {
      router.push("/Profile");
      setVisible(false);
    }
    setVisible(false);
  }, []);

  return (
    <AppShell padding="md" pos={"relative"}>
      <LoadingOverlay
        visible={visible}
        overlayProps={{ radius: "sm", blur: 2, h: "100%" }}
        loaderProps={{ color: "blue", type: "oval", size: "xl" }}
      />
      <AppShell.Main
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <form onSubmit={form.onSubmit((values) => onLogin(values))}>
          <Center>
            <Image src={"/images/Logo.png"} width={100} height={300} />
          </Center>
          <Grid>
            <Grid.Col span={12}>
              <Center>
                <TextInput
                  w={300}
                  label="Email"
                  variant="filled"
                  placeholder="Email..."
                  {...form.getInputProps("email")}
                />
              </Center>
            </Grid.Col>
            <Space h={50} />
            <Grid.Col span={12}>
              <Center>
                <TextInput
                  w={300}
                  label="Password"
                  variant="filled"
                  placeholder="Password..."
                  type="password"
                  {...form.getInputProps("password")}
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={12}>
              <Center>
                <Button
                  variant="filled"
                  color="green"
                  size="md"
                  radius="md"
                  w={300}
                  type="submit"
                >
                  Login
                </Button>
              </Center>
            </Grid.Col>
            <Grid.Col span={12}>
              <Center>
                Dont Have Account? <Space w={10} />
                <a
                  href="/Register"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <b>Register Here!</b>
                </a>
              </Center>
            </Grid.Col>
          </Grid>
        </form>
      </AppShell.Main>
      <AppShell.Footer
        p="md"
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
        }}
      >
        ©{moment().format("YYYY")} OKR Project - Fenri Mintardja. All Rights
        Reserved
      </AppShell.Footer>
    </AppShell>
  );
}
