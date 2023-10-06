import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"; // Import from @react-navigation/native

import { Company, JobTabs, ScreenHeaderBtn } from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";

const JobDetails = () => {
  const route = useRoute(); // Use useRoute from @react-navigation/native
  const navigation = useNavigation(); // Use useNavigation to navigate back

  const id = route.params.id.slice(1, -1); // Remove the first and last character (square brackets)

  const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: id }); // Access the id parameter from route.params

// console.log("Data:", data);
// console.log("Is Loading:", isLoading);
// console.log("Error:", error);
// console.log('id:', route.params.id[0]);
console.log('id:', id);


  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    // Implement your refresh logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].employer_logo}
              jobtitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />

            <JobTabs />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetails;
