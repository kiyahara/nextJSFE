"use client";

import { RefreshToken, getProfile } from "@/app/api/profile";
import { AppShell, Button, Center, Image, LoadingOverlay } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RenewTokenSet, TokenRemove } from "../token/token";

export default function ProfileComponent() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState<ProfileModel | null>();

  function goLogin() {
    setVisible(false);
    TokenRemove();
    router.push("/");
  }

  function getRefreshToken() {
    setVisible(true);
    RefreshToken(String(localStorage.getItem("refreshToken")))
      .then((res) => {
        setVisible(false);
        RenewTokenSet(String(res?.data?.backendToken?.accessToken));
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
    const body = {
      id: Number(localStorage.getItem("idProfile")),
      token: String(localStorage.getItem("accessToken")),
    };
    getProfile(body)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
