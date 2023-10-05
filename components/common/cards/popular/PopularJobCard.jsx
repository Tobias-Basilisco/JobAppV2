import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useEffect } from 'react';


import styles from './popularjobcard.style'

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  // console.log(item.job_title);
  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source = {{uri: item.employer_logo}}
          resizeMode = 'contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName}>{item.employer_name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location}>{item.job_country}</Text>

      </View>
    </TouchableOpacity>
  )
}




export default PopularJobCard