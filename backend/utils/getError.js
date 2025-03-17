export default function getErrorMessage(error) {
  if (error.name === "ValidationError") {
    return Object.values(error.errors)
      .map((val) => val.message)
      .join(", ");
  } else if (error.code === 11000) {
    return "Duplicate value entered";
  } else {
    return error.message || "Something went wrong";
  }
}
