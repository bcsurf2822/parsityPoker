import CircularProgress from "@mui/joy/CircularProgress";

export default function Spinner() {
  return (
    <div>
      <CircularProgress
        color="success"
        determinate={false}
        size="md"
        variant="soft"
      />
    </div>
  );
}
