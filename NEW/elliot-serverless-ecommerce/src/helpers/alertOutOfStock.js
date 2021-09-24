import Swal from "sweetalert2";

export default (title, confirmButtonText) =>
	Swal.fire({
		icon: "error",
		title,
		confirmButtonText
	});
