import { Image, StyleSheet, Text, View, Button } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useMutation, useQuery } from "@apollo/client";
import {
  DeleteProductDocument,
  ProductsDocument,
  ProductsQuery,
} from "@/generated/graphql";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { data, refetch } = useQuery<ProductsQuery>(ProductsDocument);
  const [deleteProduct] = useMutation(DeleteProductDocument);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Products</ThemedText>
        <Link href={"/(modals)/createNewProduct"}>
          <Text>Create New Product</Text>
        </Link>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Button title="Refresh" onPress={() => refetch()} />
      </ThemedView>
      {data?.products?.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <View style={styles.productHeadingWrapper}>
            <Text style={styles.productName}>{product.name}</Text>
            <Button
              title="X"
              color="red"
              onPress={async () => {
                await deleteProduct({ variables: { productId: product.id } });
                refetch();
              }}
            />
          </View>
          <Text>{product.description}</Text>
          <Text style={styles.productPrice}>{product.price}€</Text>
        </View>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  productHeadingWrapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  productCard: {
    padding: 20,
    width: "100%",
    borderColor: "#CCCCCC",
    borderWidth: 2,
    borderRadius: 12,
  },
  productName: {
    fontSize: 20,
    color: "gray",
    textTransform: "uppercase",
  },
  productPrice: {
    fontSize: 20,
    color: "blue",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
