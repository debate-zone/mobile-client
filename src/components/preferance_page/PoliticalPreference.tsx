import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const PoliticalCompass: React.FC = () => {
  const gridSize = 20;

  const renderCells = () => {
    const cells = [];

    cells.push(
      <View style={styles.topShadows} key="top" />,
      <View style={[styles.bottomShadows, styles.transparentBorder]} key="bottom" />,
    );
    for (let i = 0; i < gridSize; i++) {
      const row = [];

      for (let j = 0; j < gridSize; j++) {
        const horizontalLineIndex = 9;
        const verticalLineIndex = 8;

        const cellStyle = {
          ...styles.cell,
          ...(i === horizontalLineIndex && styles.horizontalLine),
          ...(j === verticalLineIndex && styles.verticalLine),
        };
        row.push(<View style={cellStyle} key={`${i}-${j}`} />);
      }

      cells.push(<View style={styles.row} key={i}>{row}</View>);
    }

    cells.push(
      <TouchableOpacity style={[styles.button1, styles.buttonContainer]} key="button1">
        <Text style={styles.buttonText}>Nationalism</Text>
      </TouchableOpacity>,
      <TouchableOpacity style={[styles.button2, styles.buttonContainer]} key="button2">
        <Text style={styles.buttonText}>Authoritarianism</Text>
      </TouchableOpacity>,
      <TouchableOpacity style={[styles.button3, styles.buttonContainer]} key="button3">
        <Text style={styles.buttonText}>Ultra-Capitalism</Text>
      </TouchableOpacity>,
      <TouchableOpacity style={[styles.button4, styles.buttonContainer]} key="button4">
        <Text style={styles.buttonText}>Social Democratic </Text>
      </TouchableOpacity>,
    );

    return cells;
  };

  return <View style={styles.grid}>{renderCells()}</View>;
};

const styles = StyleSheet.create({
  transparentBorder: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 20,
    height: 20,
    margin: 1,
    backgroundColor: '#fff',
  },
  horizontalLine: {
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  verticalLine: {
    borderRightWidth: 3,
    borderRightColor: 'black',
  },
  topShadows: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    height: '100%',
    backgroundColor: 'silver',
    opacity: 0.9,
    
  },
  bottomShadows: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    height: '75%',
    backgroundColor: 'black',
    opacity: 1,
    borderRadius: 120,
    overflow: 'hidden',
    border: '3px solid rgba(255, 255, 255, 0.5)',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
  },
  buttonContainer: {
    position: 'absolute',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    height: 25,
    backgroundColor: '#FFFFFFDB',
    '&:hover': {
      backgroundColor: 'blue',
  }
  },
  button1: {
    left: 250,
    top: 100,
  },
  button2: {
    left: 100,
    top: 150,
  },
  button3: {
    left: 150,
    top: 120,
  },
  button4: {
    left: 50,
    top: 180,
  },
  buttonText: {
    color: '#D88E13',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  }
});

export default PoliticalCompass;
