const Droppable = ({ children }) => {
  return (
    <TrackLayout style={styles.block} value="height" store={blockHeight}>
      {children}
    </TrackLayout>
  );
};

Droppable.Beneath = ({ children }) => {
  return (
    <TrackLayout value="height" store={registerHeight}>
      {children}
    </TrackLayout>
  );
};

Droppable.Bottom = ({ children }) => {
  return (
    <ConfirmCode
      blockHeight={blockHeight}
      registerHeight={registerHeight}
      visible={confirmCodeVisible}
    >
      {children}
    </ConfirmCode>
  );
};

Droppable.Falling = ({ children }) => {
  return (
    <ConfirmButton blockHeight={blockHeight} elevated={confirmButtonElevated}>
      {children}
    </ConfirmButton>
  );
};

export default Droppable;
