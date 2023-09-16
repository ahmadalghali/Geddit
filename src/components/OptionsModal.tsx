import { Modal } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  opened: boolean;
  close: () => void;
  children: ReactNode;
};

function OptionsModal({ opened, close, children }: Props) {
  return (
    <Modal
      // overlayProps={{ opacity: 0.6 }}
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      closeOnClickOutside={true}
    >
      <ul className='divide-y-2'>{children}</ul>
    </Modal>
  );
}

function Item({ onClick, icon, children }: { onClick: () => void; icon: ReactNode; children: ReactNode }) {
  return (
    <li className='flex items-center py-3 cursor-pointer ' onClick={onClick}>
      {icon}
      <p className='ml-3'>{children}</p>
    </li>
  );
}

OptionsModal.Item = Item;

export default OptionsModal;
