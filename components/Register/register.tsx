"use client";

import {
  AppShell,
  Button,
  Center,
  Grid,
  Image,
  LoadingOverlay,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import moment from "moment";
import { useRouter } from "next/navigation";
import NotificationComponent from "../Notification/notification";
import { useState } from "react";
import { Register } from "@/app/api/register";

interface RegisterModel {
  name: string;
  email: string;
  password: string;
}

export default function RegisterComponent() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  function goLogin() {
    setVisible(true);
    router.push("/");
  }

  function RegisUser(formValues: RegisterModel) {
    setVisible(true);
    var CryptoJS = require("crypto-js");
    const encryptData = CryptoJS.AES.encrypt(
      formValues.password,
      process.env.jwtSecretKey
    ).toString();
    const body: RegisterModel = {
      name: formValues.name,
      email: formValues.email,
      password: encryptData,
    };
    Register(body)
      .then((res) => {
        setVisible(false);
        res.status == 201 ? goLogin() : "";
      })
      .catch((err) => {
        setVisible(false);
        console.log(err);
        NotificationComponent({ message: "Failed to Register", color: "red" });
      });
  }

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (value != "" ? null : "Invalid email"),
      name: (value) => (value != "" ? null : "Invalid username"),
      password: (value) => (value != "" ? null : "Invalid Password"),
    },
  });

  return (
    <>
      <AppShell padding="md" pos={"relative"}>
        <AppShell.Main
          p="md"
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          <LoadingOverlay
            visible={visible}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "blue", type: "oval", size: "xl" }}
          />
          <form onSubmit={form.onSubmit((values) => RegisUser(values))}>
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
                    {...form.getInputProps("email")}
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
                    {...form.getInputProps("name")}
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
              <Space h={80} />
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
                    Register
                  </Button>
                </Center>
              </Grid.Col>
              <Space h={50} />
              <Grid.Col span={12}>
                <Center>
                  <Button
                    variant="filled"
                    color="blue"
                    size="md"
                    radius="md"
                    w={300}
                    onClick={goLogin}
                  >
                    Back to Login
                  </Button>
                </Center>
              </Grid.Col>
            </Grid>
          </form>
          <Space h={50} />
        </AppShell.Main>
        {/* <AppShell.Footer
          p="md"
          style={{
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
          }}
        >
          ©{moment().format("YYYY")} OKR Project - Fenri Mintardja. All Rights
          Reserved
        </AppShell.Footer> */}
      </AppShell>
    </>
  );
}
