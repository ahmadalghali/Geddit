import AppNotificationMessage from "@/components/AppNotification";
import { notifications } from "@mantine/notifications";

function notify(text: string) {
  notifications.show({
    withCloseButton: false,
    withBorder: true,
    color: "yellow",
    radius: "md",
    className: "shadow-3xl",
    styles: (theme) => ({
      root: {
        backgroundColor: theme.colors.gray[8],
        // "&::before": { backgroundColor: theme.white },
      },

      description: {
        color: theme.white,
        paddingTop: ".25rem",
        paddingBottom: ".25rem",
        fontSize: "1rem",
        fontWeight: "600",
      },
    }),
    message: text,
  });
}

export { notify };
