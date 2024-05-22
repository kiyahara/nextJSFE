"use client";

import { RefreshToken } from "@/app/api/auth";
import { getProfile } from "@/app/api/profile";
import { AppShell, Button, Center, Image, LoadingOverlay } from "@mantine/core";
import moment from "moment";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileModel {
  id: number;
  email: string;
  name: string;
}

export default function ProfileComponent() {
  const router = useRouter();
  const cookies = useCookies();
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState<ProfileModel>();

  function goLogin() {
    setVisible(false);
    cookies.remove("idProfile");
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    router.push("/");
  }

  function getRefreshToken() {
    setVisible(true);
    RefreshToken(String(cookies.get("refreshToken")))
      .then((res) => {
        setVisible(false);
        cookies.set("accessToken", res.data?.backendTokend?.accessToken);
        getProfileUser();
      })
      .catch((err) => {
        setVisible(false);
        console.log(err);
        goLogin();
      });
  }

  function getProfileUser() {
    setVisible(true);
    console.log(cookies.get("idProfile"));
    console.log(cookies.get("accessToken"));
    getProfile(
      Number(cookies.get("idProfile")),
      String(cookies.get("accessToken"))
    )
      .then((res) => {
        setVisible(false);
        setProfile(res.data);
      })
      .catch((err) => {
        setVisible(false);
        console.log(err);
        getRefreshToken();
      });
  }

  useEffect(() => {
    getProfileUser();
  }, []);

  return (
    <AppShell padding="md">
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
        <Center>
          <Image
            src={"/images/Logo.png"}
            width={100}
            height={300}
            alt="registerLogo"
          />
        </Center>
        <Center>
          <p>WELCOME Mr.{profile?.name}</p>
        </Center>
        <Center>
          <Button
            variant="filled"
            color="green"
            size="md"
            radius="md"
            w={300}
            onClick={goLogin}
          >
            Logout
          </Button>
        </Center>
        {/* <Grid>
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
        </Grid> */}
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
