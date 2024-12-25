import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string; }>();
  
  const { data: properties, loading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20
    });


  }, [params.query, params.filter]);
  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className=" bg-white h-full">


      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item?.$id}
        numColumns={2}
        contentContainerClassName="pb-32 "
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size='large' className="text-primary-300 mt-5" />
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View  className="flex flex-row justify-between items-center mt-5">
              <TouchableOpacity onPress={()=>router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">

              <Image source={icons.backArrow} className="size-5"/>
              </TouchableOpacity>
              <Text className="text-black-300 text-center mr-2 text-base font-rubik-medium">
                 Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className="size-8"/>
            </View>
            <Search />
            <View className="mt-5">
            <Filters />
              <Text  className="mt-5 text-black-300 text-xl font-rubik-bold">
                Found {properties?.length} results
              </Text>
            </View>
           
          </View>
           
        }


      />

    </SafeAreaView>
  );
}
