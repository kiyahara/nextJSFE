import {
  MantineColorsTuple,
  MantineProvider,
  Notification,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { Notifications } from "@mantine/notifications";

export default function RootState({ children }: { children: React.ReactNode }) {
  const myColor: MantineColorsTuple = [
    "#eef3ff",
    "#dce4f5",
    "#b9c7e2",
    "#94a8d0",
    "#748dc1",
    "#5f7cb8",
    "#5474b4",
    "#44639f",
    "#39588f",
    "#2d4b81",
  ];

  const theme = createTheme({
    colors: {
      myColor,
    },
  });

  return (
    <MantineProvider theme={theme}>
      <CookiesProvider>{children}</CookiesProvider>
      <Notifications position="top-right" />
    </MantineProvider>
  );
}
