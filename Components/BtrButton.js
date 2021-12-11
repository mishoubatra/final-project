import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const BtrButton = (props) => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={props.viewStyle}>
            <Text style={props.textStyle}>{props.children}</Text>
        </View>
    </TouchableOpacity>
);

export default BtrButton;