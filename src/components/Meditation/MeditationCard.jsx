import { Text, Dimensions, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Style
import styles from "../../common/styles";

// Routes
import routes from "../../common/routes";

const MeditationCard = ({ imgWidth, imgHeight, id, title, author, poster }) => {
  const { navigate } = useNavigation();
  const w = Dimensions.get("window").width;
  return (
    <Pressable
      onPress={() => {
        navigate(routes.meditationDetails,{id:id});
      }}
      style={{
        paddingLeft: imgWidth ? 0 : 15,
        paddingRight: imgWidth ? 0 : 15,
        paddingVertical: imgWidth?0:15,
        width:imgWidth ? imgWidth : w - 30,
        marginRight:imgWidth?15:0,
        marginBottom: imgWidth?15:0,
      }}
    >
      <Image
        style={{
          width: imgWidth ? imgWidth : w - 30,
          height: imgHeight ? imgHeight : 250,
        }}
        source={{uri: poster}}
      ></Image>
      <Text
        style={{
          color: styles.mainColor,
          marginTop: 10,
          fontSize: imgWidth ? 13 : 18,
          fontFamily: styles.fontFamilySemiBold,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: styles.backgroundPrimaryColor,
          marginTop: 6,
          fontSize: imgWidth ? 11 : 13,
          fontFamily: styles.fontFamilyReg,
        }}
      >
        {author}
      </Text>
    </Pressable>
  );
};

export default MeditationCard;
