const Texts = () => {
  return <></>;
};

Texts.ConfirmationCodeSent = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
      }}
    >
      <Text style={{ color: "grey" }}>
        we sent confirmation code to your email
      </Text>
      <Pressable onPress={() => setPhase(LoginPhase.REGISTER)}>
        <Text style={styles.goBack}>go back</Text>
      </Pressable>
    </View>
  );
};

export default Texts;
