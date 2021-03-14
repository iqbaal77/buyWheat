import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AnimatedLoader
        visible={this.props.visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('./loader-src.json')}
        animationStyle={styles.lottie}
        speed={1}>
        <Text>Please Wait...</Text>
      </AnimatedLoader>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});
