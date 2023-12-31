import { Text } from "react-native";
import { View } from "react-native";
import styles from "../../common/styles";
import { TextInput } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import routes from "../../common/routes";
import { Image } from "react-native";
import style from "./SignInUpStyle"
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const Login = ({ navigation }) => {

  const [error, setError] = useState("");
  const { login, googleSignIn, facebookSignIn, currentUser } = useAuth();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(data);
    const { mail, password, remember } = data;
    setError("");
    try {
      await login(mail, password);
    } catch (error) {
      setError("Incorrect email or password.");
    }
  };
  const handleGoogleSignIn = () => {
    try {
      googleSignIn();
    } catch (error) {
      setError("unable to sign with Google.");
    }
  };
  const handleFacebookSignIn = () => {
    try {
      facebookSignIn();
    } catch (error) {
      setError("unable to sign with Facebook.");
    }
  };
  useEffect(() => {
    if (currentUser != null) {
      navigation.navigate(routes.home)
    }
  });

  return (
    <View
      style={style.signInUpContainer}
    >
      <View
        style={style.signInUp}
      >
        <Text
          style={style.signInUpHeader}
        >
          Sign In
        </Text>
        <View
          style={style.signInUpHeaderUnderline}
        ></View>
        <View>
        <View style={style.inputContainer}>
            <Controller
                control={control}
                rules={{
                  required: "email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                    message:"invalid email",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={style.inputStyle}
                    placeholder="E-mail"
                keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="mail"
              />
              <IonIcon
                name="mail"
                size={23}
                color={styles.mainColor}
                style={style.inputIconStyle}
              />
            </View>
            {errors.mail && (
                <Text style={style.errorMsg}>
                {errors.mail.message}
              </Text>
            )}
          <View style={style.inputContainer}>
            <Controller
                control={control}
                rules={{
                  required: "password is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi,
                    message: "Check your password",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={style.inputStyle}
                    placeholder="Password"
                    secureTextEntry
                    textContentType={"password"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
              {/* <TextInput
                // onChangeText={onChangeNumber}
                // value={number}
                style={style.inputStyle}
                placeholder="Enter Password"
                // keyboardType="visible-password"
                secureTextEntry
                textContentType={"password"}
                // passwordRules={true}
              /> */}
              <IonIcon
                name="lock-closed"
                size={23}
                color={styles.mainColor}
                style={style.inputIconStyle}
              />
            </View>
            {errors.password && (
                <Text style={style.errorMsg}>
                {errors.password.message}
              </Text>
            )}
          <Pressable style={{ marginTop: 15 }}>
            <Text
              style={style.textLink}
            >
              Forget Password?
            </Text>
          </Pressable>
          
          <View
            style={style.flexViewStyle}
          >
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
              value={value}
              onValueChange={(v)=>onChange(v)}
              color={styles.mainColor}
              style={{ height: 15, width: 15 }}
            />
                )}
                name="remember"
              />
            <Text style={style.rememberMeText}>
              Remember me
            </Text>
          </View>
          <Pressable
          onPress={handleSubmit(onSubmit)}
            style={style.signInUpBtnStyle}
          >
            <Text
              style={style.signInUpBtnText}
            >
              Sign in
            </Text>
          </Pressable>
          {error && <Text style={style.errorMsg}>{error}</Text>}
          <View
            style={style.flexViewStyle}
          >
            <Text style={style.textFont}>
              Don't have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate(routes.signup)}>
              <Text
                style={{
                  ...style.textLink,
                  marginLeft: 5,
                }}
              >
                Register Now!
              </Text>
            </Pressable>
          </View>
          <View
            style={{ ...style.flexViewStyle,
              marginTop: 15,
              justifyContent: "center",
            }}
          >
            <Text style={style.textFont}>
              Try to login with
            </Text>
            <Pressable onPress={handleGoogleSignIn}>
              <Image source={require("../../../assets/Images/google.png")} style={style.googleImg}/>
            </Pressable>
            <Text style={style.textFont}>
              or
            </Text>
            <Pressable onPress={handleFacebookSignIn}>
            <IonIcon
              name="logo-facebook"
              size={25}
              style={{
                marginHorizontal:5,
              }}
            />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
