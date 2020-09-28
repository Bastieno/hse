const Register = () => {
  return (
    <main className="Main">
      <section className="Register">
        <div className="Register__inner container-1360">
          <h1>Register to attend</h1>

          <p className="Register__teaser">
            Participants are invited to register to attend the conference using
            the form below. The final confirmation of your registration will
            only be received only after payment. The table below shows
            registration fees for the differnet category of participants.
          </p>

          <h2>Registration Form</h2>
        </div>
      </section>
      <style jsx>{`
        .Main {
          min-height: calc(100vh - 8.5rem);
        }

        .Register__inner {
          padding-top: 6rem;
          padding-bottom: 9rem;
        }

        h1 {
          font-family: 'Product Sans Bold', sans-serif;
          font-size: 4em;
          color: #000;
          margin-bottom: 2.4rem;
        }

        .Register__teaser {
          padding: 2.3rem 3.3rem;
          font-size: 2.2em;
          line-height: 1.76;
          color: #2e5bff;
          background-color: rgba(46, 91, 255, 0.1);
          border-radius: 10px;
          margin-bottom: 6rem;
        }
      `}</style>
    </main>
  );
};

export default Register;
