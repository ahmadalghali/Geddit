import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
function PageTitle({ children }: Props) {
  return <h2 className='mb-10 font-semibold text-gray-900 text-3xl'>{children}</h2>;
}

export default PageTitle;
