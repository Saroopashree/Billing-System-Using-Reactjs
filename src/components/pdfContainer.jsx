import React from "react";

export default props => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current, props.billNumber);
  return (
    <section className="pdf-container mb-5">
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
      <section className="d-flex pdf-toolbar mt-5 justify-content-center">
        <button className="btn btn-outline-primary" onClick={createPdf}>Create PDF</button>
      </section>
    </section>
  );
};
