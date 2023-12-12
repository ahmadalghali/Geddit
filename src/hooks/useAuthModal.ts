import { hideAuthModal, showAuthModal } from "@/state/modals/modalsSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

function useAuthModal() {
  const opened_authModal = useSelector((state: RootState) => state.modals.opened_authModal);
  const dispatch = useDispatch<AppDispatch>();

  return {
    displayAuthModal: () => dispatch(showAuthModal()),
    hideAuthModal: () => dispatch(hideAuthModal()),
    opened_authModal,
  };
}

export default useAuthModal;
