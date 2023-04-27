import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  size: number;
  cellStyle?: object;
  onPressCell?: (index: number) => void;
  renderButton?: () => React.ReactNode;
}

const PoliticalCompass: React.FC<Props> = ({ size, cellStyle, onPressCell, renderButton }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cell: {
      width: size,
      height: size,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      ...cellStyle,
    },
    button: { // styles for the button
      width: size * 3,
      height: size * 2,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const cells = [];

  const handlerPressCell = (index: number) => {
    if (onPressCell) {
      onPressCell(index);
    }
  }

  for (let i = 0; i < size * size - 1; i++) {
    cells.push(
      <TouchableOpacity key={i} onPress={()=>handlerPressCell(i)}>
        <View style={styles.cell} />
      </TouchableOpacity>
      )
  }
  if (renderButton) { // if renderButton prop is provided, add button to the cells array
    cells.push(
      <TouchableOpacity key={size * size - 1} onPress={() => {}}>
        <View style={styles.button}>{renderButton()}</View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {cells}
      {renderButton && renderButton()}
    </View>
  )
};

export default PoliticalCompass;
