import React, { useState } from "react";
import { View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const CollapsableContainer = ({ children, expanded, duration = 300 }) => {
    const [height, setHeight] = useState(0);
    const animatedHeight = useSharedValue(0);

    const onLayout = (event) => {
        const onLayoutHeight = event.nativeEvent.layout.height;
        if (onLayoutHeight > 0 && onLayoutHeight != height) {
            setHeight(onLayoutHeight);
        }
    };

    // const collapsableStyle = useAnimatedStyle(() => {
    //     animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    //     return {
    //         height: animatedHeight.value,
    //     };
    // }, [expanded]);

    const collapsableStyle = useAnimatedStyle(() => {
        animatedHeight.value = expanded
            ? withTiming(height, { duration })
            : withTiming(0, { duration });
        return { height: animatedHeight.value };
    }, [expanded, height]);

    return (
        <Animated.View style={[collapsableStyle, { overflow: 'hidden' }]}>
            <View style={{ position: "absolute", opacity: 0, zIndex: -1 }}
                            onLayout={onLayout}>
                {children}
            </View>

            <View>
                {children}
            </View>
        </Animated.View>
    );
};

export default CollapsableContainer;