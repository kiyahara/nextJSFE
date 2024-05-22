import { notifications } from "@mantine/notifications";

interface Props {
  title?: string;
  message: string;
  color?: string;
  autoClose?: boolean;
  loading?: boolean;
}

export default function NotificationComponent({
  title = "Info",
  message,
  color = "green",
  autoClose,
  loading = false,
}: Props) {
  return notifications.show({
    title: title,
    message: message,
    color: color,
    autoClose: autoClose,
    loading: loading,
  });
}
