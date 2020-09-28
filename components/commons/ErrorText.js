import EvergreenIcon from './Icons';

const ValidatiionErrorText = ({ content }) => {
  return (
    <div className="validation-error">
      <EvergreenIcon type="error" color="danger" size={12} marginRight={7} />
      {content}

      <style jsx>{`
        .validation-error {
          color: #ec4c47;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default ValidatiionErrorText;
