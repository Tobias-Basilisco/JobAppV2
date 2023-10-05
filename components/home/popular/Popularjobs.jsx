import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './popularjobs.style';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router=useRouter();
  // const isLoading = false;
  // const error = false;
  
  const { data, isLoading, error, refetch } = useFetch(
    'search', {
      query:'React developer',
      num_pages: 1
    }
  );
  
  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {

  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size = "large" colors={COLORS.primary}/>
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList 
            data = {data}
            renderItem = {({ item }) => {
              return (
              item && (
              <PopularJobCard 
              item = {item}
              />));
            }}
            
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
          />

        )}
      </View>
    </View>
  )
}

export default Popularjobs