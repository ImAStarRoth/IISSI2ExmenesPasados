import React from 'react'
import * as yup from 'yup'
import { ScrollView, View, Pressable, StyleSheet } from 'react-native'
import { createCategory } from '../../api/RestaurantEndpoints'
import InputItem from '../../components/InputItem'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { showMessage } from 'react-native-flash-message'
import { Formik, ErrorMessage } from 'formik'
import TextError from '../../components/TextError'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TextRegular from '../../components/TextRegular'

export default function CreateRestaurantScreen ({ navigation }) {
  const initialRestaurantCategoryValues = { name: null }
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(50, 'Name too long')
      .required('Name is required')
  })

  const createRestaurantCategory = async (values) => {
    try {
      const createdRestaurantCat = await createCategory(values)
      showMessage({
        message: `Restaurant category ${createdRestaurantCat.name} succesfully created`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
      navigation.navigate('RestaurantsScreen', { dirty: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialRestaurantCategoryValues}
      onSubmit={createRestaurantCategory}>
      {({ handleSubmit, setFieldValue, values }) => (
        <ScrollView>
          <View style={{ alignItems: 'center', width: '60%' }}>
              <InputItem
                name='name'
                label='Name:'
              />
              <ErrorMessage name={'restaurantCategory'} render={msg => <TextError>{msg}</TextError> }/>
          </View>

          <Pressable
                                onPress={handleSubmit}
                                style={({ pressed }) => [
                                  {
                                    backgroundColor: pressed
                                      ? GlobalStyles.brandSuccessTap
                                      : GlobalStyles.brandSuccess
                                  },
                                  styles.button
                                ]}>
                                <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
                                    <MaterialCommunityIcons name='content-save' color={'white'} size={20} />
                                    <TextRegular textStyle={styles.text}>
                                        Save
                                    </TextRegular>
                                </View>
                            </Pressable>

        </ScrollView>
      )}
    </Formik>
  )
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginLeft: 5
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
