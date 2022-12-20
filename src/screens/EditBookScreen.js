import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import Title from '../components/common/Title';
import CustomTextLabel from '../components/create_book/CustomTextLabel';
import CustomTextInput from '../components/create_book/CustomTextInput';
import SubmitButton from '../components/create_book/SubmitButton';
import { getBook } from '../../api/v1/Book';
import BookDetails from '../components/edit_book/BookDetails';

export default function EditBookScreen({route}){
  const navigation = useNavigation();
  const id = route.params.id
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [book, setBook] = useState({})

  useEffect(() => {
    getBook(id).then(book =>
      {
        setBook(book)
        setName(book.name)
        setAuthor(book.author)
        setPrice(parseFloat(book.price).toFixed(2))
        setDescription(book.description)
      }
    )
  }, [])

  navigation.setOptions({
    title: book?.name,
    headerStyle: {
      backgroundColor: '#2C3639',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  function sendData(){
    console.log('Sending...')
  }

  console.log(book)

  return(
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <KeyboardAvoidingView style={{height: 750}} behavior='padding'>
          <Title title="Edit Book" />
          <BookDetails book={book}/>
          <View className="p-2 m-2 rounded-lg">
            <View className="my-2">
              <CustomTextLabel label="Book's title:" />
              <CustomTextInput sendValue={() => {}} type="default" value={name} />
            </View>
            <View className="my-2">
              <CustomTextLabel label="Book's author:" />
              <CustomTextInput sendValue={() => {}} type="default" value={author} />
            </View>
            <View className="my-2">
              <CustomTextLabel label="Book's price:" />
              <CustomTextInput sendValue={() => {}} type="numeric" value={price} />
            </View>
            <View className="my-2">
              <CustomTextLabel label="Book's description:" />
              <CustomTextInput sendValue={() => {}} type="numeric" value={description} />
            </View>
            <View className="my-2 items-center">
              <SubmitButton title="Update Book" callAction={sendData} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
