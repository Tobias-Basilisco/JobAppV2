import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"; // Import from @react-navigation/native

import { Company, JobTabs, ScreenHeaderBtn, Specifics, JobAbout, JobFooter } from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/useFetch";
import { Stack, useRouter } from "expo-router";



const JobDetails = () => {
    const tabs = ["About", "Qualifications", "Responsibilities"];
    const [activeTab, setActiveTab] = useState(tabs[0]);
  const route = useRoute(); // Use useRoute from @react-navigation/native
  const router = useRouter();
  const navigation = useNavigation(); // Use useNavigation to navigate back

  const id = route.params.id.slice(1, -1); // Remove the first and last character (square brackets)

  const { data, isLoading, error, refetch } = useFetch('job-details', { job_id: id }); // Access the id parameter from route.params

// console.log("Data0:", data[0].job_title);
// console.log("Is Loading:", isLoading);
// console.log("Error:", error);
// console.log('id:', route.params.id[0]);
// console.log('id:', id);


  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    // Implement your refresh logic here
  };
  const displayTabContent = () => {
      switch (activeTab) {
          case 'Qualifications':
            return (
                <Specifics 
                    title= "Qualifications"
                    points = {data[0].job_highlights?.Qualifications ?? ['N/A']}
                />
            )
          case 'About':
            return (
                <JobAbout
                    info= {data[0].job_description ?? 'N/A'}
                />
            )
          case 'Responsibilities':
            return (
                <Specifics
                    title= "Qualifications"
                    points = {data[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
            )          
      }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension='60%' />
          ),
          headerTitle: "",
        }}
      />
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
              jobTitle={data[0].job_title}
              companyName={data[0].employer_name}
              location={data[0].job_country}
            />

            <JobTabs 
                tabs = {tabs}
                activeTab = {activeTab}
                setActiveTab = {setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter 
         url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
      />
    </SafeAreaView>
  );
};

export default JobDetails;
