const SingleChat = () => {
  return (
    <>
      <div
        style={{
          color: "white",
          backgroundColor: "gray",
          display: "flex",
          padding: "10px",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <div className="image">
          <img
            style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_960_720.jpg"
            alt="this is alt"
          />
        </div>
        <div style={{ margin: "5px 10px" }}>
          <div style={{ fontWeight: "bold", color: "whitesmoke" }}>
            This is name div
          </div>
          <div> - This is message div</div>
        </div>
      </div>
    </>
  );
};
export default SingleChat;
