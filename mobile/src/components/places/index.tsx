import { Text, useWindowDimensions } from "react-native";
import Place, { PlaceProps } from "../place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { styles } from "./styles";
import { router } from "expo-router";

type Props = {
  data: PlaceProps[];
};

function Places({ data }: Props) {
  const { height } = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: height - 150,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => router.navigate(`/market/${item.id}` as never)}
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Text style={styles.title}>Locais</Text>}
      />
    </BottomSheet>
  );
}

export default Places;
