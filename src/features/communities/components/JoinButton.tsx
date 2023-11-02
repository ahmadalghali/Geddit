import { Button } from "@mantine/core";

type Props = {
  text?: "JOIN" | "JOINED";
  onClick: () => void;
};

function JoinButton({ text = "JOIN", onClick }: Props) {
  return (
    <Button
      className='ml-auto uppercase'
      //@ts-ignore
      sx={{
        fontWeight: "800",
      }}
      radius={"xl"}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default JoinButton;
