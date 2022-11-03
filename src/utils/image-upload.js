import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';


const ImageUploader = async (path) => {
    console.log('here');
    const result = await launchCamera();
    if (result.didCancel) {
        return
    }
    await storage().ref(`${path}/${auth().currentUser.uid}`).putFile(result.assets[0].uri)
    const ref = storage().ref(`${path}/${auth().currentUser.uid}`);
    const url = await ref.getDownloadURL()
    return url

}
export default ImageUploader