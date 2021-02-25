import React from 'react';
import prompt from 'react-native-prompt-android';

const Myprompt = (props) => {
  return (
    <>
      {prompt(
        props.title,
        props.message,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (str) => {
              console.log('OK Pressed, password: ' + str);
              props.onSubmit(str);
            },
          },
        ],
        {
          type: 'numeric',
          cancelable: true,
          defaultValue: props.defaultValue,
          placeholder: props.placeholder,
        },
      )}
    </>
  );
};
export default Myprompt;
