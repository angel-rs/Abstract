import React, { PureComponent } from 'react';
import PinchZoomView from 'react-native-pinch-zoom-view';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  Easing,
  StatusBar,
} from 'react-native';

const DEVICE = Dimensions.get('window');
// const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const { i } = this.props;
    const { animatedValue } = this.state;

    const duration = 3000 + (3000 * (i / 20));

    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }

  render() {
    const { i } = this.props;
    const { animatedValue } = this.state;

    const spinForwards = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const spinBackwards = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });

    const size = DEVICE.width * (i / 20);
    const color = i % 2 === 0 ? '#8E8E8E' : '#414141';
    // const color = randomColor();

    return (
      <Animated.View
        style={{
          width: size,
          height: size,
          position: 'absolute',
          borderColor: color,
          borderWidth: 1 * (i / 7),
          transform: [
            { rotate: i % 2 === 0 ? spinForwards : spinBackwards },
            { rotateX: i % 2 === 0 ? spinForwards : spinBackwards },
            // { rotateY: i % 2 === 0 ? spinForwards : spinBackwards },
          ],
        }}
      />
    );
  }
}

export default class Abstract extends PureComponent {
  render() {
    const arrayOfItems = [];

    for (let i = 0; i < 35; i++) {
      arrayOfItems.push(
        <Item
          i={i}
          key={i}
        />
      );
    }

    return (
      <View style={style.container}>
        <StatusBar hidden />

        <PinchZoomView style={[style.container, style.center, style.transparent]}>
          { arrayOfItems }
        </PinchZoomView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});
