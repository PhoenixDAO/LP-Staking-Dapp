import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-right",
  iconColor: "white",
  customClass: {
    popup: "colored-toast",
  },
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  // showCancelButton: true,
});

export const ToastMsg = async (type, title) => {
  // console.log("fireeeee");
  return await Toast.fire({
    icon: type,
    title: title,
    position: "bottom-right",
    target: "#dialog-style",
  });
};
