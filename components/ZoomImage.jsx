import { ActivityIndicator, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, clamp, withTiming } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

export default function ZoomImage({ source }) {
  const [ size, setSize ] = useState({ width: 0, height: 0});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  useEffect(() => { 
    const imageSize = Image.resolveAssetSource(source);
    setSize({ width: imageSize.width, height: imageSize.height });
  }, [source]);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const newScale = savedScale.value * e.scale;
      scale.value = Math.max(1, newScale);
    })
    .onEnd(() => {
      if(scale.value > 1){
        savedScale.value = scale.value;
      }
      else{
        scale.value = 1;
        offset.value = { 
          x: 0,
          y: 0,
        }     
      } 
    });
  
  const dragGesture = Gesture.Pan()  
    .averageTouches(true)
    .onUpdate((e) => {
      if(scale.value > 1){
        const currentScale = scale.value;

        const widthScale = size.width * currentScale;
        const heightScale = size.height * currentScale;

        const maxOffsetX = Math.max(0, (widthScale - SCREEN_WIDTH) / 2);
        const maxOffsetY = Math.max(0, (heightScale - SCREEN_HEIGHT) / 2);
                            
        const  nextX = e.translationX + start.value.x;
        const  nextY = e.translationY + start.value.y;

        offset.value = { 
          x: clamp(nextX, -SCREEN_WIDTH, SCREEN_WIDTH),
          y: clamp(nextY, -maxOffsetY, maxOffsetY)
        }     
      }
  })
    //need to set max drag so user cannot drag it outside of window/)
    .onEnd(() => {
      const currentScale = scale.value;

      const widthScale = size.width * currentScale;
      const heightScale = size.height * currentScale;

      const maxOffsetX = Math.max(0, (widthScale - SCREEN_WIDTH) / 2);
      const maxOffsetY = Math.max(0, (heightScale - SCREEN_HEIGHT) / 2);

      const clampedX = clamp(offset.value.x, -maxOffsetX, maxOffsetX);
      const clampedY = clamp(offset.value.y, -maxOffsetY, maxOffsetY);

      offset.value = withTiming({ x: clampedX, y: clampedY }, { duration: 150 });
      start.value = { x: clampedX, y: clampedY };
    })


  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
    })
    .onEnd((_event, success) => {
      if (success){
        scale.value = withTiming(1);
        savedScale.value = 1; 

        offset.value = withTiming({x: 0, y: 0});
        start.value = {x: 0, y: 0}
      }
    })

  const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value},         
                  { translateX: offset.value.x },
                  { translateY: offset.value.y }
              ],
  }));

  const composed = Gesture.Simultaneous(
      dragGesture, 
      pinchGesture,
      doubleTap
  );

  if(size.width === 0) {
    return (
      <View style={{ flex: 1, }} >
        <ActivityIndicator size='large' />
      </View>  
    )
  }
    
  return (    
      <GestureHandlerRootView>
        <GestureDetector gesture={composed}>
            <Animated.Image 
                source={source} 
                style={[{
                  flex: 1, 
                  aspectRatio: size.width/size.height },
                  animatedStyle]} 
                  resizeMode= 'contain'                
                                           
            />
        </GestureDetector>
      </GestureHandlerRootView>
    )
  }

