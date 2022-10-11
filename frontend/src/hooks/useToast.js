import {toast} from "react-toastify";

const useToast = (type, content) => {
    toast[type](content, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export default useToast;