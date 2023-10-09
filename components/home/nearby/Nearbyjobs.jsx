import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';

const NearbyJobs = () => {
  const router=useRouter();
  // const isLoading = false;
  // const error = false;
  
  const { data, isLoading, error, refetch } = useFetch(
    'search', {
      query:'React developer Italy',
      num_pages: 1,

    }
  );



  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job) => {
            return (
              <NearbyJobCard 
                job = {job}
                key = {`nearby-job-${job?.job_id}`}
                handleNavegate = {() => router.push(`/job-details/[${job.job_id}]`)}
              />
            );
          })

        )}
      </View>
    </View>
  )
}

export default NearbyJobs