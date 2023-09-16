import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function AppNotificationMessage({ children }: Props) {
  return <p className='font-medium text-base'>{children}</p>;
}

export default AppNotificationMessage;
