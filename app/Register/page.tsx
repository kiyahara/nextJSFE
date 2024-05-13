"use client";

import {
  AppShell,
  Button,
  Center,
  Grid,
  Image,
  Space,
  TextInput,
} from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function goLogin() {
    router.push("/");
  }

  return (
    <AppShell padding="md">
      <AppShell.Main
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Center>
          <Image
            src={"/images/Logo.png"}
            width={100}
            height={300}
            alt="registerLogo"
          />
        </Center>
        <Grid>
          <Grid.Col span={12}>
            <Center>
              <TextInput
                w={300}
                label="Email"
                variant="filled"
                placeholder="Email..."
              />
            </Center>
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              <TextInput
                w={300}
                label="Username"
                variant="filled"
                placeholder="Username..."
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
              />
            </Center>
          </Grid.Col>
          <Space h={80} />
          <Grid.Col span={12}>
            <Center>
              <Button
                variant="filled"
                color="green"
                size="md"
                radius="md"
                w={300}
                onClick={goLogin}
              >
                Register
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
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
