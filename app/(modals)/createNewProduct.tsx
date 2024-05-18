import React from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CreateProductDocument } from "@/generated/graphql";

interface IFormInput {
  name: string;
  description: string;
  price: number;
}

const CreateNewProduct = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<IFormInput>();

  const [createProduct] = useMutation(CreateProductDocument);

  const onSubmit: SubmitHandler<IFormInput> = async ({
    description,
    name,
    price,
  }) => {
    const response = await createProduct({
      variables: { input: { description, name, price: Number(price) } },
    });
    console.log("response", response);

    if (!response.errors) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <ThemedView>
        <ThemedText type="title">Create New Product</ThemedText>
      </ThemedView>
      <Controller
        control={control}
        name={"name"}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="product name"
            style={styles.inputField}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name={"description"}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="description"
            style={styles.inputField}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name={"price"}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="price"
            style={styles.inputField}
            value={String(value)}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Button title="Create product" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  btnOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "blue",
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default CreateNewProduct;
