import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from 'react-native-elements'

export default function Modal(props) {
    const {isVisible, setIsVisible, children} = props;
    const closeModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.3)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
      animationType={'fide'}
    >
      {children}
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    height: 'auto',
    width: '100%',
    backgroundColor: 'white',
    padding:10,
    borderRadius:20,
  },
})