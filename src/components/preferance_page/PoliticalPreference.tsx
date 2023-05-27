import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface PoliticalCompassProps {
    onPoliticalPreferenceSelected: (politicalPreferenceKey: string) => void;
    onPoliticalPreferenceSkipped: () => void;
}

const PoliticalCompass = (props: PoliticalCompassProps) => {
    const gridSize = 20;

    const renderCells = () => {
        const cells = [];

        cells.push(
            <View style={styles.topShadows} key="top" />,
            <View
                style={[styles.bottomShadows, styles.transparentBorder]}
                key="bottom"
            />,
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

            cells.push(
                <View style={styles.row} key={i}>
                    {row}
                </View>,
            );
        }

        cells.push(
            <TouchableOpacity
                style={[styles.libertarian, styles.buttonContainer]}
                key="Libertarian"
            >
                <Text style={styles.buttonText}>Libertarian</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.authoritarianism, styles.buttonContainer]}
                key="Authoritarianism"
            >
                <Text style={styles.buttonText}>Authoritarianism</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.right, styles.buttonContainer]}
                key="Right"
            >
                <Text style={styles.buttonText}>Right</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.left, styles.buttonContainer]}
                key="Left"
            >
                <Text style={styles.buttonText}>Left</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.socialism, styles.buttonContainer]}
                key="Socialism"
            >
                <Text style={styles.buttonText}>Socialism</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.liberalism, styles.buttonContainer]}
                key="Liberalism"
            >
                <Text style={styles.buttonText}>Liberalism</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.conservatism, styles.buttonContainer]}
                key="Conservatism"
            >
                <Text style={styles.buttonText}>Conservatism</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.ecologism, styles.buttonContainer]}
                key="Ecologism"
            >
                <Text style={styles.buttonText}>Ecologism</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.nationalism, styles.buttonContainer]}
                key="Nationalism"
            >
                <Text style={styles.buttonText}>Nationalism</Text>
            </TouchableOpacity>,
            <TouchableOpacity
                style={[styles.socialDemocracy, styles.buttonContainer]}
                key="Social democracy"
            >
                <Text style={styles.buttonText}>Social Democracy</Text>
            </TouchableOpacity>,
        );
        cells.forEach(cell => {
            cell.props.onPress = () => {
                props.onPoliticalPreferenceSelected(cell.key);
            };
        });
        return cells;
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>{renderCells()}</View>
            <TouchableOpacity
                onPress={props.onPoliticalPreferenceSkipped}
                style={styles.skipButton}
            >
                <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
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
        top: 0,
        height: '100%',
        backgroundColor: 'silver',
        opacity: 0.9,
    },
    bottomShadows: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        bottom: 50,
        height: '85%',
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
        minWidth: 40,
        height: 25,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#FFFFFFDB',
        '&:hover': {
            backgroundColor: 'blue',
        },
    },
    buttonText: {
        color: '#D88E13',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
    },
    skipButton: {
        position: 'absolute',
        bottom: 0,
        right: 180,
        paddingVertical: 10,
        paddingHorizontal: 4,
        underLine: true,
        color: '#14213D',
        borderBottomWidth: 2,
    },
    skipText: {
        color: '#14213D',
        fontWeight: 'bold',
    },
    container: {
        top: 50,
        flex: 1,
        backgroundColor: 'white',
    },
    libertarian: {
        left: 153,
        top: 415,
    },
    authoritarianism: {
        left: 135,
        top: 0,
    },
    right: {
        left: 330,
        top: 200,
    },
    left: {
        left: 5,
        top: 200,
    },
    socialism: {
        left: 40,
        top: 60,
    },
    liberalism: {
        left: 200,
        top: 300,
    },
    conservatism: {
        left: 200,
        top: 190,
    },
    ecologism: {
        left: 20,
        top: 350,
    },
    nationalism: {
        left: 260,
        top: 70,
    },
    socialDemocracy: {
        left: 50,
        top: 190,
    },
});

export default PoliticalCompass;

// ! This part without buttons

// import React from 'react';
// import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

// const PoliticalCompass: React.FC = () => {
//   const gridSize = 20;

//   const renderCells = () => {
//     const cells = [];

//     for (let i = 0; i < gridSize; i++) {
//       const row = [];

//       for (let j = 0; j < gridSize; j++) {
//         const horizontalLineIndex = 9;
//         const verticalLineIndex = 8;

//         const cellStyle = {
//           ...styles.cell,
//           ...(i === horizontalLineIndex && styles.horizontalLine),
//           ...(j === verticalLineIndex && styles.verticalLine),
//           backgroundColor: 'black',
//         };
//         row.push(<View style={cellStyle} key={`${i}-${j}`} />);
//       }

//       cells.push(<View style={styles.row} key={i}>{row}</View>);
//     }
//     return cells;
//   };

//   return (
//     <View style={styles.grid}>
//       {renderCells()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     backgroundColor: 'black',
//     border: '3px solid rgba(255, 255, 255, 0.5)',
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   cell: {
//     width: 20,
//     height: 20,
//     margin: 1,
//     backgroundColor: '#fff',
//   },
//   horizontalLine: {
//     borderBottomWidth: 3,
//     borderBottomColor: 'black',
//   },
//   verticalLine: {
//     borderRightWidth: 3,
//     borderRightColor: 'black',
//   },
// });

// export default PoliticalCompass;
