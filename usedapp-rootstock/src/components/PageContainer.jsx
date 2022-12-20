function PageContainer({ children }) {
  return (
    <div className="container">
      <h1>Build on Rootstock with useDApp</h1>
      {children}
      <p>
        <strong>Created by IOV Labs DevEx team</strong>
      </p>
    </div>
  );
}

export default PageContainer;
