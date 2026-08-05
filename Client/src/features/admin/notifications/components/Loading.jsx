function Loading() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "300px",
      }}
    >
      <div
        className="spinner-border text-primary"
        style={{
          width: "3rem",
          height: "3rem",
        }}
        role="status"
      />

      <h6 className="mt-4 text-secondary">
        Loading Dashboard...
      </h6>

    </div>
  );
}

export default Loading;