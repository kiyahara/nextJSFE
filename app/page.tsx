"use client";

import {
  AppShell,
  Button,
  Center,
  Grid,
  Group,
  Image,
  Space,
  TextInput,
} from "@mantine/core";
import moment from "moment";

export default function Home() {
  return (
    <AppShell padding="md">
      <AppShell.Main
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <Center>
          <Image src={"/images/Logo.png"} width={100} height={300} />
        </Center>
        <Grid>
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
              >
                Login
              </Button>
            </Center>
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              Dont Have Account? <Space w={10} />
              <a href="/Register" style={{ cursor: "pointer" }}>
                <b>Register Here!</b>
              </a>
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
